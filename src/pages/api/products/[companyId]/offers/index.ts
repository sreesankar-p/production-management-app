import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Company from '@/models/Company';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    const token = getTokenFromRequest(req);
    const companyId = req.query.companyId as string;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        await verifyToken(token);
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        switch (req.method) {
            case 'GET':
                return res.status(200).json(company.offers);

            case 'POST':
                const newOffer = {
                    ...req.body,
                    offerDate: new Date(req.body.offerDate),
                    status: 'pending'
                };
                company.offers.push(newOffer);
                await company.save();
                const populatedCompany = await Company.findById(companyId).populate('createdBy', 'name email');
                return res.status(201).json(populatedCompany.offers[populatedCompany.offers.length - 1]);

            default:
                return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' });
    }
}
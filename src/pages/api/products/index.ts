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

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    let decoded: any;
    try {
        decoded = verifyToken(token);
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        switch (req.method) {
            case 'GET':
                const companies = await Company.find().populate('createdBy', 'name email');
                return res.status(200).json(companies);

            case 'POST':
                const company = await Company.create({
                   registeredId: req.body.registeredId,
                    name: req.body.name,
                    gstNumber: req.body.gstNumber,
                    createdBy: decoded.id
                });
                return res.status(201).json(company);

            default:
                return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error)

        return res.status(500).json({ message: 'Server error' });
    }
}
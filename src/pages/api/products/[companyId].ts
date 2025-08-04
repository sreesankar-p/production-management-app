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
        switch (req.method) {
            case 'GET':
                const company = await Company.findById(companyId).populate('createdBy', 'name email');
                if (!company) {
                    return res.status(404).json({ message: 'Company not found' });
                }
                return res.status(200).json(company);

            case 'PUT':
                const updatedCompany = await Company.findByIdAndUpdate(
                    companyId,
                    req.body,
                    { new: true }
                ).populate('createdBy', 'name email');
                if (!updatedCompany) {
                    return res.status(404).json({ message: 'Company not found' });
                }
                return res.status(200).json(updatedCompany);

            case 'DELETE':
                const deletedCompany = await Company.findByIdAndDelete(companyId);
                if (!deletedCompany) {
                    return res.status(404).json({ message: 'Company not found' });
                }
                return res.status(200).json({ message: 'Company deleted successfully' });

            default:
                return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error)

        return res.status(500).json({ message: 'Server error' });
    }
}
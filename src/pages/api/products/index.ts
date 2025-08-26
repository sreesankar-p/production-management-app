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

                const { registeredId, name, gstNumber } = req.body

                // Find if any company already has the same registeredId or gstNumber
                const existingCompanies = await Company.find({
                    $or: [{ registeredId }, { gstNumber }]
                })

                if (existingCompanies.length > 0) {
                    const errors: string[] = [];
                    for (const comp of existingCompanies) {
                        if (comp.registeredId === registeredId && comp.gstNumber === gstNumber) {
                            errors.push("Registered ID and GST Number are already exists");
                        } else if (comp.registeredId === registeredId && comp.gstNumber !== gstNumber) {
                            errors.push("Registered ID already exists");
                        } else if (comp.gstNumber === gstNumber && comp.registeredId !== registeredId) {
                            errors.push("GST Number already exists");
                        }
                    }
                    return res.status(400).json({ errors });
                }

                const company = await Company.create({
                    registeredId,
                    name,
                    gstNumber,
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
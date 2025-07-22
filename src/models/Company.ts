import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    offers: [{
        offerDate: {
            type: Date,
            required: true
        },
        offerNo: {
            type: String,
            required: true,
            unique: true
        },
        work: {
            type: String,
            required: true
        },
        paymentTerms: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        poDetails: {
            poNumber: {
                type: String,
                required: false
            },
            poDate: {
                type: Date,
                required: false
            },
            workPaymentTerm: {
                type: String,
                required: false
            },
            poAmount: {
                type: Number,
                required: false
            }
        },
        invoices: [{
            invoiceDate: {
                type: Date,
                required: true
            },
            percentage: {
                type: String,
                required: true
            },
            invoiceNumber: {
                type: String,
                required: true,
                unique: true
            },
            finalAmount: {
                type: Number,
                required: true
            }
        }],
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.models.Company || mongoose.model('Company', companySchema);
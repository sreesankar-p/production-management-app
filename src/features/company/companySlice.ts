import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Offer {
    _id: string;
    offerDate: string;
    offerNo: string;
    work: string;
    paymentTerms: string;
    amount: number;
    poDetails?: {
        poNumber: string;
        poDate: string;
        workPaymentTerm: string;
        poAmount: number;
    };
    invoices?: Array<{
        invoiceDate: string;
        percentage: string;
        invoiceNumber: string;
        finalAmount: number;
    }>;
    status: 'pending' | 'in-progress' | 'completed';
}

interface Company {
    _id: string;
    name: string;
    offers: Offer[];
    createdAt: string;
}

interface CompanyState {
    companies: Company[];
    currentCompany: Company | null;
    loading: boolean;
    error: string | null;
}

const initialState: CompanyState = {
    companies: [],
    currentCompany: null,
    loading: false,
    error: null
};

const companySlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        fetchCompaniesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCompaniesSuccess(state, action: PayloadAction<Company[]>) {
            state.companies = action.payload;
            state.loading = false;
        },
        fetchCompaniesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentCompany(state, action: PayloadAction<Company | null>) {
            state.currentCompany = action.payload;
        },
        addCompany(state, action: PayloadAction<Company>) {
            state.companies.push(action.payload);
        },
        updateCompany(state, action: PayloadAction<Company>) {
            const index = state.companies.findIndex(
                company => company._id === action.payload._id
            );
            if (index !== -1) {
                state.companies[index] = action.payload;
            }
        },
        removeCompany(state, action: PayloadAction<string>) {
            state.companies = state.companies.filter(
                company => company._id !== action.payload
            );
        },
        addOfferToCompany(state, action: PayloadAction<{ companyId: string; offer: Offer }>) {
            const company = state.companies.find(c => c._id === action.payload.companyId);
            if (company) {
                company.offers.push(action.payload.offer);
            }
        },
        updateOfferInCompany(state, action: PayloadAction<{ companyId: string; offer: Offer }>) {
            const company = state.companies.find(c => c._id === action.payload.companyId);
            if (company) {
                const offerIndex = company.offers.findIndex(o => o._id === action.payload.offer._id);
                if (offerIndex !== -1) {
                    company.offers[offerIndex] = action.payload.offer;
                }
            }
        },
        addInvoiceToOffer(state, action: PayloadAction<{
            companyId: string;
            offerId: string;
            invoice: {
                invoiceDate: string;
                percentage: string;
                invoiceNumber: string;
                finalAmount: number;
            }
        }>) {
            const company = state.companies.find(c => c._id === action.payload.companyId);
            if (company) {
                const offer = company.offers.find(o => o._id === action.payload.offerId);
                if (offer) {
                    if (!offer.invoices) {
                        offer.invoices = [];
                    }
                    offer.invoices.push(action.payload.invoice);
                }
            }
        }
    }
});

export const {
    fetchCompaniesStart,
    fetchCompaniesSuccess,
    fetchCompaniesFailure,
    setCurrentCompany,
    addCompany,
    updateCompany,
    removeCompany,
    addOfferToCompany,
    updateOfferInCompany,
    addInvoiceToOffer
} = companySlice.actions;

export default companySlice.reducer;
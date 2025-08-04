import { AppDispatch } from '@/lib/store';

import {
    fetchCompaniesStart,
    fetchCompaniesSuccess,
    fetchCompaniesFailure,
    addCompany,
    updateCompany,
    removeCompany,
    addOfferToCompany,
    updateOfferInCompany,
    addInvoiceToOffer,
    setCurrentCompany
} from './companySlice';
import Swal from 'sweetalert2';


export const fetchCompanies = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchCompaniesStart());
        const response = await fetch('/api/companies');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch companies');
        }

        dispatch(fetchCompaniesSuccess(data));
    } catch (error) {
        dispatch(fetchCompaniesFailure(error instanceof Error ? error.message : 'Failed to fetch companies'));
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to fetch companies'
        });
    }
}

export const createCompany = (name: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch('/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create company');
        }

        dispatch(addCompany(data));
        Swal.fire({
            icon: 'success',
            title: 'Company Created',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to create company'
        });
        throw error;
    }
};

export const createOffer = (
    companyId: string,
    offerData: {
        offerDate: string;
        offerNo: string;
        work: string;
        paymentTerms: string;
        amount: number;
    }
) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`/api/companies/${companyId}/offers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(offerData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create offer');
        }

        dispatch(addOfferToCompany({ companyId, offer: data }));
        Swal.fire({
            icon: 'success',
            title: 'Offer Created',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to create offer'
        });
        throw error;
    }
};




export const createInvoice = (
    companyId: string,
    offerId: string,
    invoiceData: {
        invoiceDate: string;
        percentage: string;
        invoiceNumber: string;
        finalAmount: number;
    }
) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(
            `/api/companies/${companyId}/offers/${offerId}/invoices`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create invoice');
        }

        dispatch(addInvoiceToOffer({
            companyId,
            offerId,
            invoice: data
        }));
        Swal.fire({
            icon: 'success',
            title: 'Invoice Created',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to create invoice'
        });
        throw error;
    }
};


export const loadCompanyDetails = (companyId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchCompaniesStart());
        const response = await fetch(`/api/companies/${companyId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch company details');
        }

        dispatch(setCurrentCompany(data));
    } catch (error) {
        dispatch(fetchCompaniesFailure(error instanceof Error ? error.message : 'Failed to fetch company details'));
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to fetch company details'
        });
    }
};

export const updateCompanyDetails = (
    companyId: string,
    updateData: { name: string }
) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`/api/companies/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update company');
        }

        dispatch(updateCompany(data));
        Swal.fire({
            icon: 'success',
            title: 'Company Updated',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to update company'
        });
        throw error;
    }
};


 export  const deleteCompany = (companyId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`/api/companies/${companyId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete company');
        }

        dispatch(removeCompany(companyId));
        Swal.fire({
            icon: 'success',
            title: 'Company Deleted',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to delete company'
        });
        throw error;
    }
};



export const updateOfferDetails = (
    companyId: string,
    offerId: string,
    updateData: {
        offerDate?: string;
        offerNo?: string;
        work?: string;
        paymentTerms?: string;
        amount?: number;
        status?: 'pending' | 'in-progress' | 'completed';
    }
) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(
            `/api/companies/${companyId}/offers/${offerId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update offer');
        }

        dispatch(updateOfferInCompany({
            companyId,
            offer: data
        }));
        Swal.fire({
            icon: 'success',
            title: 'Offer Updated',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error instanceof Error ? error.message : 'Failed to update offer'
        });
        throw error;
    }
};


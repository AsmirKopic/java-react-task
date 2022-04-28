import ISupplierData from './Supplier';

class CertificateData {

    id?: any | null;
    supplier?: ISupplierData;
    validFrom?: string;
    validTo?: string;
    type?: string;
    
}

export default CertificateData;
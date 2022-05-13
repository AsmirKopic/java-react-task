import Person from './Person';
import ISupplierData from './Supplier';

class CertificateData {

    id?: any | null;
    supplier?: string;
    validFrom?: string;
    validTo?: string;
    type?: string;
    persons?: Array<Person>;
    
}

export default CertificateData;
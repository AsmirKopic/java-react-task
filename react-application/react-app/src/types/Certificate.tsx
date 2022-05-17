import ICertComment from './Comment';
import Comment from './Comment';
import Person from './Person';
import ISupplierData from './Supplier';

class CertificateData {

    id?: any | null;
    supplier?: string;
    validFrom?: string;
    validTo?: string;
    type?: string;
    persons?: Array<Person>;
    comments?: Array<ICertComment>;
    data?: any | null;
    
}

export default CertificateData;
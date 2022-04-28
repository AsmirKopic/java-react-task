import axios from "axios";
import http from "../http-common";
import CertificateData from "../types/Certificate";

const getAll = () => {
    return http.get<Array<CertificateData>>("/certificates");
}

const get = (id: any) => {
    return http.get<CertificateData>(`/certificates/${id}`);
}

const create = (data: CertificateData) => {
    return http.post<CertificateData>("/certificates", data);
}

const CertificateService = {
    getAll,
    get,
    create
};

export default CertificateService;
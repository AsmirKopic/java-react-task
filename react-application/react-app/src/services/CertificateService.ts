import axios from "axios";
import http from "../http-common";
import CertificateData from "../types/Certificate";

const getAll = () => {
    return http.get<Array<CertificateData>>("/certificates");
};

const get = (id: any) => {
    return http.get<CertificateData>(`/certificates/${id}`);
};

const create = (data: CertificateData) => {
    return http.post<CertificateData>("/certificates", data);
};

const update = (id: any, data: CertificateData) => {
    return http.put<any>(`/certificates/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/certificates/${id}`);
};

const CertificateService = {
    getAll,
    get,
    create,
    remove,
    update
};

export default CertificateService;
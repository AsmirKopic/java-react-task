import axios from "axios";
import http from "../http-common";
import ISupplierData from "../types/Supplier";

const getAll = () => {
    return http.get<Array<ISupplierData>>("/suppliers");
}

const get = (id: any) => {
    return http.get<ISupplierData>(`/suppliers/${id}`);
}

const create = (data: ISupplierData) => {
    return http.post<ISupplierData>("/suppliers", data);
}

const SupplierService = {
    getAll,
    get,
    create
};

export default SupplierService;
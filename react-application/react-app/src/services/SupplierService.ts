import axios from "axios";
import http from "../http-common";
import ISupplierData from "../types/Supplier";

const getAll = () => {
    return http.get<Array<ISupplierData>>("/suppliers");
}

const get = (id: any) => {
    return http.get<ISupplierData>(`/suppliers/${id}`);
}

const SupplierService = {
    getAll,
    get
};

export default SupplierService;
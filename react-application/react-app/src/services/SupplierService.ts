import axios from "axios";
import http from "../http-common";
import ISupplierData from "../types/Supplier";

const getAll = () => {
    return http.get<Array<ISupplierData>>("/v1/suppliers");
}

const get = (id: any) => {
    return http.get<ISupplierData>(`/v1/suppliers/${id}`);
}

const create = (data: ISupplierData) => {
    return http.post<ISupplierData>("/v1/suppliers", data);
}

const findByName = (name: string) => {
    return http.get<Array<ISupplierData>>(`v1/search?name=${name}`);
};

const findByIndex = (index: string) => {
    return http.get<Array<ISupplierData>>(`v1/searchByIndex?index=${index}`);
};

const findByCity = (city: string) => {
    return http.get<Array<ISupplierData>>(`v1/searchByCity?city=${city}`);
};

const searchQuery = (name: string, city: string) => {
    return http.get<Array<ISupplierData>>(`v1/search?name=${name}&city=${city}`);
}


const SupplierService = {
    getAll,
    get,
    create,
    findByName,
    findByIndex,
    findByCity,
    searchQuery
};

export default SupplierService;
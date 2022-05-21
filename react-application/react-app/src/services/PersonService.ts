import axios from "axios";
import http from "../http-common";
import Person from "../types/Person";

const getAll = () => {
    return http.get<Array<Person>>("/persons");
};

const get = (id: any) => {
    return http.get<Person>(`/persons/${id}`)
};

const searchPersons = (name: string, firstName: string, userId: string, department: string, plant: string) => {
    return http.get<Person>(`/searchPersons?name=${name}&firstName=${firstName}&userId=${userId}&department=${department}&plant=${plant}`)
}

const PersonService = {
    getAll,
    get,
    searchPersons
};

export default PersonService;
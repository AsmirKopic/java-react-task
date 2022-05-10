import axios from "axios";
import http from "../http-common";
import Person from "../types/Person";

const getAll = () => {
    return http.get<Array<Person>>("/persons");
};

const get = (id: any) => {
    return http.get<Person>(`/persons/${id}`)
}

const PersonService = {
    getAll,
    get
};

export default PersonService;
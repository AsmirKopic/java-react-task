import axios from "axios";
import http from "../http-common";
import User from "../types/User";

const getAll = () => {
    return http.get<Array<User>>("/users");
};

const UserService = {
    getAll
};

export default UserService;
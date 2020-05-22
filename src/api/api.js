import axios from "axios";

export const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

export const dataApi = {
    getUsers() {
        return instance.get("users")
            .then(response => response.data)
    },
    getPosts() {
        return instance.get("posts")
            .then(response => response.data)
    }
};

import axios from "axios";

export function PostBook(Book : any): Promise<any> {
    return axios.post("https://localhost:5001/api/Book", Book);
}
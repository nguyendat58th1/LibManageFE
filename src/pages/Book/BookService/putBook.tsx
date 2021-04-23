import axios from "axios";

export function PutBook(id : any, Book: any): Promise<any> {
    return axios.put(`https://localhost:5001/api/Book/${id}`, Book);
}
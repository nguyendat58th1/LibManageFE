
import axios from "axios";


export function GetListBook(): Promise<any> {
        return axios.get("https://localhost:5001/api/Book")
}

export function GetListBookAdmin(): Promise<any> {
        return axios.get("https://localhost:5001/api/Book/Admin")
}
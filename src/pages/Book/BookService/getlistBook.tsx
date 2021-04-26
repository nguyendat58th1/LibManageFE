
import axios from "axios";


export function GetListBook(): Promise<any> {
        return axios.get("https://localhost:5001/api/Book" ,  {withCredentials: true})
}

export function GetListBookAdmin(): Promise<any> {
        return axios.get("https://localhost:5001/api/Book/Admin",  {withCredentials: true})
}
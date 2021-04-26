
import axios from "axios";


export function GetListRequest(): Promise<any> {
        return axios.get("https://localhost:5001/api/BookBorrowingRequest",  {withCredentials: true})
}

export function GetListRequestForAdmin(): Promise<any> {
        return axios.get("https://localhost:5001/api/BookBorrowingRequest/Admin",  {withCredentials: true})
}

export function GetListRequestDetail(): Promise<any> {
        return axios.get("https://localhost:5001/api/BBRD",  {withCredentials: true})
}


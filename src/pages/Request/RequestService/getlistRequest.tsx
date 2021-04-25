
import axios from "axios";


export function GetListRequest(): Promise<any> {
        return axios.get("https://localhost:5001/api/BookBorrowingRequest")
}

export function GetListRequestForAdmin(): Promise<any> {
        return axios.get("https://localhost:5001/api/BookBorrowingRequest/Admin")
}

export function GetListRequestDetail(): Promise<any> {
        return axios.get("https://localhost:5001/api/BBRD")
}


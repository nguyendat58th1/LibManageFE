
import axios from "axios";


export function GetBookById(id : number): Promise<any> {
        return axios.get(`https://localhost:5001/api/Book/${id}`);
}
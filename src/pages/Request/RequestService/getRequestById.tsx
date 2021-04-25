
import axios from "axios";


export function GetRequestById(id : number): Promise<any> {
        return axios.get(`https://localhost:5001/api/Request/${id}`);
}
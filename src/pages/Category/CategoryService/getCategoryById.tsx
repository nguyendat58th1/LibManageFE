
import axios from "axios";


export function GetCategoryById(id : number): Promise<any> {
        return axios.get(`https://localhost:5001/api/Category/${id}`);
}
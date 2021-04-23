
import axios from "axios";


export function GetListCategory(): Promise<any> {
        return axios.get("https://localhost:5001/api/Category")
}


import axios from "axios";

export function PostRequest(request : any,): Promise<any> {
    return axios.post("https://localhost:5001/api/Request", request);
}
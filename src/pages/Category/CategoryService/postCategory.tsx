import axios from "axios";

export function PostCategory(Category : any): Promise<any> {
    return axios.post("https://localhost:5001/api/Category", Category);
}
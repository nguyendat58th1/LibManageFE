import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useHistory } from "react-router-dom";

export enum StatusCode {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403
}

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;
    baseUrl = 'localhost:5000';

    public constructor() {
        this.instance = axios.create({ baseURL: this.baseUrl });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: any) => {
        if (error.code === StatusCode.UNAUTHORIZED) {

        }
    };
}

// class CategoryService extends HttpClient {
//     baseUrl = this.baseUrl + '/category';

//     public get() {
//         this.instance.get(this.baseUrl)
//     }
// }

// let categorySevice = new CategoryService();


// categorySevice.get()

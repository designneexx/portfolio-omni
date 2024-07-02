import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface UserResponse {
    email: string;
    id: string;
}

export interface UserApi {
    getUser(config?: AxiosRequestConfig): Promise<AxiosResponse<UserResponse>>;
}

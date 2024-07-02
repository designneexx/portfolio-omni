import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserResponse } from '../user/types';

export interface AuthLoginRequest {
    email: string;
    password: string;
}

export interface AuthSignupRequest {
    email: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthLoginResponse {
    tokens: Tokens;
    user: UserResponse;
}

export interface MFConfig {
    feCreator: {
        module: string;
        scope: string;
        url: string;
    };
    fePortfolio: {
        module: string;
        scope: string;
        url: string;
    };
}

export interface AuthApi {
    getFEConfig(config?: AxiosRequestConfig): Promise<AxiosResponse<MFConfig>>;
    login(
        data: AuthLoginRequest,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<AuthLoginResponse>>;
    register(data: AuthSignupRequest, config?: AxiosRequestConfig): Promise<AxiosResponse<unknown>>;
}

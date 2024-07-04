import { makeAutoObservable } from 'mobx';
import { MFConfig, Tokens } from 'src/api/auth/types';
import { UserResponse } from 'src/api/user/types';
import { LocalStorageKeys } from 'src/types/common';

export class UserStore {
    accessToken: null | string = null;
    refreshToken: null | string = null;
    user: null | UserResponse = null;
    feConfig: MFConfig | null = null;

    constructor() {
        makeAutoObservable(this);

        const accessToken = window.localStorage.getItem(LocalStorageKeys.AccessToken);
        const refreshToken = window.localStorage.getItem(LocalStorageKeys.RefereshToken);

        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    setFeConfig = (value: MFConfig | null) => {
        this.feConfig = value;
    };

    setUser = (user: null | UserResponse) => {
        this.user = user;
    };

    setToken = (accessToken: null | string, refreshToken: null | string) => {
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
    };

    setAccessToken = (value: null | string) => {
        this.accessToken = value;

        if (value) {
            window.localStorage.setItem(LocalStorageKeys.AccessToken, value);
        } else {
            window.localStorage.removeItem(LocalStorageKeys.AccessToken);
        }
    };

    setRefreshToken = (value: null | string) => {
        this.refreshToken = value;

        if (value) {
            window.localStorage.setItem(LocalStorageKeys.RefereshToken, value);
        } else {
            window.localStorage.removeItem(LocalStorageKeys.RefereshToken);
        }
    };

    setUserTokens = (user: null | UserResponse, tokens: Tokens) => {
        this.user = user;
        this.setAccessToken(tokens.accessToken);
        this.setRefreshToken(tokens.refreshToken);
    };

    clear = () => {
        this.setUser(null);
        this.setAccessToken(null);
        this.setRefreshToken(null);
    };
}

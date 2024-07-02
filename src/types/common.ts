export interface MicroService {
    module: string;
    scope: string;
    url: string;
}

export enum RoutePath {
    Home = '/',
    Login = '/login',
    Signup = '/signup',
    UserResume = '/resume/:resumeId/*'
}

export enum LocalStorageKeys {
    AccessToken = 'ACCESS_TOKEN',
    RefereshToken = 'REFRESH_TOKEN'
}

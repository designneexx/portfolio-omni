import type { AxiosInstance } from 'axios';

import { AuthApi } from './types';

export const createAuthApi = (api: AxiosInstance): AuthApi => ({
    getFEConfig: (config) => api.get('/auth/fe-config', config),
    login: (data, config) => api.post('/auth/signin', data, config),
    logout: (config) => api.post('/auth/logout', config),
    register: (data, config) => api.post('/auth/signup', data, config)
});

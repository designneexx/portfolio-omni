import type { AxiosInstance } from 'axios';

import { UserApi } from './types';

export const createUserApi = (api: AxiosInstance): UserApi => ({
    getUser: (config) => api.get('/users/user', config)
});

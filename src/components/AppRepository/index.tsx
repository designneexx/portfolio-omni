import { type AxiosInstance } from 'axios';
import { observer } from 'mobx-react-lite';
import { createContext, PropsWithChildren, useMemo } from 'react';
import { createAuthApi } from 'src/api/auth';
import { createUserApi } from 'src/api/user';
import { useConst } from 'src/hooks/useConst';
import { AuthService } from 'src/services/authService';
import { NotificationService } from 'src/services/notificationService';
import { UserService } from 'src/services/userService';
import { UserStore } from 'src/store/userStore';
import { EventEmitter } from 'src/utils/EventEmitter';
import { AppRepository } from './types';

export const AppRepositoryContext = createContext<AppRepository | null>(null);

interface AppRepositoryProviderProps {
    eventEmitter: EventEmitter;
    instance: AxiosInstance;
}

function AppRepositoryProviderComponent({
    children,
    eventEmitter,
    instance
}: PropsWithChildren<AppRepositoryProviderProps>) {
    const userStore = useConst(() => new UserStore());
    const authApi = useConst(() => createAuthApi(instance));
    const userApi = useConst(() => createUserApi(instance));
    const notificationService = useConst(() => new NotificationService(eventEmitter));
    const authService = useConst(() => new AuthService(userStore, authApi, notificationService));
    const userService = useConst(() => new UserService(userStore, userApi, notificationService));
    const appRepository = useMemo(
        () => ({
            services: { authService, notificationService, userService },
            stores: { userStore }
        }),
        [authService, userStore, notificationService, userService]
    );

    return (
        <AppRepositoryContext.Provider value={appRepository}>
            {children}
        </AppRepositoryContext.Provider>
    );
}

export const AppRepositoryProvider = observer(AppRepositoryProviderComponent);

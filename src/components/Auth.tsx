import { type AxiosInstance } from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useAppServices } from 'src/hooks/useAppServices';
import { useAppStores } from 'src/hooks/useAppStores';

interface AuthComponentProps {
    instance: AxiosInstance;
}

function AuthComponent({ instance }: AuthComponentProps) {
    const { userStore } = useAppStores();
    const { userService } = useAppServices();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (!accessToken || !refreshToken) return;

        userStore.setToken(accessToken, refreshToken);
    }, [searchParams, userStore]);

    useEffect(() => {
        if (!userStore.accessToken) return;

        instance.defaults.headers.common = {
            Authorization: `Bearer ${userStore.accessToken}`
        };

        userService.getUser();
    }, [userStore.accessToken, instance, userService]);

    return <Outlet />;
}

export const Auth = observer(AuthComponent);

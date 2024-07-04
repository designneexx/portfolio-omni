import { type AxiosInstance } from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppServices } from 'src/hooks/useAppServices';
import { NewPortfolioPage } from 'src/pages/NewPortfolioPage';
import { PortfolioPage } from 'src/pages/PortfolioPage';
import { SignupPage } from 'src/pages/SignupPage';
import { RoutePath } from 'src/types/common';
import { AuthPage } from '../pages/LoginPage';
import { Auth } from './Auth';
import { MainLayout } from './MainLayout';

interface AppRouterComponentProps {
    instance: AxiosInstance;
}

function AppRouterComponent({ instance }: AppRouterComponentProps) {
    const { authService } = useAppServices();

    const router = createBrowserRouter([
        {
            children: [
                {
                    element: <AuthPage />,
                    path: RoutePath.Login
                },
                {
                    element: <SignupPage />,
                    path: RoutePath.Signup
                },
                {
                    children: [
                        {
                            element: <NewPortfolioPage />,
                            path: RoutePath.Home
                        }
                    ],
                    element: <Auth instance={instance} />,
                    path: RoutePath.Home
                }
            ],
            element: <MainLayout />,
            path: ''
        },
        {
            element: <PortfolioPage />,
            path: RoutePath.UserResume
        }
    ]);

    useEffect(() => {
        authService.getFeConfig();
    }, [authService]);

    return <RouterProvider router={router} />;
}

export const AppRouter = observer(AppRouterComponent);

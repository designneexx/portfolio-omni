import { ChakraProvider } from '@chakra-ui/react';
import axios, { type CreateAxiosDefaults } from 'axios';
import { AppRepositoryProvider } from './components/AppRepository';
import { AppRouter } from './components/AppRouter';
import { Notification } from './components/Notification';
import { appTheme } from './consts/appTheme';
import { useConst } from './hooks/useConst';
import { EventEmitter } from './utils/EventEmitter';

const createAxiosInstance = (config?: CreateAxiosDefaults) =>
    axios.create({
        baseURL: process.env.BASE_API_URL,
        ...config
    });

export function App() {
    const eventEmitter = useConst(() => new EventEmitter());
    const instance = useConst(() => createAxiosInstance());

    return (
        <AppRepositoryProvider eventEmitter={eventEmitter} instance={instance}>
            <ChakraProvider theme={appTheme}>
                <Notification>
                    <AppRouter instance={instance} />
                </Notification>
            </ChakraProvider>
        </AppRepositoryProvider>
    );
}

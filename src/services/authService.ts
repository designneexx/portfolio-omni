import { AxiosError } from 'axios';
import { AuthApi, AuthLoginRequest, AuthSignupRequest } from 'src/api/auth/types';
import { UserStore } from 'src/store/userStore';
import { NotificationService } from './notificationService';

export class AuthService {
    constructor(
        private readonly userStore: UserStore,
        private readonly api: AuthApi,
        private readonly notificationService: NotificationService
    ) {}

    async logout() {
        try {
            await this.api.logout();

            this.userStore.clear();

            return true;
        } catch (err) {
            const error = err as Error;

            this.notificationService.notifyAnError(
                { title: 'Не удалось выйти из приложения' },
                error
            );

            return false;
        }
    }

    async getFeConfig() {
        try {
            const { data } = await this.api.getFEConfig();

            this.userStore.setFeConfig(data);
        } catch (err) {
            const error = err as Error;

            this.notificationService.notifyAnError(
                { title: 'Не удалось получить конфигурацию приложения' },
                error
            );
        }
    }

    async login(data: AuthLoginRequest) {
        try {
            const {
                data: { tokens, user }
            } = await this.api.login(data);

            this.userStore.setUserTokens(user, tokens);

            return true;
        } catch (err) {
            const error = err as Error;

            if (err instanceof AxiosError) {
                const { response } = err;
                const message = response?.data?.message;

                this.notificationService.notifyAnError({
                    title: message || 'Неизвестная ошибка'
                });
            } else {
                this.notificationService.notifyAnError({
                    title: error?.message || 'Неизвестная ошибка'
                });
            }

            return false;
        }
    }

    async register(data: AuthSignupRequest) {
        try {
            await this.api.register(data);

            this.notificationService.notifyAnSuccess({
                title: 'Для завершение регистрация подтвердите вашу почту. Возможно письмо будет в категории "Cпам"'
            });

            return true;
        } catch (err) {
            const error = err as Error;

            if (err instanceof AxiosError) {
                const { response } = err;
                const message = response?.data?.message;

                this.notificationService.notifyAnError({
                    title: message || 'Неизвестная ошибка'
                });
            } else {
                this.notificationService.notifyAnError({
                    title: error?.message || 'Неизвестная ошибка'
                });
            }

            return false;
        }
    }
}

import { UserApi } from 'src/api/user/types';
import { UserStore } from 'src/store/userStore';
import { NotificationService } from './notificationService';

export class UserService {
    constructor(
        private readonly userStore: UserStore,
        private readonly api: UserApi,
        private readonly notificationService: NotificationService
    ) {}

    async getUser() {
        try {
            const { data: user } = await this.api.getUser();

            this.userStore.setUser(user);
        } catch (err) {
            const error = err as Error;

            this.notificationService.notifyAnError(
                { title: error.message || 'Неизвестная ошибка' },
                error
            );
        }
    }
}

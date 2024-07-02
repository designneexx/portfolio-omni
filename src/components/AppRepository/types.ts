import { AuthService } from 'src/services/authService';
import { NotificationService } from 'src/services/notificationService';
import { UserService } from 'src/services/userService';
import { UserStore } from 'src/store/userStore';

export interface AppStores {
    userStore: UserStore;
}

export interface AppServices {
    authService: AuthService;
    notificationService: NotificationService;
    userService: UserService;
}

export interface AppRepository {
    services: AppServices;
    stores: AppStores;
}

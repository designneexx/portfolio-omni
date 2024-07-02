import { observer } from 'mobx-react-lite';
import { LazyService } from 'src/components/LazyService';
import { useAppServices } from 'src/hooks/useAppServices';
import { useAppStores } from 'src/hooks/useAppStores';

function NewPortfolioPageComponent() {
    const { userStore } = useAppStores();
    const { notificationService } = useAppServices();
    const { feConfig } = userStore;

    if (!feConfig) return null;

    return (
        <LazyService
            data={{
                notificationService,
                userStore
            }}
            microservice={{
                module: feConfig.feCreator.module,
                scope: feConfig.feCreator.scope,
                url: feConfig.feCreator.url
            }}
        />
    );
}

export const NewPortfolioPage = observer(NewPortfolioPageComponent);

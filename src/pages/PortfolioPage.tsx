import { observer } from 'mobx-react-lite';
import { LazyService } from 'src/components/LazyService';
import { useAppServices } from 'src/hooks/useAppServices';
import { useAppStores } from 'src/hooks/useAppStores';

function PortfolioPageComponent() {
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
                module: feConfig.fePortfolio.module,
                scope: feConfig.fePortfolio.scope,
                url: feConfig.fePortfolio.url
            }}
        />
    );
}

export const PortfolioPage = observer(PortfolioPageComponent);

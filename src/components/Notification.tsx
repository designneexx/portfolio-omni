import { useToast } from '@chakra-ui/react';
import { PropsWithChildren, useEffect } from 'react';
import { useAppServices } from 'src/hooks/useAppServices';

export function Notification({ children }: PropsWithChildren<unknown>) {
    const toast = useToast();
    const { notificationService } = useAppServices();

    useEffect(() => {
        const off = notificationService.onError((options) => {
            toast({
                duration: 5000,
                isClosable: true,
                status: 'error',
                ...options
            });
        });

        return () => {
            off();
        };
    }, [notificationService, toast]);

    useEffect(() => {
        const off = notificationService.onSuccess((options) => {
            console.log({ options });
            toast({
                duration: 5000,
                isClosable: true,
                status: 'success',
                ...options
            });
        });

        return () => {
            off();
        };
    }, [notificationService, toast]);

    return children;
}

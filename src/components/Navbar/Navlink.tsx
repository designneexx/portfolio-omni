import { Box, LinkProps, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export function NavLink(props: PropsWithChildren<LinkProps>) {
    const { children } = props;

    return (
        <Box
            _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
                textDecoration: 'none'
            }}
            as='a'
            px={2}
            py={1}
            rounded={'md'}
            {...props}
        >
            {children}
        </Box>
    );
}

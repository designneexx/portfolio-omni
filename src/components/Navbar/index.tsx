import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Img,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'src/assets/images/photo_2024-06-28_08-58-22.jpg';
import { useAppServices } from 'src/hooks/useAppServices';
import { useAppStores } from 'src/hooks/useAppStores';
import { RoutePath } from 'src/types/common';

function NavbarComponent() {
    const { userStore } = useAppStores();
    const { authService } = useAppServices();
    const navigate = useNavigate();
    const { user } = userStore;

    const onLogin = () => {
        navigate(RoutePath.Login);
    };

    const onSignup = () => {
        navigate(RoutePath.Signup);
    };

    const onLogout = async () => {
        const isSuccess = await authService.logout();

        if (isSuccess) {
            navigate('/login');
        }
    };

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex alignItems={'center'} h={16} justifyContent={'space-between'}>
                <HStack alignItems={'center'} as={Link} spacing={8} to={RoutePath.Home}>
                    <Flex alignItems='center' as='span' gap={1}>
                        <Img height={50} src={logo} width={50} />
                        <Text as='strong' size='lg'>
                            designexx
                        </Text>
                    </Flex>
                </HStack>
                <Flex alignItems={'center'}>
                    {user ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                cursor={'pointer'}
                                minW={0}
                                rounded={'full'}
                                textDecoration='none'
                                variant='button'
                            >
                                <Flex alignItems='center' as='span' gap={3}>
                                    <Text display={{ base: 'none', md: 'block' }}>
                                        {user.email}
                                    </Text>
                                    <Avatar name={user.email} size={'sm'} />
                                </Flex>
                            </MenuButton>
                            <MenuList zIndex={999}>
                                <MenuItem onClick={onLogout}>Выход</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Flex gap={2}>
                            <Button onClick={onLogin}>Вход</Button>
                            <Button onClick={onSignup}>Регистрация</Button>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

export const Navbar = observer(NavbarComponent);

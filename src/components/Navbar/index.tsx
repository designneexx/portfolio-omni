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
import { useAppStores } from 'src/hooks/useAppStores';
import { RoutePath } from 'src/types/common';

function NavbarComponent() {
    const { userStore } = useAppStores();
    const navigate = useNavigate();
    const { clear, user } = userStore;

    const onLogin = () => {
        navigate(RoutePath.Login);
    };

    const onSignup = () => {
        navigate(RoutePath.Signup);
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
                <Link to='/resume/668350228f66a6a0766d520f'>sss</Link>
                <Flex alignItems={'center'}>
                    {user ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                cursor={'pointer'}
                                minW={0}
                                rounded={'full'}
                                textDecoration='none'
                                variant={'link'}
                            >
                                <Flex alignItems='center' as='span' gap={3}>
                                    <Text as='strong'>{user.email}</Text>
                                    <Avatar name={user.email} size={'sm'} />
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={clear}>Выход</MenuItem>
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

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from 'src/components/form/PasswordField';
import { useAppServices } from 'src/hooks/useAppServices';
import { useConst } from 'src/hooks/useConst';
import { RoutePath } from 'src/types/common';
import { schema } from './consts';
import { EForm, IForm } from './types';

export function AuthPage() {
    const defaultValues = useConst(() => ({
        [EForm.Email]: '',
        [EForm.Password]: ''
    }));
    const navigate = useNavigate();
    const {
        control,
        formState: { errors, isSubmitting, isValid },
        handleSubmit,
        register
    } = useForm<IForm>({
        defaultValues,
        resolver: zodResolver(schema)
    });
    const { authService } = useAppServices();

    const onSubmit = async (data: IForm) => {
        const isSuccess = await authService.login(data);

        if (isSuccess) {
            navigate(RoutePath.Home);
        }
    };

    return (
        <Flex align={'center'} bg={useColorModeValue('gray.50', 'gray.800')} justify={'center'}>
            <Stack maxW={'lg'} maxWidth='450px' mx={'auto'} px={6} py={12} spacing={8} width='100%'>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Вход
                    </Heading>
                </Stack>
                <Box
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    rounded={'lg'}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl
                                id='email'
                                isInvalid={Boolean(errors[EForm.Email]?.message)}
                                isRequired
                            >
                                <FormLabel>Email</FormLabel>
                                <Input {...register(EForm.Email)} type='text' />
                                {errors[EForm.Email]?.message ? (
                                    <FormErrorMessage>
                                        {errors[EForm.Email].message}
                                    </FormErrorMessage>
                                ) : (
                                    <FormHelperText>Ваш актуальный email адрес</FormHelperText>
                                )}
                            </FormControl>
                            <PasswordField
                                control={control}
                                errorMessage={errors[EForm.Password]?.message}
                                isInvalid={Boolean(errors[EForm.Password]?.message)}
                                name={EForm.Password}
                            />
                            <Stack pt={2} spacing={10}>
                                <Button
                                    _hover={{
                                        bg: 'blue.500'
                                    }}
                                    bg={'blue.400'}
                                    color={'white'}
                                    disabled={!isValid || isSubmitting}
                                    isDisabled={!isValid || isSubmitting}
                                    isLoading={isSubmitting}
                                    loadingText=''
                                    size='lg'
                                    type='submit'
                                >
                                    Войти
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}

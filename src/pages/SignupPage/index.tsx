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
import { useAppServices } from 'src/hooks/useAppServices';
import { useConst } from 'src/hooks/useConst';
import { RoutePath } from 'src/types/common';
import { schema } from './consts';
import { EForm, IForm } from './types';

export function SignupPage() {
    const defaultValues = useConst(() => ({
        [EForm.Email]: ''
    }));
    const navigate = useNavigate();
    const {
        formState: { errors, isSubmitting, isValid },
        handleSubmit,
        register
    } = useForm<IForm>({
        defaultValues,
        resolver: zodResolver(schema)
    });
    const { authService } = useAppServices();

    const onSubmit = async (data: IForm) => {
        const isSuccess = await authService.register(data);

        if (isSuccess) {
            navigate(RoutePath.Login);
        }
    };

    return (
        <Flex align={'center'} bg={useColorModeValue('gray.50', 'gray.800')} justify={'center'}>
            <Stack maxW={'lg'} maxWidth='450px' mx={'auto'} px={6} py={12} spacing={8} width='100%'>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Регистрация
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
                                id={EForm.Email}
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
                                    Создать аккаунт
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}

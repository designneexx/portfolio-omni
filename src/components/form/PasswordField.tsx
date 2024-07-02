import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

type PasswordFieldProps<V extends FieldValues> = {
    errorMessage?: null | string;
    helperText?: string;
} & FormControlProps &
    Omit<ControllerProps<V>, 'render'>;

export function PasswordField<V extends FieldValues>({
    control,
    defaultValue,
    disabled,
    errorMessage,
    helperText,
    isInvalid,
    name,
    rules,
    shouldUnregister,
    ...props
}: PasswordFieldProps<V>) {
    const [showPassword, setShowPassword] = useState(false);

    const onShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    return (
        <Controller
            control={control}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            render={({ field }) => {
                console.log({ field });
                return (
                    <FormControl isInvalid={isInvalid} {...props}>
                        <FormLabel>Пароль</FormLabel>
                        <InputGroup>
                            <Input {...field} type={showPassword ? 'text' : 'password'} />
                            <InputRightElement h={'full'}>
                                <Button onClick={onShowPassword} variant={'ghost'}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {isInvalid && errorMessage ? (
                            <FormErrorMessage>{errorMessage}</FormErrorMessage>
                        ) : (
                            <FormHelperText>{helperText}</FormHelperText>
                        )}
                    </FormControl>
                );
            }}
            rules={rules}
            shouldUnregister={shouldUnregister}
        />
    );
}

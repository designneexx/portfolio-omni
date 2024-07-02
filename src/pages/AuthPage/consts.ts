import { z } from 'zod';

export const schema = z.object({
    email: z.string({ message: 'Не может быть пустым' }).email('Невалидный адрес email'),
    password: z
        .string({ message: 'Не может быть пустым' })
        .min(3, 'Не менее 3 символов')
        .max(64, ' Не более 64 символов')
});

import { z } from 'zod';

export const schema = z.object({
    email: z.string({ message: 'Не может быть пустым' }).email('Невалидный адрес email')
});

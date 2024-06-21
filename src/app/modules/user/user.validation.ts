import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
  phone: z.string().nonempty('Phone is required'),
  role: z.enum(['admin', 'user']).optional(), // Optional if it's not always required
  address: z.string().nonempty('Address is required'),
});

export default userValidationSchema;

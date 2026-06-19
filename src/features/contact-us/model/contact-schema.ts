import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').min(5, 'Name must be at least 5 characters'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  message: z
    .string()
    .trim()
    .min(1, 'Comment is required')
    .min(10, 'Comment must be at least 10 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

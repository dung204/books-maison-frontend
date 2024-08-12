import { z } from 'zod';

import { registerSchema } from '@/lib/validators/register.validator';

export const updateProfileSchema = registerSchema.omit({
  password: true,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

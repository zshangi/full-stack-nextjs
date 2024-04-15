import { z } from 'zod';

export const createIssueShcema = z.object({
    title: z.string().min(1, 'Ttile is Requierd').max(255),
    description: z.string().min(1, 'Description is Requierd')
});

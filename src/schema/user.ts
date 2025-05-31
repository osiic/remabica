import { z } from "zod";

// ✅ Schema untuk validasi form user
export const createUserSchema = z.object({
  username: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

// ✅ Schema untuk validasi update
export const updateUserSchema = createUserSchema.partial();

// ✅ Type inference
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

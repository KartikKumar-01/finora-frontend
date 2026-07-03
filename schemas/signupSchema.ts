import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(3, "Please enter atleast 3 characters."),
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default signupSchema;
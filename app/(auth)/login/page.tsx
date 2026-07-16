"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import LoginSchema from '@/schemas/loginSchema'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../_components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../../_components/ui/field'
import { Input } from '../../_components/ui/input'
import { Button } from '../../_components/ui/button'
import GradientText from "../../_components/GradientText";
import { Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const LoginPage = () => {

    const router = useRouter();
    const loginWithOAuth = authStore((s) => s.loginWithOAuth)
    const login = authStore((s) => s.login);

    const LoginForm = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        // Do something with the form values.
        try{
            await login(data);
            router.replace('/dashboard');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div className='w-full flex items-center justify-center'>
                <Card className="w-full h-3/4 sm:max-w-md bg-white/5 backdrop-blur-xl">
                    <CardHeader>
                        <div className="m-5 flex flex-col gap-1 items-center justify-center">
                            <h1 className="text-[#FF9FFC] text-4xl font-bold">
                                {/* <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="custom-class text-5xl tracking-wider p-2"
                    > */}
                                Welcome to Finora!
                                {/* </GradientText> */}
                            </h1>
                            <p className="text-zinc-300">Please enter your credentials to continue.</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form id="login-form" onSubmit={LoginForm.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <FieldGroup>
                                <Controller
                                    name="email"
                                    control={LoginForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="login-form-email">
                                                Email Address
                                            </FieldLabel>
                                            <div className="relative">

                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    {...field}
                                                    id="login-form-email"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your email address"
                                                    autoComplete="username"
                                                    className="pl-10"
                                                />
                                            </div>
                                            {fieldState.invalid && (
                                                <FieldError className="text-red-700" errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup>
                                <Controller
                                    name="password"
                                    control={LoginForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="login-form-password">
                                                Password
                                            </FieldLabel>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    {...field}
                                                    id="login-form-password"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your password"
                                                    autoComplete="username"
                                                    className="pl-10"
                                                />
                                            </div>
                                            {fieldState.invalid && (
                                                <FieldError className="text-red-700" errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter className="w-full flex flex-col gap-2">
                        <div className="w-full">
                            <Field orientation="horizontal">
                                {/* <Button type="button" variant="outline" onClick={() => LoginForm.reset()}>
                                Reset
                            </Button> */}
                                <Button type="submit" form="login-form" className="w-full font-semibold bg-violet-600 h-10">
                                    Login
                                </Button>
                            </Field>
                        </div>
                        <div className="w-full flex items-center justify-center my-3">
                            <div className="flex w-full items-center gap-3 text-sm text-zinc-400">
                                <div className="h-px flex-1 bg-zinc-700" />
                                <span className="whitespace-nowrap">Or continue with</span>
                                <div className="h-px flex-1 bg-zinc-700" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Button onClick={() => loginWithOAuth("GOOGLE")} variant="outline" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-zinc-500">
                                <FcGoogle className="h-7 w-7" />
                            </Button>
                            <Button onClick={() => loginWithOAuth("GITHUB")} variant="outline" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-zinc-500">
                                <FaGithub className="h-7 w-7" />
                            </Button>

                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default LoginPage
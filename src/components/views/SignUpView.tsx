"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        name: z.string().min(1, { message: "Name is Required" }),
        email: z.string().email(),
        password: z.string().min(1, { message: "Password is Required" }),
        confirmPassword: z.string().min(1, {
            message: "Confirm Password is Required",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords doesn't match",
        path: ["confirmPassword"],
    });

export const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    /**
     * Handles form submission for signing up a user.
     *
     * @param data - The form data containing user's name, email and password.
     *
     * Resets any previous error state and sets the pending state to true while
     * attempting to sign up the user using the provided email and password.
     * On successful sign-up, it redirects the user to the home page.
     * If an error occurs during sign-up, it sets the error message state.
     */
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    router.push("/");
                    setPending(false);
                },
                onError: ({ error }) => {
                    setError(error.message);
                },
            }
        );
    };

    /**
     * Handles social sign in (e.g. GitHub, Google)
     *
     * @param provider The provider to sign in with
     */
    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setPending(true);

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    setPending(false);
                },
                onError: ({ error }) => {
                    setError(error.message);
                },
            }
        );
    };

   return (
    <div className=" bg-gradient-to-br min-h-screen from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800  overflow-hidden">
                <CardContent className="grid p-0 grid-cols-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 ">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-3xl font-bold text-white mb-2">Let&apos;s get started</h1>
                                    <p className="text-gray-400 text-balance">
                                        Create your account
                                    </p>
                                </div>
                                
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="John Doe"
                                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                {!!error && (
                                    <Alert className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                                        <OctagonAlertIcon className="h-4 w-4 text-red-400" />
                                        <AlertTitle className="text-red-400">{error}</AlertTitle>
                                    </Alert>
                                )}
                                
                                <Button 
                                    disabled={pending} 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    {pending ? "Signing Up..." : "Sign Up"}
                                </Button>
                                
                                <div className="relative text-center text-sm">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-700"></div>
                                    </div>
                                    <span className="bg-gray-900 text-gray-400 px-4 relative">
                                        Or continue with
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        disabled={pending}
                                        onClick={() => onSocial("google")}
                                        variant="outline"
                                        type="button"
                                        className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
                                    >
                                        <FaGoogle className="mr-2" />
                                        Google
                                    </Button>
                                    <Button
                                        disabled={pending}
                                        onClick={() => onSocial("github")}
                                        variant="outline"
                                        type="button"
                                        className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
                                    >
                                        <FaGithub className="mr-2" />
                                        GitHub
                                    </Button>
                                </div>
                                
                                <div className="text-center text-sm text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        href="/sign-in"
                                        className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                
                </CardContent>
            </Card>

            <div className="text-gray-400 text-center text-xs text-balance mt-6">
                By clicking continue, you agree to our{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
                    Privacy Policy
                </a>
            </div>
        </div>
    </div>
);
};
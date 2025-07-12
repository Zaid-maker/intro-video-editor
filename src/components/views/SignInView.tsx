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

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: "Password is Required" }),
});

export const SignInView = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	/**
	 * Handles form submission for signing in a user.
	 *
	 * @param data - The form data containing user's email and password.
	 *
	 * Resets any previous error state and sets the pending state to true while
	 * attempting to sign in the user using the provided email and password.
	 * On successful sign-in, it redirects the user to the home page.
	 * If an error occurs during sign-in, it sets the error message state.
	 */
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		setError(null);
		setPending(true);

		authClient.signIn
			.email(
				{
					email: data.email,
					password: data.password,
					callbackURL: "/",
				},
				{
					onSuccess: () => {
						router.push("/");
					},
					onError: ({ error }) => {
						setError(error.message);
					},
				},
			)
			.finally(() => {
				setPending(false);
			});
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
			},
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
			<div className="w-full max-w-6xl mx-auto">
				<Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 overflow-hidden">
					<CardContent className="grid p-0 md:grid-cols-2">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="p-4 sm:p-6 md:p-8 flex flex-col justify-center"
							>
								<div className="flex flex-col gap-6">
									<div className="flex flex-col items-center text-center">
										<h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
											Welcome back
										</h1>
										<p className="text-sm sm:text-base text-gray-400 text-balance">
											Login to your account
										</p>
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
													<FormLabel className="text-gray-300">
														Password
													</FormLabel>
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
											<AlertTitle className="text-white">{error}</AlertTitle>
										</Alert>
									)}

									<Button
										disabled={pending}
										type="submit"
										className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg "
									>
										{pending ? "Signing In..." : "Sign In"}
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
										Don&apos;t have an account?
										<Link
											href="/sign-up"
											className="text-purple-400 ml-1 hover:text-purple-300 underline underline-offset-4 transition-colors"
										>
											Sign up
										</Link>
									</div>
								</div>
							</form>
						</Form>

						<div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black relative hidden md:flex flex-col gap-y-6 items-center justify-center p-4 lg:p-6">
							<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-900/10"></div>
							<div className="relative z-10 flex flex-col items-center gap-6">
								<div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl">
									<img src="/logo.webp" alt="Logo" />
								</div>
								<div className="text-center">
									<h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
										Advance Remotion Editor
									</h2>
									<p className="text-gray-400 text-base lg:text-lg">
										Create stunning video experiences
									</p>
								</div>
								<div className="flex space-x-2">
									<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
									<div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
									<div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="text-gray-400 text-center text-xs text-balance mt-6">
					By clicking continue, you agree to our
					<Link
						href="#"
						className="text-purple-400 mx-1 hover:text-purple-300 underline underline-offset-4 transition-colors"
					>
						Terms of Service
					</Link>
					and
					<Link
						href="#"
						className="text-purple-400 mx-1 hover:text-purple-300 underline underline-offset-4 transition-colors"
					>
						Privacy Policy
					</Link>
				</div>
			</div>
		</div>
	);
};

"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import cloudBottom from "@/img/cloud-bottom-left.svg";
import cloudTop from "@/img/cloud-top-left.svg";
import logo from "@/img/logo-name.svg";
import { AuthStore } from "@/store/auth";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("*O campo deve ser um email"),
	password: z.string().min(6, "*Informe uma senha válida."),
});

type formProps = z.infer<typeof schema>;

const Login = () => {
	const [parent] = useAutoAnimate();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const {
		actions: { login },
	} = AuthStore();

	const router = useRouter();

	const handleForm = async (data: formProps) => {
		const executeLogin = async () => {
			const cookie = await login({ ...data });

			if (cookie !== undefined) {
				return cookie;
			}
			throw new Error("Email e/ou senha incorretos!");
		};
		toast.promise(executeLogin, {
			loading: "Loading...",
			duration: 3000,

			success: (cookie) => {
				router.push(`/admin/dashboard?access_token=${cookie}`);
				return "Login efetuado";
			},
			error: "Email e/ou senha incorretos",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});

		// console.log(data)
	};

	return (
		<main className="grid grid-cols-3 mx-auto min-h-screen">
			<div className="col-span-2 relative flex justify-center items-center">
				<Image
					className="absolute top-0 left-0"
					src={cloudTop}
					alt="Nuvem esquerda topo"
				/>
				<Image
					className="absolute bottom-0 left-20"
					src={cloudBottom}
					alt="Nuvem esquerda baixo"
				/>

				<Card className="2xl:w-[34rem] w-[25rem]  shadow-xl">
					<CardHeader>
						<CardTitle className="text-4xl px-2 2xl:pt-14 2xl:pb-10 pt-10 font-normal">
							Login
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-lg font-normal text-muted-foreground"
									htmlFor="email"
								>
									Email
								</Label>
								<Input
									className="2xl:h-[48px] h-[42px] border border-black"
									id="email"
									type="email"
									{...register("email")}
								/>
								{errors.email && (
									<p className="text-red-500">{errors.email.message}</p>
								)}
							</div>
							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-lg font-normal text-muted-foreground"
									htmlFor="pass"
								>
									Senha
								</Label>
								<Input
									className="2xl:h-[48px] h-[42px] border border-black"
									id="pass"
									type="password"
									{...register("password")}
								/>
								{errors.password && (
									<p className="text-red-500">{errors.password.message}</p>
								)}
							</div>

							<div className="flex justify-center 2xl:py-14 py-10">
								<Button className="w-full 2xl:h-[48px] h-[42px] rounded-2xl text-lg font-bold bg-primary">
									Entrar
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
			<div className="bg-primary py-16 p-16">
				<Image src={logo} alt="Logo da IFUrna" />
			</div>
		</main>
	);
};

export default Login;

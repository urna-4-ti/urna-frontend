/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import halfCircle from "@/img/decoration-bottom-left.svg";
import cloudBottom from "@/img/decoration-bottom-right.svg";
import cloudTop from "@/img/decoration-top-right.svg";
import logo from "@/img/logo-name.svg";
import { queryClient } from "@/lib/queryClient";
import { getVoterId, getVoters } from "@/requests/voter/findAll";
import { useEnrollmentStore } from "@/store/enrollment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const schema = z.object({
	enroll: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.refine((value) => value.length === 10, {
			message: "*Matrícula inválida.",
		}),
});
type formProps = z.infer<typeof schema>;

const registration = ({ params }: { params: { id: string } }) => {
	const [valueInput, setValueInput] = useState("");
	const { push } = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const {
		actions: { insert },
	} = useEnrollmentStore();
	const enroll = watch("enroll");

	const { data: voter, refetch } = useQuery({
		queryKey: ["validate user", enroll],
		queryFn: () => getVoterId(enroll, params.id),
		enabled: false,
	});
	const handleForm = async (data: formProps) => {
		console.log(data.enroll, params.id);
		await queryClient.invalidateQueries({
			queryKey: ["validate user", data.enroll],
		});
		refetch();
		console.log(voter);
		insert(data.enroll, params.id);
		push(`/election/${params.id}/regime`);
	};

	return (
		<main className="grid grid-cols-3 mx-auto min-h-screen">
			<div className="bg-secondary/65 py-16 p-16">
				<Image src={logo} alt="Logo da IFUrna" />
			</div>
			<div className="col-span-2 relative flex justify-center items-center">
				<Image
					className="absolute top-0 right-0 select-none"
					src={cloudTop}
					alt="Nuvem direita-cima"
				/>
				<Image
					className="absolute bottom-0 right-0 select-none"
					src={cloudBottom}
					alt="Nuvem direita-baixo"
				/>
				<Image
					className="absolute bottom-0 left-28 select-none"
					src={halfCircle}
					alt="Nuvem direita-baixo"
				/>

				<Card className="2xl:w-[38rem] w-[30rem]  shadow-xl fixed">
					<CardHeader>
						<CardTitle className="text-3xl text-center px-14 font-normal pt-6">
							Informe sua matrícula para acessar as votações
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-4"
							action=""
							onSubmit={handleSubmit(handleForm)}
						>
							<div className="space-y-2">
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground mplus"
									htmlFor="enrollment"
								>
									Matrícula
								</Label>
								<Input
									className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary 2xl:placeholder:text-lg"
									id="enrollment"
									type="text"
									value={valueInput}
									{...register("enroll")}
									onChange={(e) => {
										const maxLength = 10;
										const newValue = e.target.value.replace(/\D+/g, "");
										if (newValue.length <= maxLength) {
											setValueInput(newValue);
										}
									}}
								/>
								{errors.enroll && (
									<p className="text-red-500 text-sm">
										{errors.enroll.message}
									</p>
								)}

								{/* <Button type="button" onClick={}>Teste</Button> */}
							</div>
							<div className="flex justify-center w-full py-4">
								<Button className="text-lg h-12 w-4/5 rounded-xl mplus bg-secondary/65 hover:bg-secondary/75">
									Validar
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default registration;

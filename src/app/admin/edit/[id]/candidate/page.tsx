"use client";
import { Input } from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import bottomCircle from "@/img/bottom-circle.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import iconBack from "@/img/icon-back.svg";
import logoUrna from "@/img/logo.svg";
import topCloud from "@/img/top-cloud.svg";
import inputImage from "@/img/uploading-icon.svg";
import { classes } from "@/lib/Classes";
import { deleteCandidate } from "@/requests/candidate/delete";
import { editCandidate } from "@/requests/candidate/edit";
import { getCandidateId } from "@/requests/candidate/findAll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import "./style.css";

const schema = z.object({
	codNum: z.number(),
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	photo: z.any(),
	politicalPartyId: z.string(),
	description: z.string().min(3, "*A sua descrição é muito curta."),
	classParty: z.string(),
});

type formProps = z.infer<typeof schema>;

export default function Home({ params }: { params: { id: string } }) {
	const { data: candidate, isLoading } = useQuery({
		queryKey: ["get-candidate-id", params.id],
		queryFn: () => getCandidateId(params.id),
	});

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["edit-candidate"],
		mutationFn: editCandidate,
	});

	const { mutateAsync: candidateDel } = useMutation({
		mutationKey: ["delete-candidate", params.id],
		mutationFn: () => deleteCandidate(params.id),
	});

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			photo: [],
		},
	});

	// Use the candidate data to set the default values

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const [value, setValueLength] = useState<string>();

	const router = useRouter();

	const hasNewImage = watch("photo").length > 0;

	const image = watch("photo")[0];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (newValue.length > 5) {
			setValueLength(newValue.substring(0, 5));
		} else {
			setValueLength(newValue);
		}
	};

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				if (image) {
					await mutateAsync({
						id: params.id,
						name: data.name,
						cod: data.codNum,
						picPath: data.photo,
						politicalPartyId: data.politicalPartyId,
						description: data.description,
					});
				} else {
					await mutateAsync({
						id: params.id,
						name: data.name,
						cod: data.codNum,
						politicalPartyId: data.politicalPartyId,
						description: data.description,
					});
				}
			} catch (error) {
				console.error(error);
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Candidato Registrado";
			},

			error: "Erro ao registrar o candidato",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const handleDelete = async () => {
		const inviteForm = async () => {
			try {
				await candidateDel();
			} catch (error) {}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Candidato Removido";
			},

			error: "Erro ao remover o candidato",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	useEffect(() => {
		if (candidate) {
			setValue("name", candidate.name);
			setValue("description", candidate.description);
			setValue("politicalPartyId", candidate.politicalPartyId);
			setValue("classParty", candidate.PoliticalParty.class);
		}
	}, [candidate, setValue]);
	return (
		<main id="main">
			<div id="leftDiv">
				<Image src={logoUrna} alt="" id="logo" />
			</div>
			<div id="rightDiv">
				<Image id="topCloud" src={topCloud} alt="" />
				<Image id="bottomCloud" src={bottomCloud} alt="" />
				<Image id="bottomCircle" src={bottomCircle} alt="" />

				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					id="cancelButtonIcon"
					onClick={() => {
						router.back();
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar" />
				</button>

				<form
					id="registerEleitor"
					onSubmit={(e) => handleSubmit(handleForm)(e)}
				>
					<h1>Editar Candidato</h1>

					<button
						type="button"
						id="cancelButtonIcon"
						onClick={() => {
							router.back();
						}}
					>
						<Image src={iconBack} alt="Icone botão voltar" />
					</button>

					<Input label="Nome" type="text" {...register("name")} required />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm relative">
							{errors.name.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Número"
						defaultValue={candidate?.cod}
						type="number"
						value={value}
						{...register("codNum", { valueAsNumber: true })}
						onChange={handleChange}
					/>
					{errors.codNum?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.codNum?.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Descrição"
						type="text"
						{...register("description")}
						required
					/>

					<label htmlFor="inputImg" id="labelImg">
						{hasNewImage ? (
							<>
								<input
									id="inputImg"
									type="file"
									{...register("photo")}
									accept="image/*"
								/>
								<Image
									id="newImage"
									src={URL.createObjectURL(image)}
									alt="new preview"
									fill
								/>
							</>
						) : (
							<>
								<input
									id="inputImg"
									type="file"
									{...register("photo")}
									accept="image/*"
								/>
								<Image
									id="uploading"
									src={`http://localhost:4000/public/${candidate?.picPath}`}
									alt="Image Input"
									fill
								/>
							</>
						)}
					</label>
					<div id="divButton">
						<button type="submit" onClick={() => console.log("click")}>
							Editar
						</button>

						<button
							type="button"
							id="cancelButton"
							onClick={() => setModalIsOpen(!modalIsOpen)}
						>
							Desvincular
						</button>

						<Modal
							isOpen={modalIsOpen}
							onClose={() => setModalIsOpen(!modalIsOpen)}
							modalFunction={handleDelete}
							text="Deseja realmente desvincular este candidato?"
						/>
					</div>
				</form>
			</div>
		</main>
	);
}

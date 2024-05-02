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
import { deleteVoter } from "@/requests/voter/delete";
import { editVoter } from "@/requests/voter/edit";
import { getVoterId } from "@/requests/voter/findAll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import "./style.css";

const schema = z.object({
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	enrollment: z.string().refine((value) => value.length === 10, {
		message: "*Matrícula inválida.",
	}),
	email: z.string().email("*O campo deve ser um email válido."),
	class: z.string(),
	password: z.string(),
});

type formProps = z.infer<typeof schema>;

export default function Home({ params }: { params: { id: string } }) {
	const { data: voter, isLoading } = useQuery({
		queryKey: ["get-voter-id", params.id],
		queryFn: () => getVoterId(params.id),
	});

	const { mutateAsync: voterEdit, isError } = useMutation({
		mutationKey: ["edit-candidate"],
		mutationFn: editVoter,
	});

	const { mutateAsync: voterDel } = useMutation({
		mutationKey: ["delete-voter", params.id],
		mutationFn: () => deleteVoter(params.id),
	});

	const [selectValue, setSelectValue] = useState<string>("");

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const [name, setName] = useState<string>("");

	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
		setValue,
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			enrollment: "",
			name: "",
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(e.target.value);
	};

	const nameClass = (target: string) => {
		const foundClass = classes.find((item) => item.class === target);
		if (foundClass) {
			return foundClass.name;
		}
		return null; // ou algum outro valor padrão
	};

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				await voterEdit({
					id: params.id,
					name: data.name,
					email: data.email,
					enrollment: data.enrollment,
					classVoter: data.class,
					password: data.enrollment,
				});
			} catch (error) {
				console.log(error);
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				return "Eleitor editado";
			},

			error: "Erro ao editar o eleitor",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const handleDelete = async () => {
		const inviteForm = async () => {
			try {
				await voterDel();
			} catch (error) {}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Eleitor Removido";
			},

			error: "Erro ao remover o eleitor",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	useEffect(() => {
		if (voter) {
			setValue("name", voter.name);
			setValue("enrollment", voter.enrollment);
			setValue("email", voter.email);
			setValue("class", voter.class);
			setValue("password", voter.enrollment);
		}
	}, [voter, setValue]);
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

				<form id="registerEleitor" onSubmit={handleSubmit(handleForm)}>
					<h1>Editar Eleitor</h1>

					<Input label="Nome" type="text" {...register("name")} />

					<Input
						label="Matricula"
						type="text"
						{...register("enrollment")}
						{...register("password")}
					/>

					<Input label="Email" type="email" {...register("email")} />

					<label htmlFor="">
						<p>Turma</p>
						<select
							value={selectValue}
							{...register("class")}
							onChange={handleChange}
						>
							<option value={voter?.class}>
								{nameClass(voter?.class as string)}
							</option>
							{classes.map((item) => (
								<option value={item.class}>{item.name}</option>
							))}
						</select>
					</label>

					<div id="divButton">
						<button id="buttonEdit" type="submit">
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
							text="Deseja realmente desvincular este eleitor?"
							modalFunction={handleDelete}
						/>
					</div>
				</form>
			</div>
		</main>
	);
}

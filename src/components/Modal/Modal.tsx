"use client";
import { deleteCandidate } from "@/requests/candidate/delete";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	text: string;
	modalFunction: () => void;
}

export default function Modal({
	isOpen,
	onClose,
	text,
	modalFunction,
}: ModalProps) {
	const router = useRouter();

	if (!isOpen) {
		return null;
	}

	return (
		<div id="bodyModal">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div id="blurModal" onClick={() => onClose} />
			<div id="pageModal">
				<p>{text}</p>
				<div id="btnModal">
					<button type="button" id="btn1Modal" onClick={modalFunction}>
						Sim
					</button>
					<button type="button" id="btn2Modal" onClick={onClose}>
						Não
					</button>
				</div>
			</div>
		</div>
	);
}

interface Props {
	text: string;
	characterLimit: number;
}

const LimitedParagraph: React.FC<Props> = ({ text, characterLimit }) => {
	let limitedText = text.substring(0, characterLimit);
	if (text.length > characterLimit) {
		limitedText += " ...";
	}

	return <span>{limitedText}</span>;
};

export default LimitedParagraph;

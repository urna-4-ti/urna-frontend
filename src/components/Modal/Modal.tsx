interface ModalProps {
  isOpen?: boolean,
  onClose?: () => void,
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) {
    return null
  }


  return (
    <div id="bodyModal">
      <div id="blurModal" onClick={onClose} />
      <div id="pageModal">
        <p>Deseja realmente desvincular este eleitor?</p>
        <div id="btnModal">
          <button type="button" id="btn1Modal">Sim</button>
          <button type="button" id="btn2Modal" onClick={onClose}>Não</button>

        </div>
      </div>
    </div>
  )
}
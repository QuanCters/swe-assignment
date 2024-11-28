import { useModal } from "@/context/ModalContext";
import ConfirmPrintModal from "./ConfirmPrintModal";
import InsufficientPagesModal from "./InsufficientPagesModal";

const ModalLookup: Record<string, React.FC<any>> = {
  // UploadModal: UploadModal,
  // AnotherModal: AnotherModal,
  ConfirmPrintModal: ConfirmPrintModal,
  InsufficientPagesModal: InsufficientPagesModal,
};

const ModalManager = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;
  const Modal = ModalLookup[modal.name];

  return <Modal onClose={closeModal} {...modal.props} />;
};

export default ModalManager;

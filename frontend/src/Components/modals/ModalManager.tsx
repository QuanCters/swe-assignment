import { useModal } from "@/context/ModalContext";
import ConfirmPrintModal from "./ConfirmPrintModal";
import InsufficientPagesModal from "./InsufficientPagesModal";
import { AddPrinterModal, UpdatePrinterModal } from "./PrinterModal";

const ModalLookup: Record<string, React.FC<any>> = {
  UpdatePrinterModal: UpdatePrinterModal,
  ConfirmPrintModal: ConfirmPrintModal,
  InsufficientPagesModal: InsufficientPagesModal,
  AddPrinterModal: AddPrinterModal,
};

const ModalManager = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;
  const Modal = ModalLookup[modal.name];

  return <Modal onClose={closeModal} {...modal.props} />;
};

export default ModalManager;

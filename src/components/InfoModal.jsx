import { Modal } from "antd";

const InfoModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      title="Promosyon Kodu!"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <p className="text-lg font-semibold text-center">
        2025 yaz mevsimi boyunca siparişlerinizde <strong>"YAZ25"</strong> promosyon koduyla %25
        indirim kazanın!
      </p>
    </Modal>
  );
};

export default InfoModal;

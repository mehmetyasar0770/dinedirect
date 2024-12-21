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
        İlk siparişinize özel <strong>"FIRST"</strong> promosyon koduyla %25
        indirim kazanın!
      </p>
    </Modal>
  );
};

export default InfoModal;

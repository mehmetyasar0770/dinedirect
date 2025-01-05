import InputField from "./InputField";
import TextArea from "./TextArea";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryDetails, nextStep } from "../redux/slices/checkoutSlice";

const DeliveryDetailsStep = () => {
  const dispatch = useDispatch();
  const { deliveryDetails } = useSelector((state) => state.checkout);

  const handleNext = () => {
    if (!deliveryDetails.address || !deliveryDetails.serviceRequest) {
      alert("Teslimat bilgilerini eksiksiz doldurun!");
      return;
    }
    dispatch(nextStep());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Adım 1: Teslimat Bilgileri</h2>
      <form>
        <TextArea
          label="Teslimat Adresi"
          value={deliveryDetails.address}
          onChange={(e) =>
            dispatch(setDeliveryDetails({ ...deliveryDetails, address: e.target.value }))
          }
          placeholder="Adresinizi girin"
        />
        <TextArea
          label="Teslimat Notu"
          value={deliveryDetails.note}
          onChange={(e) =>
            dispatch(setDeliveryDetails({ ...deliveryDetails, note: e.target.value }))
          }
          placeholder="Notunuzu girin"
        />
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Servis İsteği</label>
          <select
            className="w-full p-2 border rounded"
            value={deliveryDetails.serviceRequest}
            onChange={(e) =>
              dispatch(
                setDeliveryDetails({ ...deliveryDetails, serviceRequest: e.target.value })
              )
            }
          >
            <option value="" disabled>
              Servis İsteği Seçin
            </option>
            <option value="Servis İstemiyorum">Servis İstemiyorum</option>
            <option value="Servis İstiyorum">Servis İstiyorum</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Devam Et
        </button>
      </form>
    </div>
  );
};

export default DeliveryDetailsStep;

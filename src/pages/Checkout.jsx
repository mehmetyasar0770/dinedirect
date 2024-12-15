import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Redux'tan useDispatch import
import { clearCart } from "../redux/slices/cartSlice"; // clearCart reducer'ını import

function Checkout() {
  const [step, setStep] = useState(1); // Adımları kontrol eden durum
  const dispatch = useDispatch(); // Redux dispatch

  const handleNextStep = () => {
    if (step === 2) {
      dispatch(clearCart()); // 2. adımdan sonra sepeti temizle
    }
    setStep((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-6">
        <div
          className={`flex-1 border-b-4 ${
            step >= 1 ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <div
          className={`flex-1 border-b-4 ${
            step >= 2 ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <div
          className={`flex-1 border-b-4 ${
            step >= 3 ? "border-blue-500" : "border-gray-300"
          }`}
        />
      </div>

      {/* Form Alanları */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Adım 1: Teslimat Bilgileri
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Teslimat Adresi:
              </label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Adresinizi girin"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Teslimat Notu:
              </label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Notunuzu giriniz"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Servis İsteği
              </label>
              <select className="w-full p-2 border rounded">
                <option value="" disabled selected>
                  Servis İsteği Seçin
                </option>
                <option value="Servis (Plastik çatal, kaşık ve baharat) İstemiyorum">
                  Servis İstemiyorum (Plastik çatal, kaşık ve baharat).
                </option>
                <option value="Servis İstiyorum (Plastik çatal, kaşık ve baharat)">
                  Servis İstiyorum (Plastik çatal, kaşık ve baharat).
                </option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Devam Et
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Adım 2: Ödeme Bilgileri</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Kredi Kartı Numarası:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Kart numaranızı girin"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Son Kullanma Tarihi:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="AA/YY"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">CVC:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="CVC girin"
              />
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Öde
            </button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">
            Siparişiniz Alındı!
          </h2>
          <p className="text-gray-600 text-center">
            Siparişiniz başarıyla alındı. Teşekkür ederiz!
          </p>
          <Link to="/customer-orders">
            <p className="text-blue-600 text-center">
              Müşteri girişinden e-mail ve şifrenizle giriş yaparak sipariş
              durumunuzu izleyebilirsiniz
            </p>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;

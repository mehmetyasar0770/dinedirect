import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

function MenuItem({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success('Ürün başarıyla sepete eklendi!');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <img
        src={item.imageURL}
        alt={item.name}
        className="w-full h-32 object-cover rounded-lg mb-2"
      />
      <p className="text-gray-600">{item.description}</p>
      <p className="text-green-600 font-bold">{item.price}₺</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Sepete Ekle
      </button>
    </div>
  );
}

export default MenuItem;

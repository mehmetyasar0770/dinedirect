function MenuItem({item, onAddToCart}) {
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
          onClick={() => onAddToCart(item)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sepete Ekle
        </button>
      </div>
    );
  }
  
  export default MenuItem;
  
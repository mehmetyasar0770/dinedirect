import Cart from "../components/Cart";
import Header from "../components/Header";

function CartPage({ cartItems, onIncreaseCount, onDecreaseCount, onRemoveItem }) {
  return (
    <div>
      <Header/>
      <h1 className="text-3xl font-bold text-center mb-6">Sepet</h1>
      <Cart
        cartItems={cartItems}
        onIncreaseCount={onIncreaseCount}
        onDecreaseCount={onDecreaseCount}
        onRemoveItem={onRemoveItem}
      />
    </div>
  );
}

export default CartPage;

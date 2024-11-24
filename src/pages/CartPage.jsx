import Cart from "../Cart";

function CartPage({ cartItems, onIncreaseCount, onDecreaseCount, onRemoveItem }) {
  return (
    <div>
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

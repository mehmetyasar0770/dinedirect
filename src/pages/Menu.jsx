import MenuList from "../MenuList";

function Menu({ onAddToCart }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Menü</h1>
      <MenuList onAddToCart={onAddToCart} />
    </div>
  );
}

export default Menu;

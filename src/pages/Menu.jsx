import Header from "../components/Header";
import MenuList from "../components/MenuList";

function Menu({ onAddToCart }) {
  return (
    <div>
      <Header/>
      <h2 className="text-3xl font-bold text-center mb-6">Menü</h2>
      <MenuList onAddToCart={onAddToCart} />
    </div>
  );
}

export default Menu;

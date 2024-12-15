import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/menuSlice';
import MenuList from '../components/MenuList';

function Menu() {
  const dispatch = useDispatch();

  // Ürünleri Firestore'dan çekmek için fetchProducts çağır
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Menü</h2>
      <MenuList />
    </div>
  );
}

export default Menu;

import {
    addDoc,
    collection,
    getDocs, 
    orderBy,
    query,
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  import toast from 'react-hot-toast';
  
  export const addProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
      });
  
     
      return { id: docRef.id, ...productData };
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ 
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      toast.error('Ürün yüklenirken bir hata oluştu!');
      console.log(error);
      return []; // Hata durumunda boş array dön
    }
  };
  
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  import toast from 'react-hot-toast';
  
  // Kategori ekleme fonksiyonu
  export const addCategory = async (categoryData) => {
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...categoryData,
      });
  
     
      return { id: docRef.id, ...categoryData };
    } catch (error) {
      console.log(error);
    }
  };
  
  // Tüm kategorileri alma fonksiyonu
  export const getCategories = async () => {
    try {
      const q = query(collection(db, 'categories'), orderBy('createAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      toast.error('Kategoriler yüklenirken bir hata oluştu!');
      console.log(error);
      return []; // Hata durumunda boş array dön
    }
  };
  
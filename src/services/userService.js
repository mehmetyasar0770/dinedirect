import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Firestore config dosyanızı import edin

export const fetchUserDetails = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data(); // Kullanıcı bilgilerini döndür
    } else {
      console.error("Kullanıcı bulunamadı:", userId);
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı bilgisi alınırken hata oluştu:", error);
    return null;
  }
};

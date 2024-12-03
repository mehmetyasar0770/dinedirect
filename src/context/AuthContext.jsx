import { createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const register = async (email, password, name) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredentials.user, {
        displayName: name,
      });
      toast.success(`Hesabınız başarıyla oluşturuldu ${name}! Şimdi giriş yapabilirsiniz.`);
    } catch (error) {
      toast.error(error.message);
      console.error("Kayıt Hatası:", error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Başarıyla giriş yapıldı!`);
    } catch (error) {
      toast.error(error.message);
      console.error("Giriş Hatası:", error);
    }
  };

  const value = {
    register,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

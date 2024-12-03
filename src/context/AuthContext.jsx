import { createContext } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const register = async (email, password, fullName)=> {
        try {
            await createUserWithEmailAndPassword (auth,email,password );
            toast.success (`Hesabınız başarıyla oluşturuldu ${fullName} Şimdi giriş yapabilirsiniz`);
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

     };
    const value = {
        register,
    };
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
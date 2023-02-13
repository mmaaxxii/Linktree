import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { connectStorageEmulator } from "firebase/storage"
import { useEffect , useState} from "react"
import { auth , userExists } from '../firebase/firebase'
import { useNavigate } from "react-router-dom"



export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggeedIn, onUserNotRegistered }){
    const navigate = useNavigate()

    useEffect( () => {
        
        onAuthStateChanged(auth, async (user ) => {
            if (user){
                console.log(user.displayName)
                const inRegistered = await userExists(user.uid)
                if (inRegistered) {
                    //TODO: redirigir a Dashboard 
                    onUserLoggedIn(user)
                } else {
                    //TODO: redirigir a choose username  
                    onUserNotRegistered(user)
                }            
             }else {
                onUserNotLoggeedIn()
             }
        })
    }, [navigate, onUserLoggedIn, onUserNotLoggeedIn, onUserNotRegistered])

}
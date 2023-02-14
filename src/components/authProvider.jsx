import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { connectStorageEmulator } from "firebase/storage"
import { useEffect , useState} from "react"
import { auth , getUserInfo, registerNewUser, userExists } from '../firebase/firebase'
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
                    const userInfo = await getUserInfo(user.uid)
                    if(user.processCompleted){
                        onUserLoggedIn(userInfo)
                    }else {
                        onUserNotRegistered(userInfo)
                    }
                    onUserLoggedIn(user)
                } else {
                    //TODO: redirigir a choose username  
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: '',
                        username: '',
                        processCompleted:false,
                    })
                    onUserNotRegistered(user)
                }            
             }else {
                onUserNotLoggeedIn()
             }
        })
    }, [navigate, onUserLoggedIn, onUserNotLoggeedIn, onUserNotRegistered])

}
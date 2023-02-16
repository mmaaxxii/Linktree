import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { connectStorageEmulator } from "firebase/storage"
import {useState} from "react"
import { auth  } from '../firebase/firebase'
import { useNavigate } from "react-router-dom"
import AuthProvider from "../components/authProvider"

export default function LoginView() {
    const navigate = useNavigate()
    // const [currentUser, setCurrentUser] = useState(null)
    /*    
    State 
    0: inicializado
    1: loading 
    2: login completo
    3: login pero sin registro 
    4: no hay nadie logueado
    5: ya existe username
    6: nuevo username, click para continuar 
    7: username no existe 
    */
    const [state, setCurrentState] = useState(0)

    /*useEffect( () => {
        setCurrentState(1)
        onAuthStateChanged(auth, async (user ) => {
            if (user){
                console.log(user.displayName)
                const inRegistered = await userExists(user.uid)
                if (inRegistered) {
                    //TODO: redirigir a Dashboard 
                    navigate('/dashboard')
                    setCurrentState(2)
                } else {
                    //TODO: redirigir a choose username  
                    navigate('/choose-username')
                    setCurrentState(3)
                }            
             }else {
    
                setCurrentState(4)
                console.log("No hay ningun usuario autenticado.")
             }
        })
    }, [navigate])*/


    async function handleOnClick () {
        const googleProvider = new GoogleAuthProvider()
        await signInWithGoogle(googleProvider)
    }

    async function signInWithGoogle(googleProvider){
        try{
            const res = await signInWithPopup(auth, googleProvider)
            console.log(res)
            
        } catch(error) {
            
            console.error(error)
        }
    }

    function handleUserLoggedIn(user){
        navigate('/dashboard' )
    }
    function handleUserNotRegistered(user){
        navigate('/choose-username')
    }
    function handleUserNotLoggedIn(){
        setCurrentState(4)
    }


    
    
    
    if (state === 1){
        return <div> Loading ....  </div>
    }

    if (state === 2){
        return <div> Estas autenticado y registrado  </div>
    }

    if (state === 3){
        return <div> Estas autenticado pero no registrado  </div>
    }

    if (state === 4){
        return <div> <button onClick={handleOnClick}> Login with google</button> </div>
    }
    
    if (state === 5){
        return <div> <button onClick={handleOnClick}> Login with google</button> </div>
    }

    return <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggeedIn={handleUserNotLoggedIn} >
                 <div> Loading ...</div>
            </AuthProvider>

}
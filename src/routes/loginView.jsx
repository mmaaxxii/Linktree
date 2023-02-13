import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { connectStorageEmulator } from "firebase/storage"
import { auth } from '../firebase/firebase'

export default function LoginView() {
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

    return (<div> 
            <button onClick={handleOnClick}> Login with google</button>
         </div> )
}

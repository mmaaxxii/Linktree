import { useNavigate } from "react-router-dom"
import {useState} from "react"
import AuthProvider from "../components/authProvider"
import { existsUsername, updateUser } from "../firebase/firebase"


export default function ChooseUsernameView() {
    const navigate = useNavigate()
    const [state, setState] = useState(0)
    const [currentUser, setCurrentUser] = useState({})
    const [username, setUsername] = useState('')

    function handleUserLoggedIn(user){
        navigate('/dashboard' )
    }
    function handleUserNotRegistered(user){

        setCurrentUser(user)
        setState(3)
        //navigate('/choose-username')
    }
    function handleUserNotLoggedIn(){
        navigate('/login')
    }

    function handleInputUserName(e){
        setUsername(e.target.value)
    }

    async function handleContinue(){
        if (username !== ''){
            const exists = await existsUsername(username); 
            if (exists){
                setState(5)
            } else {
                const tmp = {... currentUser}
                tmp.username = username
                tmp.processCompleted = true 
                await updateUser(tmp)
            }
        }
    }

    if ((state === 3) || (state === 5)){
        return (
            <div>
                <h1> Bienvenido {currentUser.displayName }</h1>
                <p>Para terminar el proceso ingreso un nombre de usuario </p>
                {state === 5 ? <p>El nombre de usuario ya existe, escoge otro</p> : ""}
                <div>
                    <input type="text" onInput={handleInputUserName}></input>
                </div>
                <div>
                    <button onClick={handleContinue}>Continuar</button>
                </div>
            </div>
        )
    }



    return (<div> 
        <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggeedIn={handleUserNotLoggedIn} >
        </AuthProvider>
    </div> )

}

import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import AuthProvider from "../components/authProvider"
import { existsUsername, updateUser } from "../firebase/firebase"
import style from "./chooseUserNameView.module.css"


export default function ChooseUsernameView() {
    const navigate = useNavigate()
    const [state, setState] = useState(0)
    const [currentUser, setCurrentUser] = useState({})
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false);


    function handleUserLoggedIn(user) {
        navigate('/dashboard')
    }
    function handleUserNotRegistered(user) {

        setCurrentUser(user)
        setState(3)
        //navigate('/choose-username')
    }
    function handleUserNotLoggedIn() {
        navigate('/login')
    }

    function handleInputUserName(e) {
        setUsername(e.target.value)
    }

    async function handleContinue() {

        if (username !== '' && !loading) {
            setLoading(true);
            const exists = await existsUsername(username);
            setLoading(false);
            if (exists) {
                setState(5)
            } else {
                const tmp = { ...currentUser }
                tmp.username = username
                tmp.processCompleted = true
                await updateUser(tmp)
                setState(6)
            }
        }
    }

    if ((state === 3) || (state === 5)) {
        return (
            <div className={style.chooseUsernameContainer}>
                <h1> Bienvenido {currentUser.displayName}</h1>
                <p>Para terminar el proceso ingreso un nombre de usuario </p>
                {state === 5 ? <p>El nombre de usuario ya existe, escoge otro</p> : ""}
                <div>
                    <input className="input" type="text" onInput={handleInputUserName}></input>
                </div>
                <div>
                    <button className="btn" onClick={handleContinue} disabled={loading}>{loading ? <span> Cargando...</span> : "Continuar"}</button>
                </div>
            </div>
        )
    }
    if (state === 6) {
        return <div className={style.chooseUsernameContainer}>
            <h1>Felicidades ya puedes ir al dashboard a crear tus links</h1>
            <Link to="/dashboard">Continuar</Link>
        </div>
    }



    return (<div>
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggeedIn={handleUserNotLoggedIn} >
        </AuthProvider>
    </div>)

}

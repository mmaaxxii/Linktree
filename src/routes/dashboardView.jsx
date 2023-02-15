import AuthProvider from "../components/authProvider"
import { useNavigate, Link } from "react-router-dom"
import {useState} from "react"
import DashboardWrapper from "../components/dashboardWrapper"

export default function DashboardView() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)

    function handleUserLoggedIn(user){
        setCurrentUser(user)
        setState(2)
    }
    function handleUserNotRegistered(user){
        navigate('/login')
    }
    function handleUserNotLoggedIn(){
        navigate('/login')
    }

    if(state === 0){
        return(
            <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggeedIn={handleUserNotLoggedIn} 
            >
                Loading
            </AuthProvider>
            )
        }
    
    function handleOnSubmit(e){
        e.preventDefault()
        
    }

    return (
        <DashboardWrapper> 
            <div>
                <h1>Dashboard</h1>

                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" />
                    
                    <label htmlFor="url">Url</label>
                    <input type="text" name="url" />

                    <input type="submit" value="Create new link"/>

                </form>
            </div>
        </DashboardWrapper>
    ) 
    
}



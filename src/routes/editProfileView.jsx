import DashboardWrapper from "../components/dashboardWrapper";
import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProfileView() {
    
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)
    
    async function handleUserLoggedIn(user){
        setCurrentUser(user)
        setState(2)
    }

    function handleUserNotRegistered(user){    
        navigate('/login')
    }
    function handleUserNotLoggedIn(){
        navigate('/login')
    }


    return (
        <div>
        <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggeedIn={handleUserNotLoggedIn} 
            >
            <DashboardWrapper> 

              <h1>EditProfileView</h1>
        
            </DashboardWrapper>
        </AuthProvider>

        
        </div>
    ) 
    
}

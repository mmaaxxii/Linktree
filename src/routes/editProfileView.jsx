import DashboardWrapper from "../components/dashboardWrapper";
import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import {React,  useState , useRef} from "react";
import { async } from "@firebase/util";
import { setUserProfilePhoto , updateUser , getProfilePhotoUrl} from "../firebase/firebase";
import style from "./editProfileView.module.css"


export default function EditProfileView() {
    
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)
    const [profileUrl, setProfileUrl] = useState(null)
    const fileRef = useRef(null)
    
    async function handleUserLoggedIn(user){
        setCurrentUser(user)
        const url = await getProfilePhotoUrl(user.profilePicture)
        setProfileUrl(url)
        setState(2)
        
    }

    function handleUserNotRegistered(user){    
        navigate('/login')
    }
    function handleUserNotLoggedIn(){
        navigate('/login')
    }

    function handleOpenProfilePicker(){
        if(fileRef.current){
            fileRef.current.click()
        }
    }

    function handleChangeFile(e){
        const files = e.target.files
        const fileReader = new FileReader()
        if(fileReader && files && files.length > 0 ){
            fileReader.readAsArrayBuffer(files[0])
            fileReader.onload = async function(){
                const imageData = fileReader.result
                const res = await setUserProfilePhoto(currentUser.uid, imageData)
                if (res){
                    const tmpUser = {... currentUser}
                    tmpUser.profilePicture = res.metadata.fullPath
                    await updateUser(tmpUser)
                    setCurrentUser({...tmpUser})
                    const url = await getProfilePhotoUrl(currentUser.profilePicture)
                    setProfileUrl(url)
                }
            }
        }
    }
    return (
        <div>
        <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggeedIn={handleUserNotLoggedIn} 
            >
            <DashboardWrapper> 
                <div>
                    <h2>Edit Profile Info</h2>
                    <div className={style.profilePictureContainer}>
                        <div>
                            <img src={profileUrl} alt="" width={100}/>
                        </div>
                        <div>
                            <button className="btn" onClick={handleOpenProfilePicker}>Choose new profile picture</button>
                            <input className={style.fileInput} ref={fileRef} type="file" onChange={handleChangeFile} />
                        </div>
                    </div>
                </div>        
            </DashboardWrapper>
        </AuthProvider>

        
        </div>
    ) 
    
}

import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { getLinks, insertNewLink, updateLink , deleteLink } from "../firebase/firebase";
import Link from '../components/link';
import style from "./dashboardView.module.css"
import styleLinks from "../components/link.module.css"


export default function DashboardView() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [links, setLinks] = useState([])

    async function handleUserLoggedIn(user){
        setCurrentUser(user)
        setState(2)
        const resLinks = await getLinks(user.uid)
        setLinks([...resLinks])
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
        addLink()
    }

    function addLink(){
        if (title !== '' && url !== ''){
            const newLink = {
                id: uuidv4(),
                title: title,
                url: url,
                uid: currentUser.uid,
            };
            const res = insertNewLink(newLink)
            newLink.docId = res.id;
            setTitle('')
            setUrl('')
            setLinks([... links, newLink])
        }
    }

    function handleOnChange(e){
        const value = e.target.value 
        if (e.target.name === 'title'){
            setTitle(value);
        }else if (e.target.name === 'url' ) {
            setUrl(value);
        }
        
    }

    async function handleDeleteLink(docId) { 
        await deleteLink(docId)
        const tmp = links.filter(link => link.docId !== docId)
        setLinks([... tmp])
    }

    async function handleUpdateLink(docId, title, url){ 
        const link = links.find(item => item.docId === docId)
        link.title = title
        link.url = url 
        await updateLink(docId, link)
    }

    return (
        <DashboardWrapper> 
            <div>
                <h1>Dashboard</h1>

                <form className={style.entryContainer} action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Title</label>
                    <input className="input" type="text" name="title" onChange={handleOnChange}/>
                    
                    <label htmlFor="url">Url</label>
                    <input className="input" type="text" name="url" onChange={handleOnChange}/>

                    <input className="btn" type="submit" value="Create new link"/>

                </form>
                <div className={styleLinks.linksContainer}>
                    {
                        links.map((link) => (
                            
                            <Link key={link.docId} docId={link.docId} url={link.url} tittle={link.title} onDelete={handleDeleteLink} onUpdate={handleUpdateLink}/>
                            
                        ))
                    }
                </div>
            </div>
        </DashboardWrapper>
    ) 
     
}



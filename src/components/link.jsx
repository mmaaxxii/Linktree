
import {React , useState, useRef , useEffect} from 'react'
import style from "./link.module.css"

export default function Link({docId , tittle, url , onDelete, onUpdate}){
    const [currentTittle, setCurrentTittle] = useState(tittle);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [editTittle, setEditTittle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);
    const titleRef = useRef(null);
    const urlRef = useRef(null);

    useEffect( () => {
        if(titleRef.current){
            titleRef.current.focus()
        }
    }, [editTittle])

    useEffect( () => {
        if(urlRef.current){
            urlRef.current.focus()
        }
    }, [editUrl])


    function handleEditTittle (){
        setEditTittle(true)
    }

    function handleEditUrl(){
        setEditUrl(true)
    }

    function handleChangeTitle(e){ 
        setCurrentTittle(e.target.value)
    }

    function handleChangeUrl(e){ 
        setCurrentUrl(e.target.value)
    }

    function handleBlurTitle(e){
        setEditTittle(false)
        onUpdate(docId, currentTittle, currentUrl)
        
     }

    function handleBlurUrl(){ 
        setEditUrl(false)
        onUpdate(docId, currentTittle, currentUrl)
         
    }

    function handleDelete(){
        onDelete(docId)
    }

    return (<div className={style.link} key={docId}> 
                <div className={style.linkInfo}>
                    <div className={style.linkTitle}>
                        {editTittle ? (
                        <>
                        <input 
                            ref={titleRef} 
                            value={currentTittle} 
                            onChange={handleChangeTitle} 
                            onBlur={handleBlurTitle}
                            /></> 
                            ) : (
                            <><button className={style.btnEdit} onClick={handleEditTittle}><span className='material-icons'>edit</span></button> {currentTittle} </> 
                            )  }
                        
                        
                    </div> 
                    <div className={style.linkUrl}>
                        {editUrl ? (
                        <>
                        <input 
                            ref={urlRef} 
                            value={currentUrl} 
                            onChange={handleChangeUrl}
                            onBlur={handleBlurUrl}
                            /> </> ): (<><button className={style.btnEdit} onClick={handleEditUrl}><span className='material-icons'>edit</span></button> {currentUrl} </>) }
                            
                    </div>    
                </div>
                <div className={style.linkActions}>
                    <button className={style.btnDelete} onClick={handleDelete}><span className='material-icons'>delete</span></button>
                </div>
            </div>)
}
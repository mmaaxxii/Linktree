
import {React , useState, useRef , useEffect} from 'react'

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

    return (<div key={docId}> 
                <div>
                    <div>
                        {editTittle ? (
                        <>
                        <input 
                            ref={titleRef} 
                            value={currentTittle} 
                            onChange={handleChangeTitle} 
                            onBlur={handleBlurTitle}
                            /></> 
                            ) : (
                            <button onClick={handleEditTittle}>Edit</button> 
                            )  }
                        
                        {currentTittle}
                    </div> 
                    <div>
                        {editUrl ? (
                        <>
                        <input 
                            ref={urlRef} 
                            value={currentUrl} 
                            onChange={handleChangeUrl}
                            onBlur={handleBlurUrl}
                            /> </> ): <button onClick={handleEditUrl}>Edit</button> }
                        
                        {currentUrl}
                    </div>    
                </div>
                <div>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>)
}
import { useEffect, useRef } from "react"
import { RenderHTML } from "./RenderHTML.js"

export const JobDetail = ({job})=> {
    const element = useRef();
    useEffect(()=>{
        element.current.scroll({ 
            top: 0, 
            // behavior: 'smooth' 
        });
    },[job, element])
    return (
        <p ref={element} className="bg-light" style={{height: "500px", overflowY: "scroll"}}>
            <RenderHTML stringHTML={job.description}/>
        </p>
    )
}
import { useContext } from "react"
import { UserContext } from "../contexts/UserContextProvider.js"
import { useNavigate } from "react-router-dom"

export const WithAuthorize = ({roles, children}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    if(!user){
        return <></>
    }

    if(roles && !roles.find((role)=> role === user.role)){
        return <></>
    }

    return <div>
        {children}
    </div>
}
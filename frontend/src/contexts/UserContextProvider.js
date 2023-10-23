import { createContext, useCallback, useEffect, useState } from "react"
import JobService from "../services/JobService.js"
import { LoginForm } from "../components/LoginForm.js"
import { useNavigate } from "react-router-dom"
import ClientFirebaseManager from "../ClientFirebaseManager.js"

export const UserContext = createContext()

export const UserContextProvider = (props)=>{
    const [user, setUser] = useState(undefined)
    const navigate = useNavigate()

    const login = async (email, password) => {
        ClientFirebaseManager.login(email, password)
            .then(()=>{
                alert("You logged in")
            })
            .catch((e)=>{
                alert(e.message)
            })
    }

    const logout = () => {
        ClientFirebaseManager.logout()
            .then(()=>{
                alert("You logged out")
            })
            .catch((e)=>{
                alert(e.message)
            })
    }

    const signup = (email, password) => {
        ClientFirebaseManager.signup(email, password)
            .then(()=>{
                alert("Successfully signed up")
            })
            .catch((e)=>{
                alert(e.message)
            })
    }

    useEffect(()=>{
        ClientFirebaseManager.startConnection(setUser)
    }, [])

    useEffect(()=>{
        if(user){
            navigate('/jobs')
        }else{
            navigate('/')
        }
    }, [user])

    return <UserContext.Provider value = {{user, login, signup, logout}}>
        {props.children}
    </UserContext.Provider>

}


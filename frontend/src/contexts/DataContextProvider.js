import { createContext, useCallback, useContext, useEffect, useState } from "react"
import JobService from "../services/JobService.js"
import { UserContext } from "./UserContextProvider.js"

export const DataContext = createContext()

export const DataContextProvider = (props)=>{
    const {user} = useContext(UserContext)
    let [jobs, setJobs] = useState([])
    let [locations, setLocations] = useState([])

    const fetchJobs = () => {
        JobService.getAllJobs(user.idToken)
        .then(result=>{
            setJobs(result.jobs)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        if(user) fetchJobs()
    }, [user])

    useEffect(()=>{
        setLocations(
            [...new Set(jobs.map(job=>job.location))]
        )

    }, [jobs])

    return <DataContext.Provider value = {{jobs, locations}}>
        {props.children}
    </DataContext.Provider>

}


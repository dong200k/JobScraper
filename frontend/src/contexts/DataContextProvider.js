import { createContext, useCallback, useEffect, useState } from "react"
import JobService from "../services/JobService.js"

export const DataContext = createContext()

export const DataContextProvider = (props)=>{
    let [jobs, setJobs] = useState([])
    let [locations, setLocations] = useState([])

    // Fetch jobs
    useEffect(()=>{
        JobService.getAllJobs()
        .then(result=>{
            setJobs(result.jobs)
            console.log(result.jobs[0])
        })
        .catch(e=>{
            console.log(e)
        })
    }, [])

    useEffect(()=>{
        setLocations(
            [...new Set(jobs.map(job=>job.location))]
        )

    }, [jobs])

    return <DataContext.Provider value = {{jobs, locations}}>
        {props.children}
    </DataContext.Provider>

}


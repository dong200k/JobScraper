import { useContext, useEffect, useRef, useState } from "react"
import { DataContext } from "../contexts/DataContextProvider.js"
import { Job } from "./Job.js"
import { MyPagination } from "./MyPagination.js"
import { JobDetail } from "./JobDetail.js"
import { JobDetailHeader } from "./JobDetailHeader.js"
import { FilterComponent } from "./FilterComponent.js"

/** This component shows a list of jobs */
export const Jobs = ()=> {
    const data = useContext(DataContext)
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentJob, setJob] = useState(undefined)
    const jobsPerPage = 10
    const element = useRef();

    useEffect(()=>{
        setJobs(data.jobs.filter(job=> job.machine_rating))
    }, [data])

    useEffect(()=>{
        setTotalPages(Math.ceil(jobs.length / jobsPerPage))
    }, [jobs])

    const onClickJob = (job)=>{
        return ()=> setJob(job)
    }

    useEffect(()=>{
        element?.current?.scroll({ 
            top: 0, 
        });
    }, [page, element])

    if(jobs.length > 0){
        return (
            <div ref={element}>
                <div className="mt-5 mx-5 container-fluid row">
                    <FilterComponent setJobs={setJobs} jobs={data.jobs} locations={data.locations}/>

                    <div className="col-md-4">
                        {jobs.slice(page*jobsPerPage, page*jobsPerPage + jobsPerPage).map(job=>
                            <Job onClick={onClickJob(job)} job={job} highlight={job===currentJob}/>
                        )}
                        <MyPagination setPage={setPage} page={page} totalPages={totalPages}/>
                    </div>

                    {
                        currentJob && 
                        <div className="col-md-6">
                            <div className="sticky-top">
                                <JobDetailHeader job={currentJob}/>
                                <JobDetail job={currentJob}/>
                            </div>
                        </div>
                    }
                </div>
            </div>   
        )
    }
    
    return(
        <div>
            No Jobs found!
        </div>
    )

}
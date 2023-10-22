import { MachineRatingDetail } from "./MachineRatingDetail.js"

// Shows basic job info
export const Job = ({job, onClick, highlight})=> {
    // console.log(job.date)
    let highlightClass = ""
    if(highlight) highlightClass = "bg-light"
    return (
        <div onClick={onClick} className= {"mb-5 d-flex flex-column " + highlightClass}>
            <div>
                Title: {job.title}
            </div>
            <div>
                Company: {job.company}
            </div>
            <div>
                Location: {job.location}
            </div>
            <div>
                Salary: {job.salary? job.salary : "N/A"}
            </div>
            <div>
                Date: {job.date}
            </div>
            <div>
                Type: {job.job_type}
            </div>
            {job.machine_rating && <MachineRatingDetail machine_rating={job.machine_rating}/>}
        </div>
    )
}
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import JobService from '../services/JobService.js';
import { useContext, useEffect, useState } from 'react';
import { ratings } from '../constants.js';
import { UserContext } from '../contexts/UserContextProvider.js';

export const JobDetailHeader = ({job})=> {
    const [rating, setRating] = useState(undefined)
    const {user} = useContext(UserContext)

    useEffect(()=>{
        setRating(job.rating)
    }, [job])

    const rateJob = (rating) => {
        return () => {
            if(user.role !== "admin" && user.role !== "editor") return alert("Unauthorized, must be an approved editor.")
            JobService.rateJob(job.id, rating, user.idToken)
                .then(()=>{
                    console.log(`successfully rated job ${job.title} with rating: ${rating}`)
                    job.rating = rating
                    setRating(rating)
                })
                .catch((e)=>{
                    console.log("error rating job", e.message)
                })
        }
    }

    const clearRating = () => {
        JobService.deleteJobRating(job.id, user.idToken)
            .then(()=>{
                console.log(`successfully cleared job ${job.title}'s rating `)
                setRating(undefined)
                job.rating = undefined
            })
            .catch((e)=>{
                console.log("error clearing job rating", e.message)
            })
    }

    return (
        <div className="mb-5 d-flex flex-column">
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
            {/* <div>
                {job.date}
            </div> */}
            <div>
                Type: {job.job_type}
            </div>
            <div>
                Date: {job.date}
            </div>
            <DropdownButton className="mb-1" id="dropdown-basic-button" title={rating? "Human Rating: " + rating : "Rate (Human)"} variant="light">
                {ratings.map(rating2=>
                    <Dropdown.Item key={rating2} active={rating2===rating} href="#" onClick={rateJob(rating2)}>{rating2}</Dropdown.Item>
                )}
                <Dropdown.Item key={"clear"} href="#" onClick={clearRating}>clear</Dropdown.Item>

            </DropdownButton>
            {
                job.application_link !== "N/A" && 
                <a className='btn btn-dark' href={job.application_link} target="_blank" >Application Link</a>
            }
            {
                job.company_job_platform_page !== "N/A" && 
                <a className='btn btn-light' target="_blank" href={job.company_job_platform_page}>
                    Company {job.platform} Page
                </a>
            }
        </div>
    )
}
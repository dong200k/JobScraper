import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ratings } from '../constants.js';
import { CustomBootstrapDropdown } from './CustomBootstrapDropdown.js';

export const FilterComponent = ({setJobs, jobs, locations}) => {
    // Filter by date asc/dsc, Location, rating

    const [dateDescending, setDateDescending] = useState(true)
    const sortJobByDates = (jobs) => {
        const newJobs = [...jobs]
        newJobs.sort((a, b)=>{
            let d1 = Date.parse(a.date)
            let d2 = Date.parse(b.date)
            if(d1 === d2){
                return a.title - b.title
            }
            return d1 - d2
        })

        if(dateDescending) {
            newJobs.reverse()
        }

        return newJobs
    }

    useEffect(()=>{
        setJobs(prevJobs=>{
            return sortJobByDates(prevJobs)
        })
    }, [dateDescending])

    const [targetMachineRating, setTargetMachineRating] = useState(undefined)
    useEffect(()=>{
        if(targetMachineRating === undefined) return

        const filteredJobs = jobs.filter((job)=>{
            const machine_rating = job.machine_rating
            if(!machine_rating) return false
            
            const latestRating = machine_rating[machine_rating.length - 1]
            return latestRating.rating === targetMachineRating
        })
        setJobs(filteredJobs)
    }, [targetMachineRating, jobs, locations])

    const [targetHumanRating, setTargetHumanRating] = useState(undefined)
    useEffect(()=>{
        if(targetHumanRating === undefined) return

        const filteredJobs = jobs.filter((job)=>{
            const human_rating = job.rating
            if(!human_rating) return false
            
            return human_rating === targetHumanRating
        })
        setJobs(filteredJobs)
    }, [targetHumanRating, jobs])

    const [location, setLocation] = useState(undefined)
    // useEffect(()=>{
    //     if(location !== undefined) setJobs(jobs.filter(job=>job.location.toLowerCase().startsWith(location)))
    // }, [location])

    const resetFilters = () => {
        setTargetHumanRating(undefined)
        setTargetMachineRating(undefined)
        setLocation(undefined)
        setJobs(sortJobByDates(jobs))
    }

    return (
        <div className='d-flex' style={{zIndex: 2000}}>
            <button onClick={()=>setDateDescending(!dateDescending)} className={dateDescending? 'btn btn-dark': 'btn btn-secondary'}>
                Toggle Date Order: {dateDescending? "Descending": "Ascending"}
            </button>

            <DropdownButton className="ml-5" id="dropdown-basic-button" title={"Rating (Machine): " + targetMachineRating} variant="light">
                {ratings.map(rating=>
                    <Dropdown.Item key={rating} href="#" active={rating===targetMachineRating} onClick={()=>setTargetMachineRating(rating)}>{rating}</Dropdown.Item>
                )}
            </DropdownButton>

            <DropdownButton className="ml-5 mr-5" id="dropdown-basic-button" title={"Rating (Human): " + targetHumanRating} variant="light">
                {ratings.map(rating=>
                    <Dropdown.Item key={rating} href="#" active={rating===targetHumanRating} onClick={()=>setTargetHumanRating(rating)}>{rating}</Dropdown.Item>
                )}
            </DropdownButton>
                    
            <div className='ml-5'>
                <CustomBootstrapDropdown/>
            </div>

            <button className="btn btn-danger ml-5" onClick={resetFilters}>Reset</button>
        </div>
    )
}
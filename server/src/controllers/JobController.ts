import { FieldValue, getFirestore } from "firebase-admin/firestore"
import { convertCsvToJson, mergeJobMachineRating } from "../util"
import { addJobs, getJobs, updateJob } from "../crud/JobCrud"
import { IJob, IResult } from "../interfaces"
import MLService from "../services/MLService"

export default class JobController{
    static async getAllJobs(req: any, res: any){        
        let result: IResult = await convertCsvToJson('jobs.csv') as IResult
        const data = result.data
        const jobs: IJob[] = []

        // Convert data into a json list format
        // let colNames = data.shift() as string[]
        // data.forEach(job => {
        //     let obj:IJob = {}

        //     for(let i=0;i<colNames.length;i++){
        //         let colName = colNames[i]
        //         let value = job[i]
        //         obj[colName] = value
        //     }
        //     jobs.push(obj)
        // });

        try {
            const jobs = await getJobs()
            res.status(200).json({
                jobs
            })
        } catch (error) {
            res.status(404).json({error})
        }
    }

    static async updateJobRating(req: any, res: any){
        let {id} = req.params
        let {rating} = req.body
        let allowedRatings = ["entry-level", "entry-mid-level", "mid-level", "senior-level", "unknown"]

        // console.log("update job rating", id, rating)
        try {
            if(allowedRatings.find(allowedRating=> allowedRating === rating) === undefined) {
                throw new Error(`Rating must be one of ${allowedRatings}`)
            }

            await updateJob(id, {rating})
            res.status(200).send({message: "successfully updated job"})
        } catch (error: any) {
            res.status(404).send({message: error.message})
        }
    }

    static async updateJob(req: any, res: any){
        console.log("updating job")
        let {id} = req.params
        let {updates} = req.body
        if(typeof updates === typeof ""){
            updates = JSON.parse(updates)
        }

        // console.log("update job rating", id, rating)
        try {
            // console.log(updates)
            console.log(typeof updates)
            await updateJob(id, updates)
            res.status(200).send({message: "successfully updated job"})
        } catch (error: any) {
            res.status(404).send({message: error.message})
        }
    }

    static async updateJobsMachineRating(req: any, res: any){
        try {
            const jobs = await getJobs()
            const predictions = await MLService.getMultiplerJobMachineRating(jobs)
            if(predictions.length !== jobs.length) throw new Error("Error rating jobs. Predictions length different from jobs length")

            const size = predictions.length

            for(let i=0;i<size;i++){
                const job = jobs[i]
                let existingRatings = job['machine_rating']
                let machineRatings=  predictions[i]
                let newRatings = mergeJobMachineRating(machineRatings, existingRatings)
                console.log('Rated job:', job.id, machineRatings)
                await updateJob(job.id, {"machine_rating": newRatings})
            }

            res.status(200).send({message: "successfully rated jobs"})
        } catch (error: any) {
            console.log(error)
            res.status(404).send({message: error.message})
        }
    }

    static async deleteJobRating(req: any, res: any){
        let {id} = req.params
        try {
            updateJob(id, {rating: FieldValue.delete()})
            res.status(200).send({message: "successfully removed rating"})
        } catch (error: any) {
            res.status(404).send({message: error.message})
        }
    }

    static async addJobs(req: any, res: any){
        let {jobs} = req.body
        try {
            await addJobs(JSON.parse(jobs))
            res.status(200).send({message: "successfully added jobs"})
        } catch (error) {
            console.log(error)
            res.status(404).send({error})
        }
    }
}
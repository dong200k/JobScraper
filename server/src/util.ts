import Papa from 'papaparse';
import fs from 'fs' 
import crypto from 'crypto'    

export const convertCsvToJson = (fileName: string)=>{
    const file = fs.createReadStream(fileName);
    return new Promise((resolve, reject)=> 
        Papa.parse(file, {
            complete: (res: any)=>{
                resolve(res)
            }, 
            error: (err: any)=>{
                reject(err)
            },
            delimiter: ",",
        })
    );
}

export const getIdFromJob = (job: any) => {
    let jobTitleCompany = job.title + job.company
    const hash = crypto.createHash('sha256').update(jobTitleCompany, 'utf8').digest('hex');
    return hash
}

export const mergeJobMachineRating = (machineRatings: any[], existingRatings: any[] | undefined) => {
    if(!existingRatings) return machineRatings

    machineRatings.forEach(rating=>{
        const version = rating.version
        const versionExists = existingRatings.find(existingRating=> existingRating.version === version)
        if(!versionExists){
            existingRatings.push(rating)
        }
    })

    return existingRatings
}
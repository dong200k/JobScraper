import { getFirestore } from "firebase-admin/firestore"
import { getIdFromJob } from "../util"

export const getJobs = async () => {
    const db = getFirestore()
    const jobColRef = db.collection("jobs")
    const querySnapShot = await jobColRef.limit(100).orderBy('postedAt', 'desc').get()

    const jobs: any[] = []
    querySnapShot.forEach(job=>{
        jobs.push({...job.data(), id: job.id})
    })

    return jobs
}

export const updateJob = async (id: any, updates: any)=> {
    const db = getFirestore()
    let docRef = db.collection("jobs").doc(id)
    let docSnap = await docRef.get()
    
    if(!docSnap.exists) throw new Error("Job does not exist yet")
    try {
        await docRef.update(updates) 
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
    
}

export const addJobs = async (jobs: any)=> {
    const db = getFirestore()
    const batch = db.batch()
    
    for(let job of jobs){
        const jobId = getIdFromJob(job)
        const docRef = db.collection('jobs').doc(jobId)
        
        const doc = await docRef.get()
        if(doc.exists){
            // Job posting already in database
            const data = doc.data()
            if(data){
                const oldDate = Date.parse(data.date)
                const newDate = Date.parse(job.date)

                // Overwrite if the date of job is more recent
                if(newDate > oldDate){
                    await docRef.update({
                        ...job,
                        postedAt: new Date(newDate).getTime()
                    })
                }
            }
        }else{
            // Job posting not in database so create it
            const timeNow = Date.now()
            const newDate = Date.parse(job.date)
            batch.set(docRef, {
                ...job,
                // updatedAt: timeNow,
                // createdAt: timeNow,
                postedAt: new Date(newDate).getTime()
            });
        }
    }
    await batch.commit()
}


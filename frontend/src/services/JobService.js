import { baseUrl } from "../constants";

export default class JobService{
    static async getAllJobs(idToken){
        const url = baseUrl + "/jobs"
        let res = await fetch(url, {
            method: "get",
            headers: {
                "Content-type": "application/json",
                'Authorization': idToken,
            }
        });
        let json = await res.json()
        if(res.status === 200) return json
        else throw new Error(json.error)
    }

    static async rateJob(id, rating, idToken){
        const url = baseUrl + "/jobs/" + id + "/rate"
        console.log(url)
        let res = await fetch(url, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                'Authorization': idToken,
            },
            body: JSON.stringify({
                rating
            })
        });
        let json = await res.json()
        if(res.status === 200) return json
        else throw new Error(json.error)
    }

    static async deleteJobRating(id, idToken){
        const url = baseUrl + "/jobs/" + id + "/rate"
        console.log(url)
        let res = await fetch(url, {
            method: "delete",
            headers: {
                "Content-type": "application/json",
                'Authorization': idToken,
            },
        });
        let json = await res.json()
        if(res.status === 200) return json
        else throw new Error(json.error)
    }
}
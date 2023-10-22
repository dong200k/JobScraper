import { baseUrl } from "../constants";

export default class JobService{
    static async getAllJobs(){
        const url = baseUrl + "/jobs"
        let res = await fetch(url, {
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        });
        let json = await res.json()
        if(res.status === 200) return json
        else throw new Error(json.error)
    }

    static async rateJob(id, rating){
        const url = baseUrl + "/jobs/" + id + "/rate"
        console.log(url)
        let res = await fetch(url, {
            method: "put",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                rating
            })
        });
        let json = await res.json()
        if(res.status === 200) return json
        else throw new Error(json.error)
    }

    static async deleteJobRating(id){
        const url = baseUrl + "/jobs/" + id + "/rate"
        console.log(url)
        let res = await fetch(url, {
            method: "delete",
            headers: {
                "Content-type": "application/json"
            },
        });
        let json = await res.json()
        if(res.status === 200) return json
        else throw new Error(json.error)
    }
}
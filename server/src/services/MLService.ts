export default class MLService{
    static baseUrl = "http://127.0.0.1:8000"

    static async getJobMachineRating(text: string, title: string){
        const url = this.baseUrl + "/predict?" + new URLSearchParams({text, title})
        let res = await fetch(url, {
            method: "get",
        });
        let json = await res.json()
        if(res.status === 200) return json.result
        else throw new Error(json.error)
    }

    static async getMultiplerJobMachineRating(jobs: any){
        const url = this.baseUrl + "/predict/multiple"
        let res = await fetch(url, {
            method: "post",
            body: JSON.stringify({jobs})
        });
        let json = await res.json()
        if(res.status === 200) return json.predictions
        else throw new Error(json.error)
    }
}
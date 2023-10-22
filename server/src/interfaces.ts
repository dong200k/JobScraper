// -------------- Interfaces for JobController --------------
export interface IResult{
    data: Array<string[]>
}

export interface IJob{
    [id: string]: string
}
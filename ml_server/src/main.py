from fastapi import FastAPI, Request
from .helpers import *
from fastapi import status, HTTPException
from .JobService import *
app = FastAPI()

models = InitModels()

@app.get("/predict")
def predict(request: Request):
    text = request.query_params["text"]
    title = request.query_params["title"]
    
    return predictOne(models, title, text)

@app.post("/predict/multiple")
def asycpredict(request: Request):
    jobs = getJobs()
    failCount = 0
    # try:
    for job in jobs:
        machineRatings = predictOne(models, job['title'], job['description_text'])['result']
        if('machine_rating' in job):
            existingRatings = job['machine_rating'] 
        else:
            existingRatings = None
        newRatings = mergeJobMachineRating(machineRatings, existingRatings)
        try:
            status_code = updateJob(job, {"machine_rating": newRatings})
            if(not status_code == 200):
                failCount+=1
        except:
            failCount += 1
            continue

    return {"message": f"Added machine rating to ${len(jobs)} jobs. Failed to add rating to ${failCount}."}
    # except:
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail="error predicting"
    #     )

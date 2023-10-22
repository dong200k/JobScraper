import requests
import json

baseUrlAPIServer = "http://localhost:3001/jobs"
baseUrlMLServer = "http://127.0.0.1:8000"

def postJobs(jobs):
    headers = {'content-type': 'application/json'}
    data = {"jobs": json.dumps(jobs)}
    print(jobs[0])
    res = requests.post(baseUrlAPIServer, data=data)
    # res = requests.post(baseUrl, data={"a": "b"})
    print(res)

def getMachineRating(jobs):
    for job in jobs:
        res = requests.get(baseUrlMLServer + "/predict", params={"text": job["description_text"], "title": job['title']})
        if(res.status_code == 200):
            job['machine_rating'] = json.loads(res.content)['result']
            print(job['machine_rating'])

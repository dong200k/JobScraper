import requests
import json

baseUrlAPIServer = "http://localhost:3001/jobs"

def updateJob(job, updates):
    url = baseUrlAPIServer + "/" + job['id']
    data = {"updates": json.dumps(updates)}
    res = requests.put(url, data)
    # res = requests.post(baseUrl, data={"a": "b"})
    return res.status_code

def getJobs():
    res = requests.get(baseUrlAPIServer)
    json = res.json()
    return json['jobs']
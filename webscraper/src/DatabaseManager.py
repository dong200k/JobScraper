import pandas as pd 
import os

class DatabaseManager:
    def __init__(self):
        pass

    def writeToDatabase(self, jobs):
        self.writeJobsToDataframe(jobs)

    def writeJobsToDataframe(self, jobs):
        df = pd.DataFrame(jobs) 

        if not os.path.isfile('jobs.csv'):
            df.to_csv('jobs.csv')
        else:
            df.to_csv("jobs.csv", mode='a', header=False, encoding='utf-8', index=False)
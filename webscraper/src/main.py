from scrapers.IndeedJobScraper import IndeedJobScraper, IndeedJobCleaner
from datetime import datetime
from DatabaseManager import DatabaseManager
from selenium import webdriver
from JobService import postJobs, getMachineRating, getJobs

def main():
    start = datetime.now()
    driver = webdriver.Chrome()
    indeedJobCleaner = IndeedJobCleaner()

    jobs = []

    # Scrape indeed jobs
    indeedJobs = []
    jobscraper = IndeedJobScraper(driver=driver)
    
    # indeedJobs.extend(jobscraper.ScrapeJobs("Software Engineer", ""))
    # indeedJobs.extend(jobscraper.ScrapeJobs("Software Engineer", "New York, NY", days=1, clean=False))
    indeedJobs.extend(jobscraper.ScrapeJobs("Software Engineer", "Remote"))
    jobs.extend(indeedJobCleaner.cleanJobs(jobs=indeedJobs))

    # TODO scrape linkedin and glassdoor jobs too

    # Write to database
    database_manager = DatabaseManager()
    database_manager.writeToDatabase(jobs=jobs)

    # Compute time
    end = datetime.now()
    diff = end - start
    seconds_elapsed = int(diff.total_seconds())
    print(f"{len(jobs)} jobs found in {seconds_elapsed} seconds")

    # Posting jobs and get rating of jobs
    getMachineRating(jobs=jobs)
    postJobs(jobs=jobs)

if __name__ == '__main__':
    main()
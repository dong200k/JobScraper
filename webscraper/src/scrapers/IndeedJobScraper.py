from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from random import random
from selenium.webdriver.support.ui import WebDriverWait
from datetime import datetime, date, timedelta
import re

# Handles scraping jobs from indeed
class IndeedJobScraper:
    baseUrl = "https://www.indeed.com"

    def __init__(self, driver: webdriver.Chrome) -> None:
        self.driver = driver
    
    def scrapeJobDataFromAPage(self):
        driver = self.driver

        # Grab left and right sections
        job_boxes = driver.find_elements(By.CLASS_NAME, "job_seen_beacon")
        job_search_right_pane = driver.find_element(By.CSS_SELECTOR, ".jobsearch-RightPane")

        # Get job data
        jobs = []
        for i in range(len(job_boxes)):
            job = {}
            time.sleep(random()* 2 + 1)
            element = job_boxes[i]

             # Grab company name
            try:
                job["company"] = element.find_element(By.CLASS_NAME, "companyName").text
            except:
                job["company"] = "N/A"

            # Grab company location
            try:
                job["location"] = element.find_element(By.CLASS_NAME, "companyLocation").text
            except:
                job["company"] = "N/A"

            # Grab and Click job title
            try:
                job_title_element = element.find_element(By.TAG_NAME, "a")
                job["title"] = job_title_element.text
                job_title_element.click()
            except:
                job["title"] = "N/A"

            # Wait until right side panel is loaded
            def jobInfoIsLoaded(driver: webdriver):
                try:
                    header_job_title = driver.find_element(By.CLASS_NAME, "jobsearch-JobInfoHeader-title").text
                    header_company = driver.find_element(By.CSS_SELECTOR, "[data-testid='inlineHeader-companyName']").text

                    infoLoaded = (header_job_title.find(job["title"]) != -1) and (header_company.find(job["company"]) != -1)
                    # print("job info status:", infoLoaded)
                    return infoLoaded
                except:
                    return False

            try:
                wait = WebDriverWait(self.driver, timeout=3)
                wait.until(jobInfoIsLoaded)
            except:
                print("job: ", job["title"], ". Right job pane not loaded correctly. Moving to next job.")
                continue
                

            # After the right pane updates grab description
            try:
                description_element = job_search_right_pane.find_element(By.ID, "jobDescriptionText")
                job["description"] = description_element.get_attribute("innerHTML")
                job["description_text"] = description_element.text
            except:
                job["description"] = "N/A"
                job["description_text"] = "N/A"

            # Grab job type and salary
            try:
                salaryAndJobTypeElement = driver.find_element(By.ID, "salaryInfoAndJobType")
                spans = salaryAndJobTypeElement.find_elements(By.TAG_NAME, "span")
                for span in spans:
                    text = span.text
                    if(text.find("$") != -1):
                        job["salary"] = text
                    else:
                        job["job_type"] = text
            except:
                job["salary"] = "N/A"
                job["job_type"] = "N/A"
            
            # Grab application link (if available)
            try:
                apply_on_company_button = job_search_right_pane.find_element(By.ID, "applyButtonLinkContainer")
                job["application_link"] = apply_on_company_button.find_element(By.TAG_NAME, "button").get_attribute("href")
            except:
                job['application_link'] = "N/A"


            # Grab company indeed page (used to find job post in case of no application link)
            try:
                company_header_element = job_search_right_pane.find_element(By.CSS_SELECTOR, "[data-testid=inlineHeader-companyName]")
                href = company_header_element.find_element(By.TAG_NAME, "a").get_attribute("href")
                job["company_job_platform_page"] = href
            except:
                job["company_job_platform_page"] = "N/A"

            # Grab date posted
            try:
                date = element.find_element(By.CLASS_NAME, "date").text
                job['posted'] = date
            except:
                job['posted'] = "N/A"
 
            job["platform"] = "Indeed"

            jobs.append(job)
        
        return jobs

    # Scrapes Indeed jobs from last 14 days with a given location and query and returns  a list of jobs
    # Ex: query = "software engineer", location = "New York, NY"
    def ScrapeJobs(self, query: str, location: str, days = 14, clean=True):
        url = self.baseUrl + "/jobs?q=" + query + "&l=" + location + "&fromage=" + str(days)
        url = "https://www.indeed.com/jobs?q=software+engineer+%24110%2C000&l=Alabama&sc=0kf%3Aattr%28DSQF7%29attr%28JPSJ9%29jt%28fulltime%29%3B&fromage=1&remotejob=032b3046-06a3-4876-8dfd-474eb5e7ed11&vjk=0d6f48f66ac9b87e"
        driver = self.driver
        driver.get(url)
        driver.implicitly_wait(3)

        jobs = []

        while True:
            # Get data from a single page
            jobs.extend(self.scrapeJobDataFromAPage())

            # Attempt to goto next page
            try:
                next_page_url = driver.find_element(By.CSS_SELECTOR, "[aria-label='Next Page']").get_attribute("href")
                driver.get(next_page_url)
            except:
                print("reached last page")
                break

        if(clean):
            jobCleaner = IndeedJobCleaner()
            new_jobs = jobCleaner.cleanJobs(jobs=jobs)
            return new_jobs
        return jobs

    # Takes in a list of list where each list is of length 2 containing the query followed by the location. 
    # Ex: [["Software Engineer", "New York, NY"], ["Data Scientist", "Remote"]]
    def scrapeMultipleQueries(self, queries, days = 14):
        jobs = []
        # Scrape jobs
        for i in range(len(queries)):
            what = queries[i][0]
            where = queries[i][1]
            jobs.append(self.ScrapeJobs(what, where, days, clean=False))

        # Clean jobs and remove dupes
        jobCleaner = IndeedJobCleaner()
        jobCleaner.cleanJobs(jobs=jobs)
        return jobs

# Handles cleaning job information such as dates, duplicates, etc.
class IndeedJobCleaner:
    def cleanJobs(self, jobs):
        jobs = self.addDateToJobs(self.removeDuplicateJobs(jobs))

        for job in jobs:
            print(job["title"], job["date"])
        return jobs

    def addDateToJobs(self, jobs):
        for job in jobs:
            posted = job["posted"]

            if(posted.find("today") != -1) or (posted.find("Just") != -1):
                job["date"] = str(date.today())

            elif(posted.find("day") != -1):
                try:
                    days_ago = int(re.search(r'\d+', posted).group())
                    job["date"] = str((datetime.today() - timedelta(days=days_ago)).date())
                except:
                    job["date"] = str((datetime.today() - timedelta(days=30)).date())
            else:
                print("no date", job["posted"])
                job["date"] = str((datetime.today() - timedelta(days=30)).date())
        return jobs

    def removeDuplicateJobs(self, jobs):
        my_dict = {}

        for job in jobs:
            key = (job["title"], job["company"])
            my_dict[key] = job

        return list(my_dict.values())

        
        



            



import express from 'express'
import JobController from '../controllers/JobController'
import { AuthenticateRole } from '../middleware/AuthenticateRole'
import { IsAuthorized } from '../middleware/IsAuthorized'

const JobRouter = express.Router()

JobRouter.get(
    "/jobs", 
    IsAuthorized,
    JobController.getAllJobs
)

JobRouter.put(
    "/jobs/:id/rate", 
    IsAuthorized,
    AuthenticateRole({allowedRoles: ["editor", "admin"]}),
    JobController.updateJobRating
)

JobRouter.put(
    "/jobs/:id",
    // IsAuthorized,
    // AuthenticateRole({allowedRoles: ["admin"]}),
    JobController.updateJob
)

JobRouter.delete(
    "/jobs/:id/rate", 
    // IsAuthorized,
    // AuthenticateRole({allowedRoles: ["admin"]}),
    JobController.deleteJobRating
)

JobRouter.post(
    "/jobs",
    JobController.addJobs
)

JobRouter.post(
    "/jobs/machineratings",
    JobController.updateJobsMachineRating
)

JobRouter.post(
    "/jobs/updateDates",
    JobController.updateDates
)


export default JobRouter
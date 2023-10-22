import express from 'express'
import JobController from '../controllers/JobController'
import { AuthenticateRole } from '../middleware/AuthenticateRole'
import { IsAuthorized } from '../middleware/IsAuthorized'

const JobRouter = express.Router()

JobRouter.get(
    "/jobs", 
    JobController.getAllJobs
)

JobRouter.put(
    "/jobs/:id/rate", 
    // IsAuthorized,
    // AuthenticateRole({allowedRoles: ["user"]}),
    JobController.updateJobRating
)

JobRouter.put(
    "/jobs/:id",
    JobController.updateJob
)

JobRouter.delete(
    "/jobs/:id/rate", 
    // IsAuthorized,
    // AuthenticateRole({allowedRoles: ["user"]}),
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

export default JobRouter
import AdminController from "../controllers/AdminController";
import { AuthenticateRole } from "../middleware/AuthenticateRole";
import { IsAuthorized } from "../middleware/IsAuthorized";
import express from 'express';

const AdminRouter = express.Router();

AdminRouter.post("/assignrole", 
    IsAuthorized, 
    AuthenticateRole({allowedRoles: ["admin"]}),
    AdminController.assignRole
)

AdminRouter.post("/removerole",
    IsAuthorized, 
    AuthenticateRole({allowedRoles: ["admin"]}),
    AdminController.removeRole
)

AdminRouter.get("/getrole/:id",
    IsAuthorized, 
    AuthenticateRole({allowedRoles: ["admin"]}),
    AdminController.getRole
)

export default AdminRouter;
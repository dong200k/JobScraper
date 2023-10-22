import { getAuth } from "firebase-admin/auth";

/** Checks that the user is logged in */
export const IsAuthorized = (req: any, res: any, next: any)=> {
    if(!req.headers.authorization) return res.status(403).send({message: 'No credentials!'});

    if(req.headers.authorization === "")
    
    getAuth().verifyIdToken(req.headers.authorization).then((token) => {
        req.myAuth = {};
        req.myAuth.type = "user";
        req.myAuth.token = token;
        next();
    }).catch((error) => {
        return res.status(403).send(error);
    })
}
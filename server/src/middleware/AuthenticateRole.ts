interface IConfig{
    allowedRoles: string[],
}

/** Checks if user has correct role based on config */
export const AuthenticateRole = (config: IConfig) => {
    return (req: any, res: any, next: any) => {
        let { type, token } = req.myAuth;

        console.log("Authenticating role, your role: ", token.role)
        console.log("allowed roles", config.allowedRoles)

        // Allow users with specific roles.
        if(type === "user" && config.allowedRoles?.includes(token.role)) return next();

        return res.status(403).send({message: "Not Authorized!"});
    }
}
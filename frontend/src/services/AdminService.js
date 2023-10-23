import { baseUrl } from "../constants.js";

export default class AdminService{
    static async adminAssignRole(IdToken, data) {
        console.log("Giving user a role...");
        return fetch(baseUrl + `/admin/assignrole`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': IdToken,
            },
            body: JSON.stringify(data)
        });
    }

    static async adminRemoveRole(IdToken, data) {
        console.log("Removing role from user...");
        return fetch(baseUrl + `/admin/removerole`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': IdToken,
            },
            body: JSON.stringify(data)
        });
    }

    static async adminGetRole(IdToken, data) {
        console.log("Checking user role...");
        return fetch(baseUrl + `/admin/getrole/${data.uid}`, {
            method: "GET",
            headers: {
                'Authorization': IdToken,
            },
        });
    }
}
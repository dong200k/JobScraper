import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContextProvider.js';
import Button from 'react-bootstrap/Button';
import AdminService from '../services/AdminService.js';

export const Roles = () => {
    const roles = ["editor", "undefined"]
    const {user} = useContext(UserContext)
    const [uid, setUid] = useState("")
    const [targetRole, setTargetRole] = useState("undefined")

    const onSubmit = (e) => {
        e.preventDefault()

        if(targetRole && targetRole !== "undefined"){
            AdminService.adminAssignRole(user.idToken, {uid, role: targetRole})
                .then(async (res)=>{
                    const json = await res.json()
                    alert(json.message)
                })
                .catch(e=>{
                    alert(e.message)
                })
        }else{
            removeRole()
        }
    }

    const removeRole = () => {
        AdminService.adminRemoveRole(user.idToken, {uid})
            .then(async (res)=>{
                const json = await res.json()
                alert(json.message)
            })
            .catch(e=>{
                alert(e.message)
            })
    }

    const onGetRole = () => {
        if(uid === "") return alert("must enter a uid")
        AdminService.adminGetRole(user.idToken, {uid})
            .then(async (res)=>{
                const json = await res.json()
                alert(json.message)
            })
            .catch(e=>{
                alert(e.message)
            })
    }

    return (
        <Form className="container" style={{width: "50%", marginTop: "10%"}} onSubmit={onSubmit}>
            <Form.Group className="mb-3 d-flex flex-row">
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="Enter uid of user (found on firebase)" value={uid} onChange={(e)=>setUid(e.target.value)}/>
            
                <DropdownButton className="ml-5" id="dropdown-basic-button" title={"Role to assign: " + targetRole} variant="light">
                    {roles.map(role=>
                        <Dropdown.Item key={role} active={role===targetRole} onClick={()=>setTargetRole(role)}>{role}</Dropdown.Item>
                    )}
                </DropdownButton>
            </Form.Group>

            

            <Button className="ml-5" variant="success" type="submit">
                Assign Role
            </Button>

            {/* <Button className="ml-5" variant="danger" onClick={onRemove}>
                Remove Current Role
            </Button> */}

            <Button className="ml-5" variant="info" onClick={onGetRole}>
                Get Role
            </Button>
        </Form>
    )
}
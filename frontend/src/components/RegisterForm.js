import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContextProvider.js"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const {signup} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            return alert("Password must match")
        }

        signup(email, password)
    }

    const onChange = (type) => {
        return (e) => {
            switch(type){
                case "email":
                    setEmail(e.target.value)
                    break;
                case "password":
                    setPassword(e.target.value)
                    break;
                case "confirm password":
                    setConfirmPassword(e.target.value)
                    break;
            }
        }
    }

    const onClickLogin = () => {
        navigate("/")
    }

    return (
        <Form className="container" style={{width: "50%", marginTop: "10%"}} onSubmit={onSubmit}>
            <h1 className="">Register</h1>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChange("email")}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onChange("password")}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Reenter password" value={confirmPassword} onChange={onChange("confirm password")}/>
            </Form.Group>

            <Button variant="dark" type="submit">
                Register
            </Button>

            <Button className="ml-5" variant="light" onClick={onClickLogin}>
                Login
            </Button>
        </Form>
    )
}
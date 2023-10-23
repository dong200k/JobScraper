import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContextProvider.js"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const {login} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        login(email, password)
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
            }
        }
    }

    const onClickRegister = () => {
        navigate("/register")
    }

    return (
        <Form className="container" style={{width: "50%", marginTop: "10%"}} onSubmit={onSubmit}>
            <h1 className="">Login</h1>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChange("email")}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onChange("password")}/>
            </Form.Group>

            <Button variant="dark" type="submit">
                Login
            </Button>

            <Button className="ml-5" variant="light" onClick={onClickRegister}>
                Register
            </Button>
        </Form>
    )
}
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../contexts/UserContextProvider.js';
import Nav from 'react-bootstrap/Nav';
import { WithAuthorize } from './WithAuthorize.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const NaviBar = () => {
    const {user, logout} = useContext(UserContext)
    const navigate = useNavigate()
    if(!user) return

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
            <Navbar.Brand>Job Scraper</Navbar.Brand>
            <Nav className="me-auto">
                <WithAuthorize roles={['admin']}>
                    <Nav.Link onClick={()=>navigate('/roles')}>Roles</Nav.Link>
                </WithAuthorize>
                <Nav.Link onClick={()=>navigate('/jobs')}>Jobs</Nav.Link>
            </Nav>

            <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#">{user.username}</a>
                    </Navbar.Text>
                    <Button className="ml-5" variant="dark" onClick={logout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from "react-router-dom";


const Login = ()=>{
    const emailRef = useRef();
    const passwordRef = useRef();
    const {logIn, currentUser} = useAuth();
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            setError('');
            setLoading(true)
            await logIn(emailRef.current.value, passwordRef.current.value);
                history.push("/dashboard");
        }catch{
            setError(' Failed to sign in')
        }
        setLoading(false)

        //await logIn(emailRef.current.value, passwordRef.current.value)
    }
    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button type="submit" className="w-100" disabled={loading}>Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login;
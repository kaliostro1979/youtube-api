import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from "react-router-dom";


const SignUp = (props)=>{
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {signUp, currentUser} = useAuth();
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {

        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmationRef.current.value){
            return setError(' Password do not match')
        }

        try{
            setError('');
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/");
        }catch{
            setError(' Failed to create an account')
        }
        setLoading(false)

        //await signUp(emailRef.current.value, passwordRef.current.value)
    }
        return(
        <>
            <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">Sign Up</h2>
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
                       <Form.Group id="password-confirm">
                           <Form.Label>Password-confirm</Form.Label>
                           <Form.Control type="password" ref={passwordConfirmationRef} required/>
                       </Form.Group>
                       <Button type="submit" className="w-100" disabled={loading}>Sign Up</Button>
                   </Form>
               </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default SignUp;
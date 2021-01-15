import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from "react-router-dom";


const UpdateProfile = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {currentUser, updatePassword, updateEmail} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError(' Password do not match')
        }

        const promises = [];
        setLoading(true)
        setError('');

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push('/')
            })
            .catch(() => {
                setError('Failed to update account')
            })
            .finally(() => {
                setLoading(false)
            });

        //await signUp(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password-confirm</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmationRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Button type="submit" className="w-100" disabled={loading}>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile;
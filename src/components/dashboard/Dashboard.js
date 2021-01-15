import React, {useState}from 'react'
import {Alert, Card, Button} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import {useAuth} from '../../context/AuthContext'

const Dashboard = () => {
    const [error, setError] = useState('');
    const {currentUser, logOut} = useAuth();
    const history = useHistory();


    async function handleLogout(){
        setError('');
        try{
            await logOut();
            history.push('/')
        }catch{
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="w-100 btn btn-primary">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
};

export default Dashboard
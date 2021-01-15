import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from "../../context/AuthContext";


const PrivateRout = ({component: Component, ...rest}) => {

    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (currentUser) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to="/login"/>
                }
            }
            }
        >
        </Route>
    )
};


export default PrivateRout;
import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const LoginPrivateRoute = ({component: Component, ...rest}) => (
<Route
{...rest}
render={props => 
!localStorage.getItem("token") ? (
    <Component {...props} />
) :(
    <Redirect
    to={{
        pathname: "/landingpage",
        state: {from: props.location}
    }}
    />
)

}
/>
)
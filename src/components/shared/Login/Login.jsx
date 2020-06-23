import React from "react";
import { connect } from "@cerebral/react";
import { GoogleLogin } from 'react-google-login';
import { sequences } from "cerebral";

import "./Login.css"


const Login = connect(
    {
        getUser: sequences`getUser`
    },
    ({
        getUser
    }) => {

        const responseGoogle = (response) => {
            const email = response.Qt.Au; // might not be the right way to access email
            getUser({ email });
        }

        return (
            <div className="centerCar">
                <div className="car-container" >

                    <div className="app-title">Car reservation</div>
                    <div className="car"><i className="zmdi zmdi-car"></i></div>

                    <div style={{ textAlign: "center" }}>
                        <GoogleLogin
                            clientId="" // TODO add client id
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

export default Login;

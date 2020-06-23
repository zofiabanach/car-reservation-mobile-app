import React from "react";
import { connect } from "@cerebral/react";
import { sequences } from "cerebral";
import { Page, Button, Toolbar } from 'react-onsenui';
import { GoogleLogout } from 'react-google-login';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import '../../AppMain.css';
import './Menu.css'

const Menu = connect(
    {
        startRes: sequences`startRes`,
        startReportDamage: sequences`startReportDamage`,
        logout: sequences`logout`,
        startCarsAvailability: sequences`startCarsAvailability`,
    }, ({
        startRes,
        startReportDamage,
        logout,
        startCarsAvailability,
    }) => {
    return (
        <Page renderToolbar={() =>
            <Toolbar>
                <div className="center">
                    Menu
              </div>
            </Toolbar>}>

            <div>
                <div className="buttonMargin">
                    <Button modifier="large--cta" className="buttonStyle" onClick={startRes} >
                        <i className="fa fa-car"></i> New reservation
                    </Button>
                </div>
                <div className="buttonMargin">
                    <Button modifier="large--cta" className="buttonStyle" onClick={startReportDamage} >
                        <i className="fa fa-camera"></i> Report damage
                    </Button>
                </div>
                <div className="buttonMargin">
                    <Button modifier="large--cta" className="buttonStyle" onClick={startCarsAvailability} >
                        <i className="fa fa-calendar"></i> Cars availability
                    </Button>
                </div>

                <div className="logoutDiv">
                    <GoogleLogout
                        clientId="309661157139-dln6dnono7b7gtm69quenvctvbh0qibq.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        render={renderProps => (
                            <Button className="buttonStyle"
                                modifier="large--cta" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <i className="fa fa-sign-out-alt"></i>  Logout
                            </Button>
                        )}
                    >
                    </GoogleLogout>
                </div>
            </div>
        </Page>
    );
}
);

export default Menu

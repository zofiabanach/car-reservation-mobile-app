import React from 'react';
import { Page, Toolbar, BackButton, ToolbarButton } from 'react-onsenui';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral";

import '../../AppMain.css';
import { formatDateToPrint } from '../../../utils';

const Summary = class Summary extends React.Component {

    state = {
        isConfirmRegister: false
    }

    confirmReservation = () => {
        this.props.confirmReservation();
    }

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.goToRouteStep()}>
                    Back
                </BackButton>
            </div>
            <div className="center">Summary</div>
            <div className="right">
                <ToolbarButton onClick={() => this.showConfirmReservation()}>
                    <i className="fa fa-check"></i> Confirm
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    showConfirmReservation = () => this.setState({ isConfirmRegister: true })

    cancel = () => this.setState({ isConfirmRegister: false })

    renderConfrimAction = () => (
        <div style={{ zIndex: "10000" }}>
            <div className="action-sheet-mask" style={{ zIndex: "10000" }}></div>
            <div className="action-sheet" style={{ zIndex: "10000" }}>
                <div className="action-sheet-title">Do you want to make this reservation?</div>
                <button className="action-sheet-button" onClick={() => this.confirmReservation()}>Yes</button>
                <button className="action-sheet-button" onClick={() => this.cancel()}>Cancel</button>
            </div>
        </div>
    )

    render() {
        const { reservation, address } = this.props;
        return (
            <div>
                {this.state.isConfirmRegister && this.renderConfrimAction()}

                <Page renderToolbar={this.renderToolbar}>
                    <div style={{ height: "200px", padding: "1px 0 0 0" }}>
                        <div className="card">
                            <h2 className="card__title">Reservation</h2>
                            <div className="card__content">
                                <div className="mB5"><b>Car: </b>{reservation.selectedCar.name}</div>
                                <div className="mB5"><b>Registration: </b>{reservation.selectedCar.registration}</div>
                                <div className="mB5"><b>Start date: </b>{formatDateToPrint(reservation.startDate)}</div>
                                <div className="mB5"><b>End date: </b>{formatDateToPrint(reservation.endDate)}</div>
                                <div className="mB5"><b>Address: </b>{address.address}</div>
                                <div className="mB5"><b>City: </b>{address.city}</div>
                                <div className="mB5"><b>Country: </b>{address.country}</div>
                            </div>
                        </div>
                    </div>
                </Page>
            </div>

        )
    }
}


export default connect({
    reservation: state`reservation`,
    confirmReservation: sequences`confirmReservation`,
    goToRouteStep: sequences`goToRouteStep`,
    address: state`address`
},
    Summary
)
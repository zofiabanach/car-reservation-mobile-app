import React from 'react';
import axios from 'axios';
import { Page, Toolbar, BackButton, ToolbarButton, ProgressCircular } from 'react-onsenui';
import { connect } from "@cerebral/react";
import { state } from "cerebral";

import { API_URL } from '../../utils';
import { getOfficeWithCarsQuery, isCarAvailableQuery } from '../../queries';
import '../AppMain.css';

const ShowAvailableCars = class ShowAvailableCars extends React.Component {

    state = {
        allOfficeCars: [],
        cars: [],
        error: "",
        selectedCar: null,
        officeName: "",
        availableIds: [],
        toSearch: 2
    }

    componentDidMount() {
        this.getData(getOfficeWithCarsQuery, { id: this.props.officeId })
    }

    getData = async (query, variables) => {
        const car = this.props.car();
        try {
            const response = await axios.post(API_URL, {
                query,
                variables
            });

            this.setState(() => ({
                officeName: response.data.data.office.name,
                allOfficeCars: response.data.data.office.cars,
                selectedCar: car ? car : null,
                toSearch: response.data.data.office.cars.length
            }));

            const carsIds = response.data.data.office.cars.map(car => car.id);

            const { startDate, endDate } = this.props;

            for (let i = 0; i < carsIds.length; i++) {
                const variables = { startDate, endDate, carId: carsIds[i] };
                this.getCarAvailiability(isCarAvailableQuery, variables, carsIds[i])
            }

        } catch (error) {
            this.setState(() => ({ error }))
            console.log(error);
        }
    }

    getCarAvailiability = async (query, variables, carId) => {
        try {
            const response = await axios.post(API_URL, {
                query,
                variables
            });

            this.setState((oldState) => {
                const availableIds = [...oldState.availableIds, [carId, response.data.data.isCarAvailable]];

                let cars = oldState.cars;
                if (response.data.data.isCarAvailable) {
                    const newCar = oldState.allOfficeCars.find(car => car.id === carId)
                    cars = [...oldState.cars, newCar];
                }

                const searchedCars = oldState.searchedCars++;
                return { availableIds, searchedCars, cars }
            })

        } catch (error) {
            this.setState(() => ({ error }))
            console.log(error);
        }
    }

    setSelectedCar = (car) => {
        this.setState(() => ({ selectedCar: car }))
    }

    nextStep = () => {
        this.props.setSelectedCar(this.state.selectedCar);
    }

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.back()}>
                    Back
                </BackButton>
            </div>
            <div className="center">Select a car</div>
            <div className="right">
                <ToolbarButton disabled={!this.state.selectedCar} onClick={() => this.state.selectedCar && this.nextStep()}>
                    Next
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    renderProgress = () => (
        <div className="centerLoading">
            <div className="m10">
                <ProgressCircular indeterminate />
            </div>
            <div>
                Loading available cars...
            </div>
        </div>
    )

    render() {
        const { cars, selectedCar, officeName, availableIds, toSearch } = this.state;

        const isCarSelected = (carId) => selectedCar && carId === selectedCar.id;

        return (
            <Page renderToolbar={this.renderToolbar}>

                {(availableIds.length === toSearch) ?
                    <ul className="list">
                        <li className="list-header" key={-1} >Available cars in {officeName}</li>
                        {cars.map(car =>
                            <li className="list-item list-item--tappable" key={car.id} onClick={() => this.setSelectedCar(car)}>
                                <div className="list-item__left">
                                    <label className="radio-button">
                                        <input type="radio" id={car.id} className="radio-button__input"
                                            checked={!!isCarSelected(car.id)}
                                            onChange={() => this.setSelectedCar(car)} />
                                        <div className="radio-button__checkmark"></div>
                                    </label>
                                </div>
                                <label htmlFor={car.id} className="list-item__center">
                                    <div className="list-item__title">
                                        {car.name}
                                    </div>
                                    <div className="list-item__subtitle">
                                        {car.registration}
                                    </div>
                                </label>
                            </li>
                        )}
                    </ul>
                    : this.renderProgress()}
            </Page >
        )
    }
}



export default connect({
    startDate: state`reservation.startDate`,
    endDate: state`reservation.endDate`
},
    ShowAvailableCars
)
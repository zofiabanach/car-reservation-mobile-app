import React from 'react';
import axios from 'axios';
import { Page, Toolbar, BackButton, ToolbarButton, ProgressCircular } from 'react-onsenui';

import { API_URL } from '../../utils';
import { getOfficeWithCarsQuery } from '../../queries';
import '../AppMain.css';

export default class SelectCar extends React.Component {

    state = {
        cars: [],
        error: "",
        hasCarsLoaded: false,
        selectedCar: null,
        officeName: ""
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
                cars: response.data.data.office.cars,
                hasCarsLoaded: true,
                selectedCar: car ? car : null
            }));


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
        const { cars, hasCarsLoaded, selectedCar, officeName } = this.state;

        const isCarSelected = (carId) => selectedCar && carId === selectedCar.id;

        return (
            <Page renderToolbar={this.renderToolbar}>
                {hasCarsLoaded ?
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
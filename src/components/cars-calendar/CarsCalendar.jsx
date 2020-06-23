import React from "react";
import Calendar from 'react-calendar-mobile';
import { Page, Toolbar, BackButton, ToolbarButton, ProgressCircular } from 'react-onsenui';
import axios from 'axios';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral";

import { API_URL, uniq, formatDate, toDatesMap, getDates, formatDateToPrint } from '../../utils';
import { getCarByIdQuery } from '../../queries';

const CarsCalendar = class CarsCalendar extends React.Component {

    state = {
        carName: "",
        carRegistration: "",
        reservations: [],
        hasDataLoaded: false,
        reservationsMap: {},
        selectedDateReservations: []
    }

    componentDidMount() {
        this.getData(getCarByIdQuery, { id: this.props.calendarCar.id })
    }

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.startCarsAvailability()}>
                    Back
                </BackButton>
            </div>
            <div className="center">Car reservations</div>
            <div className="right">
                <ToolbarButton onClick={() => this.props.goToMenu()}>
                    Menu
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    setDecorate = () => {
        let resMap = {};

        const datesArrays = this.state.reservations.map(reservation => {
            const start = new Date(parseInt(reservation.start_at))
            const end = new Date(parseInt(reservation.end_at))
            const dateArray = getDates(start, end)

            for (let i = 0; i < dateArray.length; i++) {
                const date = formatDate(dateArray[i])
                if (resMap[date]) {
                    resMap[date] = [...resMap[date], reservation]
                } else {
                    resMap[date] = [reservation]
                }
            }

            return dateArray
        })


        let dates = [];
        for (let i = 0; i < datesArrays.length; i++) {
            dates.push(...datesArrays[i])
        }

        const datesFormatted = dates.map(date => [formatDate(date)])
        const uniqueDates = uniq(datesFormatted)

        return toDatesMap(uniqueDates)
    }

    onSelectDate = (value) => {
        const formattedDate = formatDate(value)
        const reservationsArray = this.state.reservationsMap[formattedDate] ? this.state.reservationsMap[formattedDate] : [];
        this.setState({ selectedDateReservations: reservationsArray })
    }

    getData = async (query, variables) => {
        try {
            const response = await axios.post(API_URL, {
                query,
                variables
            });

            let resMap = {};
            response.data.data.car.reservations.map(reservation => {
                const start = new Date(parseInt(reservation.start_at))
                const end = new Date(parseInt(reservation.end_at))
                const dateArray = getDates(start, end)

                for (let i = 0; i < dateArray.length; i++) {
                    const date = formatDate(dateArray[i])
                    if (resMap[date]) {
                        resMap[date] = [...resMap[date], reservation]
                    } else {
                        resMap[date] = [reservation]
                    }
                }
            })

            this.setState(() => ({
                carName: response.data.data.car.name,
                carRegistration: response.data.data.car.registration,
                reservations: response.data.data.car.reservations,
                hasDataLoaded: true,
                reservationsMap: resMap
            }));

        } catch (error) {
            this.setState(() => ({ error }))
        }
    }

    renderReservations = (reservations) => (
        reservations.map(res =>
            <div className="card" key={res.id}>
                <h3 className="card__title">Reservation</h3>
                <div className="card__content">
                    <div className="mB5"><b>From: </b> {formatDateToPrint(parseInt(res.start_at))}</div>
                    <div className="mB5"><b>To: </b> {formatDateToPrint(parseInt(res.end_at))} </div>
                    <div className="mB5"><b>Made by: </b> {res.person.name} {res.person.surname} </div>
                </div>
            </div>
        )
    )

    renderProgress = () => (
        <div className="centerLoading">
            <div className="m10">
                <ProgressCircular indeterminate />
            </div>
            <div>
                Loading reservations calendar
            </div>
        </div>
    )

    render() {
        const { hasDataLoaded, selectedDateReservations } = this.state;

        return (
            <Page renderToolbar={this.renderToolbar}>
                {hasDataLoaded ?
                    <div>
                        <Calendar
                            decorate={this.setDecorate()}
                            onSelectDate={(v) => this.onSelectDate(v)}
                        />
                        {
                            selectedDateReservations.length > 0 ? this.renderReservations(selectedDateReservations)
                                : <div className="card">
                                    <h3 className="card__title">No reservations made for this date</h3>
                                </div>
                        }
                    </div>
                    : this.renderProgress()
                }
            </Page>
        )
    }
}


export default connect(
    {
        calendarCar: state`calendarCar`,
        goToMenu: sequences`goToMenu`,
        startCarsAvailability: sequences`startCarsAvailability`
    },
    CarsCalendar
)
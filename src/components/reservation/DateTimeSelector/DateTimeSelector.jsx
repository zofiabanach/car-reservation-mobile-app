import React from 'react';
import { Page, Toolbar, BackButton, ToolbarButton, Button } from 'react-onsenui';
import Calendar from 'react-calendar-mobile';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral";
import DatePicker from 'react-mobile-datepicker';

import { dateConfig } from '../../../utils';
import Alert from "../../shared/Alert/Alert";
import { alertTitle } from "../../../strings";

const DateTimeSelector = class DateTimeSelector extends React.Component {
    state = {
        isDateSelected: false,
        time: new Date(),
        isOpen: false,
        isAlert: true
    }

    componentDidMount() {
        const selectedDate = this.props.date
        selectedDate && this.setState({
            time: new Date(selectedDate),
            date: new Date(selectedDate)
        })
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    onTimeSelect = (time) => {
        this.setState({ time, isOpen: false });
    }

    onSelectDate = (value) => {
        this.setState({ isDateSelected: true });
        this.setState({ date: value });
    }

    next = () => {
        const mergedHour = this.state.date.setHours(this.state.time.getHours())
        const mergedHourMinute = new Date(mergedHour).setMinutes(this.state.time.getMinutes())
        this.props.saveDate(new Date(mergedHourMinute))
    }

    onChange = time => this.setState({ time })

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.back()}>
                    Back
                </BackButton>
            </div>
            <div className="center">{this.props.title}</div>
            <div className="right">
                <ToolbarButton disabled={!this.state.isDateSelected} onClick={() => this.state.isDateSelected && this.next()}>
                    Next
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    render() {
        const { time } = this.state;
        return (
            <div>
                {this.props.isAlert && <Alert close={this.props.closeAlert}
                    title={alertTitle} message={this.props.alertMessage} />}

                <Page renderToolbar={this.renderToolbar}>
                    <div>
                        <Calendar
                            onSelectDate={(v) => this.onSelectDate(v)}
                            selectedDate={this.props.date ? new Date(this.props.date) : new Date()}
                        />
                    </div>
                    <div style={{ margin: "20px", textAlign: "center" }}>
                        <h3>{this.props.timeString}</h3>
                        <Button modifier="large--quiet" onClick={this.handleClick} style={{ fontSize: "22px" }}>
                            {time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}
                            :{time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}
                        </Button>
                        <DatePicker
                            value={this.state.time}
                            isOpen={this.state.isOpen}
                            onSelect={this.onTimeSelect}
                            onCancel={this.handleCancel}
                            dateConfig={dateConfig}
                            headerFormat='hh:mm'
                            theme="ios"
                            confirmText="Ok"
                            cancelText="Cancel" />
                    </div>
                </Page>
            </div>
        )
    }
}

export default connect(
    {
        isAlert: state`reservation.isAlert`,
        closeAlert: sequences`closeReservationAlert`,
    },
    DateTimeSelector
)
import React from 'react';
import { Page, Toolbar, BackButton, ToolbarButton } from 'react-onsenui';

import Mapbox from "../Mapbox/Mapbox"

export default class SelectRoute extends React.Component {

    setSelectedRoute = () => {
        this.props.setSelectedRoute();
    }

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.back()}>
                    Back
                </BackButton>
            </div>
            <div className="center">Select route</div>
            <div className="right">
                <ToolbarButton onClick={() => this.setSelectedRoute()}>
                    Next
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Mapbox />
            </Page>
        )
    }
}
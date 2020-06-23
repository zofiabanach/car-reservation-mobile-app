import React from 'react';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral";
import { Page, Toolbar, BackButton, ToolbarButton } from 'react-onsenui';

const Description = class Description extends React.Component {

    state = {
        description: "",
        isActionSheet: false
    }

    handleChange = (event) => this.setState({ description: event.target.value });

    registerDamage = () => {
        const date = new Date().toJSON();
        this.props.registerDamage({ description: this.state.description, damaged_at: date });
    }

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.goToCamera()}>
                    Back
                </BackButton>
            </div>
            <div className="center">Description</div>
            <div className="right">
                <ToolbarButton onClick={() => this.showConfrimRegister()}>
                    <i className="fa fa-check"></i> Register
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    showConfrimRegister = () => {
        this.setState({ isActionSheet: true })
    }

    cancel = () => {
        this.setState({ isActionSheet: false })
    }

    renderConfrimAction = () => (
        <div style={{ zIndex: "10000" }}>
            <div className="action-sheet-mask" style={{ zIndex: "10000" }}></div>
            <div className="action-sheet" style={{ zIndex: "10000" }}>
                <div className="action-sheet-title">Do you want to register the damage?</div>
                <button className="action-sheet-button" onClick={() => this.registerDamage()}>Register</button>
                <button className="action-sheet-button" onClick={() => this.cancel()}>Cancel</button>
            </div>
        </div>
    )

    render() {
        const { photoUrl } = this.props;

        return (
            <div>
                {this.state.isActionSheet && this.renderConfrimAction()}

                <Page renderToolbar={this.renderToolbar}>
                    <div style={{ margin: "10px" }}>
                        <textarea className="textarea" style={{ width: "100%" }} rows="4" placeholder="Describe the damage"
                            value={this.state.description} onChange={this.handleChange} ></textarea>
                    </div>

                    {photoUrl &&
                        <div style={{ margin: "10px" }}>
                            <img height="80%" width="100%" src={photoUrl} alt="" />
                        </div>
                    }
                </Page>
            </div>
        )
    }
}

export default connect({
    damage: state`damage`,
    photoUrl: state`photoUrl`,
    registerDamage: sequences`registerDamage`,
    goToCamera: sequences`goToCamera`
},
    Description
)
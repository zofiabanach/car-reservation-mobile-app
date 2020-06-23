import React from 'react';
import { Page, Toolbar, BackButton, ToolbarButton } from 'react-onsenui';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral";

import './CameraComponent.css'
import '../../AppMain.css';


let fileReader;

const CameraComponent = class CameraComponent extends React.Component {

    state = {
        file: null
    }

    componentDidMount() {
        const { damage } = this.props;
        damage && damage.photo && this.setState({
            file: damage.photo
        })
    }

    handleFileRead = (e) => {
        const string = fileReader.result
        let base64String = btoa(String.fromCharCode(...new Uint8Array(string)));

        this.setState({ pictureCoded: base64String })
    }

    handleChange = (event) => {
        const file = event.target.files[0];

        fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;
        fileReader.readAsArrayBuffer(file);

        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    nextStep = () => {
        this.props.savePhoto({ photo: this.state.file, pictureCoded: this.state.pictureCoded })
    }

    renderToolbar = () => (
        <Toolbar>
            <div className="left">
                <BackButton onClick={() => this.props.startReportDamage()}>
                    Back
                </BackButton>
            </div>
            <div className="center">Upload picture</div>
            <div className="right">
                <ToolbarButton onClick={() => this.nextStep()}>
                    Next
                </ToolbarButton>
            </div>
        </Toolbar>
    )

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                {this.state.file ?
                    <div className="m10">
                        <br />
                        <img width="100%" src={this.state.file} alt="" />
                    </div>
                    :
                    <div className="centerCamera">
                        <label htmlFor="file-upload" className="custom-file-upload" >
                            <div className="camera"><i className="zmdi zmdi-camera"></i></div>
                            <br />
                            <div className="m10">Select picture</div>
                        </label>
                        <input id="file-upload" type="file" onChange={this.handleChange} />
                    </div>
                }
            </Page>
        )
    }
}

export default connect({
    savePhoto: sequences`savePhoto`,
    startReportDamage: sequences`startReportDamage`,
    damage: state`damage`
},
    CameraComponent
)
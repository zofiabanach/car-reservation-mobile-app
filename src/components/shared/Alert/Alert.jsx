import React from 'react';

export default class Alert extends React.Component {

    render() {
        return (
            <div style={{ zIndex: "10000" }}>
                <div className="alert-dialog-mask" style={{ zIndex: "10000" }}></div>
                <div className="alert-dialog" style={{ zIndex: "10000" }}>
                    <div className="alert-dialog-container">
                        <div className="alert-dialog-title">{this.props.title}</div>
                        <div className="alert-dialog-content">
                            {this.props.message}
                        </div>
                        <div className="alert-dialog-footer">
                            <button onClick={this.props.close} className="alert-dialog-button alert-dialog-button--primal">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
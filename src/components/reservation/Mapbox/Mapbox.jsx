import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder'
import { connect } from "@cerebral/react";
import { sequences } from "cerebral";

import { queryParams } from './queryParams';
import { mapStyle } from './mapStyle';
import './Mapbox.css';

const mapAccess = {
    mapboxApiAccessToken: ""  // TODO add token
}

const Mapbox = class Mapbox extends React.Component {
    state = {
        viewport: {
            latitude: 41.178671,
            longitude: -8.607373,
            zoom: 8
        },
        lat: null,
        long: null,
        address: null
    }

    onSelected = (viewport, item) => {
        const lat = item.center[1];
        const long = item.center[0];

        this.setState({ viewport, lat, long });

        const string = item.place_name;
        const addressArray = string.split(",");
        const last = addressArray.length;

        const address = {
            address: addressArray[1].trim() + ", " + addressArray[2].trim(),
            postal_code: "-",
            city: addressArray[last - 2].trim(),
            country: addressArray[last - 1],
            lat: lat.toString(),
            lng: long.toString()
        }

        this.setState({ address });
        this.props.setAddress({ addressToReservation: address });
    }

    render() {
        const { viewport, lat, long, address } = this.state

        return (
            <div>
                <div className="layer">
                    <Geocoder
                        {...mapAccess}
                        onSelected={this.onSelected}
                        viewport={viewport}
                        hideOnSelect={true}
                        queryParams={queryParams}
                    />
                </div>

                <div>
                    <ReactMapGL
                        {...mapAccess}
                        {...viewport}
                        {...mapStyle}
                        onViewportChange={(newViewport) => {
                            this.setState({ viewport: newViewport })
                        }
                        }>

                        {lat && long &&
                            <Marker longitude={long} latitude={lat}>
                                <i className="fa fa-map-marker-alt"></i>
                            </Marker>
                        }

                    </ReactMapGL>
                </div>

                <div className="buttom">
                    <div className="card">
                        <div className="card__content">
                            {address ?
                                <>
                                    <div className="mB5"><b>Selected location:</b></div>
                                    <div className="mB5"><b>Address: </b>{address.address}</div>
                                </>
                                :
                                <div className="mB5">No selected location</div>
                            }
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default connect({
    setAddress: sequences`setAddress`
},
    Mapbox
)
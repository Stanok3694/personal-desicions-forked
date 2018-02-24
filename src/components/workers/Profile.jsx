import React, { Component } from "react";
import axios from "axios";

import ProfileData from "./ProfileData";
import Works from "./Works";
import Payments from "./Payments";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            worker: {},
        }
    }
    
    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.post('http://localhost:3001/workers/getWorkerById',
            {
                workerId: this.props.match.params.workerId,
            }
        ).then(response => {
            this.setState({ 
                worker: response.data, 
                isLoading: false, 
            });
        }).catch(e => {
            console.log(e);
            return;
        });
    }

    render() {
        if (this.state.isLoading) {
            return(
                <div>
                    {'Loading...'}
                </div>
            );
        } else {
            return(
                <div>
                    <ProfileData worker = {this.state.worker} />
                    <Works works = {this.state.worker.works} />
                    <Payments payments = {this.state.worker.payments} />
                </div>
            );
        }
    }
}

export default Profile;
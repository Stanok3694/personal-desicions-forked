import React, { Component } from "react";
import axios from "axios";

import { Tabs, Tab } from "react-bootstrap";
import { BaseData, PassData, Payments, Shifts } from "./workerProfile";
import { WaitForResponse } from "../service";

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            worker: {},
            key: "1",
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

    handleSelect = (eventKey) => {
        this.setState({ key: eventKey });
    }

    render() {
        if (this.state.isLoading) {
            return  <WaitForResponse />
        } else {
            return (
                <div>
                    <Tabs 
                        id="controlled-tab" 
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                    >
                        <Tab eventKey="1" title = "Общие данные">
                            <BaseData worker={this.state.worker} />
                        </Tab>
                        <Tab eventKey="2" title = "Паспортные данные">
                            <PassData worker={this.state.worker} />
                        </Tab>
                        <Tab disabled eventKey="3" title = "Выплаты">
                            <Payments payments={this.state.worker.payments} /> 
                        </Tab>
                        <Tab disabled eventKey="4" title = "Cмены">
                            <Shifts works={this.state.worker.works} />
                        </Tab>
                    </Tabs>
                </div>
            );
        }
    }
}

export default Profile;
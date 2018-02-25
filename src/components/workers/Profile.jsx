import React, { Component } from "react";
import { Tabs, Tab, ButtonToolbar, Button } from "react-bootstrap";

import axios from "axios";

import { BaseData, PassData, Payments, Shifts, DeleteButton } from "./workerProfile";
import { WaitForResponse } from "../service";

import './workerProfile/Profile.css';

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

    handleDeleteClick = (cb) => {
        const route = `http://localhost:3001/workers/deleteWorkerById?workerId=${this.props.match.params.workerId}`;
        axios.delete(route).then(response => {
            console.log(`Success: ${response}`);
            cb();
        }).catch(e => {
            console.log(e);
            return;
        });
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
                            {/* <PassData worker={this.state.worker} /> */}
                        </Tab>
                        <Tab disabled eventKey="3" title = "Выплаты">
                            {/* <Payments payments={this.state.worker.payments} />  */}
                        </Tab>
                        <Tab disabled eventKey="4" title = "Cмены">
                            {/* <Shifts works={this.state.worker.works} /> */}
                        </Tab>
                    </Tabs>
                    <br />
                    <div className="ProfileControls">
                        <ButtonToolbar>
                            <Button bsStyle="primary" bsSize="small">Изменить</Button>
                            <DeleteButton onClick = {this.handleDeleteClick}/>
                        </ButtonToolbar>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;
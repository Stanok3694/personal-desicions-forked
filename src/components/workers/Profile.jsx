import React, { Component } from "react";
import { Tabs, Tab, ButtonToolbar, } from "react-bootstrap";

import axios from "axios";

import { BaseData, PassData, CustomActionButton } from "./workerProfile";
import { WaitForResponse } from "../service";
import { FormatDate } from "../../utils";
import apiConfigSwitcher from "../../configs/api.config";

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
        axios.post(`${apiConfigSwitcher()}workers/getWorkerById`,
            {
                workerId: this.props.match.params.workerId,
            }
        ).then(response => {
            const worker = response.data;
            worker.dateOfBirth = FormatDate(worker.dateOfBirth).forUI;
            worker.passportStartDate = FormatDate(worker.passportStartDate).forUI;

            this.setState({
                worker,
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
        const route = `${apiConfigSwitcher()}workers/deleteWorkerById?workerId=${this.props.match.params.workerId}`;
        axios.delete(route).then(response => {
            console.log(`Success: ${response}`);
            cb();
        }).catch(e => {
            console.log(e);
            return;
        });
    }

    handleToChangeRedirectionClick = (cb) => {
        cb();
    }

    render() {
        if (this.state.isLoading) {
            return <WaitForResponse />
        } else {
            return (
                <div>
                    <Tabs
                        id="controlled-tab"
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                    >
                        <Tab eventKey="1" title="Общие данные">
                            <BaseData baseData={this.state.worker.baseData} />
                        </Tab>
                        <Tab eventKey="2" title="Паспортные данные">
                            <PassData passData={this.state.worker.passData} />
                        </Tab>
                        <Tab disabled eventKey="3" title="Выплаты">
                            {/* <Payments payments={this.state.worker.payments} />  */}
                        </Tab>
                        <Tab disabled eventKey="4" title="Cмены">
                            {/* <Shifts works={this.state.worker.works} /> */}
                        </Tab>
                    </Tabs>
                    <br />
                    <div className="ProfileControls">
                        <ButtonToolbar>
                            <CustomActionButton 
                                onClick={this.handleToChangeRedirectionClick}
                                name="Изменить"
                                bsStyle="primary"
                                bsSize="small"
                                to={`/changeWorker/${this.props.match.params.workerId}`}
                            />
                            {/* <Button disabled bsStyle="primary" bsSize="small">Изменить</Button> */}
                            <CustomActionButton
                                onClick={this.handleDeleteClick}
                                name="Удалить"
                                bsStyle="danger"
                                bsSize="small"
                                to="/workers"    
                            />
                        </ButtonToolbar>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;
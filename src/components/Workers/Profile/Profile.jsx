import React, { Component } from "react";
import { Tabs, Tab, ButtonToolbar, } from "react-bootstrap";

import axios from "axios";

import { BaseData, PassData, } from "./";
import { WaitForResponse, CustomNavigationButton } from "../../UI";
import { FormatDate } from "../../../utils";
import {ApiRoutes } from "../../../configs";

import './Profile.css';

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
        axios.post(ApiRoutes.getWorkerById,
            {
                workerId: this.props.match.params.workerId,
            }
        ).then(response => {
            const worker = response.data;
            worker.passData = this.formatDateFieldHackForProfile(worker.passData, "Дата рождения");
            worker.passData = this.formatDateFieldHackForProfile(worker.passData, "Дата выдачи");

            this.setState({
                worker,
                isLoading: false,
            });
        }).catch(e => {
            console.log(e);
            return;
        });
    }

    // SO: shame on u for this weird thing <- the main reason of that is your desicion about using backend for pre-format ui data!
    
    formatDateFieldHackForProfile = (passData, key) => {
        const target = passData.filter(e => e.key === key);
        const targetIndex = passData.findIndex(e => e.key === key);

        const formattedTarget = target[0].value ? FormatDate(target[0].value).forUI : null;
        passData[targetIndex].value = formattedTarget;
        return passData;
    }

    handleSelect = (eventKey) => {
        this.setState({ key: eventKey });
    }

    handleDeleteClick = (cb) => {
        const route = `${ApiRoutes.deleteWorkerById}${this.props.match.params.workerId}`;
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
                            <CustomNavigationButton 
                                onClick={this.handleToChangeRedirectionClick}
                                name="Изменить"
                                bsStyle="primary"
                                bsSize="small"
                                to={`/changeWorker/${this.props.match.params.workerId}`}
                            />
                            <CustomNavigationButton
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
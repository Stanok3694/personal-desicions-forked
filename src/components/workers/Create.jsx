import React, { Component } from "react";
import { componentClass, FormControl, ListGroup, ListGroupItem, Grid, Col, Row, Button } from "react-bootstrap";
import axios from "axios";

import { CustomActionButton } from "./workerProfile";
import { WaitForResponse } from "../service";
import { FormatDate } from "../../utils";
import apiConfigSwitcher from "../../configs/api.config";

class CreateWorker extends Component {
    static BASE_DATA_INPUTS = [
        {
            key: "names",
            value: "ФИО"
        },
        {
            key: "age",
            value: "Возраст"
        },
        {
            key: "district",
            value: "Район"
        },
        {
            key: "position",
            value: "Специальность"
        },
        {
            key: "status",
            value: "Cтатус"
        },
        {
            key: "phoneNumber",
            value: "Телефон"
        },
    ];

    static PASS_DATA_INPUTS = [
        {
            key: "gender",
            value: "Пол"
        },
        {
            key: "dateOfBirth",
            value: "Дата рождения"
        },
        {
            key: "birthPlace",
            value: "Место рождения"
        },
        {
            key: "serialNumber",
            value: "Серия/Номер паспорта"
        },
        {
            key: "passportTable",
            value: "Место выдачи"
        },
        {
            key: "passportStartDate",
            value: "Дата выдачи"
        },
        {
            key: "codeOfPassportTable",
            value: "Код подразделения"
        },
        {
            key: "address",
            value: "Адрес регистрации"
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.preSetWorkerDataIfExist();
    }

    preSetWorkerDataIfExist = () => {
        const workerId = this.props.match.params.workerId;

        if (workerId) {
            axios.post(`${apiConfigSwitcher()}workers/getRawWorkerById`,
                {
                    workerId,
                }).then(response => {
                    const workerData = response.data;
                    // SO: can i format date more elegant?
                    workerData.dateOfBirth = FormatDate(workerData.dateOfBirth).forUI;
                    workerData.passportStartDate = FormatDate(workerData.passportStartDate).forUI;
                    
                    this.setState({
                        ...workerData,
                        isLoading: false,
                    });
                }).catch(e => {
                    console.log(e);
                    return;
                });
        } else {
            this.setState({ isLoading: false });
        }
    }

    // SO: need to think about lazy overwriting for worker data <- ToDO! 
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(cb) {
        const workerId = this.props.match.params.workerId;

        const workerData = {
            baseData: {
                names: this.state.names,
                age: this.state.age,
                district: this.state.district,
                position: this.state.position ? this.state.position.split(',') : null,
                phoneNumber: this.state.phoneNumber,
                notes: this.state.notes,
                status: this.state.status,
            },
            passData: {
                gender: this.state.gender,
                dateOfBirth: FormatDate(this.state.dateOfBirth).forServices,
                birthPlace: this.state.birthPlace,
                serialNumber: this.state.serialNumber,
                passportTable: this.state.passportTable,
                codeOfPassportTable: this.state.codeOfPassportTable,
                passportStartDate: FormatDate(this.state.passportStartDate).forServices,
                address: this.state.address,
            },
            works: this.state.works ? this.state.works.split(',') : null,
            payments: this.state.payments ? this.state.payments.split(',') : null,
        }

        if (workerId) {
            const updatedFields = this.state;
            // SO: looks ugly <- ToDo!
            updatedFields.dateOfBirth = updatedFields.dateOfBirth ? FormatDate(updatedFields.dateOfBirth).forServices : null;
            updatedFields.passportStartDate = updatedFields.passportStartDate ? FormatDate(updatedFields.passportStartDate).forServices : null;
            
            updatedFields.position = updatedFields.position ? updatedFields.position.split(',') : null;
            updatedFields.payments = updatedFields.payments ? updatedFields.payments.split(',') : null;
            updatedFields.works = updatedFields.works ? updatedFields.works.split(',') : null;

            axios.put(`${apiConfigSwitcher()}workers/updateWorkerById`, {
                    workerId,
                    updatedFields
                }).then(response => {
                    cb();
                }).catch(e => {
                    console.log(e);
                    return;
                });
        } else {
            axios.post(`${apiConfigSwitcher()}workers/createWorker`, workerData)
                .then(response => {
                    cb();
                }).catch(e => {
                    console.log(e);
                    return;
                });
        }
    }

    whichFlowName = () => {
        return (this.props.match.params.workerId ? 'Изменить' : 'Создать');
    }

    whichFlowPath = () => {
        const workerId = this.props.match.params.workerId;

        return (
            workerId     
                ? `/worker/${workerId}` 
                : '/workers'
            );
    }

    render() {
        if (this.state.isLoading) {
            return <WaitForResponse />
        } else {
            return (
                <div>
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <ListGroup>
                                    {
                                        CreateWorker.BASE_DATA_INPUTS.map((i, index) => {
                                            return (
                                                <ListGroupItem key={index}>
                                                    <div>
                                                        <p>{i.value}</p>
                                                        <FormControl
                                                            type="Text"
                                                            name={i.key}
                                                            value={this.state[i.key]}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </ListGroupItem>
                                            );
                                        })
                                    }
                                    <ListGroupItem>
                                        <div>
                                            <p>Примечания</p>
                                            <FormControl
                                                componentClass="textarea"
                                                name="notes"
                                                value={this.state.notes}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </ListGroupItem>
                                    <br />
                                    <CustomActionButton
                                        name={this.whichFlowName()}
                                        bsStyle="success"
                                        bsSize="small"
                                        onClick={this.handleSubmit}
                                        to={this.whichFlowPath()}
                                    />
                                </ListGroup>
                            </Col>
                            <Col md={6}>
                                <ListGroup>
                                    {
                                        CreateWorker.PASS_DATA_INPUTS.map((i, index) => {
                                            return (
                                                <ListGroupItem key={index}>
                                                    <div>
                                                        <p>{i.value}</p>
                                                        <FormControl
                                                            type="Text"
                                                            name={i.key}
                                                            value={this.state[i.key]}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </ListGroupItem>
                                            );
                                        })
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
}

export default CreateWorker;
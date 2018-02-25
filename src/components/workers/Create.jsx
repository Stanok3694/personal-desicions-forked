import React, { Component } from "react";
import { FormControl, ListGroup, ListGroupItem, Grid, Col, Row, Button } from "react-bootstrap";
import axios from "axios";

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

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const workerData = {
            baseData: {
                names: this.state.names,
                age: this.state.age,
                district: this.state.district,
                position: this.state.position ? this.state.position.split(',') : null,
                phoneNumber: this.state.phoneNumber,
                notes: this.state.notes,
            },
            passData: {
                gender: this.state.gender,
                dateOfBirth: this.state.dateOfBirth,
                birthPlace: this.state.birthPlace,
                serialNumber: this.state.serialNumber,
                passportTable: this.state.passportTable,
                codeOfPassportTable: this.state.codeOfPassportTable,
                passportStartDate: this.state.passportStartDate,
                address: this.state.address,
            },
            works: this.state.works ? this.state.works.split(',') : null,
            payments: this.state.payments ? this.state.payments.split(',') : null,
        }

        // SO: here will be API Call for create worker:
        axios.post('http://localhost:3001/workers/createWorker', workerData)
            .then(response => {
                console.log(`success ${response}`)
            }).catch(e => {
                console.log(e);
                return;
            });

        console.log(workerData);

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                                </ListGroup>
                            </Col>
                            <Col md={6}>
                                blabla
                            </Col>
                        </Row>
                    </Grid>
                    <br />
                    <input type="submit" value="Создать" />
                </form>
            </div>
        );
    }
}

export default CreateWorker;
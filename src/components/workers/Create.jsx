import React, { Component } from "react";
import axios from "axios";

class CreateWorker extends Component {
    static INPUTS = [
        "firstName",
        "secondName",
        "lastName",
        "age",
        "district",
        "position",
        "skills",
        "phoneNumber",
        "gender",
        "dateOfBirth",
        "passportTable",
        "codeOfPassportTable",
        "passportStartDate",
        "relationship",
        "works",
        "payments",
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
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            lastName: this.state.lastName,
            age: this.state.age,
            district: this.state.district,
            position: this.state.position,
            skills: this.state.skills ? this.state.skills.split(',') : null,
            phoneNumber: this.state.phoneNumber,
            passData: {
                gender: this.state.gender,
                dateOfBirth: this.state.dateOfBirth,
                passportTable: this.state.passportTable,
                codeOfPassportTable: this.state.codeOfPassportTable,
                passportStartDate: this.state.passportStartDate,
                relationship: this.state.relationship,
                works: this.state.works ? this.state.works.split(',') : null,
                payments: this.state.payments ? this.state.payments.split(',') : null,
            }
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
                    {
                        CreateWorker.INPUTS.map((i, index) => {
                            return (
                                <div key={index}>
                                    <p>{i}</p>
                                    <input type="Text" name={i} value={this.state[i]} onChange={this.handleChange} />
                                </div>
                            );
                        })
                    }
                    <br />
                    <input type="submit" value="Создать" />
                </form>
            </div>
        );
    }
}

export default CreateWorker;
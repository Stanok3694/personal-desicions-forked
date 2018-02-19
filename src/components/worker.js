import React, { Component } from "react";
import axios from "axios";

class Worker extends Component {
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
                    <table>
                        <tbody>
                            <tr>
                                <th>Паспортные данные</th>
                            </tr>
                            <tr>
                                <td>{`${this.state.worker.lastName} ${this.state.worker.firstName} ${this.state.worker.secondName}`}</td>
                            </tr>
                            <tr>
                                <td>{this.state.worker.gender}</td>
                            </tr>
                            <tr>
                                <td>{this.state.worker.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td>{this.state.worker.passportTable}</td>
                            </tr>
                            <tr>
                                <td>{this.state.worker.codeOfPassportTable}</td>
                            </tr>
                            <tr>
                                <td>{this.state.worker.passportStartDate}</td>
                            </tr>
                            <tr>
                                <td>{this.state.worker.relationship}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                            <tr>
                                <th>Работы</th>
                            </tr>
                            {
                                this.state.worker.works.map(w => {
                                    return (
                                        <tr>
                                            <td>{w}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                            <tr>
                                <th>Платежи</th>
                            </tr>
                            {
                                this.state.worker.payments.map(p => {
                                    return (
                                        <tr>
                                            <td>{p}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Worker;
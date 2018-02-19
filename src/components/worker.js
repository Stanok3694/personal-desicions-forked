import React, { Component } from "react";
import axios from "axios";

import WorkerTable from "./workerTable";
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
                    <WorkerTable worker = {this.state.worker} />

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
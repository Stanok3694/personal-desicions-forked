import React, { Component } from "react";
import axios from "axios";

import WorkerTable from "./workerTable";
import WorkerWorks from "./workerWorks";
import WorkerPayments from "./workerPayments";

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
                    <WorkerWorks works = {this.state.worker.works} />
                    <WorkerPayments payments = {this.state.worker.payments} />
                </div>
            );
        }
    }
}

export default Worker;
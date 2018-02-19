import React, { Component } from "react";
import axios from 'axios';

class Workers extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            loadingString: 'Loading...',
            workers: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:3001/workers/getAllWorkers')
        .then(response => {
            console.log(response);
            this.setState({ workers: response, isLoading: false, })
        })
        .catch(e => {
            console.log(e);
            return;
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <p>{this.state.loadingString}</p>
                </div>
            )
        } else {
            return(
                <div>
                    <h2>Рабочие</h2>
                    <p>Список рабочих</p>
                    <p>{this.state.workers}</p>
                </div>
            );
        }
    }
}

export default Workers;
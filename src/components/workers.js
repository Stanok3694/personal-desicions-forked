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
                this.setState({ workers: [...response.data], isLoading: false, })
            })
            .catch(e => {
                console.log(e);
                return;
            });
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
                    {
                        this.state.workers.map((w, index) => {
                            return (
                                <div id={index}>
                                    <p>{w.id}</p>
                                    <p>{w.firstName}</p>
                                    <p>{w.secondName}</p>
                                    <p>{w.lastName}</p>
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
    }
}

export default Workers;
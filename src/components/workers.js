import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

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
                    <table>
                        <tbody>
                            <tr>
                                <th>{'ФИО'}</th>
                                <th>{'Возраст'}</th>
                                <th>{'Район'}</th>
                                <th>{'Должность'}</th>
                                <th>{'Навыки'}</th>
                                {/* <th>{'Статус'}</th> */}
                                <th>{'Телефон'}</th>
                                {/* <th>{'Примечания'}</th> */}
                            </tr>
                            {
                                this.state.workers.map((w, index) => {
                                    const route = `/worker/${w.id}`;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Link to = {route}>
                                                    {`${w.lastName} ${w.firstName} ${w.secondName}`}
                                                </Link>
                                            </td>
                                            <td>{w.age}</td>
                                            <td>{w.district}</td>
                                            <td>{w.position}</td>
                                            <td>{w.skills.toString()}</td>
                                            {/* <td>{'Статус'}</td> */}
                                            <td>{w.phoneNumber}</td>
                                            {/* <td>{w.notes}</td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Workers;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from 'axios';

class Workers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            loadingString: 'Loading...',
            workers: [],
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:3001/workers/getAllWorkers')
            .then(response => {
                let workers = null;

                if (typeof response.data === "string") {
                    workers = response.data;
                } else {
                    workers = [...response.data];
                }

                this.setState({ workers, isLoading: false, })
            })
            .catch(e => {
                console.log(e);
                return;
            });
    }

    makePositionString = (postionArray) => {
        const strFromArr = postionArray.toString();
        const commaIdx = strFromArr.indexOf(',');
        const withComma = strFromArr.slice(0, commaIdx + 1);
        const afterComma = strFromArr.slice(commaIdx + 1);

        return `${withComma} ${afterComma}`;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <p>{this.state.loadingString}</p>
                </div>
            )
        } else if (typeof this.state.workers !== 'string') {
            return (
                <div>
                    <h2>Рабочие</h2>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>{'ФИО'}</th>
                                <th>{'Возраст'}</th>
                                <th>{'Район'}</th>
                                <th>{'Должность'}</th>
                                <th>{'Статус'}</th>
                                <th>{'Телефон'}</th>
                                <th>{'Количество смен'}</th>
                                <th>{'Примечания'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.workers.map((w, index) => {
                                    const route = `/worker/${w.id}`;
                                    const position = this.makePositionString(w.position);
                                    const status = w.inShift ? 'В смене' : 'Не в смене';

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Link to={route}>
                                                    {w.names}
                                                </Link>
                                            </td>
                                            <td>{w.age}</td>
                                            <td>{w.district}</td>
                                            <td>{position}</td>
                                            <td>{status}</td>
                                            <td>{w.phoneNumber}</td>
                                            <td>{w.shifts}</td>
                                            <td>{w.notes}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{this.state.workers}</p>
                </div>
            );
        }
    }
}

export default Workers;
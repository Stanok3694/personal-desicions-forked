import React from "react";
import { Link } from "react-router-dom";
import { Table, } from "react-bootstrap";

import { SortArrOfObj, MakeStringField, } from "../../utils";
import "./Workers.css";

const WorkersList = (props) => {
    if (props.isLoading) {
        return (
            <div>
                <p>{props.loadingString}</p>
            </div>
        )
    } else if (typeof props.workers !== 'string') {
        return (
            <div>
                <h1 className="WorkersHeader">Рабочие</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>{'Номер'}</th>
                            <th>{'ФИО'}</th>
                            <th>{'Возраст'}</th>
                            <th>{'Район'}</th>
                            <th>{'Специальность'}</th>
                            <th>{'Статус'}</th>
                            <th>{'Телефон'}</th>
                            <th>{'Примечания'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SortArrOfObj(props.workers).map((w, index) => {
                                const route = `/worker/${w.id}`;
                                // SO: move into separate file?
                                const specialty = MakeStringField(w.position);
                                const status = w.inShift ? 'В смене' : 'Не в смене';

                                return (
                                    <tr key={index}>
                                        <td>{w.order}</td>
                                        <td>
                                            <Link to={route}>
                                                {w.names}
                                            </Link>
                                        </td>
                                        <td>{w.age}</td>
                                        <td>{w.district}</td>
                                        <td>{specialty}</td>
                                        <td>{status}</td>
                                        <td>{w.phoneNumber}</td>
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
                <p>{props.workers}</p>
            </div>
        );
    }
}

export default WorkersList;
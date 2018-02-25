import React from "react";

const WorkerPayments = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Выплаты</th>
                </tr>
                {
                    props.payments.map(p => {
                        return (
                            <tr>
                                <td>{p}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default WorkerPayments;
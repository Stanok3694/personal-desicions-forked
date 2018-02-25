import React from "react";

const PassData = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Паспортные данные</th>
                </tr>
                <tr>
                    <td>{props.worker.names}</td>
                </tr>
                {
                    Object.keys(props.worker).map(key => {
                        if (
                            key === 'names' 
                            || key === 'workerId' 
                            || key === '__v' 
                            // || key === '_id'
                            || key === 'works'
                            || key === 'payments'
                        ) {
                            return null;
                        } else {
                            return (
                                <tr>
                                    <td>{props.worker[key]}</td>
                                </tr>
                            );
                        }
                    })
                }
            </tbody>
        </table>
    );
}

export default PassData;
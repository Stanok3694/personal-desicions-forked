import React from "react";

const BaseData = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Общая информация</th>
                </tr>
                <tr>
                    <td>{props.worker.names}</td>
                </tr>
                {
                    Object.keys(props.worker).map(key => {
                        if (
                            key === '__v' 
                            || key === '_id'
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

export default BaseData;
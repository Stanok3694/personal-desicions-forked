import React from "react";

const WorkerTable = (props) => {
    const { 
        lastName, firstName, secondName, gender, 
        dateOfBirth, passportTable, passportStartDate, 
        codeOfPassportTable, relationship 
    } = props.worker;
    
    return (
        <table>
            <tbody>
                <tr>
                    <th>Паспортные данные</th>
                </tr>
                <tr>
                    <td>{`${lastName} ${firstName} ${secondName}`}</td>
                </tr>
                {
                    Object.keys(props.worker).map(key => {
                        if (
                            key === 'lastName' 
                            || key === 'firstName' 
                            || key === 'secondName' 
                            || key === 'workerId' 
                            || key === '__v' 
                            || key === '_id'
                            || key === 'works'
                            || key === 'payments'
                        ) {
                            return;
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

export default WorkerTable;
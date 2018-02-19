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
                <tr>
                    <td>{gender}</td>
                </tr>
                <tr>
                    <td>{dateOfBirth}</td>
                </tr>
                <tr>
                    <td>{passportTable}</td>
                </tr>
                <tr>
                    <td>{codeOfPassportTable}</td>
                </tr>
                <tr>
                    <td>{passportStartDate}</td>
                </tr>
                <tr>
                    <td>{relationship}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default WorkerTable;
import React from "react";
import { Table } from "react-bootstrap";

const PassData = (props) => {
    return (
        <div>
            <Table className="BaseData" bordered>
                <tbody>
                    {
                        props.passData.map((d, index) => {
                            return (
                                <tr key={index}>
                                    <td>{d.key}</td>
                                    <td>{d.value}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default PassData;
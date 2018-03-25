import React from "react";

const Shifts = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Работы</th>
                </tr>
                {
                    props.works.map(w => {
                        return (
                            <tr>
                                <td>{w}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default Shifts;
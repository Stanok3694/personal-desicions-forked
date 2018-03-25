import React from "react";
import { Table, ListGroup, ListGroupItem, Grid, Col, Row } from "react-bootstrap";

import "./Profile.css";

const BaseData = (props) => {
    return (
        <div>
            <Table className="BaseData" bordered>
                <tbody>
                    {
                        props.baseData.primaryBaseData.map((d, index) => {
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
            <div className = "Notes">
                <Grid>
                    <Row>
                        <Col md={8} mdOffset={-3}>
                            <ListGroup>
                                <ListGroupItem header="Примечания">
                                    {props.baseData.notes}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
    );
}

export default BaseData;
import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

const CusomNavigationButton = ({...props, history }) => {
    return (
        <Button
            onClick={
                // SO: need to rework <- some kind of returned callback hell!
                () => {
                    props.onClick(
                        () => history.push(props.to)
                    );
                }
            }
            bsStyle={props.bsStyle}
            bsSize={props.bsSize}
        >
            {props.name}
        </Button>
    );
}

export default withRouter(CusomNavigationButton);
import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

const DeleteButton = ({...props, history }) => {
    return (
        <Button
            onClick={
                // SO: need to rework <- some kind of returned callback hell!
                () => {
                    props.onClick(
                        () => history.push("/workers")
                    );
                }
            }
            bsStyle="danger"
            bsSize="small"
        >
            Удалить
        </Button>
    );
}

export default withRouter(DeleteButton);
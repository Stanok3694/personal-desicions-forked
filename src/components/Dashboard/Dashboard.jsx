import React, { Component } from "react";
import "./Dashboard.css";
class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            objects: 10,
            hiredWorkers: 160,
            freeWorkers: 340,
        };
    }

    render() {
        return(
            <div className="HomePage">
                <h2>Добро пожаловать!</h2>
                <p>
                    {
                        `
                        Объектов - ${this.state.objects}, 
                        рабочих занято - ${this.state.hiredWorkers}, 
                        рабочих свободно - ${this.state.freeWorkers}
                        (тестовые данные)
                        `
                    }
                </p>
            </div>
        );
    }
}

export default Dashboard;
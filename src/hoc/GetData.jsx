import React, { Component } from "react";
import axios from "axios";

const GetData = (WrappedComponent, dataSource) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true,
                workers: [],
            }
        }

        componentDidMount() {
            this.getData(dataSource);
        }

        getData = (dataSource) => {
            axios.get(dataSource)
                .then(response => {
                    this.setState({ workers: response.data, isLoading: false, })
                })
                .catch(e => {
                    console.log(e);
                    return;
                });
        }

        render() {
            return <WrappedComponent {...this.state} />
        }
    }
}

export default GetData;
import React from 'react'
import { Form } from "react-bootstrap";

export default class ColumnName extends React.Component{
    constructor(props) {
        super(props);
        this.state = {column_name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({column_name: this.props.column_name})
    }

    componentDidUpdate(prevProps){
        if(prevProps.column_name !== this.props.column_name){
            this.setState({column_name : this.props.column_name})
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${this.props.column.id}/name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": this.state.column_name
            })
        })
    }
    
    handleChange(event) {
        event.preventDefault();
        this.setState({ column_name: event.target.value});
    }
    
    render() {
        return (
            <Form className="d-flex overflow-auto" onSubmit={this.handleSubmit}>
                <input
                className="input-form-control"
                type="text"
                placeholder={this.props.column_name}
                value={this.state.column_name}
                onChange={this.handleChange}
                />
            </Form>
        );
        }
}
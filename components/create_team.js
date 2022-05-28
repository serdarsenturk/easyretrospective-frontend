import React from 'react';
import firebase from 'firebase/app';
import { Container, FormControl, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default class CreateTeam extends React.Component{
    constructor(props) {
        super(props);
        this.state = {team_name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(firebase.auth().currentUser)
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${idToken}`
                },
                body: JSON.stringify({
                    "team_name": this.state.team_name
                })
            })
        })
    }
    
    handleChange(event) {
        event.preventDefault();
        this.setState({team_name: event.target.value});
    }
    
    render() {
        return (
        <Container className="d-flex">
            <InputGroup className="my-2 p-2 mb-5">
            <FormControl
                placeholder="Create Team"
                aria-label="Team name"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
                isValid={true}
            />
            <Button variant="success" onClick={this.handleSubmit}>
                <FaPlus style={{ marginTop: "-2px"}} />
            </Button>
            </InputGroup>
        </Container>
        );
        }
}
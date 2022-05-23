import React from 'react';
import firebase from 'firebase/app';
import { Row, Form } from 'react-bootstrap';

export default class CardContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {content: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({content: this.props.card_content})
    }

    componentDidUpdate(prevProps){
        if(prevProps.card_content !== this.props.card_content){
            this.setState({content : this.props.card_content})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${this.props.column_id}/cards/${this.props.card.id}/content`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${idToken}`
                },
                body: JSON.stringify({
                    "content": this.state.content
                })
            })
        })
    }
    
    handleChange(event) {
        event.preventDefault();
        this.setState({ content: event.target.value});
    }

    render() {
        return (
            <Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Control
                    type="text"
                    placeholder={this.props.card_content}
                    value={this.state.content}
                    onChange={this.handleChange}
                    style={{borderColor: "transparent", outlineColor: "transparent", boxShadow: "none", backgroundColor: "white"}}
                />
            </Form>
            </Row>
        );
      }
}
import React from 'react';
import firebase from 'firebase/app';
import { Form } from 'react-bootstrap';

class BoardName extends React.Component {
  constructor(props) {
      super(props); 
      this.state = {board_name: '', token: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({board_name: this.props.board.name})
  }

  componentDidUpdate(prevProps){
      if(prevProps.board.name !== this.props.board.name){
          this.setState({board_name : this.props.board.name})
      }
  }

  handleSubmit(event) {
    event.preventDefault();
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.board.member_firebase_id}/boards/${this.props.board.code}/name`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${idToken}`
        },
        body: JSON.stringify({
            "name": this.state.board_name
        })
      })
    })
  }
  
  handleChange(event) {
    event.preventDefault();
    
    this.setState({ board_name: event.target.value});
  }
  
  render() {
    return (
      <>
        <title>{this.state.board_name}</title>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Update board name"
              value={this.state.board_name}
              onChange={this.handleChange}
              className="board-title-textbox"
            />
          </Form>
      </>
    );
  }
}

export default BoardName
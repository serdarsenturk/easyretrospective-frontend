import React from 'react'
import { Form } from 'react-bootstrap'

export default class BoardName extends React.Component{
    constructor(props) {
        super(props);
        this.state = {board_name: ''};

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
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.board.member_id}/boards/${this.props.board.code}/name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": this.state.board_name
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
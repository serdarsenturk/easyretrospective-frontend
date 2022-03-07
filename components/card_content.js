import React from 'react'
import { Row, Form } from 'react-bootstrap'

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

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${this.props.column_id}/cards/${this.props.card.id}/content`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "content": this.state.content
            })
        })
    }
    
    handleChange(event) {
        event.preventDefault();
        this.setState({ content: event.target.value});
    }

    render() {
        return (
          <>        
            <Row className="board-header p-3 pb-md-4 mx-auto text-center">
              <Form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder={this.props.card_content}
                  value={this.state.content}
                  onChange={this.handleChange}
                  className="board-card-text-textbox"
                />
              </Form>
            </Row>
          </>
        );
      }
}
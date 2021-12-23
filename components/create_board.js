import React from 'react'
import {Button} from "react-bootstrap";

export default class CreateBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {member_id: this.props.member_id}
    }

    handleClick = (member_id) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards` , {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
        })
    }

    render(){
        return (    
            <>
                <Button style={ { margin: '3rem'}} variant="primary" onClick={() => this.handleClick(this.state.member_id)}>CREATE BOARD</Button>
            </>
        );
    }
}
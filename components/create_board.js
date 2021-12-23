import React from 'react'
import {Button} from "react-bootstrap";

export default class CreateBoard extends React.Component{
    constructor(props) {
        super(props);
    }

    handleClick = () => {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/1/boards` , {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
        })
    }

    render(){
        return (    
            <>
                <Button style={ { margin: '3rem'}} variant="primary" onClick={() => this.handleClick(this.state.team_id)}>CREATE BOARD</Button>
            </>
        );
    }
}
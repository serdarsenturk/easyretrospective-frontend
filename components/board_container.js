import React, { Component } from "react";
import CreateBoard from "./create_board";
import Pusher from 'pusher-js'
import { withRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Container, Dropdown } from "react-bootstrap";
class BoardContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {team_id: this.props.team_id, team_name: '', boards: [], member_id: this.props.member_id};
        this.router = props.router
    }
    
      Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING
      this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: 'eu',
          encrypted: true
      });
}

export default withRouter(BoardContainer)
import React, { Component, PropTypes } from "react";
import "./ButtonController.css";
import {connect} from 'react-redux';

import {rateLimitInterval} from '../../config';
import {vote} from '../../actions';
import VoteButton from './VoteButton';

class ButtonController extends Component {

	constructor(props) {
		super(props)
		this.state = {
			waiting: false
		}
	}

	handleVote = move => event => {
		this.props.vote({move})
		this.activateWaiting()
	}

	activateWaiting = () => {
		this.setState(
			{waiting: true},
			() => setTimeout(
				() => this.setState({waiting: false}),
				rateLimitInterval
			)
		)
	}

	render() {
		return (
			<div className="ButtonController-wrapper">
				<ul className="no-bullets">
					<li>
						<VoteButton direction="up" disabled={this.state.waiting} handleVote={this.handleVote(-1)}>
							<i class="fas fa-chevron-up"></i>
						</VoteButton>
					</li>
					<li>
						<VoteButton direction="stay" disabled={this.state.waiting} handleVote={this.handleVote(0)}>
							<i class="fas fa-ellipsis-h"></i>
						</VoteButton>
					</li>
					<li>
						<VoteButton direction="down" disabled={this.state.waiting} handleVote={this.handleVote(+1)}>
							<i class="fas fa-chevron-down"></i>
						</VoteButton>
					</li>
				</ul>
			</div>
		);
	}
}


const mapDispatchToProps = dispatch => {
  return {
    vote: (payload) => {
      dispatch(vote(payload))
    },
  }
}

export default connect(null, mapDispatchToProps)(ButtonController);

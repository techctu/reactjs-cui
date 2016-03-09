'use strict'

import React from 'react'
import Modal, {
	closeStyle
}
from 'simple-react-modal'
import styles from '../../../styles/RedEnvelope.scss';

class RedEnvelope extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			initUrl: props.initUrl,
			rule: 'rule.....',
			showRule: false,
			openCss: 'chai',
			requesting: false,
			envCss: 'hongbao swing'
		}
	}

	showRule() {
		this.setState({
			showRule: true
		})
	}

	hideRule() {
		this.setState({
			showRule: false
		})
	}

	requestResult() {
		if (!this.state.requesting) {
			this.setState({
				openCss: 'chai rotate',
				requesting: true
			})
			this.simulate()
		}
	}

	simulate() {
		this.setState({
			envCss: 'hongbao'
		})
		setTimeout(function() {
			this.setState({
				openCss: 'chai',
				requesting: false
			})
			setTimeout(function() {
				alert('show result')
			}.bind(this), 1000)
		}.bind(this), 5000)
	}

	render() {
		return (
			<div className="container">
			    <div className={this.state.envCss}>
			        <div className="topcontent">
			            <div className="description">恭喜发财 大吉大利</div>
			        </div>
			        <div className={this.state.openCss} onClick={this.requestResult.bind(this)}>
			            <span>拆</span>
			        </div>
			    </div>
			    <Modal show={this.state.showRule} onClose={this.hideRule.bind(this)} transitionSpeed={1000}>
  					<div>{this.state.rule}</div>
				</Modal>
				<button onClick={this.showRule.bind(this)} disabled={this.state.showRule} className='rulebutton'>活动规则</button>
			</div>
		)
	}
}

export default RedEnvelope
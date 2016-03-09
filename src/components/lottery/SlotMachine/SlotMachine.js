'use strict'

import React from 'react'
import Modal, {
	closeStyle
}
from 'simple-react-modal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from '../../../styles/Transition.scss';
import image1 from '../../../assets/img/angularjs.png'
import image2 from '../../../assets/img/backbone.png'
import image3 from '../../../assets/img/reactjs.png'

/**
 * Single slot contain a image list, and use 3 of them.
 * Single slot show the middle image of the three.
 */
class Slot extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			items: props.items,
			current: Math.floor(Math.random() * props.items.length),
			delay: props.delay
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.stop) {
			this.setState({
				stop: newProps.stop,
				result: newProps.result,
				tellStop: newProps.tellStop
			})
		} else {
			this.setState({
				stop: newProps.stop,
				result: null
			})
			this.delay = setTimeout(function() {
				this.timer = setInterval(function() {
					this.setState({
						current: this.state.current + 1
					})
					if (this.state.current % this.state.items.length == this.state.result) {
						clearInterval(this.timer)
						this.state.tellStop()
					}
				}.bind(this), 100)
			}.bind(this), this.state.delay)
		}
	}

	componentWillUnmount() {
		if (this.delay) {
			clearTimeout(this.delay)
		}
		if (this.timer) {
			clearInterval(this.timer)
		}
	}

	render() {
		let children = [];
		let pos = 0;
		for (var i = this.state.current; i < this.state.current + 3; i++) {
			var style = {
				top: pos * 128
			};
			pos++;
			children.push(
				<div key={i} className="animateItem" style={style}>
					<img src={this.state.items[i%this.state.items.length].imgurl} alt={this.state.items[i%this.state.items.length].name}/>
				</div>);
		}
		return (
			<ReactCSSTransitionGroup
              className="animateExample"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
              transitionName="example">
              {children}
            </ReactCSSTransitionGroup>
		)
	}
}

Slot.displayName = 'Slot'
Slot.propTypes = {
	items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	stop: React.PropTypes.bool.isRequired,
	result: React.PropTypes.number,
	delay: React.PropTypes.number
}

/**
 * A slot machine contains several slots.
 */
class SlotMachine extends React.Component {

	constructor(props) {
		super(props);
		let items = this.requestItems();
		this.state = {
			params: props.params === 'undefined' ? null : this.props.params,
			initUrl: this.props.initUrl,
			delay: this.props.delay,
			mess: this.props.mess,
			machineStop: props.stop,
			slotNumber: props.slotNumber,
			slotIndexes: new Array(props.slotNumber).fill(0),
			slotStop: 0,
			items: items,
			rule: 'rule ...',
			showRule: false,
			played: 0,
			maxPlayTimes: this.props.maxPlayTimes
		}
	}

	requestItems() {
		return ([{
			name: 'angularjs',
			imgurl: image1
		}, {
			name: 'backbone',
			imgurl: image2
		}, {
			name: 'reactjs',
			imgurl: image3
		}])
	}

	spinHandler() {
		this.setState({
			machineStop: false
		})
	}

	generateResult(lottery, index) {
		if ((typeof lottery) === 'boolean') {
			if (lottery) {
				return new Array(this.state.slotNumber).fill(this.state.items[index])
			} else {
				let result = new Array(this.state.slotNumber).fill(0);
				let diff = false;
				let last;
				// result cannot be (N)[size]
				result.forEach((v, i, a) => {
					let temp = Math.floor(Math.random() * this.state.items.length)
					if (i != 0) {
						if (last != temp) {
							diff = true
						} else {
							if (i == a.length - 1) {
								while (!diff) {
									temp = Math.floor(Math.random() * this.state.items.length)
								}
							}
						}
					}
					last = temp
					a[i] = temp
				})

				return result
			}
		} else {
			alet('wooooooops')
		}
	}
	componentDidMount() {
		this.setState({
			ready: true
		})
	}
	getAwardHandler() {
		this.setState({
			machineStop: true,
			slotIndexes: this.generateResult(false, 0),
			result: 0
		})
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
	handleSlotStop(i) {
		if (this.state.ready) {
			this.setState({
				slotStop: this.state.slotStop + 1
			})
			if (this.state.slotStop % this.state.slotNumber == 0) {
				this.msgTimer = setTimeout(function() {
					alert('award is ' + this.state.result);
				}.bind(this), 1500)
			}
		}
	}

	render() {
		return (
			<div >
				<div className='container'>		
              		{this.state.slotIndexes.map(
              			function(v, i, a){
							return (<Slot items={this.state.items} stop={this.state.machineStop} key={i} result={this.state.slotIndexes[i]} delay={450*i} tellStop={this.handleSlotStop.bind(this,i)}/>);
						}.bind(this)
					)}
            	</div>	
				<Modal show={this.state.showRule} onClose={this.hideRule.bind(this)} transitionSpeed={1000}>
  					<div>{this.state.rule}</div>
				</Modal>
				<button onClick={this.showRule.bind(this)} disabled={this.state.showRule}>活动规则</button>
				<button onClick={this.spinHandler.bind(this)} disabled={!this.state.machineStop}>点击开始</button>
				<button onClick={this.getAwardHandler.bind(this)} disabled={this.state.machineStop}>模拟返回请求</button>
			</div>
		);
	}
}

SlotMachine.displayName = 'SlotMachine';
/**
 * may need params to identify how to init slot machine.
 * Or params stored in backend session so that i should not care.
 * initUrl: url to get items, rules.
 * delay: each slot should delay animation xxx ms.
 * mess: every slot should have a different array. It's out of plan :)
 * slotNumber: number of slots
 * @type {Object}
 */
SlotMachine.defaultProps = {
	params: null,
	initUrl: null,
	delay: 500,
	mess: false,
	slotNumber: 3,
	maxPlayTimes: 1,
	stop: true
}
SlotMachine.propTypes = {
	params: React.PropTypes.string,
	initUrl: React.PropTypes.string,
	delay: React.PropTypes.number,
	mess: React.PropTypes.bool,
	slotNumber: React.PropTypes.number,
	maxPlayTimes: React.PropTypes.number
}

export default SlotMachine;
import React from 'react'
import Modal, {
	closeStyle
}
from 'simple-react-modal'

/**
 * Start button
 */
class StartButton extends React.Component {
	render() {
		let disabled = this.props.disabled ? 'disabled' : '';

		return (
			<div className="SpinAgain">
                <button disabled={ disabled } onClick={ this.props.spinHandler }>GO</button>
            </div>
		);
	}
}

StartButton.displayName = 'StartButton';
StartButton.propTypes = {
	disabled: React.PropTypes.bool.isRequired,
	spinHandler: React.PropTypes.func
};

/**
 * Show rules.
 */
class RuleBox extends React.Component {
	constructor() {
		super()
		this.state = {}
	}
	show() {
		this.setState({
			show: true
		})
	}
	close() {
		this.setState({
			show: false
		})
	}
	render() {
		return (
			<div>
      <button onClick={this.show.bind(this)}>活动规则</button>
      <Modal
      closeOnOuterClick={true}
      show={this.state.show}
      onClose={this.close.bind(this)}>

      <a style={closeStyle} onClick={this.close.bind(this)}>X</a>
      <div>{this.props.rule}</div>

      </Modal>
      </div>
		);
	}
}

RuleBox.displayName = 'RuleBox';
RuleBox.propTypes = {
	rule: React.PropTypes.string.isRequired
};
RuleBox.defaultProps = {
	rule: 'No rule set'
}

/**
 * Slot item -array- Slot items - spin
 */
class SlotItem extends React.Component {
	render() {
		return (
			<div>
                <img src={ this.props.item.imgurl} alt={this.props.item.name}/>
            </div>
		);
	}
}

SlotItem.defaultProps = {
	item: {
		name: null,
		imgurl: null
	}
};

SlotItem.displayName = 'SlotItem';
SlotItem.propTypes = {
	item: React.PropTypes.object.isRequired
};

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
			stop: true,
			slotNumber: props.slotNumber,
			slotIndexes: new Array(props.slotNumber).fill(items[0]),
			items: items,
			rule: 'rule ...',
			showRule: false,
			played: 0,
			maxPlayTimes: this.props.maxPlayTimes
		}
	}
	requestItems() {
		/**
		 * I used to write
		 * this.setState({...})
		 * It doesn't work
		 * @type {Array}
		 */
		return ([{
			name: 'just',
			imgurl: null
		}, {
			name: 'do',
			imgurl: null
		}, {
			name: 'it',
			imgurl: null
		}])
	}

	spinHandler() {
		this.setState({
			stop: false
		})
		this.timer = setInterval(function() {
			if (!this.state.stop) {
				let tempSlots = Array.from(this.state.slotIndexes);
				tempSlots.forEach((v, i, a) => {
					tempSlots[i] = this.state.items[this.randNext()]
				});
				this.setState({
					slotIndexes: tempSlots
				})
			} else {
				clearInterval(this.timer)
			}
		}.bind(this), 100);
	}
	randNext() {
		return Math.floor(Math.random() * this.state.items.length)
	}
	generateResult(lottery, index) {
		if ((typeof lottery) === 'boolean') {
			if (lottery) {
				return new Array(this.state.slotNumber).fill(this.state.items[index])
			} else {
				let result = new Array(this.state.slotNumber).fill(this.state.items[index]);
				let diff = false;
				let last;
				// result cannot be (N)[size]
				result.forEach((v, i, a) => {
					let temp = this.randNext()
					if (i != 0) {
						if (last != temp) {
							diff = true
						} else {
							if (i == a.length - 1) {
								while (!diff) {
									temp = this.randNext()
								}
							}
						}
					}
					last = temp
					a[i] = this.state.items[temp]
				})

				return result
			}
		} else {
			alet('wooooooops')
		}
	}
	getAwardHandler() {
		this.setState({
			stop: true
		})
		this.setState({
			slotIndexes: this.generateResult(false, 0)
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
	render() {
		let hah = this.state.slotIndexes.map(function(v, i, a) {
			return (<SlotItem item={this.state.slotIndexes[i]}></SlotItem>);
		}.bind(this))
		return (
			<div>
				<div>
				{this.state.slotIndexes.map(function(v, i, a){
					return (<SlotItem item={this.state.slotIndexes[i]}></SlotItem>);
				}.bind(this))}
				</div>
				<Modal show={this.state.showRule} onClose={this.hideRule.bind(this)} transitionSpeed={1000}>
  					<div>{this.state.rule}</div>
				</Modal>
				<button onClick={this.showRule.bind(this)} disabled={this.state.showRule}>活动规则</button>
				<button onClick={this.spinHandler.bind(this)} disabled={!this.state.stop}>点击开始</button>
				<button onClick={this.getAwardHandler.bind(this)} disabled={this.state.stop}>模拟返回请求</button>
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
	maxPlayTimes: 1
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
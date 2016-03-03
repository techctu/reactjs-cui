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
		this.state = {
			params: props.params === 'undefined' ? null : this.props.params,
			initUrl: this.props.initUrl,
			delay: this.props.delay,
			mess: this.props.mess,
			stop: true,
			slotNumber: props.slotNumber,
			slotIndexes: new Array(props.slotNumber).fill(0)
		}
		console.log(this.state);
	}
	requestItems() {
		this.setState({
			items: [{
				name: 'just',
				imgurl: null
			}, {
				name: 'do',
				imgurl: null
			}, {
				name: 'it',
				imgurl: null
			}]
		});
		console.log(this.state);
	}
	componentWillMount() {
		//to request and init
		this.requestItems();
		console.log(this.state);
	}
	spinHandler() {

	}
	getAwardHandler() {

	}
	render() {
		return (
			<div>
				
				
				<button onClick={this.spinHandler.bind(this)}>点击开始</button>
				<button onClick={this.getAwardHandler.bind(this)}>模拟返回请求</button>
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
	slotNumber: 3
}
SlotMachine.propTypes = {
	params: React.PropTypes.string,
	initUrl: React.PropTypes.string,
	delay: React.PropTypes.number,
	mess: React.PropTypes.bool,
	slotNumber: React.PropTypes.number
}

class TestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			end: props.end
		};
	}
	enableHandler() {
		this.setState({
			end: true
		});
	}
	spinHandler() {
		this.setState({
			end: false
		});
	}
	render() {
		return (
			<div>
            	<button onClick={ this.enableHandler.bind(this) }>点击启用</button>
            	
                <StartButton disabled={ !this.state.end } spinHandler={ this.spinHandler.bind(this) } /><label >{this.state.end?'启用':'禁用'}</label>
                <RuleBox rule='写死的'></RuleBox>
            </div>
		);
	}
}

TestComponent.displayName = 'TestComponent';
TestComponent.defaultProps = {
	end: true
};
TestComponent.propTypes = {
	end: React.PropTypes.bool.isRequired
}

export default SlotMachine;
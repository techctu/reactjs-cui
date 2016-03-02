import React from 'react'

class StartButton extends React.Component {
	render() {
		let disabled = this.props.disabled ? 'disabled' : '';

		return (
			<div className="SpinAgain">
                <button className="SpinAgain__button" disabled={ disabled } onClick={ this.props.spinHandler }>GO</button>
            </div>
		);
	}
}

StartButton.displayName = 'SpinAgainButton';
StartButton.propTypes = {
	disabled: React.PropTypes.bool.isRequired,
	spinHandler: React.PropTypes.func
};

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
		textShow = this.state.end ? '启用' : '禁用';
	}
	spinHandler() {
		this.setState({
			end: false
		});
		textShow = this.state.end ? '启用' : '禁用';
	}
	render() {
		let textShow = this.state.end ? '启用' : '禁用';
		return (
			<div>
            	<button onClick={ this.enableHandler.bind(this) }>点击启用</button>
            	
                <StartButton disabled={ !this.state.end } spinHandler={ this.spinHandler.bind(this) } /><label >{textShow}</label>
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

export default TestComponent;
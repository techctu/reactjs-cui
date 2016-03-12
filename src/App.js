import React from 'react';
import RedEnvelope from './components/lottery/RedEnvelope/RedEnvelope.js'
import SlotMachine from './components/lottery/SlotMachine/SlotMachine.js'
	/*import LetsDoThis from './components/LetsDoThis';*/


export default class App extends React.Component {
	render() {
		return (
			<div>
		<RedEnvelope />
		<SlotMachine></SlotMachine>
      </div>
		);
	}
}
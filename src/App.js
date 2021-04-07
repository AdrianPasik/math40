import React from 'react';
import './App.css';
import ArithmeticOperation from './ArithmeticOperation';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			howManyOperations: '',
			upperLimit: '50',
			doMultiply: true,
			doDivide: true,
			generatedOperations: []
		}
	}

	handleOperationCountChange(e) {
		this.setState({
			howManyOperations: e.target.value
		});
	}

	handleUpperLimitChange(e) {
		this.setState({
			upperLimit: e.target.value
		});
	}

	handleDoMultiplyChange(e) {
		this.setState({
			doMultiply: e.target.checked
		});
	}

	handleDoDivideChange(e) {
		this.setState({
			doDivide: e.target.checked
		});
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	generateEntityForMultiply(id) {
		try {
			const upperLimit = parseInt(this.state.upperLimit);
			let counter = 0;
			while (true) {
				counter++;
				let l = this.getRandomInt(2, Math.floor(upperLimit / 2));
				let r = this.getRandomInt(2, Math.floor(upperLimit / 2));
				if (l * r <= upperLimit) {
					return { id: id, left: l, right: r, operation: 'multiply' };
				}
				if (counter > 1000) {
					break;
				}
			}
			return {
				id: id,
				left: 1,
				right: 1,
				operation: 'multiply'
			}
		} catch (e) {
			return {
				id: id,
				left: 1,
				right: 1,
				operation: 'multiply'
			}
		}
		
	}
	generateEntityForDivide(id) {
		try {
			const upperLimit = parseInt(this.state.upperLimit);
			let counter = 0;
			while (true) {
				counter++;
				let l = this.getRandomInt(2, upperLimit);
				let r = this.getRandomInt(2, Math.floor(upperLimit / 2));
				if (l === r) {
					continue;
				}
				if (l / r === Math.floor(l / r)) {
					return { id: id, left: l, right: r, operation: 'divide' };
				}
				if (counter > 1000) {
					break;
				}
			}
			return {
				id: id,
				left: 2,
				right: 1,
				operation: 'divide'
			}
		} catch (e) {
			return {
				id: id,
				left: 2,
				right: 1,
				operation: 'divide'
			}
		}
	}

	generateOperations() {
		try {
			let id = 0;
			this.setState({
				generatedOperations: []
			});
			setTimeout(() => {
				let options = [];
				let howManyOperations = parseInt(this.state.howManyOperations);
				if (howManyOperations > 100) {
					howManyOperations = 100;
				}
				if(this.state.doMultiply) {
					for(let i = 0; i < howManyOperations; i++) {
						id++;
						options.push(this.generateEntityForMultiply(id));
					}
				}
				if(this.state.doDivide) {
					for(let i = 0; i < howManyOperations; i++) {
						id++;
						options.push(this.generateEntityForDivide(id));
					}
				}
				this.setState({
					generatedOperations: options
				});
			}, 100);
			
		} catch(e) {
			this.setState({
				generatedOperations: []
			});
		}
	}
	render() {
		return (
			<div className="Container">
				<div className="MainContent">
					<div>Dzielenie/Mnożenie</div>
					<div>
						<label htmlFor='howManyOperations'>Ile działań ? </label> <input onChange={this.handleOperationCountChange.bind(this)} id='howManyOperations' type='text' />
						<label htmlFor='upperLimit'>Do</label> <input  onChange={this.handleUpperLimitChange.bind(this)} value={this.state.upperLimit} id='upperLimit' type='text' />
					</div>
					<div>
						<label htmlFor='doMultiply'>Generuj mnożenie</label> <input id='doMultiply' onChange={this.handleDoMultiplyChange.bind(this)} checked={this.state.doMultiply} type='checkbox' />
						<label htmlFor='doDivide'> Generuj dzielenie</label> <input id='doDivide' onChange={this.handleDoDivideChange.bind(this)} checked={this.state.doDivide} type='checkbox' />
					</div>
					<div style={{'padding-top': '15px'}}>
						<button id='endCheck' onClick={this.generateOperations.bind(this)}>Rozpocznij od nowa</button>
					</div>
					{
						this.state.generatedOperations.map(
							entity => <ArithmeticOperation key={entity.id} left={entity.left} right={entity.right} operation={entity.operation} />
						)
					}
					
				</div>
			</div>
		  );
	}
  
}

export default App;

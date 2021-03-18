import React from 'react';
import './App.css';
import ArithmeticOperation from './ArithmeticOperation';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			howManyOperations: '',
			generatedOperations: []
		}
	}

	handleChange(e) {
		this.setState({
			howManyOperations: e.target.value
		});
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	generateEntityForMultiply(id) {
		try {
			let counter = 0;
			while (true) {
				counter++;
				let l = this.getRandomInt(2, 20);
				let r = this.getRandomInt(2, 20);
				if (l * r <= 40) {
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
			let counter = 0;
			while (true) {
				counter++;
				let l = this.getRandomInt(2, 40);
				let r = this.getRandomInt(2, 20);
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
			this.forceUpdate();
			let options = [];
			const howManyOperations = parseInt(this.state.howManyOperations);
			for(let i = 0; i < howManyOperations; i++) {
				id++;
				options.push(this.generateEntityForMultiply(id));
			}
			for(let i = 0; i < howManyOperations; i++) {
				id++;
				options.push(this.generateEntityForDivide(id));
			}

			this.setState({
				generatedOperations: options
			});
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
					<div>Dzielenie/Mnożenie do 40</div>
					<div>
						<label htmlFor='howManyOperations'>Ile działań ? </label><input onChange={this.handleChange.bind(this)} id='howManyOperations' type='text' />
					</div>
					<div>
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

import React from 'react';

class ArithmeticOperation extends React.Component {
	constructor() {
		super();
		this.state = {
			isWrong: false,
			isCorrect: false,
			mathResult: ''
		}
		this.handleChildUnmount = this.handleChildUnmount.bind(this);
	}
	handleChildUnmount() {
        this.setState({
			isWrong: false,
			isCorrect: false,
			mathResult: ''
		});
    }
	handleChange(e) {
		const { left, right, operation } = this.props;
		this.setState({
			mathResult: e.target.value
		});
		try {
			const leftVal = parseInt(left);
			const rightVal = parseInt(right);
			const resultVal = parseInt(e.target.value);
			if (operation === 'multiply') {
				if (leftVal * rightVal === resultVal) {
					this.setState({
						isCorrect: true,
						isWrong: false
					});
				} else {
					this.setState({
						isCorrect: false,
						isWrong: true
					});
				}
			} else {
				if (leftVal / rightVal === Math.floor(resultVal)) {
					this.setState({
						isCorrect: true,
						isWrong: false
					});
				} else {
					this.setState({
						isCorrect: false,
						isWrong: true
					});
				}
			}
		} catch(e) {
			this.setState({
				isCorrect: false,
				isWrong: true
			});
		}
	}
	render() {
		const { left, right, operation } = this.props;
		return (
			<div>
				<div>
					<label>{left} {operation === 'multiply' ? (<span>&times;</span>) : (<span>&divide;</span>)} {right} = </label> <input onChange={this.handleChange.bind(this)} value={this.state.mathResult} className='CalcInput' type='text' />
				</div>
				<div>
					{
						(this.state.isCorrect) ? (<span className='CorrectAnswer'>Poprawna odpowiedź</span>) : <></>
					}
					{
						(this.state.isWrong) ? (<span className='WrongAnswer'>Zła odpowiedź</span>) : <></>
					}
				</div>
			</div>
		)
	}
}

export default ArithmeticOperation;
import React, { Component } from "react";
import "./cards.css";
import { makeStyles } from '@material-ui/core/styles';
import { Modal , TextField, Button } from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
	modal:{
	  position:'absolute',
	  width: 400,
	  backgroundColor: 'white',
	  border: '2px solid #000',
	  boxShadow: theme.shadows[5],
	  //padding: theme.spacing(2,4,3),
	  padding: '16px,32px,24px',
	  top: '50%',
	  left: '50%',
	  transform: 'traslate(-50%, -50%)'
	  },
		textfield:{
		  width: '100%'
		}
  }))

export default class KanbanBoard extends Component {
	constructor() {
		super();
		// Las tareas son identificadas por su nombre
		this.state = {
			tasks: [
				{ name: "Task 1", stage: 0 },  //stage 0 = "Backlog"
			],
			inputValue: "",
		};
		this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done",]; //Nombre y cantidad de las tablas, si dos task se llaman igual, no tienen un identificador primario
	}

	onInputChange = input => {
		this.setState({ inputValue: input.target.value });
	};

	addTask = () => {
		if (this.state.inputValue) {
			const tasks = [...this.state.tasks];
			tasks.push({ name: this.state.inputValue, stage: 0 });
			this.setState({ tasks, inputValue: "" });  //Aqui se añaden las tablas
		}
	};

	backward = name => {
		const tasks = this.state.tasks.map(task => {
			if (task.name == name)
				return { name: task.name, stage: task.stage == 0 ? 0 : task.stage - 1 };
			else return task;
		});
		this.setState({ tasks });  //boton backward
	};

	forward = name => {
		const tasks = this.state.tasks.map(task => {
			if (task.name == name)
				return { name: task.name, stage: task.stage == 3 ? 3 : task.stage + 1 };  //cantidad de boards que permite maximo el boton
			else return task;
		});
		this.setState({ tasks }); //boton foward
	};

	removeTask = name => {
		let tasks = this.state.tasks.filter(task => task.name != name);  //remover tarea
		this.setState({ tasks });
	};

	
	
	EditBoard = name => {
		<div>
			asdasdasdasd
		</div>
	};

	render() {
		const { tasks } = this.state;

		let stagesTasks = [];
		for (let i = 0; i < this.stagesNames.length; ++i) {
			stagesTasks.push([]);
		}
		for (let task of tasks) {
			const stageId = task.stage;
			stagesTasks[stageId].push(task);
		}

		return (
			<div className="mt-20 layout-column justify-content-center align-items-center">
				<section className="mt-50 layout-row align-items-center justify-content-center">

					<input value={this.state.inputValue} onChange={this.onInputChange} id="create-task-input"
						type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>

					<button onClick={this.addTask} type="submit" className="ml-30" data-testid="create-task-button" >
						Create task
					</button>

				</section>  {/* Columna "New Task" */}

				<div className="mt-50 layout-row">
					{stagesTasks.map((tasks, i) => {
						return (
							<div className="card outlined ml-20 mt-0" key={`${i}`}>
								<div className="card-text">
									<h4>{this.stagesNames[i]}</h4>
									<ul className="styled mt-50" data-testid={`stage-${i}`}>
										{tasks.map((task, index) => {
											return (
												<li className="slide-up-fade-in" key={`${i}${index}`}>
													<div className="li-content layout-row justify-content-between align-items-center">
														<span data-testid={`${task.name.split(" ").join("-")}-name`} >
															{task.name}
														</span>

														<div className="icons">

														<button onClick={() => this.EditBoard(task.name)} className="icon-only secondary x-small mx-2" data-testid={`${task.name
																	.split(" ") .join("-")}-edit`} >
																<i className="material-icons">edit</i> </button>

															<button disabled={task.stage == 0} onClick={() => this.backward(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name
															.split(" ") .join("-")}-back`} >
															<i className="material-icons">arrow_back</i> </button>

															<button disabled={task.stage == 3} onClick={() => this.forward(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name
																	.split(" ") .join("-")}-forward`} >
																<i className="material-icons">arrow_forward</i> </button>

															<button onClick={() => this.removeTask(task.name)} className="icon-only danger x-small mx-2" data-testid={`${task.name
																	.split(" ") .join("-")}-delete`} >
																<i className="material-icons">delete</i> </button>
														</div>
													</div>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

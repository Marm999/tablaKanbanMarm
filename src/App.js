import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import KanbanBoard from './components/Tablas/cards.js';





const title = "Tabla Kanban";

class App extends Component {
  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <KanbanBoard/>
      </div>
    );
  }
}

export default App;

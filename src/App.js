import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { GameBoard } from './components/index';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <GameBoard />
      </div>
    </DndProvider>
  );
}

export default App;

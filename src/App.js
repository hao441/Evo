import './App.css';
import { useState } from 'react';
import Individual from './components/individual';

const POPULATION = 100;

const App = () => {

  const [targetColour, setTargetColour] = useState(null)
  const [colours, setColours] = useState(null)

  const createGrid = () => {
    let grid = []
    for (i in POPULATION) {
      let columns = []
      columns.push()
      columns.push(<div></div>)
      for (ii in POPULATION) {
        let row = []
      }
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
      </header>
    </div>
  );
}

export default App;

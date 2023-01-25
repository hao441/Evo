import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { click } from '@testing-library/user-event/dist/click';

let POPULATION_SIZE = 1000;
let GENES = `0123456789ABCDEF`;
let cells = 196;
let targetColour = "FFFFFF"
let TARGET = new Array(cells).fill(targetColour);

function App() {
  const [colours, setColours] = useState("hello")
  const [pop, setPop] = useState("");
  const [clicked, setClicked] = useState(null)

  const popper = useRef(0);

  useEffect(() => {
    // setInterval( coloring, 100);
  })


 

  function coloring() {
    if (!pop[0]) return
    console.log(pop[0])
    return pop[0].chromosome.map((x,i) => document.getElementById(i).style.backgroundColor = `#${x}`)
  }

  const colors = []
  const updatedState = {};

  const createGrid = () => {
    let grid = []
    for (let i = 0; i < TARGET.length; i++) {
      grid.push(<div id={i} key={i} style={colours && {backgroundColor:`${colours[i]}`}} className="individual"></div>)
    }
    return grid
  }


 

  class Individual {
    constructor(chromosome) {
      this.chromosome = chromosome
      this.fitness = this.calc_fitness()
    }

    static mutated_genes = () => {
      const gene = GENES[Math.floor(Math.random() * GENES.length)];
      return gene;
    }
  
    static create_gnome = () => {
      let childChromosome = []
      for (let i = 0; i < TARGET.length; i++) {
        let childGnome = ""
        for (let k = 0; k < TARGET[0].length; k++) {
          childGnome += Individual.mutated_genes();
        }
        childChromosome.push(childGnome);
      }

      return childChromosome;
    }

    mate = (par2) => {
      let childChromosome = []
      for (let i = 0; i < this.chromosome.length; i++) {
        let childGnome = ""
        for (let k = 0; k < this.chromosome[0].length; k++) {
          const probability = Math.random();

          probability < 0.499 ? childGnome += this.chromosome[i][k] :
          probability < 0.998 ? childGnome += par2.chromosome[i][k] :
          childGnome += Individual.mutated_genes();
        }
        childChromosome.push(childGnome);
      }

      return new Individual(childChromosome);
    }

    calc_fitness = () => {

      let fitness = 0

        for (let i = 0; i < this.chromosome.length; i++) {
          for (let k = 0; k < this.chromosome[0].length; k++) {
            if (this.chromosome[i][k] !== TARGET[i][k]) {
              fitness++
            }
          }
        }
        return fitness
      }
    }

  // const evolution = () => {

  //   let generation = 1;
  //   let complete = false;

  //   for (let x = 0; x < POPULATION_SIZE; x++) {
  //     const gnome = Individual.create_gnome();
  //     population.push(new Individual(gnome));
  //   }

  //   while (!complete && generation < 3000) {
  //     population = population.sort((a,b) => a.fitness - b.fitness);
  //     setPop(x => population)

  //     if (population[0].fitness <= 0) {
  //       console.log(population[0])
  //       complete = true
  //       break;
  //     }

  //     let new_generation = []

  //     let s = Math.floor((10 * POPULATION_SIZE) / 100);
  //     new_generation = new_generation.concat(population.slice(0,s))

  //     s = Math.floor((90 * POPULATION_SIZE) / 100)

  //     for (let x = 0; x < s; x++) {
  //       const parent1 = population[x];
  //       const parent2 = population[Math.floor(Math.random() * s)];

  //       const offspring = parent1.mate(parent2);

  //       new_generation.push(offspring);
  //       new_generation[0].chromosome.map((x,i) => document.getElementById(i).style.backgroundColor = `#${x}`)

  //     }
  //     popper.current = new_generation
  //     population = new_generation;

  //     console.log(`Generation: ${generation} Fitness: ${population[0].fitness}.`)
  //     setPop(population)
  //     var rotate = false;
      
  //     setColours("hello")
      
  //     generation++

  //   }
  // };

  const startEvo = () => {
    setClicked(true);
    console.log("start")
  }
  
  useEffect(() => {
    if (!clicked) return
    let count = 0

    let population = []
    let generation = 1;
    let complete = false

    for (let x = 0; x < POPULATION_SIZE; x++) {
      const gnome = Individual.create_gnome();
      population.push(new Individual(gnome));
    }

    const intervalID = setInterval(() => {

      if (complete || generation > 3000) {
        clearInterval(intervalID);
        setClicked(false);
      }
      
      population = population.sort((a,b) => a.fitness - b.fitness);
      setPop(x => population)

      if (population[0].fitness <= 0) {
        console.log(population[0]);
        complete = true;
        clearInterval(intervalID);
        setClicked(false);
      }

      let new_generation = []

      let s = Math.floor((25 * POPULATION_SIZE) / 100);
      new_generation = new_generation.concat(population.slice(0,s))

      s = Math.floor((75 * POPULATION_SIZE) / 100)

      for (let x = 0; x < s; x++) {
        const parent1 = population[x];
        const parent2 = population[Math.floor(Math.random() * s)];

        const offspring = parent1.mate(parent2);

        new_generation.push(offspring);
        new_generation[0].chromosome.map((x,i) => document.getElementById(i).style.backgroundColor = `#${x}`)

      }
      popper.current = new_generation
      population = new_generation;

      console.log(`Generation: ${generation} Fitness: ${population[0].fitness}.`)
      setPop(population)
      var rotate = false;
      
      setColours("hello")
      
      generation++
      
    }, 10)
    
    
  }, [clicked])

  return (
    <>
      <div className='tile-section'>
        <button id="startEvo" onClick={() => startEvo()} disabled={clicked}>Start Evolution</button>
        <label>Pick a colour</label>
        <input type="color" value={colours} onChange={(e) => setColours(e.target.value)}></input>
        <h5>Generations: </h5>
        <h5>Population: </h5>
      </div>
        <div id="grid">{createGrid()}</div>
    </>
  );
}

export default App;

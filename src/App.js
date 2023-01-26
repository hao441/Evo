import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


function App() {
  const navigate = useNavigate();

  const [colours, setColours] = useState("#ffffff")
  const [pop, setPop] = useState("");
  const [gen, setGen] = useState("");
  const [clicked, setClicked] = useState(null)

  useEffect(() => {
    console.log(colours.slice(1,))
  }, [colours])

  let POPULATION_SIZE = 1000;
  let GENES = `0123456789abcdef`;

  let cells = 196;
  let targetColour = colours.slice(1,)
  let TARGET = new Array(cells).fill(targetColour);

  const createGrid = () => {
    let grid = []
    for (let i = 0; i < TARGET.length; i++) {
      grid.push(<div id={i} key={i} style={{backgroundColor:colours}} className="individual"></div>)
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

  const startEvo = () => {
    setClicked(true);
    console.log("Evo Started")
  }
  
  useEffect(() => {
    if (!clicked) return

    let population = []
    let generation = 1;

    for (let x = 0; x < POPULATION_SIZE; x++) {
      const gnome = Individual.create_gnome();
      population.push(new Individual(gnome));
    }

    const intervalID = setInterval(() => {

      if (population[0].fitness <= 0 || generation > 3000 || clicked === null) {
        clearInterval(intervalID);
        setClicked(false);
      }
      
      population = population.sort((a,b) => a.fitness - b.fitness);

      // let new_generation = new Array()

      let topPop = Math.floor((25 * POPULATION_SIZE) / 100);
      let new_generation = population.slice(0,topPop)

      let restOfPop = Math.floor((75 * POPULATION_SIZE) / 100)

      for (let x = 0; x < restOfPop; x++) {
        const parent1 = population[x];
        const parent2 = population[Math.floor(Math.random() * restOfPop)];

        const offspring = parent1.mate(parent2);

        new_generation.push(offspring);
        new_generation[0].chromosome.map((x,i) => document.getElementById(i).style.backgroundColor = `#${x}`)

      }
      population = new_generation;

      console.log(`Generation: ${generation} Fitness: ${population[0].fitness}.`)
      setPop(population[0].fitness)
      setGen(generation)
      
      generation++
      
    }, 10)
    
    
  })

  return (
    <>
      <button className='back-button' onClick={() => navigate("/")} disabled={clicked}>Back</button>
      <div className='title-section'>
        <div>
          <label className='colour-label'>Pick a colour:</label>
          <input className='colour' type="color" value={colours} onChange={(e) => setColours(e.target.value)} disabled={clicked}></input>
        </div>
        
        <button id="startEvo" onClick={() => startEvo()} disabled={clicked} className="start-button">Start Evolution</button>
        <div className='title-section justify-start label-resp'>
          <h5 className='labels'>Left to solve: {clicked === null ? "" : `${Math.round(((pop/1200))*1000)/10}%`}</h5>
          <br />
          <h5 className='labels'>Generation: {gen}</h5>
        </div>
      </div>
      <div id="grid">{createGrid()}</div>
    </>
  );
}

export default App;

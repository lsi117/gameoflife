import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component{
  render(){
    return(
        <div>
          <h1>Grid</h1>
        </div>
      )
  }
}

class Main extends React.Component{
  constructor(){
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))

    }
  }
  render (){
    return(
      <div>
        <h1>Jelly Fish</h1>
        <p>Created by <a href="http://laureninacio.com/" target="_blank">Lauren Inacio</a></p>
        <Grid />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

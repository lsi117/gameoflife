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
    this.state = {
      generation: 0,
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

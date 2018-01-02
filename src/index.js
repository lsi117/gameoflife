import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component{
  render(){
    const width = this.props.cols * 14;
    let rowsArr = [];

    let boxClass = "";
      for (let i = 0; i < this.props.rows; i++){
        for (let j = 0; j < this.props.cols; j++){
          let boxId = i + " " + j;

          boxClass = this.props.gridFull[i][j]
        }
      }

    return(
        <div className="grid" style={{width: width}}>
          {{rowsArr}}
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
        <Grid
        gridFull={this.state.gridFull}
        rows={this.rows}
        cols={this.cols}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

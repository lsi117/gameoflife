import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

class Box extends React.Component{
selectBox = () =>{
  this.props.selectBox(this.props.row, this.props.col)
}

render(){
  return(
      <div className={this.props.boxClass} id={this.props.id} onClick={this.selectBox} />
    )
  }
}


class Grid extends React.Component{
  render(){
    const width = (this.props.cols * 14);
    let rowsArr = [];

    let boxClass = "";
      for (let i = 0; i < this.props.rows; i++){
        for (let j = 0; j < this.props.cols; j++){
          let boxId = i + "_" + j;

          boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
          rowsArr.push(
            <Box boxClass={boxClass} key={boxId} row={i} col={j} selectBox={this.props.selectBox} />
          );
        }
      }

    return(
        <div className="grid" style={{width: width}}>
          {rowsArr}
        </div>
      )
  }
}

class Buttons extends React.Component {

  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Add Microbes!
          </button>
          <DropdownButton title="Dropup" dropup id="split-button-dropup"
            title="Pertri Dish Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1">Small</MenuItem>
            <MenuItem eventKey="2">Medium</MenuItem>
            <MenuItem eventKey="3">Large</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
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

  selectBox = (row, col) =>{
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    })
  }

  seed = () =>{
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if (Math.floor(Math.random() * 4) === 1){
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  playButton = () =>{
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed);
  }

  slow = () =>{
    this.speed = 1000;
    this.playButton();
  }

  fast = () =>{
    this.speed = 100;
    this.playButton();
  }

  clear = () =>{
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  }

  pauseButton = () =>{
    clearInterval(this.intervalId)
  }

  play = () =>{
    let gridOne = this.state.gridFull;
    let gridTwo = arrayClone(this.state.gridFull)

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      let count = 0;
      if (i > 0) if (gridOne[i - 1][j]) count++;
      if (i > 0 && j > 0) if (gridOne[i - 1][j - 1]) count++;
      if (i > 0 && j < this.cols - 1) if (gridOne[i - 1][j + 1]) count++;
      if (j < this.cols - 1) if (gridOne[i][j + 1]) count++;
      if (j > 0) if (gridOne[i][j - 1]) count++;
      if (i < this.rows - 1) if (gridOne[i + 1][j]) count++;
      if (i < this.rows - 1 && j > 0) if (gridOne[i + 1][j - 1]) count++;
      if (i < this.rows - 1 && this.cols - 1) if (gridOne[i + 1][j + 1]) count++;
      if (gridOne[i][j] && (count < 2 || count > 3)) gridTwo[i][j] = false;
      if (!gridOne[i][j] && count === 3) gridTwo[i][j] = true;
    }
  }
  this.setState({
    gridFull: gridTwo,
    generation: this.state.generation + 1
  });
}

  gridSize = (size) =>{
    switch (size){
      case "1":
      this.cols = 20;
      this.rows = 10;
      break;

      case "2":
      this.cols = 50;
      this.rows = 30;
      break;

      default:
      this.cols = 70;
      this.rows = 50;
    }
    this.clear();
  }


  componentDidMount(){
    this.seed();
    this.playButton();
  }

  render (){
    return(
      <div>
        <h1>Under The Microscope</h1>
        <p>Created by <a href="http://laureninacio.com/" target="_blank" rel="noopener noreferrer">Lauren Inacio</a></p>
        <br />
        <Grid
        gridFull={this.state.gridFull}
        rows={this.rows}
        cols={this.cols}
        selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
        <Buttons
        playButton={this.playButton}
        pauseButton={this.pauseButton}
        slow={this.slow}
        fast={this.fast}
        clear={this.clear}
        seed={this.seed}
        gridSize={this.gridSize}
        />
      </div>
    )
  }
}

function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));

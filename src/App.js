import React, { Component } from 'react';
import './css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilityLabels: [
        'Strength',
        'Dexterity',
        'Constitution',
        'Intelligence',
        'Wisdom',
        'Charisma'
      ],
      abilityLabelsShort: ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'],
      abilityScores: [15, 16, 12, 14, 18, 9]
    };
  }
  componentDidMount(){
    console.log('App Mounted');
  }
  getMod(score){
    switch (score) {
    case 1:
      return -5;
    case 2: case 3:
      return -4;
    case 4: case 5:
      return -3;
    case 6: case 7:
      return -2;
    case 8: case 9:
      return -1;
    case 10: case 11:
      return 0;
    case 12: case 13:
      return 1;
    case 14: case 15:
      return 2;
    case 16: case 17:
      return 3;
    case 18: case 19:
      return 4;
    case 20: case 21:
      return 5;
    default:
      console.log('Error: score invalid, cannot return mod. Value must be an integer between 1 and 20.');
      break;
    }
  }
  setDefaultAbilities(){
    // Scored based on Zog
    this.setState({
      abilityScores: [15, 16, 12, 14, 18, 9]
    });
  }
  rollD6(){
    let dice = Math.floor(Math.random() * Math.floor(6)) + 1;
    // console.log(dice);
    return dice;
  }
  setNewAbilities(){
    let newScores = [];
    // roll 6 abilities
    for(let i = 0; i < 6; i++) {
      // roll 4 dice
      let newAbility = [];
      for(let j = 0; j < 4; j++) {
        // roll a D6
        let result = this.rollD6();
        // re-roll 1s
        if(result != 1) {
          newAbility.push(result);
        } else {
          j--;
        }
      } // all done rolling...
      // get lowest val
      let lowest = Math.min.apply( Math, newAbility );
      // basic sum fn
      function getSum(total, num) {
        return total + num;
      }
      // sum all values and remove lowest + push into array
      let sumRoll = newAbility.reduce(getSum) - lowest;
      newScores.push(sumRoll);
    }
    this.setState({
      abilityScores: newScores
    });
  }
  totalAllMods(){
    let s = this.state.abilityScores;
    let modArray = [];
    for(let i = 0; i < s.length; i++) {
      let abil = s[i];
      let mod = this.getMod(abil);
      modArray.push(mod);
    }
    function getSum(total, num) {
      return total + num;
    }
    let sumArray = modArray.reduce(getSum);
    return sumArray;
  }
  render() {
    // basic abbreviations
    let aL = this.state.abilityLabels;
    let aLShort = this.state.abilityLabelsShort;
    let aLScores = this.state.abilityScores;
    let that = this;
    // x
    function getSum(total, num) {
      return total + num;
    }
    let totalAbils = aLScores.reduce(getSum);
    let totalMods = 0;
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Character Sheet (5e)</h1>
        </header>
        <main className="app__main">
          <div className="sheet">
            {/* Component: Abilities - Start */}
            <div className="abilities">
              <h2 className="title">Abilities</h2>
              <ul className="abilities__list">
                <li className="abilities__item abilities__item--head">
                  <span>Ability</span>
                  <span>Score</span>
                  <span>Mod</span>
                </li>
                {aLShort.map(function(item, i){
                  return (
                    <li className="abilities__item" key={i}>
                      <span><b>{item}</b></span>
                      <span>{aLScores[i]}</span>
                      <span>{ that.getMod(aLScores[i]) }</span>
                    </li>
                  );
                })}
              </ul>
              <p><b>Total Abilites:</b> {totalAbils}</p>
              <p><b>Total Mods:</b> {this.totalAllMods()}</p>
              <button className="button" onClick={() => { this.setDefaultAbilities() }}>
                Set Default Stats
              </button>
              <button className="button" onClick={() => { this.setNewAbilities() }}>
                Roll New Stats
              </button>
            </div>
            {/* Component: Abilities - End */}
            <div className="saves">
              <h2 className="title">Saves</h2>
            </div>
            <div className="stats">
              <h2 className="title">Stats</h2>
            </div>
            <div className="health">
              <h2 className="title">Health</h2>
            </div>
          </div>
        </main>
        <footer className="app__footer">
          <small>Character Sheet</small>
        </footer>
      </div>
    );
  }
}

export default App;

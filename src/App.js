// import React, { Component } from 'react';
import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

// class App extends Component {
const App = props => {
  // state = {
    //   selectedCharacter: 1,
    //   side: 'light',
    //   destroyed: false
    // };
  // The two names chosen after const [.,.] below are important throughout
  const [currentstate, functiontochangestate] = useState({
    selectedCharacter: 1,
    side: 'light',
    destroyed: false
  });

  // sideHandler = side => {
  const sideHandler = side => {
    // this.setState({ side: side });
    functiontochangestate({ ...currentstate, side: side });
  };

  // charSelectHandler = event => {
  const charSelectHandler = event => {
    const charId = event.target.value;
    // this.setState({ selectedCharacter: charId });
    functiontochangestate({ ...currentstate, selectedCharacter: charId });
  };

  // destructionHandler = () => {
  const destructionHandler = () => {
    // this.setState({ destroyed: true });
    functiontochangestate({ ...currentstate, destroyed: true });
  };

  // render() {
    let content = (
      <React.Fragment>
        <CharPicker
          side={currentstate.side}
          selectedChar={currentstate.selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={currentstate.selectedCharacter} />
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {currentstate.side === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    // if (this.state.destroyed) {
    if (currentstate.destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
  };
// }

export default App;

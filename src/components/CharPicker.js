// converting this component also involves dealing with a lifecycle method (componentDidMount), which can't be added to functional components. Hooks has another solution for that.
// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';

// if you want to use custom hooks (to break up your code / make it more modular?)
import { useHttp } from '../customHooks/customHook';

import './CharPicker.css';

// class CharPicker extends Component {
const CharPicker = props => {
  // state = { characters: [], isLoading: false };
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   fetch('https://swapi.co/api/people')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const selectedCharacters = charData.results.slice(0, 5);
  //       this.setState({
  //         characters: selectedCharacters.map((char, index) => ({
  //           name: char.name,
  //           id: index + 1
  //         })),
  //         isLoading: false
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // lifecycle methods, like componentDidMount(), need 'useEffect':

  /* IMPORTANT: useEffect gets triggered after each render (which is when props or state changes), but AFTER the original render cycle (which builds the component) finishes, similar to 'componentDidMount()'

     For the equivalant of componentWillMount() anything before, just write code for that ABOVE   'useEffect(() => {'
  */
  useEffect(() => {
    console.log("runs");
    setIsLoading(true);
     fetch('https://swapi.co/api/people')
     .then(response => {
       if (!response.ok) {
         throw new Error('Failed to fetch.');
       }
       return response.json();
     })
     .then(charData => {
       const selectedCharacters = charData.results.slice(0, 5);
       setIsLoading(false);
       setLoadedChars(
         selectedCharacters.map((char, index) => ({
           name: char.name,
           id: index + 1
         }))
       );
     })
     .catch(err => {
       console.log(err);
       setIsLoading(false);
     });
  }, []);
  /* above is the optional 2nd function the useEffect takes, which is used to control WHEN it is triggered (avoiding it being triggered too often or things like infinite loops),
    If this second argument is not provided, then it just runs on every update on the component
    What goes into the array [], are the variables that, if they are changed, you want to trigger this function to run again. The variables are called dependencies in this case.
    If it is left as just an empty array [], this only fires ONCE, and so it is EXACTLY like the older 'componentDidMount()'.
  */


  // alternate, remove useEffect, and u>se separated content into custom hook file (not complete to keep basics here intact):
  // Benefit: allows logic to be shared between components
  // const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people', []);  //a hook can't be nested inside another function of if statement. Hooks must be at the top level of your function.

  // render() {
    let content = <p>Loading characters...</p>;

    if (
      // !this.state.isLoading &&
      // this.state.characters &&
      // this.state.characters.length > 0
      !isLoading &&
      loadedChars &&
      loadedChars.length > 0
    ) {
      content = (
        <select
          // onChange={this.props.onCharSelect}
          // value={this.props.selectedChar}
          // className={this.props.side}
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          // [remove first char so commenting out  works] this.state.characters.map(char => (
          {loadedChars.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      // !this.state.isLoading &&
      // (!this.state.characters || this.state.characters.length === 0)
      !isLoading &&
      (!loadedChars || loadedChars.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  // }
}

export default CharPicker;

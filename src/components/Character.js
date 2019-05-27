// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';

import Summary from './Summary';

// class Character extends Component {
const Character = props => {
  // state = { loadedCharacter: {}, isLoading: false };
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  // brought up from below:
  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // for componentDidMount(), + componentDidUpdate() + componentWillUnmount():
  useEffect(() => {    // for componentDidMount()
    console.log("this only fires when a new character is selected");
    fetchData();
    return () => {   // for componentWillUnmount()
      console.log('Cleaning up...');
    };
  }, [props.selectedChar]);  // for componentDidUpdate()
  // here we are only calling this fetch data ONLY for when a new character is selected

  /*
  fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        this.props.selectedChar
    );
    this.setState({ isLoading: true });
    fetch('https://swapi.co/api/people/' + this.props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: this.props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
  */


  // useEffect can also deal with componentWillUnmount(), by returning something (a function), shown above

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  // render() {
    let content = <p>Loading Character...</p>;

    // if (!this.state.isLoading && this.state.loadedCharacter.id) {
    //   content = (
    //     <Summary
    //       name={this.state.loadedCharacter.name}
    //       gender={this.state.loadedCharacter.gender}
    //       height={this.state.loadedCharacter.height}
    //       hairColor={this.state.loadedCharacter.colors.hair}
    //       skinColor={this.state.loadedCharacter.colors.skin}
    //       movieCount={this.state.loadedCharacter.movieCount}
    //     />
    //   );
    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    // } else if (!this.state.isLoading && !this.state.loadedCharacter.id) {
    //   content = <p>Failed to fetch character.</p>;
    // }
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  // }
}

export default Character;

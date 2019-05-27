import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  // useEffect wraps around to control when this fires:
  useEffect(() => {


    setIsLoading(true);
    console.log('Sending Http request');

    // from CharPicker.js:
    // fetch('https://swapi.co/api/people')
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch.');
      }
      return response.json();
    })
    .then(charData => {
      // const selectedCharacters = charData.results.slice(0, 5);
      // setIsLoading(false);
      // setLoadedChars(
      //   selectedCharacters.map((char, index) => ({
      //     name: char.name,
      //     id: index + 1
      //   }))
      // );
      setIsLoading(false);
      setFetchedData(charData);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
    });

  }, dependencies);

  return [isLoading, fetchedData];
}

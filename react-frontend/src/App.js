import React, {useState, useEffect} from 'react';
import Table from './RecipeTable';
import Form from './RecipeForm';
import axios from 'axios';


function MyApp() { 
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  function removeOneCharacter (index) {
    makeDeleteCall(index).then( result => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
    });
  }

  function updateList(person) {
    makePostCall(person).then( result => {
      person = result.data;
      //console.log(result.user);
    if (result && result.status === 201)
      setCharacters([...characters, person]);
    });
  }

  // makes the GET request through API on the backend
  // returns the data (list of recipes from the backend)
  async function fetchAll(){
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      return response.data.recipes_list;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person){
    try {
      const response = await axios.post('http://localhost:5000/recipes', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(index){
    try {
      var id = characters[index].id
      const response = await axios.delete('http://localhost:5000/recipes/' + id);
      return response;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
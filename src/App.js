import axios from 'axios';
import React,{useState} from 'react';
import Recipe from './components/Recipe';
import { v4 as uuidv4 } from "uuid";
import Alert from './components/Alert';
import './App.css';

const App = () => {
  const [query,setQuery] = useState('');
  const [recipes,setrRcipes] = useState([]);
  const [alert,setAlert] =useState("");
  const APP_ID='f0bf1ca6';
  const APP_KEY='1d2df2fba8e92f32cb1529918247fe32';
  const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async() =>{
    if(query!== "")
    {
      const result = await axios.get(url);
      if(!result.data.more){
        return setAlert("no food such name");
      }
      setrRcipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");

    }
    else
    {
      setAlert("please fill the form");
    }
    
  }
  const onChange = (e) =>{
    console.log(e.target.value);
    setQuery(e.target.value);
  } 
  const onSubmit = (e) =>{
    e.preventDefault();
    getData();
  }
  return (
    <div className="App">
    <h1>Food Searching App</h1>
    <form onSubmit={onSubmit} className="search-form">
      {alert !== "" && <Alert alert={alert} />}
      <input
        type="text"
        name="query"
        onChange={onChange}
        value={query}
        autoComplete="off"
        placeholder="Search Food"
      />
      <input type="submit" value="Search" />
    </form>
    <div className="recipes">
      {recipes !== [] &&
        recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
    </div>
  </div>
  )
}

export default App

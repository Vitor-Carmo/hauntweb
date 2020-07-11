import React from 'react';
import Routes from './routes'


import './GlobalStyles.css'

import Header from './components/Header'



const App = () =>{
  return(
    <div className="App">
        <Header/>
        <Routes/>
        
    </div>
  )
}



export default App;



// yarn add axios
// yarn add react-router-dom
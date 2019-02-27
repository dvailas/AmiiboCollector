import React, { Component } from 'react';
import './App.css';
import AmiiboRow from './AmiiboRow.js';
import $ from 'jquery';
import FilterDropDown from './filterDropDown';


class App extends Component {
  constructor(props){
    super(props)
    this.state ={}

    this.performSearch("*")
  }

  performSearch(searchTerm){
    var urlString =""
    if(searchTerm === "*")
    {
       urlString = "http://www.amiiboapi.com/api/amiibo/"
    }
    else{
       urlString = "http://www.amiiboapi.com/api/amiibo/?character=" + searchTerm
    }
    $.ajax({
      url :urlString,
      success: (searchResults) => {
        var amiiboRows = []
        const results = searchResults.amiibo
        results.forEach(currentAmiibo => {
          const amiibo = <AmiiboRow key={currentAmiibo.tail} amiibo={currentAmiibo}/>
          amiiboRows.push(amiibo)
        })
        this.setState({rows:amiiboRows})
      },
      error: (xhr,status,err) =>{
        console.log("error")
      }
    })
  }

  searchChangeHandler(event){
    console.log(event.target.value)
    const searchTerm = event.target.value
    //to use this it has to be bound by the event
    this.performSearch(searchTerm)
  }

  render() {
    return (
      <div className="App">
      <header style={{
          backgroundColor:'#000',
          display: 'block',
          color:'#fff',
          paddingLeft:8 }}>
        <table >
          <thead id="headerTitle">
            <tr>
              <td>
                <img alt="logo"width="90" height="90" src="amiibo_Rune_Icon.png"/>
              </td>
              <td>
                <h3><a href="#">Amiibo Collector</a></h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr id="menuItems">
              <td><a href="#">Newly Added </a>|</td>
              <td><a href="#">Collection </a>|</td>
              <td><a href="#">About</a></td>
            </tr>
          </tbody>
        </table>
        <form onChange={this.searchChangeHandler.bind(this)}>
        <input style={{
            fontSize:24,
            display:'block',
            width:'99%',
            paddingTop:8,
            paddingBottom:8,
            paddingLeft:16
          }} placeholder="Enter keyword" className="search" />
         <FilterDropDown  onClick={console.log("thisworks")}/>
         </form>
        </header>


            <div className="ui link cards" id="cards">
              {this.state.rows}
            </div>
      </div>
    );
  }
}

export default App;

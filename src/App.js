import React, { Component } from 'react';
import './App.css';
import AmiiboRow from './AmiiboRow.js';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import About from './pages/About';

const options = [
  { key: 1, text: 'Character', value: "character" },
  { key: 2, text: 'GameSeries', value: "series" },
  { key: 3, text: 'Type', value: "type" },
]

var searchTerm =""
var filterTerm =""

class App extends Component {
  constructor(props){
    super(props)
    this.state ={}

    this.performSearch("*")
  }


  performSearch(searchTerm,filterTerm){
    var urlString =""
    console.log(searchTerm)
    console.log(filterTerm)
    if(searchTerm === "*")
    {
      console.log("route A")
       urlString = "http://www.amiiboapi.com/api/amiibo/"
    }
    else if(filterTerm === undefined)
    {
      console.log("route B")
      urlString = "http://www.amiiboapi.com/api/amiibo/?character=" + searchTerm
    }
    else{
      console.log("route C")
       urlString = "http://www.amiiboapi.com/api/amiibo/?"+filterTerm+"=" + searchTerm
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
    //console.log(event.target.value)
     searchTerm = event.target.value
    //to use this it has to be bound by the event
    this.performSearch(searchTerm,document.getElementsByClassName("selected item")[0].firstChild.innerHTML.toLowerCase())
  }

  filterChange(event)
  {
    //console.log(event.target.textContent)
    filterTerm = event.target.textContent.toLowerCase()
    this.performSearch(document.getElementsByClassName("search")[0].value,filterTerm)
  }

  render() {
    return (
      <Router>
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
              <td><a href="/">Collection </a>|</td>
              <td><a href="/about">About</a></td>
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
          <Dropdown placeholder='Select Criteria' fluid selection options={options} id="filterMenu" onChange={this.filterChange.bind(this)}/>
         </form>
        </header>
        <Route exact path="/" render={props => (
          <React.Fragment>
            <div className="ui link cards" id="cards">
              {this.state.rows}
            </div>
          </React.Fragment>
        )}/>
            <Route path="/about" component={About}/>
      </div>

      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import AmiiboRow from './AmiiboRow.js';
import $ from 'jquery';


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
        <table style={{
          backgroundColor:'#000',
          display: 'block',
          color:'#fff',
          paddingLeft:8 }}>
          <thead>
            <tr>
              <td>
                <img alt="logo"width="90" height="90" src="amiibo_Rune_Icon.png"/>
              </td>
              <td>
                <h3>Amiibo Collector</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Collection</td> 
              <td>About</td>
            </tr>
          </tbody>
        </table>        
      
          <input style={{
            fontSize:24,
            display:'block',
            width:'99%',
            paddingTop:8,
            paddingBottom:8,
            paddingLeft:16
          }}onChange={this.searchChangeHandler.bind(this)} placeholder="Enter keyword" className="search" />

          <table id="table" >
            <tbody >
              {this.state.rows}
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import AmiiboRow from './AmiiboRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props)
    this.state ={}

    // const amiibos = [
    //   {id: 0, title:"Mario",overview:"YAYAYa"},
    //   {id: 1, title:"Peach",overview:"YAYAYa"}
    // ]

    // var amiiboRows =[]
    // amiibos.forEach((amiibo => {
    //   console.log(amiibo.id)
    //   const amiiboRow = <AmiiboRow amiibo={amiibo}/>
    //   amiiboRows.push(amiiboRow)
    // }))

    // this.state = {rows:amiiboRows}

    this.performSearch("*")
  }

  performSearch(searchTerm){
    var urlString =""
    if(searchTerm === "*")
    {
       urlString = "http://www.amiiboapi.com/api/amiibo/"
    }
    else{
       urlString = "http://www.amiiboapi.com/api/amiibo/?name=" + searchTerm
    }
    $.ajax({
      url :urlString,
      success: (searchResults) => {
        //console.log(searchResults.amiibo)
        var amiiboRows = []
        const results = searchResults.amiibo
        results.forEach(amiibo => {
          amiibo = <AmiiboRow key={amiibo.tail} amiibo={amiibo}/>
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
          <tbody>
            <tr>
              <td>
                <img alt="logo"width="90" height="90" src="amiibo_Rune_Icon.png"/>
              </td>
              <td>
                <h3>Amiibo Collector</h3>
              </td>
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
          }}onChange={this.searchChangeHandler.bind(this)} placeholder="Enter keyword" />

          {this.state.rows}
      </div>
    );
  }
}

export default App;

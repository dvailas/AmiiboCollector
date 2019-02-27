import React from 'react';
import 'semantic-ui-css/semantic.min.css'

class AmiiboRow extends React.Component{
  viewAmiibo(event){
    console.log(this.props.amiibo.character)
    window.location.replace("https://amiibo.fandom.com/wiki/" + this.props.amiibo.character);
  }

  render(){
    return  <div className="card" key = {this.props.amiibo.id}>
           <div className="image">
             <img className="amiiboPic" alt="preview"src={this.props.amiibo.image} />
           </div>
           <div className="content">
              <div className="header">{this.props.amiibo.character}: {this.props.amiibo.amiiboSeries}</div>
              <div className="description">
                <p>Japan Release: {this.props.amiibo.release["jp"]}</p>
                <p>American Release: {this.props.amiibo.release["na"]}</p>
                <p>European Release: {this.props.amiibo.release["eu"]}</p>
                <h5>Type: {this.props.amiibo.type}</h5>
              </div>
              </div>
              <div className="extra content">
              <div className="ui buttons">
                <button onClick={this.viewAmiibo.bind(this)}  className="ui primary button">Add</button>
                <div className="or"></div>
                <button onClick={this.viewAmiibo.bind(this)}  className="ui positive button">View</button>
              </div>
           </div>
         </div>

  }
}

export default AmiiboRow
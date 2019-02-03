import React from 'react';
import 'semantic-ui-css/semantic.min.css'

class AmiiboRow extends React.Component{
  viewAmiibo(){
    console.log("Hi")
  }

  render(){
    return  <tr className="row" key = {this.props.amiibo.id}>
           <td className="imageColumn">
             <img className="amiiboPic" alt="preview"src={this.props.amiibo.image} />
           </td>
           <td>
              <h3>{this.props.amiibo.character}: {this.props.amiibo.amiiboSeries}</h3>
              <p>Japan Release: {this.props.amiibo.release["jp"]}</p>
              <p>American Release: {this.props.amiibo.release["na"]}</p>
              <p>European Release: {this.props.amiibo.release["eu"]}</p>
              <h5>Type: {this.props.amiibo.type}</h5>
              <button onClick={this.viewAmiibo.bind(this)}  className="positive ui button">View</button>
           </td>
         </tr>

  }
}

export default AmiiboRow
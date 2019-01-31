import React from 'react';

class AmiiboRow extends React.Component{
  viewAmiibo(){
    console.log("Hi")
  }

  render(){
    return <table key = {this.props.amiibo.id}>
       <tbody>
         <tr>
           <td class="imageColumn">
             <img class="amiiboPic" alt="preview"src={this.props.amiibo.image} />
           </td>
           <td>
              <h3>{this.props.amiibo.character}: {this.props.amiibo.amiiboSeries}</h3>
              <p>Japan Release: {this.props.amiibo.release["jp"]}</p>
              <p>American Release: {this.props.amiibo.release["na"]}</p>
              <p>European Release: {this.props.amiibo.release["eu"]}</p>
              <h5>Type: {this.props.amiibo.type}</h5>
              <input type="button" onClick={this.viewAmiibo.bind(this)} value="View" />
           </td>
         </tr>
       </tbody>
     </table>
  }
}

export default AmiiboRow
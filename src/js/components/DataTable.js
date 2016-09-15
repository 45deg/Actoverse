import React from 'react';
import 'css/table';

const DataTable = ({ elements, caption, headers }) => {
  return (<table className="stripe-table">
            { caption !== undefined ? <caption>{caption}</caption> : null  }
            <thead><tr>
              {headers.map((header, i) => <th key={i}>{header.text}</th>)}
            </tr></thead>
            <tbody>
              {elements.map((element, i) => 
                <tr key={i}>{ headers.map( header => <td key={header.name}>{
                  header.json ? JSON.stringify(element[header.name])
                              : element[header.name]
                }</td>)}</tr>
              )}
            </tbody>
           </table>);
}

export default DataTable;
import React from 'react';
import { Table } from 'react-bootstrap';

import 'css/table';

const DataTable = ({ elements, caption = null, headers }) => {
  return (<Table striped bordered condensed hover className="datatable">
            { caption !== null ? <caption>{caption}</caption> : null  }
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
           </Table>);
}

export default DataTable;
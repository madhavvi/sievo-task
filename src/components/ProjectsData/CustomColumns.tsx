/* eslint-disable jsx-a11y/img-redundant-alt */
import moment from 'moment';
import { Project } from '../../Utils/models';

const renderDate = (data: Project) => {  
    let date = data && data['start date']; 
    date = moment(date).format('DD.MM.YYYY');
    return <span>{date}</span>;
}

const renderDesc = (data: Project) => {
  return <p style={{ whiteSpace: 'nowrap', width: '90%', overflow: 'hidden', margin: '7px 0', textOverflow: 'ellipsis'}}>
    { data.description }
  </p>
}

const renderSavings = (data: Project) => {
  return <span>{ data['savings amount'].toFixed(2) }</span>
}

const renderCurrency = (data: Project) => {
  return <span>{ data.currency !== 'NULL' ? data.currency : '' }</span>
}

export const columns = [
    {
      id: 'project',
      dataType: 'number',
      index: 0,
      caption: 'Project ID',
      width: 10,
      allowSorting: true
    },
    { 
      id: 'description',
      dataType: 'string',
      index: 1,
      caption: 'Description',
      width: 30,
      render: (data: any) => renderDesc(data.data)
    },
    {
      id: 'start date',
      dataType: 'string',
      index: 2,
      caption: 'Start date',
      width: 13,
      allowSorting: true,
      render: (data: any) => data && renderDate(data.data)
    },
    {
      id: 'category',
      dataType: 'string',
      index: 3,
      caption: 'Category',
      width: 15,
      allowSorting: true
    },
    {
      id: 'responsible',
      dataType: 'string',
      index: 4,
      caption: 'Responsible',
      width: 15,
      allowSorting: true
    },
    {
      id: 'savings amount',
      dataType: 'number',
      index: 5,
      caption: 'Savings amount',
      width: 15,
      allowSorting: true,
      render: (data: any) => data && renderSavings(data.data)
    },
    {
      id: 'currency',
      dataType: 'string',
      index: 6,
      caption: 'Currency',
      width: 13,
      allowSorting: true,
      render: (data: any) => data && renderCurrency(data.data)
    },
    {
      id: 'complexity',
      dataType: 'string',
      index: 7,
      caption:'Complexity',
      width: 13,
      allowSorting: true
    }
];
  
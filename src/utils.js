import moment from 'moment';


export const API_URL = 'http://localhost:4000/graphql';
// TODO add real API

export function uniq(a) {
  let seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

export function formatDate(date) {
  if (typeof date === 'object') {
    return `${date.getFullYear()}-${`0${(date.getMonth() + 1)}`.slice(-2)}-${`0${(date.getDate())}`.slice(-2)}`;
  }
}

export function toDatesMap(array) {
  var map = new Object();
  for (let i = 0; i < array.length; i++) {
    map[array[i]] = true
  }
  return map;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export function formatDateToPrint(date) {
  const d = new Date(date);
  const str = moment(d).format('MMMM Do YYYY, h:mm a');
  return str
}

export const dateConfig = {
  'hour': {
    format: 'hh',
    caption: 'Hour',
    step: 1,
  },
  'minute': {
    format: 'mm',
    caption: 'Min',
    step: 1,
  }
}
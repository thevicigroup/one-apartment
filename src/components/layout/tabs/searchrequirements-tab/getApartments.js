import React from "react";

export const getApartments = (user_parameters) => {
  var current_parameters = document.getElementById('current_parameters')
  var response = fetch("http://127.0.0.1:5000/user-data", {
    method: 'POST', 
    body: user_parameters,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  document.getElementById('response').innerHTML = fetch("http://127.0.0.1:5000/user-data", {
    method: 'POST', 
    body: user_parameters,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
  return(
      response
      )
  }
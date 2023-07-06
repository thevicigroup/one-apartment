import React from "react";

export function getApartments(user_parameters: any) {
  var current_parameters = document.getElementById('current_parameters')
  var response = fetch("http://127.0.0.1:5000/user-data/", {
    method: 'POST', 
    body: user_parameters,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
    return(
      // ADD IN THE INFORMATION INTO THE FETCH REQUEST HERE TO PASS IT TO THE FLASK SERVER
      // ALSO ADD IN GETTING THE INFORMATION FROM THE CURRENT PARAMETERS OBJECT
      <div>{response}</div>
      

    )
  }
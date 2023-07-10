import React from "react";

export const updateApartments = () => {
  
  // LOAD CURRENT USER PARAMETERS FROM LIST
  var current_parameters = document.getElementById('current_parameters')

  // SEND JSON REQUEST TO FLASK API TO HAVE PYTHON CODE RUN
  var response = fetch("http://127.0.0.1:5000/user-data", {
    method: 'POST', 
    body: current_parameters,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  
  var response2 = document.getElementById('response').innerHTML = fetch("http://127.0.0.1:5000/user-data", {
    method: 'POST', 
    body: current_parameters,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())


  // USE RESPONSE JSON TO CREATE A TABLE IN HTML TO DISPLAY RESULTS
  const myObj = JSON.parse(this.responseText);
  let text = "<table border='1'>"
  for (let x in myObj) {
    text += "<tr><td>" + myObj[x].name + "</td></tr>";
  }
  text += "</table>"
  document.getElementById("demo").innerHTML = text;

  return(
      console.log(current_parameters, response, response2)
      )
  }
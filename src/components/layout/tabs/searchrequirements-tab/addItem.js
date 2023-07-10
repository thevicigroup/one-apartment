import React from "react";

export function addItem(){
    var ul = document.getElementById("current_parameters");
    var candidate = document.getElementById("candidate");
    var bedrooms = document.getElementById("bedroom_select");
    var bathrooms = document.getElementById("bathroom_select");
    var travel_mode = document.getElementById("travel_select");
    var time = document.getElementById("time_select");
    var li = document.createElement("li");
    li.setAttribute('id', candidate.value);
    li.appendChild(document.createTextNode(candidate.value));
    li.appendChild(document.createTextNode(bedrooms.value));
    li.appendChild(document.createTextNode(bathrooms.value));
    li.appendChild(document.createTextNode(travel_mode.value));
    li.appendChild(document.createTextNode(time.value));
    ul.appendChild(li);
}



export function removeItem(){
    document.getElementById("current_parameters").removeChild(document.getElementById('current_parameters').lastChild);
}
import React from "react";

export function addItem(){
    var ul = document.getElementById("current_parameters");
    var candidate = document.getElementById("candidate").value;
    var bedrooms = document.getElementById("bedroom_select").value;
    var bathrooms = document.getElementById("bathroom_select").value;
    var travel_mode = document.getElementById("travel_select").value;
    var time = document.getElementById("time_select").value;
    var li = document.createElement("li");
    li.setAttribute('id', candidate.value);
    li.appendChild(document.createTextNode(candidate));
    li.appendChild(document.createTextNode(bedrooms));
    li.appendChild(document.createTextNode(bathrooms));
    li.appendChild(document.createTextNode(travel_mode));
    li.appendChild(document.createTextNode(time));
    ul.appendChild(li);
}



export function removeItem(){
    var ul = document.getElementById("current_parameters");
    var candidate = document.getElementById("candidate")
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}
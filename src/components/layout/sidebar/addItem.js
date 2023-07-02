import React from "react";

export function addItem(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate")
    var bedrooms = document.getElementById("bedroom_select")
    var bathrooms = document.getElementById("bathroom_select")
    var travel_mode = document.getElementById("travel_select")
    var time = document.getElementById("time")
    var li = document.createElement("li")
    var br = document.createElement("br")
    li.setAttribute('id', candidate.value);
    li.append(document.createTextNode(candidate.value));
    ul.appendChild(li);
    ul.appendChild(br);
}



export function removeItem(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate")
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}
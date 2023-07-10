"use client";

import React from "react";
import { addItem, removeItem } from '@/components/layout/tabs/searchrequirements-tab/addItem'
import { list_style } from '@/components/layout/tabs/searchrequirements-tab/addlistitems.css'
import { updateApartments } from '@/components/layout/tabs/searchrequirements-tab/updateApartments' 
import { MoveLeft } from "lucide-react";




export const SearchRequirements = () => {
  const num_of_results = 123
  const total_num = 500
    return <aside>
        <strong>Input Points of Interest:</strong>

        <hr style={{width:"100%", height:"5px", textAlign:"left", marginLeft:"0", backgroundColor:"#00A4BD"}}></hr>
        
        <div style={list_style}>
            <div className="row">
            
            <div>
              {/* BEDROOMS */}
              <form style={{float: 'left'}}>
                  <select name="make" id="bedroom_select">
                      <option style={{color:"blue"}} data-count="1" value=", None, ">Select Number of Bedrooms</option>
                      <option style={{color:"blue"}} data-count="2" value=", Studio, ">Studio</option>
                      <option style={{color:"blue"}} data-count="3" value=", 1 Bedroom, ">1 Bedroom</option>
                      <option style={{color:"blue"}} data-count="4" value=", 2 Bedroom, ">2 Bedroom</option>
                      <option style={{color:"blue"}} data-count="5" value=", 3 Bedroom, ">3 Bedroom</option>
                  </select>
              </form>

              {/* BATHROOMS */}
              <form style={{float: 'right', marginRight:'150px'}}>
                  <select name="make" id="bathroom_select">
                      <option style={{color:"blue"}} data-count="1" value="None, ">Select Number of Bathrooms</option>
                      <option style={{color:"blue"}} data-count="2" value="1 Bathroom, ">1 Bathroom</option>
                      <option style={{color:"blue"}} data-count="3" value="2 Bathroom, ">2 Bathroom</option>
                      <option style={{color:"blue"}} data-count="4" value="3 Bathroom, ">3 Bathroom</option>
                  </select>
              </form>
              <br></br>

              {/* MODE OF TRAVEL */}
              <form style={{float: 'left'}}>
                  <select name="make" id="travel_select">
                      <option style={{color:"blue"}} data-count="1" value="None, ">Select a Mode of Travel</option>
                      <option style={{color:"blue"}} data-count="2" value="Walking, ">Walking</option>
                      <option style={{color:"blue"}} data-count="3" value="Public Transit, ">Public Transit</option>
                      <option style={{color:"blue"}} data-count="4" value="Car, ">Car</option>
                  </select>
              </form>

              {/* TIME OF TRAVEL */}
              <form style={{float: 'right', marginRight:'150px'}}>
                  <select name="make" id='time_select'>
                      <option style={{color:"blue"}} data-count="1" value="None">Select a Time Limit</option>
                      <option style={{color:"blue"}} data-count="2" value="5 min">5 min</option>
                      <option style={{color:"blue"}} data-count="3" value="15 min">15 min</option>
                      <option style={{color:"blue"}} data-count="4" value="30 min">30 min</option>
                      <option style={{color:"blue"}} data-count="5" value="45 min">45 min</option>
                  </select>
              </form>
              <br></br>



            {/* ADD/REMOVE ITEM BUTTONS */}
            </div>
              <div className="col-12">
                  <div className="input-group">
                    <input type="text" className="form-control" id="candidate"></input>
                      <div className="input-group-append">
                        <button onClick={addItem} className="btn btn-add" type="button">Add Item</button>
                        <button onClick={removeItem} className="btn btn-remove" type="button">Remove Item</button>
                      </div>
                  </div>
                  <ul id="current_parameters">
                    <li>Current Parameters:</li>
                    <br></br>
                  </ul>
              </div>
            </div>

            {/* APPLY CHANGES */}
            <button onClick={updateApartments} style={{
              bottom: '100px',
              position: "fixed",
              borderRadius: "15px",
              background: "rgb(12, 187, 50)",
              color: "white",
              padding: "10px",
              width: "200px",
            }} 
              type="button">Update Apartments</button>

            
            <br></br>
            <hr style={{width:"100%", height:"5px", textAlign:"left", marginLeft:"0", backgroundColor:"#00A4BD", position: "fixed", bottom: "50px"}}></hr>
            <br></br>
            <div style={{position: "fixed", bottom: "25px"}}>Results:</div>
            <div style={{position: "fixed", bottom: "10px"}}>Showing {num_of_results} apartments out of {total_num}</div>

            <p id='response'>testing flask</p>


        </div>
    </aside>;
};

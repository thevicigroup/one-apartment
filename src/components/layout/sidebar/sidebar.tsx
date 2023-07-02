"use client";

import React from "react";
import { addItem, removeItem } from '@/components/layout/sidebar/addItem.js'
import { list_style } from '@/components/layout/sidebar/addlistitems.css'
import { applyChanges } from '@/components/layout/sidebar/applyChanges'

export const Sidebar = () => {
  const num_of_results = 123
  const total_num = 500
    return <aside>
        <strong>Input Points of Interest:</strong>

        <hr style={{width:"100%", height:"5px", textAlign:"left", marginLeft:"0", backgroundColor:"#00A4BD"}}></hr>
        
        <div style={list_style}>
            <div className="row">
            
            <div>
              {/* BEDROOMS */}
              <form style={{float: 'left'}} id="bedroom_select">
                  <select name="make">
                      <option style={{color:"blue"}} data-count="1" value="Studio">Studio</option>
                      <option style={{color:"blue"}} data-count="2" value="1 Bedroom">1 Bedroom</option>
                      <option style={{color:"blue"}} data-count="3" value="2 Bedroom">2 Bedroom</option>
                      <option style={{color:"blue"}} data-count="4" value="3 Bedroom">3 Bedroom</option>
                  </select>
              </form>

              {/* BATHROOMS */}
              <form style={{float: 'left'}} id="bathroom_select">
                  <select name="make">
                      <option style={{color:"blue"}} data-count="1" value="1 Bathroom">1 Bathroom</option>
                      <option style={{color:"blue"}} data-count="2" value="2 Bathroom">2 Bathroom</option>
                      <option style={{color:"blue"}} data-count="3" value="3 Bathroom">3 Bathroom</option>
                  </select>
              </form>

              {/* MODE OF TRAVEL */}
              <form style={{float: 'left'}} id="travel_select">
                  <select name="make">
                      <option style={{color:"blue"}} data-count="1" value="1 Bathroom">Walking</option>
                      <option style={{color:"blue"}} data-count="2" value="2 Bathroom">Public Transit</option>
                      <option style={{color:"blue"}} data-count="3" value="3 Bathroom">Car</option>
                  </select>
              </form>

              {/* TIME OF TRAVEL */}
              <form style={{float: 'left'}} id="travel_select">
                  <select name="make">
                      <option style={{color:"blue"}} data-count="1" value="1 Bathroom">5 min</option>
                      <option style={{color:"blue"}} data-count="2" value="2 Bathroom">15 min</option>
                      <option style={{color:"blue"}} data-count="3" value="3 Bathroom">30 min</option>
                      <option style={{color:"blue"}} data-count="3" value="3 Bathroom">45 min</option>
                  </select>
              </form>



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
                  <ul id="dynamic-list">
                    <li>Current Parameters:</li>
                    <br></br>
                  </ul>
              </div>
            </div>


            {/* APPLY CHANGES */}
            <button onClick={applyChanges} style={{
              borderRadius: "15px",
              background: "rgb(12, 187, 50)",
              color: "white",
              padding: "20px",
              width: "200px",
              height: "50px"}} 
              type="button">Apply Changes</button>

            
            <br></br>
            <hr style={{width:"100%", height:"5px", textAlign:"left", marginLeft:"0", backgroundColor:"#00A4BD", position: "fixed", bottom: "50px"}}></hr>
            <br></br>
            <div style={{position: "fixed", bottom: "25px"}}>Results:</div>
            <div style={{position: "fixed", bottom: "10px"}}>Showing {num_of_results} apartments out of {total_num}</div>



        </div>
    </aside>;
};

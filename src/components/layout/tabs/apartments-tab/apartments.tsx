import React from "react";

import { tableStyle } from '@/components/layout/tabs/apartments-tab/tablestyle.css'
// import { table } from "console";


export const ApartmentTable = () => {
    // UPDATE APARTMENT INFORMATION HERE WHENEVER THE USER SEARCHES FOR NEW APARTMENTS
    return (


        <div style={tableStyle}>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Bedroom Number</th>
                </tr>
                <tr>
                    <td>123</td>
                    <td>456</td>
                    <td>789</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
                {/* EVENTUALLY HAVE EACH TABLE ROW BE AN ITERATION OF THE PARSED APARTMENTS DATAFRAME */}
            </table>

            <p id='response'>testing flask</p>

        </div>
    );
}

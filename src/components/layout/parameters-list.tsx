"use client";
import React, {useState} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

// ! WE ONLY EVER NEED TO CALL THE API AND ISOCHRONE WITH THE MAX NUMBER OF PARAMETERS, WE CAN TOGGLE ON/OFF IN OUR WEBSITE

// ! NEED TO IMPLEMENT AN OMITT BUTTON EMBEDDED IN THE TABLE FOR EACH PARAMETER THAT TOGGLES THAT IN THE PARSING FUNCTION

export const ParametersList = () => {
    
    const addParameter = () => {
        const parameters_table = document.getElementById("parameters_table");
        var row = 
         '<tr><td>'  +  (document.getElementById("nickname") as HTMLInputElement | null)?.value +
         '</td><td>' + (document.getElementById("travelmode") as HTMLInputElement | null)?.value + 
         '</td><td>' + (document.getElementById("traveltime") as HTMLInputElement | null)?.value +
          '</td></tr>'
        parameters_table!.innerHTML += row
        }
    

    const removeParameter = () => {
        const parameters_table = document.getElementById("parameters_table")!;
        const parameters_table_rows = document.getElementById("parameters_table")! as HTMLTableElement;
        if (parameters_table_rows.rows.length != 1) {
            parameters_table.removeChild(parameters_table.lastChild!)
        }
    }

    return(
        <div>
            <br></br>
            <div className="flex space-x-5 w-full">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                onClick={addParameter}>Add a Requirement</button>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                onClick={removeParameter}>Delete Last Requirement</button>
            </div>

            <br></br>

            <h1 className="text-xl mb-2">Current Parameters</h1>
            <ScrollArea className="h-[calc(90vh-520px)] w-full rounded-md border space-y-4">
                <table id="parameters_table" className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Nickname</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Travel Time</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Travel Mode</th>
                        </tr>
                    </thead>
                </table>
            </ScrollArea>
        </div>
    )


}
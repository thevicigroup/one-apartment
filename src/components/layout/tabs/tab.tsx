import React from "react";

import { openSearchTab, openApartmentsTab } from "@/components/layout/tabs/openTab"
import {tab_style} from '@/components/layout/tabs/tabs.css'
import { SearchRequirements } from "@/components/layout/tabs/searchrequirements-tab/searchrequirements";
import { ApartmentTable } from "@/components/layout/tabs/apartments-tab/apartments";


export const Tabs = () => {
    return (
        <div>  
            <div style={tab_style} className="tab">
            <button className="tablinks" onClick={openSearchTab}>Search Requirements</button>
            <button className="tablinks" onClick={openApartmentsTab}>Available Apartments</button>
            </div>
                
            <div id="Search Requirements" className="tabcontent">
                <SearchRequirements />
            </div>

            <div id="Available Apartments" className="tabcontent">
            <ApartmentTable />
            </div>
        </div>
    );
}

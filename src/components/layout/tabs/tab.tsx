import React from "react";

import { openSearchTab, openApartmentsTab, openUserProfile } from "@/components/layout/tabs/openTab"
import { tab_style } from '@/components/layout/tabs/tabs.css'
import { SearchRequirements } from "@/components/layout/tabs/searchrequirements-tab/searchrequirements";
import { ApartmentTable } from "@/components/layout/tabs/apartments-tab/apartments";
import { UserProfile } from "@/components/layout/tabs/userprofile-tab/userprofile";



export const Tabs = () => {
    return (
        <div>  
            <div style={tab_style} className="tab">
            <button className="tablinks" onClick={openSearchTab} >Search Requirements</button>
            <button className="tablinks" onClick={openApartmentsTab}>Available Apartments</button>
            <button className="tablinks" onClick={openUserProfile}>User Profile</button>
            </div>
                
            <div id="Search Requirements" className="tabcontent">
                <SearchRequirements />
            </div>

            <div id="Available Apartments" className="tabcontent">
                <ApartmentTable />
            </div>

            <div id="User Profile" className="tabcontent">
                <UserProfile />
            </div>
        </div>
    );
}

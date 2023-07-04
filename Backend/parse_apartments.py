from find_isochrone import find_intersections
from constants import *
import pandas as pd
from coordinate_inside import coordinate_inside
from icecream import ic
# from plotting_and_verification.plot_isochrone import plot_isochrone

def parse_apartments(apartments : pd.DataFrame,
                     user_requirements : dict
                     ):
    """ This function serves to parse the apartments based on 
    user requirements that are input by the user

    Parameters:
    -----------
        apartments : 
            This is a dictionary of all the apartments within the
            user(s)'s search area
        user_requirements :
            This is a dictionary of all the user requirements
        center_latitude : 
            This is the latitude of the center of the search area
            used in finding the geometric alteration from the globe
            projection onto a flat map
    Returns:
    --------
        parsed_apartments : 
            This is a dataframe of all the apartments that meet the
            user(s)'s requirements
    
    """
    parsed_apartments = []
    shells, holes = find_intersections(user_requirements)
    shell_coordinate_latitude = {}
    shell_coordinate_longitude = {}
    hole_coordinate_latitude = {}
    hole_coordinate_longitude = {}
    # plot_isochrone(shells, holes, center_latitude)
    # SHELLS NEEDS TO BE A LIST, LOOK INTO WHY THIS ISNT A LIST
    for shell_counter, shell in enumerate(shells):
            current_latitude_list = []
            current_longitude_list = []
            for coord in shell:
                current_latitude_list.append(coord['lat'])
                current_longitude_list.append(coord['lng'])
            shell_coordinate_latitude[shell_counter] = current_latitude_list
            shell_coordinate_longitude[shell_counter] = current_longitude_list
    for hole_counter, hole in enumerate(holes):
        if hole != []:
            current_latitude_list = []
            current_longitude_list = []
            for sub_hole in hole:
                for coord in sub_hole:
                    current_latitude_list.append(coord['lat'])
                    current_longitude_list.append(coord['lng'])
            hole_coordinate_latitude[hole_counter] = current_latitude_list
            hole_coordinate_longitude[hole_counter] = current_longitude_list
    



    for apartment_row in range(len(apartments)):
        apartment = apartments.iloc[apartment_row, :]
        target_coordinate = [apartment['latitude'], apartment['longitude']]
        # ic(target_coordinate)
        if all_inside := coordinate_inside(
            target_coordinate,
            shell_coordinate_latitude,
            shell_coordinate_longitude,
            hole_coordinate_latitude,
            hole_coordinate_longitude,
            ):
            parsed_apartments.append(pd.Series(apartment))
            # ic(all_inside)
    parsed_apartments = pd.DataFrame(parsed_apartments)
    return parsed_apartments


from icecream import ic
from find_apartments import find_apartments
from parse_apartments import parse_apartments
# from plotting_and_verification.plot_google_map import plot_google_map
# from plotting_and_verification.change_coordinates import change_coordinates
import pandas as pd
import matplotlib.pyplot as plt
from constants import *


def from_front_end(
    user_id : list[str],
    user_search_parameters : dict,
    user_requirements : dict
    ):
    #TODO FOR THIS FUNCTION:
        # CREATE A DEFAULT SCALE VALUE AND CALL THE APARTMENTS API INTIALLY, THEN CHANGE IT WITH MAPS SCALE

    # this function will be called with parameters any time front end wants apartment list
    
    # Step 1: Parse user requirements into variable lists and pass into functions
    # user_id, user_coordinates, travel_time, travel_mode = parse_user_requirements(user_requirements)

    # Step 2: Take user location and find suitable apartments around the user
    # apartments = find_apartments(user_search_parameters)
    apartments = pd.read_excel(r"C:\Users\Nicholas Mirabile\Desktop\Code\saved_data\APIDATA.xlsx")

    # Step 2: Take location-based user requirements and narrow down apartment list
    parsed_apartments = parse_apartments(apartments, user_requirements)
    ic(parsed_apartments)
    ic(len(apartments))
    ic(len(parsed_apartments))
    # change_coordinates(parsed_apartments, center_latitude)
    return parsed_apartments




if __name__ == '__main__':

    map_check = False
    user_id = ['user_1', 'user_2']
    user_search_parameters = {
        'city' : 'Boston',
        'state' : 'MA',
        'propertyType' : 'Apartment'
    }

    user_requirements = {
    'User Ids' : ['user_1', 'user_2'],
    'User Coords' : [[42.36, -71.06], [42.36, -71.06]],
    'User Travel Time' : [1200, 900],
    'User Travel Mode' : ['driving', 'driving'],
    'Property Type' : 'Apartment',
    'Limt' : '500',
    'Radius' : '10', #This radius value used in the apartments api is in km, THIS NEEDS TO BE INITIALIZED TO 10
    'bedrooms' : '1',
    'bathrooms' : '1',
    'daysOld' : '50',
    'index' : '0'
    }

    center_latitude = 42.36

    parsed_apartments = from_front_end(user_id, user_search_parameters, user_requirements)

    # plt.show()

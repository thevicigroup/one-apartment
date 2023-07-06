import requests
import pandas as pd

from icecream import ic
from constants import *


def find_apartments(user_search_parameters : dict):
    #TODO FOR THIS FUNCTION:
        # USING THE GOOGLE MAPS CHANGING SCALE, CHANGE THE RADIUS VALUE FOR THE API CALL AND EVERY TIME IT CHANGES
        # CALL THE FUNCTION AGAIN, SHOULD TALK TO JACK TO SEE IF WORTH IT TO HAVE IT AS AN AUTOMATIC FUNCTION
        # OR JUST DO A REFRESH BUTTON FOR NOW


    """ This function serves to find all apartments within the
    user(s)'s search parameters
    
    Parameters:
    -----------
        user_search_parameters : 
            This is a dictionary of all the search parameters that
            the user input

    Returns:
    --------
        apartments : 
            This is a dataframe of all the apartments within the
            search criteria to be parsed later
    """

    headers = {
        "X-RapidAPI-Key": X_RAPID_API_KEY,
        "X-RapidAPI-Host": X_RAPIDAPI_HOST 
    }

    # This is the initial call to the api which afterwards is checked to see if the length is equal to the
    # set limit, if so, activate the loop using the initial conditions from the initial call and iterate
    # until the length no longer equals the set limit

    final_apartments = pd.DataFrame()
    # This will loop the api until no new apartments are found while appending the new data to the
    # pandas dataframe

    querystring = {
            "city" : user_search_parameters['city'],
            "state" : user_search_parameters['state'],
            "propertyType" : user_search_parameters['propertyType'] ,
            "limit" : user_search_parameters['Limit'],
            "radius" : user_search_parameters['Radius'],
            "bedrooms" : user_search_parameters['bedrooms'],
            "bathrooms" : user_search_parameters['bathrooms'],
            "daysOld" : user_search_parameters['daysOld'],
            "index" : user_search_parameters['index']
        }
        
    final_apartments = requests.get(url=REALTY_MOLE_URL, headers=headers, params=querystring).json()
    final_apartments = pd.DataFrame(final_apartments)

    # if len(final_apartments) != int(user_search_parameters['Limit']):
    #     index_counter = user_search_parameters['Limit']
    #     while len(final_apartments) == user_search_parameters['Limit']:
    # querystring = {
    #     "city" : user_search_parameters['city'],
    #     "state" : user_search_parameters['state'],
    #     "propertyType" : user_search_parameters['propertyType'] ,
    #     "limit" : user_search_parameters['Limit'],
    #     "radius" : user_search_parameters['Radius'],
    #     "bedrooms" : user_search_parameters['bedrooms'],
    #     "bathrooms" : user_search_parameters['bathrooms'],
    #     "daysOld" : user_search_parameters['daysOld'],
        # "index" : index_counter
    # }
            
    # current_apartments = requests.get(url=REALTY_MOLE_URL, headers=headers, params=querystring).json()
    # current_apartments = pd.DataFrame(current_apartments)
    # final_apartments = pd.concat([final_apartments, current_apartments], axis=1)
    # index_counter += user_search_parameters['Limit']
    destination_coordinates = [final_apartments['latitude'], final_apartments['longitude']]
    # apartments.to_excel('C:/Users/Nicholas Mirabile/Desktop/Code/APIDATA.xlsx')
    ic(final_apartments)
    ic(destination_coordinates)
    return final_apartments
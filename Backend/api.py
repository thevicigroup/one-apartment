# from main import from_front_end
from flask import Flask, url_for, make_response, render_template
from flask import jsonify
from flask import request
from flask import Blueprint
from icecream import ic
from flask_cors import CORS
import subprocess
from find_apartments import find_apartments
from main import from_front_end
import jsonpickle

# This flask api will simply start a local server host and then pass user requirements back and forth for now
# The api should have 3 things, a starting function, a recieving function, and a sending function
# Might need to expand the features of this to more stuff like get current people, sitemap...etc will ask front end team

# Example of User Information passed back and forth:
# user_requirements = {
#     'User Ids' : '["user_1", "user_2",...etc]',
#     'User Coords' : '[[42.36, -71.06], [42.36, -71.06],...etc]',
#     'User Travel Time' : '[1200, 900,...etc]',
#     'User Travel Mode' : '["driving", "driving",...etc]'
#     }


# so flask and other websites use endpoints to operate, so those buttons are only serving to travel to
# those endpoints, so write the api anticipating the front end team's buttons going to paths
# to endpoints like homepage/users/data



#_____________________________________________________________________________________________________________________
# Starting Function
template_dir = "/Users/nickmirabile/Downloads/Code/base_code"
app = Flask(__name__, template_folder=template_dir)
CORS(app)
# app = Flask(__name__)

batch_id = 'testing123'
user_data = {
    f'Batch {batch_id}' : {
                'User Ids' : '["user_1", "user_2"]',
                'User Coords' : '[[42.36, -71.06], [42.36, -71.06]]',
                'User Travel Time' : '[1200, 900]',
                'User Travel Mode' : '["driving", "driving"]'
                }
    }




@app.route(("/")) 
def greeting():
    text = "This is the homepage for the apartments app database \n \n \nCurrent Users:yeet"
    return text




@app.route('/user-data', methods=['GET'])
def get_users():
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
    apartments = from_front_end(user_id, user_search_parameters, user_requirements)
    return jsonpickle.encode(apartments)

app.run()
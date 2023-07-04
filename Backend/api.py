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



#_____________________________________________________________________________________________________________________
# Endpoints
# @app.route(("/"))
# @app.route("/", methods=["GET", "POST"])
# # def home():
# #     if request.method == "POST":
# #         print(request.form["name"])
# #         print(request.form["email"])

# #     return render_template("home.html")




# def index():
#     if request.method == 'POST':
#         if request.form.get('action1') == 'VALUE1':
#             pass # do something
#         elif  request.form.get('action2') == 'VALUE2':
#             pass # do something else
#         else:
#             pass # unknown
#     elif request.method == 'GET':
#         return render_template('index.html', form=form)
    
#     return render_template("index.html")


@app.route(("/")) 
def greeting():
    # subprocess.run()
    # current_users = get_site_map()
    # text = f"This is the homepage for the apartments app database \n \n \nCurrent Users:{current_users}"
    
    text = "This is the homepage for the apartments app database \n \n \nCurrent Users:yeet"
    return text

# @app.route(("/"))
# def has_no_empty_params(rule):
#     defaults = rule.defaults if rule.defaults is not None else ()
#     arguments = rule.arguments if rule.arguments is not None else ()
#     return len(defaults) >= len(arguments)


@app.route('/user-data', methods=['GET'])
def get_users():
    # response = make_response(jsonify(user_data))
    # print(response.data)
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


# @app.route('/user-data', methods=['POST'])
# def add_apartments():
#     user_data.append(request.get_json())
#     return '', 204

#_____________________________________________________________________________________________________________________
# Recieve information from front end

# @app.route('/get_apartments/<user_group>')
# def get_apartments(user_information):
#     parsed_apartments = from_front_end(user_information)
#     print('Finished')

    # send_back_to_front_end(parsed_apartments)








#_____________________________________________________________________________________________________________________
# Send information to front end
# user_group_data = []
# @app.route('/parsed_apartments/<user_group>', methods=['POST'])
# def send_back_to_front_end(parsed_apartments):
#     url = 'http://localhost:5000/parsed_apartments'

#     headers = "Content-Type: application/json"

#     body = {
#     'User Ids' : '["user_1", "user_2"]',
#     'User Coords' : '[[42.36, -71.06], [42.36, -71.06]]',
#     'User Travel Time' : '[1200, 900]',
#     'User Travel Mode' : '["driving", "driving"]'
#     }

#     process_to_run = f'-X POST -H {headers} -d {body} {url}'

#     subprocess.run(
#         process_to_run
#     )


#     return parsed_apartments


# def get_site_map():
#     links = []
#     for rule in app.url_map.iter_rules():
#         # Filter out rules we can't navigate to in a browser
#         # and rules that require parameters
#         if "GET" in rule.methods and has_no_empty_params(rule):
#             url = url_for(rule.endpoint, **(rule.defaults or {}))
#             links.append((url, rule.endpoint))
#     print(links)
#     return links

# #_____________________________________________________________________________________________________________________
# # Get current 





app.run()
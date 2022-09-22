from flask import Flask
from flask import Flask, jsonify, request, render_template, make_response, redirect, url_for, flash
from flask_cors import CORS
from db import MongoDB
from requests_utils import get_data_from_url
from functools import wraps
from dotenv import load_dotenv
from re import match
### type of user db ###
# users = {
#     1: {
#         "email": "johnathan.maytliss@gmail.com",
#         "name": "johnathan",
#         "last_name": "maytliss",
#         "title": "Johnathan Maytliss - Software Engineer",
#         "description": "this is desc",
#         "projects": [
#               {
#                   "id": 1,
#                   "title": "title",
#                   "description": "example for desc",
#                   "img": "https://source.unsplash.com/random",
#                   "img64": "",
#                   "git": "https://www.github.com"
#               }
#         "locations": [tel-aviv, eilat]
#         ]
#     },
# }

def check_valid_mail(fn):
    """function to check the validation of route email parameter"""
    @wraps(fn)
    def decorated_view(*args, **kwargs):
        if not match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", kwargs.get('user_email')):
            return 'invalid email', 400
        return fn(*args, **kwargs)
    return decorated_view

load_dotenv()
app = Flask(__name__)
CORS(app)
mongo = MongoDB("personal-web")
mongo.connect()

@app.route('/user/<string:user_email>', methods=['GET'])
@check_valid_mail
def get_user(user_email):
    user = mongo.get_one("user", {"email": user_email}, {
                         "projects": 0, "_id": 0})
    if user:
        return jsonify(user), 200
    else:
        return 'user not found', 400


@app.route('/user/<string:user_email>/locations', methods=['GET'])
@check_valid_mail
def get_user_locations(user_email):
    # get locations from db if user else return error
    locations_names = mongo.get_one(
        "user", {"email": user_email}, {"locations": 1})

    # get location data for each location
    locations_to_return = []
    for location in locations_names.get("locations", []):
        url = f"https://nominatim.openstreetmap.org/search.php?q={location}&polygon_geojson=1&format=json"
        location_data = get_data_from_url(url)

        # parse data to get only coords if there is data
        if location_data.__class__.__name__ == "list" and len(location_data) > 0:
            locations_to_return.append(location_data[0].get(
                "geojson", []).get("coordinates", [])[0])

    # return locations data or error message
    if len(locations_to_return) > 0:
        return (jsonify(locations_to_return), 200)
    return 'locations not found', 400


@app.route('/projects/<string:user_email>', methods=['GET'])
@check_valid_mail
def get_all_projects(user_email):
    projects = mongo.get_one("user", {"email": user_email}, {
                             "projects": 1}).get("projects")
    if projects:
        return jsonify(projects), 200
    else:
        return 'projects not found', 400


@app.route('/projects/<string:user_email>/<int:project_id>', methods=['GET'])
@check_valid_mail
def get_project_by_id(user_email, project_id):
    project = mongo.get_one("user-data",
                            {"email": user_email, "project_id": project_id}, {"_id": 0})
    if project:
        return jsonify(project), 200
    else:
        return 'project not found', 400

from http import HTTPStatus
from flask import Flask, jsonify
from flask_cors import CORS
from db import MongoDB
from functools import wraps
from dotenv import load_dotenv
from re import match
from locations_utilities import get_locations_data
### type of user db ###
# users = {
#     1: {
#         "email": "johnathan.maytliss@gmail.com",
#         "contact_info": {
                # email?: string;
                # linkdin?: string;
                # git?: string;
                # phone?: string;
#           }
#         "first_name": "johnathan",
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
#                   "link" : "https://web.com"
#                   "git": "https://www.github.com"
#                   "additional_info": "false"
#               }
#         "locations": [tel-aviv, ramat-gan]
#         ]
#     },
# }


def check_valid_mail(fn):
    """function to check the validation of route email parameter"""
    @wraps(fn)
    def decorated_view(*args, **kwargs):
        if not match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", kwargs.get('user_email')):
            return 'invalid email', HTTPStatus.BAD_REQUEST
        return fn(*args, **kwargs)
    return decorated_view


load_dotenv()
app = Flask(__name__)
CORS(app)
mongo = MongoDB("personal-web")


@app.route('/user/<string:user_email>', methods=['GET'])
@check_valid_mail
def get_user(user_email):
    user = mongo.get_one("user", {"email": user_email}, {
                         "projects": 0, "_id": 0})

    return (jsonify(user), HTTPStatus.OK) if user else ('user not found', HTTPStatus.NOT_FOUND)


@app.route('/user/<string:user_email>/locations', methods=['GET'])
@check_valid_mail
def get_user_locations(user_email):
    # get locations from db if user else return error
    locations_names = mongo.get_one(
        "user", {"email": user_email}, {"locations": 1})

    # check valid locations data and send response
    data = get_locations_data(locations_names)
    if len(data["locations"]) == 0:
        return 'locations not found', HTTPStatus.NOT_FOUND

    return (jsonify(data), HTTPStatus.OK)


@app.route('/projects/<string:user_email>', methods=['GET'])
@check_valid_mail
def get_all_projects(user_email):
    projects = mongo.get_one("user", {"email": user_email}, {
                             "projects": 1}).get("projects")

    return (jsonify(projects), HTTPStatus.OK) if projects else ('projects not found', HTTPStatus.NOT_FOUND)


@app.route('/projects/<string:user_email>/<int:project_id>', methods=['GET'])
@check_valid_mail
def get_project_by_id(user_email, project_id):
    project = mongo.get_one("user-data",
                            {"email": user_email, "project_id": project_id}, {"_id": 0})
    return (jsonify(project), HTTPStatus.OK) if project else ('project not found', HTTPStatus.NOT_FOUND)

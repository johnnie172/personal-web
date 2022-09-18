from time import sleep
from flask import Flask
from flask import Flask, jsonify, request, render_template, make_response, redirect, url_for, flash
from flask_cors import CORS
from db import MongoDB

projects = [
    {
        "id": 1,
        "title": "title",
        "description": "example for desc",
        "img": "https://source.unsplash.com/random",
        "git": "https://www.github.com"
    },
    {
        "id": 2,
        "img": "https://picsum.photos/200"
    },
    {
        "id": 3,
        "title": "title",
        "img": "https://source.unsplash.com/random"
    }
]

users = {
    1: {
        "email": "johnathan.maytliss@gmail.com",
        "title": "Johnathan Maytliss - Software Engineer",
        "description": "this is desc"
    },
    2: {

    }
}

app = Flask(__name__)
CORS(app)
mongo = MongoDB("personal-web")
mongo.connect()

@app.route('/user', methods=['GET'])
def get_user():
    user_email = request.args.get('user_email')
    if user_email:
        user = mongo.get_one("user", {"email": user_email})
        if user:
            user.pop("_id")
            return jsonify(user), 200
        else:
            return 'user not found', 400
    return 'bad request', 400

@app.route('/projects', methods=['GET'])
def get_all_projects():
    sleep(0.5)
    return jsonify(projects), 200

@app.route('/projects/<int:project_id>')
def get_project(project_id):
    sleep(1)
    return jsonify({"id": project_id}), 200
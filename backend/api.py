from time import sleep
from flask import Flask
from flask import Flask, jsonify, request, render_template, make_response, redirect, url_for, flash
from flask_cors import CORS


projects = [
    {
        "id": 1,
        "title": "title",
        "desc": "example for desc",
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
        "title": "Johnathan Maytliss - Software Engineer",
        "desc": "this is desc"
    },
    2: {

    }
}

app = Flask(__name__)
CORS(app)

@app.route('/user', methods=['GET'])
def get_user():
    user_id = request.args.get('user_id')
    if user_id:
        user = users.get(int(user_id))
        if user:
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


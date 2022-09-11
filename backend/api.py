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
        "link": "https://www.github.com"
    },
    {
        "id": 2,
        "img": "https://source.unsplash.com/random"
    },
    {
        "id": 3,
        "title": "title",
        "img": "https://source.unsplash.com/random"
    }
]

app = Flask(__name__)
CORS(app)

@app.route('/user', methods=['GET'])
def get_user():
    return jsonify({"name": "Assaf"}), 200


@app.route('/projects', methods=['GET'])
def get_all_projects():
    sleep(0.5)
    return jsonify(projects), 200

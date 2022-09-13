from flask import Flask
from flask import Flask, jsonify, request, render_template, make_response, redirect, url_for, flash
from flask_cors import CORS     

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/user', methods=['GET'])
def get_user():
    return jsonify({"name":"Assaf"}), 200

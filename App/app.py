import os
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from .models import db, User, UserPokemon, Pokemon


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.root_path, 'data.db')
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'MySecretKey'
    app.config["JWT_SECRET_KEY"] = "super-secret"
    app.config['PREFERRED_URL_SCHEME'] = 'https'
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=12)
    CORS(app)
    db.init_app(app)
    app.app_context().push()
    return app

app = create_app()
jwt = JWTManager(app)  #setup flask jwt-e to work with app

@app.route('/')
def index():
  return '<h1>Poke API</h1>'

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=81)

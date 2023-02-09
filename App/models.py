from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()

class UserPokemon(db.Model):
  id = db.Column(db.Integer, primary_key=True)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)

class Pokemon(db.Model):
  pid = db.Column(db.Integer, primary_key=True)

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()

class UserPokemon(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pass

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pass

class Pokemon(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pass

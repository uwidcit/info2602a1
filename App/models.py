from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()

class UserPokemon(db.Model):
  pass

class User(db.Model):
  pass

class Pokemon(db.Model):
  pass

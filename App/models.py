from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(120), nullable=False)
  type = db.Column(db.String(50))

  #METHODS
  def set_password(self, password): 
    self.password = generate_password_hash(password, method='scrypt')

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def catch_pokemon(self, pokemon_id, name):
    new_Pokemon = UserPokemon(user_id = self.id, pokemon_id=pokemon_id, name=name)

    try:
      db.session.add(new_Pokemon)
      db.session.commit()
      return(f'Congrats Trainer! You are now the owner of {new_Pokemon}!')
    except:
      return('This one got away... Better luck next time!')

  def release_pokemon(self, pokemon_id, name):
    pokemon = UserPokemon.query.filter_by(user_id = self.id, pokemon_id=pokemon_id, name=name).first()

    if pokemon:
      db.session.delete(pokemon)
      db.session.commit()
      return(f'You have released {pokemon.name}.')
    else:
      return('Release could not be performed!') 

  def rename_pokemon(self, pokemon_id, name):
    pokemon = UserPokemon.query.filter_by(user_id = self.id, pokemon_id=pokemon_id).first()

    if pokemon:
      pokemon.name = name
      db.session.add(pokemon)
      db.session.commit()
      return True
    return None  

class Pokemon(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), unique=True, nullable=False)
  attack = db.Column(db.Integer)
  defense = db.Column(db.Integer)
  hp = db.Column(db.Integer)
  defense2 = db.Column(db.Integer)
  height = db.Column(db.Integer)
  sp_attack = db.Column(db.Integer)
  sp_defense = db.Column(db.Integer)
  speed = db.Column(db.Integer)
  type1 = db.Column(db.String(50))
  type2 = db.Column(db.String(50))

  def get_json(self):
    return {
      "id": self.id,
      "name": self.name,
      "attack": self.attack,
      "defense": self.defense,
      "hp": self.hp,
      "defense2": self.defense2,
      "height": self.height,
      "sp_attack": self.sp_attack,
      "sp_defense": self.sp_defense,
      "speed": self.speed,
      "type1": self.type1,
      "type2": self.type2,
      
    }
    
  __mappers_args__ = {
  'polymorphic_identity': 'Pokemon',
  'polymorphic_on': type
  }

class UserPokemon(Pokemon):
  __tablename__ = 'user_pokemon'
  pokemon = db.relationship('Pokemon', backref='user', lazy=True)
  
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  pokemon_id = db.Column(db.Integer, db.ForeignKey('pokemon.id'))
  
  __mappers_args__ = {
    'polymorphic_identity': 'user_pokemon',
  }

  def get_json(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "pokemon_id": self.pokemon_id,
      "name": self.name,
    }


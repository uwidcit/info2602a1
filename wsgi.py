import click
import csv
from tabulate import tabulate
from App import db, User, Pokemon, UserPokemon
from App import app, initialize_db

@app.cli.command("init", help="Creates and initializes the database")
def initialize():
  initialize_db()
  print("Database Initialized!")
  
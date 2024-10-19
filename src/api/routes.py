"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from .models import db, User, Planet, Character

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/people', methods=['GET'])
def get_people():
    characters = Character.query.all()
    return jsonify([character.serialize() for character in characters]), 200

@api.route('/people/<int:character_id>', methods=['GET'])
def get_person(character_id):
    character = Character.query.get_or_404(character_id)
    return jsonify(character.serialize()), 200

@api.route('/planets', methods=['GET'])
def get_planets():
    planets = Planet.query.all()
    return jsonify([planet.serialize() for planet in planets]), 200

@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = Planet.query.get_or_404(planet_id)
    return jsonify(planet.serialize()), 200

# LISTAR USUARIOS
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

# FAVORITOS DE USUARIOS
@api.route('/users/favorites', methods=['GET'])
def get_user_favorites():
    current_user_id = 1
    user = User.query.get_or_404(current_user_id)
    favorites = {
        "planets": [planet.serialize() for planet in user.favorite_planet],
        "characters": [character.serialize() for character in user.favorite_character],
        "vehicles": [vehicle.serialize() for vehicle in user.favorite_vehicle],
    }
    return jsonify(favorites), 200

# PLANETA FAVORITO
@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
    current_user_id = 1
    user = User.query.get_or_404(current_user_id)
    planet = Planet.query.get_or_404(planet_id)
    user.favorite_planet.append(planet)
    db.session.commit()
    return jsonify({"msg": "Planet added to favorites"}), 200

# PERSONAJE FAVORITO
@api.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_character(people_id):
    current_user_id = 1
    user = User.query.get_or_404(current_user_id)
    character = Character.query.get_or_404(people_id)
    user.favorite_character.append(character)
    db.session.commit()
    return jsonify({"msg": "Character added to favorites"}), 200

# BORRAR PLANETA FAVORITO
@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):
    current_user_id = 1
    user = User.query.get_or_404(current_user_id)
    planet = Planet.query.get_or_404(planet_id)
    if planet in user.favorite_planet:
        user.favorite_planet.remove(planet)
        db.session.commit()
        return jsonify({"msg": "Planet removed from favorites"}), 200
    return jsonify({"msg": "Planet not found in favorites"}), 404

# BORRAR PERSONAJE FAVORITO
@api.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favorite_character(people_id):
    current_user_id = 1
    user = User.query.get_or_404(current_user_id)
    character = Character.query.get_or_404(people_id)
    if character in user.favorite_character:
        user.favorite_character.remove(character)
        db.session.commit()
        return jsonify({"msg": "Character removed from favorites"}), 200
    return jsonify({"msg": "Character not found in favorites"}), 404
@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    if not username or not password:
        return jsonify({"msg": "Usuario o contraseña faltante"}), 400
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@api.route("/logout", methods=["POST"])
def logout():
    response = make_response(jsonify({"msg": "Logout exitoso"}))
    response.delete_cookie('access_token_cookie')
    return response

@api.route('/create', methods=['POST'])
def create_user():
    response = make_response("User created", 201)
    response.headers['Access-Control-Allow-Origin'] = 'https://scaling-eureka-4j75xj56xrq627jq5-3000.app.github.dev'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
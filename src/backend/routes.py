from flask import Blueprint, request, jsonify
from db import db
from models import User

api = Blueprint("api", __name__)

@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@api.route("/users", methods=["POST"])
def create_user():
    data = request.json

    user = User(
        email=data["email"],
        name=data["name"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201

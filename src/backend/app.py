from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from db import db
from models import (
    User,
    Kriterium,
    Anforderung,
    KriteriumAnforderung,
    UserKriterium
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    return app

app = create_app()

# ------------------------
# GET - All Users
# ------------------------
@app.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200


# ------------------------
# GET - User by ID
# ------------------------
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict()), 200


# ------------------------
# POST - Create User
# ------------------------
@app.route("/users", methods=["POST"])
def create_user():
    data = request.json

    if not data or "username" not in data:
        return jsonify({"error": "Username is required"}), 400

    user = User(username=data["username"])
    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201


# ------------------------
# PUT - Update User by ID
# ------------------------
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json

    if "username" in data:
        user.username = data["username"]

    db.session.commit()

    return jsonify(user.to_dict()), 200


# ------------------------
# DELETE - Delete User by ID
# ------------------------
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200

@app.route("/kriterien/<username>", methods=["GET"])
def get_kriterien_for_user(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    kriterium_list = Kriterium.query.all()
    response = []

    for kriterium in kriterium_list:
        links = KriteriumAnforderung.query.filter_by(
            kriteriumId=kriterium.id
        ).all()

        anforderungen_response = []

        for link in links:
            anforderung = Anforderung.query.get(link.anforderungId)

            user_status = UserKriterium.query.filter_by(
                userId=user.id,
                anforderungId=anforderung.id
            ).first()

            anforderungen_response.append({
                "id": anforderung.id,
                "number": anforderung.number,
                "text": anforderung.text,
                "isComplete": user_status.isComplete if user_status else False
            })

        response.append({
            "id": kriterium.id,
            "name": kriterium.name,
            "description": kriterium.description,
            "minG1": kriterium.minG1,
            "minG2": kriterium.minG2,
            "minG3": kriterium.minG3,
            "anforderungen": anforderungen_response
        })

    return jsonify(response), 200



if __name__ == "__main__":
    app.run(debug=True)

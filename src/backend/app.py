from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from db import db
from models import User

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    return app

app = create_app()

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@app.route("/users", methods=["POST"])
def create_user():
    data = request.json

    user = User(username=data["username"])
    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201

if __name__ == "__main__":
    app.run(debug=True)

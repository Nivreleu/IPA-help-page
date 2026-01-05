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

# ============================================================
# APP SETUP
# ============================================================

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    return app


app = create_app()

# ============================================================
# HEALTH
# ============================================================

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True}), 200

# ============================================================
# USERS
# ============================================================

@app.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200


@app.route("/users", methods=["POST"])
def create_user():
    data = request.json
    if not data or "username" not in data:
        return jsonify({"error": "username is required"}), 400

    user = User(username=data["username"])
    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201


# ============================================================
# KRITERIEN + ANFORDERUNGEN (COMMENT PRO KRITERIUM)
# ============================================================

@app.route("/kriterien/<username>", methods=["GET"])
def get_kriterien_for_user(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    kriterium_list = Kriterium.query.all()
    response = []

    for kriterium in kriterium_list:

        # ----------------------------------------------------
        # USER-KOMMENTAR PRO KRITERIUM
        # ----------------------------------------------------
        user_kriterium = UserKriterium.query.filter_by(
            userId=user.id,
            kriteriumId=kriterium.id
        ).first()

        comment = user_kriterium.comment if user_kriterium else ""

        # ----------------------------------------------------
        # ANFORDERUNGEN
        # ----------------------------------------------------
        links = KriteriumAnforderung.query.filter_by(
            kriteriumId=kriterium.id
        ).all()

        anforderungen_response = []

        for link in links:
            anforderung = Anforderung.query.get(link.anforderungId)

            status = UserKriterium.query.filter_by(
                userId=user.id,
                anforderungId=anforderung.id
            ).first()

            anforderungen_response.append({
                "id": anforderung.id,
                "number": anforderung.number,
                "text": anforderung.text,
                "isComplete": status.isComplete if status else False
            })

        response.append({
            "id": kriterium.id,
            "name": kriterium.name,
            "description": kriterium.description,
            "minG1": kriterium.minG1,
            "minG2": kriterium.minG2,
            "minG3": kriterium.minG3,
            "comment": comment,
            "anforderungen": anforderungen_response
        })

    return jsonify(response), 200


# ============================================================
# UPDATE ANFORDERUNG STATUS (PRO USER)
# ============================================================

@app.route(
    "/users/<username>/anforderungen/<int:anforderung_id>",
    methods=["PUT"]
)
def update_anforderung_status(username, anforderung_id):
    data = request.json
    if not data or "isComplete" not in data:
        return jsonify({"error": "isComplete is required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    anforderung = Anforderung.query.get(anforderung_id)
    if not anforderung:
        return jsonify({"error": "Anforderung not found"}), 404

    entry = UserKriterium.query.filter_by(
        userId=user.id,
        anforderungId=anforderung.id
    ).first()

    if not entry:
        entry = UserKriterium(
            userId=user.id,
            anforderungId=anforderung.id,
            isComplete=data["isComplete"]
        )
        db.session.add(entry)
    else:
        entry.isComplete = data["isComplete"]

    db.session.commit()

    return jsonify({
        "anforderungId": anforderung.id,
        "isComplete": entry.isComplete
    }), 200


# ============================================================
# UPDATE KRITERIUM COMMENT (PRO USER)
# ============================================================

@app.route(
    "/users/<username>/kriterien/<kriterium_id>/comment",
    methods=["PUT"]
)
def update_kriterium_comment(username, kriterium_id):
    data = request.json
    if not data or "comment" not in data:
        return jsonify({"error": "comment is required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    kriterium = Kriterium.query.get(kriterium_id)
    if not kriterium:
        return jsonify({"error": "Kriterium not found"}), 404

    entry = UserKriterium.query.filter_by(
        userId=user.id,
        kriteriumId=kriterium.id
    ).first()

    if not entry:
        entry = UserKriterium(
            userId=user.id,
            kriteriumId=kriterium.id,
            comment=data["comment"]
        )
        db.session.add(entry)
    else:
        entry.comment = data["comment"]

    db.session.commit()

    return jsonify({
        "kriteriumId": kriterium.id,
        "comment": entry.comment
    }), 200


# ============================================================
# START
# ============================================================

if __name__ == "__main__":
    app.run(debug=True)

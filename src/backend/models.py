from db import db

class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)


class Kriterium(db.Model):
    __tablename__ = "Kriterium"

    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    minG1 = db.Column(db.Integer)
    minG2 = db.Column(db.Integer)
    minG3 = db.Column(db.Integer)


class Anforderung(db.Model):
    __tablename__ = "Anforderung"

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer)
    text = db.Column(db.Text)


class KriteriumAnforderung(db.Model):
    __tablename__ = "Kriterium_Anforderung"

    id = db.Column(db.Integer, primary_key=True)
    kriteriumId = db.Column(db.Text)
    anforderungId = db.Column(db.Integer)


class UserKriterium(db.Model):
    __tablename__ = "User_Kriterium"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer)
    anforderungId = db.Column(db.Integer)
    isComplete = db.Column(db.Boolean)

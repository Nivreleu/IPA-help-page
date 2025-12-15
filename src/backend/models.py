from db import db

class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }

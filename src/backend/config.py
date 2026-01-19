import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Nur Engine-Options setzen, wenn wir NICHT SQLite verwenden
    if (SQLALCHEMY_DATABASE_URI or "").startswith("sqlite"):
        SQLALCHEMY_ENGINE_OPTIONS = {}
    else:
        SQLALCHEMY_ENGINE_OPTIONS = {
            "pool_pre_ping": True,
            "pool_recycle": 180,
            "pool_size": 1,
            "max_overflow": 0,
            "connect_args": {
                "connect_timeout": 10,
                "options": "-c statement_timeout=10000",
                "sslmode": "require",
            },
        }

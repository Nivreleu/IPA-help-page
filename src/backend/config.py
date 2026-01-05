import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

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


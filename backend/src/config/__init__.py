from dotenv import load_dotenv, find_dotenv
import os
import urllib.parse

load_dotenv(find_dotenv())  # take environment variables from .env.


config = os.environ
DB_NAME = urllib.parse.quote_plus(config.get("DB_NAME", ""))
DB_USER = urllib.parse.quote_plus(config.get("MONGO_USERNAME", ""))
DB_PASSWORD = urllib.parse.quote_plus(config.get("MONGO_PASSWORD", ""))
config["MONGO_URI"] = "mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority" % (DB_USER, DB_PASSWORD, DB_NAME)
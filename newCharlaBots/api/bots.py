import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots


@newCharlaBots.app.route("/createBot/", methods=['GET'])
def create_bot():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("INSERT INTO bots (cannonical) VALUES (?)", 
    	("cannonicalCode"))

    return flask.jsonify(**context), 200
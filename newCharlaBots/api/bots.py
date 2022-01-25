import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots


@newCharlaBots.app.route("/createBot/", methods=['POST', 'GET'])
def create_bot():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("INSERT INTO bots (botname, canonical) VALUES (?,?)", 
    	("botname3", "cannonicalCode"))

    context = {}

    return flask.jsonify(**context), 200



@newCharlaBots.app.route("/editBot/")
def edit_bot():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("UPDATE bots SET canonical=?, botname=? WHERE botid=?", ("botname3", "update name", "1"))

    context = {}

    return flask.jsonify(**context), 200


@newCharlaBots.app.route("/getBotData/")
def get_bot_data():

    connection = get_db()

    data = connection.execute("SELECT * FROM bots WHERE botid=?" , ("1")).fetchone()

    context = data

    return flask.jsonify(**context), 200

    
@newCharlaBots.app.route("/deleteBot/")
def delete_bot():

    connection = get_db()

    data = connection.execute("DELETE FROM bots WHERE botid=?" , ("1"))


    context = {}


    return flask.jsonify(**context), 200



@newCharlaBots.app.route("/getAllBotNames/")
def get_bot_names():

    connection = get_db()

    data = connection.execute("SELECT * FROM bots").fetchall()

    names = []

    for data in data:
        names.append({"name":data["botname"], "key":data["botid"]})

    context = {"data" : names}

    return flask.jsonify(**context), 200
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
    	("botname2", "cannonicalCode"))

    context = {}

    return flask.jsonify(**context), 200



@newCharlaBots.app.route("/editBot/")
def edit_bot():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("UPDATE bots SET canonical=?, botname=? WHERE botid=?", ("test 2", "update name", "1"))

    context = {}

    return flask.jsonify(**context), 200


@newCharlaBots.app.route("/getBotData/")
def get_bot_data():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    data = connection.execute("SELECT * FROM bots WHERE botid=?" , ("1")).fetchone()

    # context = {
    #     "name" : data.botname,
    #     "code" : data.canonical,
    #     "botid" : data.botid
    # }


    context = data


    return flask.jsonify(**context), 200


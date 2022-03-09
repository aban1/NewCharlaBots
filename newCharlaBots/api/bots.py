import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots


@newCharlaBots.app.route("/createBot/", methods=['POST', 'GET'])
def create_bot():

    connection = get_db()

    botname = request.args.get("botName")
    description = request.args.get("description")
    cannonicalCode = request.args.get("canonicalCode")

    connection.execute("INSERT INTO bots (botname, description, canonical) VALUES (?,?, ?)", 
    	(botname, description, cannonicalCode))

    context = {}

    return flask.jsonify(**context), 200


## with hardcoded values, delete this later
@newCharlaBots.app.route("/editBot/")
def edit_bot():
    connection = get_db()
    connection.execute("UPDATE bots SET canonical=?, botname=? WHERE botid=?", ("if any happy reply no end if", "Mark", "1"))
    context = {}
    return flask.jsonify(**context), 200

@newCharlaBots.app.route("/updateBot/", methods =["PATCH"])
def update_bot():
    connection = get_db()
    botid = flask.request.args.get("botID")
    botname = flask.request.args.get("botName")
    description = flask.request.args.get("description")

    code = flask.request.args.get("canonicalCode")

    

    data_botID = connection.execute("UPDATE bots SET description=?, canonical=?, botname=? WHERE botid=?",
        (description, code, botname, botid))

    context = {}
    return flask.jsonify(**context), 200



@newCharlaBots.app.route("/getBotData/")
def get_bot_data():

    connection = get_db()

    botid = flask.request.args.get("botid")

    data = connection.execute("SELECT * FROM bots WHERE botid=?" , (botid)).fetchone()

    context = {"data" : data}

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


@newCharlaBots.app.route("/getBotAndLang/")
def get_bot_and_lang():
    connection = get_db()
    botid = flask.request.args.get("botID")
    data_botID = connection.execute("SELECT * FROM bots WHERE botid=?" , (botid)).fetchone()

    langID = flask.request.args.get("langID")
    data_langID = connection.execute("SELECT * FROM languages WHERE languageid=?", (langID)).fetchone()
    context = {"botInfo" : data_botID, "langInfo" : data_langID}

    return flask.jsonify(**context), 200


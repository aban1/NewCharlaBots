import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots

#getBotData
#getLanguageData
# @newCharlaBots.app.route("/getBotAndLang/")
# def get_bot_and_lang():
#     connection = get_db()
#     botid = flask.request.args.get("botID")
#     data_botID = connection.execute("SELECT * FROM bots WHERE botid=?" , (botid)).fetchone()

#     langID = flask.request.args.get("langID")
#     data_langID = connection.execute("SELECT * FROM languages WHERE languageid=?", (langID)).fetchone()

#     context = {"botid" : data_botID, "langID" : data_langID}

#     return flask.jsonify(**context), 200

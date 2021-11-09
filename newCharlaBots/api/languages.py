import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots

@newCharlaBots.app.route("/createLanguage/")
def create_language():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("INSERT INTO languages (name, ifAny, andNotAny, ifAll, andNotAll,"
    	" replyLine, startReply, endReply, endIf, pickRandom, endPick) "
    	"Values (?,?,?,?,?,?,?,?,?,?,?)", ("2","1","1","1","1","1","1","1","1","1","1"))

    context = {}

    return flask.jsonify(**context), 200


@newCharlaBots.app.route("/editLanguage/")
def edit_language():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("UPDATE languages SET name=?, ifAny=?, andNotAny=?, ifAll=?, andNotAll=?,"
    	" replyLine=?, startReply=?, endReply=?, endIf=?, pickRandom=?, endPick=? WHERE languageid=?"
    	, ("2","1","1","4","1","1","1","1","1","1","1","10"))



    context = {}

    return flask.jsonify(**context), 200


@newCharlaBots.app.route("/getLanguageData/")
def get_language_data():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    data = connection.execute("SELECT * FROM languages WHERE languageid=?", "2").fetchone()
  

    context = data

    return flask.jsonify(**context), 200






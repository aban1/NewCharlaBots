import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots

@newCharlaBots.app.route("/createLang/", methods=['POST'])
def create_lang_helper():
    connection = get_db()
    name = request.args.get("name")
    ifany = request.args.get("ifany")
    andnotany = request.args.get("andnotany")
    ifall = request.args.get("ifall")
    andnotall = request.args.get("andnotall")
    replyline = request.args.get("replyline")
    startreply = request.args.get("startreply")
    endreply = request.args.get("endreply")
    endif = request.args.get("endif")
    pickrandom = request.args.get("pickrandom")
    endpick = request.args.get("endpick")
    connection.execute("INSERT INTO languages (name, ifAny, andNotAny, ifAll, andNotAll, replyLine, startReply, endReply, endIf, pickRandom, endPick) VALUES (?,?,?,?,?,?,?,?,?,?,?)", (name, ifany, andnotany, ifall, andnotall, replyline, startreply, endreply, endif, pickrandom, endpick))

    context = {}
    return flask.jsonify(**context), 200


@newCharlaBots.app.route("/editLanguage/")
def edit_language():

    connection = get_db()

    # botname = request.args.get("botname")

    # cannonicalCode = request.args.get("cannonicalCode")

    connection.execute("UPDATE languages SET name=?, ifAny=?, andNotAny=?, ifAll=?, andNotAll=?,"
    	" replyLine=?, startReply=?, endReply=?, endIf=?, pickRandom=?, endPick=? WHERE languageid=?"
    	, ("2","1","1","4","1","1","1","1","1","1","1","1"))



    context = {}

    return flask.jsonify(**context), 200

#mappings from canonical to user lang
@newCharlaBots.app.route("/getLanguageData/")
def get_language_data():

    connection = get_db()
    langID = flask.request.args.get("langid")
    data = connection.execute("SELECT * FROM languages WHERE languageid=?", (langID)).fetchone()
    context = data

    return flask.jsonify(**context), 200



@newCharlaBots.app.route("/deleteLanguage/")
def delete_language():

    connection = get_db()

    data = connection.execute("DELETE FROM languages WHERE languageid=?", "1")
  

    context = {}

    return flask.jsonify(**context), 200



@newCharlaBots.app.route("/getAllLanguageNames/")
def lang_names():

    connection = get_db()

    data = connection.execute("SELECT * FROM languages").fetchall()

    names = [] 

    for data in data:
        names.append({"name": data["name"], "key":data["languageid"]})
    
    context = {"data" : names}

    return flask.jsonify(**context), 200



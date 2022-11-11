import flask
import newCharlaBots
from newCharlaBots.model import get_db

@newCharlaBots.app.route('/')
def show_index():
    """Display / route."""

    context = {}

    return flask.render_template("index.html", **context)


@newCharlaBots.app.route('/editor/')
def show_editor():
    """Display / route."""

    botid = flask.request.args.get('botid')
    langid = flask.request.args.get('langid')
    args = [botid, langid]
    context = { "botid" : args }

    return flask.render_template("editor.html", **context)

@newCharlaBots.app.route('/create/')
def show_create():
    """Display / route."""

    langid = flask.request.args.get('langid')
    context = { "langid" : langid }

    return flask.render_template("create.html", **context)


@newCharlaBots.app.route('/chat/')
def show_chat():
    """Display / route."""

    connection = get_db()
    botid = flask.request.args.get('botid')

    context = { "botid" : botid}

    return flask.render_template("chat.html", **context)



@newCharlaBots.app.route('/chat2/')
def show_chat2():
    """Display / route."""

    botid1 = flask.request.args.get('botid1')
    botid2 = flask.request.args.get('botid2')

    context = { "botid1" : botid1, "botid2" : botid2}

    return flask.render_template("chat2.html", **context)


@newCharlaBots.app.route('/createLanguage/')
def create_lang():
    """Display / route."""

    

    context = {}

    return flask.render_template("createLang.html", **context)

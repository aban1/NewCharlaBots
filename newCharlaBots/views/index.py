import flask
import newCharlaBots

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

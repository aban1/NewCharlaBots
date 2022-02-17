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

import flask
import newCharlaBots

@newCharlaBots.app.route('/')
def show_index():
    """Display / route."""

    context = {}

    return flask.render_template("index.html", **context)

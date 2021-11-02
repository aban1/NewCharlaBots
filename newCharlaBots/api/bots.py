import flask
from flask import request
from newCharlaBots.model import get_db
import newCharlaBots


@newCharlaBots.app.route('/api/', methods=['GET'])
def create_bot():

	connection = get_db()


	context = {}

	return flask.jsonify(**context), 204




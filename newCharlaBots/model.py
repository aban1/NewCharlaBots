import sqlite3
import uuid
import pathlib
import flask
import newCharlaBots


# def dict_factory(cursor, row):
#     """Convert database row objects to a dictionary keyed on column name.

#     This is useful for building dictionaries which are then used to render a
#     template.  Note that this would be inefficient for large queries.
#     """
#     return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}



def get_db():
    """Open a new database connection.

    Flask docs:
    https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
    """
    if 'sqlite_db' not in flask.g:
        db_filename = newCharlaBots.app.config['DATABASE_FILENAME']
        flask.g.sqlite_db = sqlite3.connect(str(db_filename))
        # flask.g.sqlite_db.row_factory = dict_factory

        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

    return flask.g.sqlite_db


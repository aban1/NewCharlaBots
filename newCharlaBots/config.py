"""newCharlaBots development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'&\xea\xc7\x11YX\xe5\x8a8\x83&\xfc\xe1|Ek\x9d*\xb1r\x8d\xe8\nu'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
NEWCHARLABOTS_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = NEWCHARLABOTS_ROOT / 'var' / 'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# Database file is var/newCharlaBots.sqlite3
DATABASE_FILENAME = NEWCHARLABOTS_ROOT / 'var' / 'newCharlaBots.sqlite3'

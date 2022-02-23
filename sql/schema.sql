PRAGMA foreign_keys = ON;

-- sqlite3 var/NewCharlaBots.sqlite3 < sql/schema.sql

CREATE TABLE bots(
  botid INTEGER PRIMARY KEY AUTOINCREMENT,
  botname VARCHAR(20) NOT NULL,
  description VARCHAR(1000),
  canonical VARCHAR(1000) NOT NULL
);

CREATE TABLE languages(
  name VARCHAR(50) NOT NULL,
  languageid INTEGER PRIMARY KEY AUTOINCREMENT,
  ifAny VARCHAR(20) NOT NULL,
  andNotAny VARCHAR(20) NOT NULL,
  ifAll VARCHAR(20) NOT NULL,
  andNotAll VARCHAR(20) NOT NULL,
  replyLine VARCHAR(20) NOT NULL,
  startReply VARCHAR(20) NOT NULL,
  endReply VARCHAR(20) NOT NULL,
  endIf VARCHAR(20) NOT NULL,
  pickRandom VARCHAR(20) NOT NULL,
  endPick VARCHAR(20) NOT NULL
);

CREATE TABLE bot_versions(
  botid INTEGER NOT NULL, 
  botname VARCHAR(20) NOT NULL, 
  timeDate DATETIME DEFAULT (datetime()), 
  version INTEGER NOT NULL, 
  canonical VARCHAR(1000) NOT NULL, 
  PRIMARY KEY(botid),
  FOREIGN KEY (botid) REFERENCES bots(botid)
);


PRAGMA foreign_keys = ON;

-- sqlite3 var/NewCharlaBots.sqlite3 < sql/schema.sql

CREATE TABLE bots(
  botid INTEGER NOT NULL,
  botname VARCHAR(20) NOT NULL,
  canonical VARCHAR(1000) NOT NULL,
  PRIMARY KEY(botid)
);

CREATE TABLE languages(
  name VARCHAR(50) NOT NULL,
  ifAny VARCHAR(20) NOT NULL,
  andNotAny VARCHAR(20) NOT NULL,
  ifAll VARCHAR(20) NOT NULL,
  andNotAll VARCHAR(20) NOT NULL,
  replyLine VARCHAR(20) NOT NULL,
  startReply VARCHAR(20) NOT NULL,
  endReply VARCHAR(20) NOT NULL,
  endIf VARCHAR(20) NOT NULL,
  pickRandom VARCHAR(20) NOT NULL,
  endPick VARCHAR(20) NOT NULL,
  PRIMARY KEY(NAME)
);

CREATE TABLE bot_versions(
  botid VARCHAR(20) NOT NULL, 
  botname VARCHAR(20) NOT NULL, 
  timeDate DATETIME DEFAULT (datetime()), 
  version INTEGER NOT NULL, 
  canonical VARCHAR(1000) NOT NULL, 
  PRIMARY KEY(botid),
  FOREIGN KEY (botid) REFERENCES bots(username) 
);


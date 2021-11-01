PRAGMA foreign_keys = ON;

CREATE TABLE bots(
  botid VARCHAR(20) NOT NULL,
  canonical VARCHAR(1000) NOT NULL,
  PRIMARY KEY(botid)
);

CREATE TABLE languages(
  name INTEGER PRIMARY KEY,
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
);

CREATE TABLE bot_versions(
  botid VARCHAR(20) NOT NULL, 
  botname VARCHAR(20) NOT NULL, 
  timeDate DATETIME DEFAULT (datetime()), #this is not really needed
  version INTEGER AUTOINCREMENT, #added this to keep track of the versions
  canonical VARCHAR(1000) NOT NULL, 
  PRIMARY KEY(botid),
  FOREIGN KEY (botid) REFERENCES bots(username) #do we need this
);


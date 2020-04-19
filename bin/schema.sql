-- Drop and Recreate Tables

-- Run with the following command:
-- $ psql -f bin/schema.sql dndrm dndrm_user

DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS abilities CASCADE;
DROP TABLE IF EXISTS hp CASCADE;

CREATE TABLE characters (
  id bigserial PRIMARY KEY,
  name text,
  race text,
  class text,
  background text,
  alignment text,
  level smallint,
  savingthrows text[],
  proficiencies text[]
);

CREATE TABLE abilities (
  id bigint REFERENCES characters (id),
  strength smallint,
  dexterity smallint,
  constitution smallint,
  intelligence smallint,
  wisdom smallint,
  charisma smallint
);

CREATE TABLE hp (
  id bigint REFERENCES characters (id),
  current smallint,
  max smallint,
  temporary smallint,
  hitdice text,
  successes smallint,
  failures smallint
);


const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const pgp = require('pg-promise')();

const config = {
  port: process.env.PORT || 3030,
  dburl: process.env.DATABASE_URL || 'postgresql://dndrm_user@localhost/dndrm',
};

const db = pgp(config.dburl);

const reduceArrayByID = (obj, item) => {
  const { id, ...rest } = item;
  obj[id] = rest;
  return obj;
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api', (req, res) => res.send('D&D Character Sheet Manager'));

app.get('/api/characters', (req, res) => {
  db.task(async t => {
    const characters = await t.any('SELECT * FROM characters');
    const abilities = await t.any('SELECT * FROM abilities');
    const hp = await t.any('SELECT * FROM hp');
    return { characters, abilities, hp };
  })
    .then(data => {
      const abilities = data.abilities.reduce(reduceArrayByID, {});
      const hp = data.hp.reduce(reduceArrayByID, {});
      const characters = data.characters.map(character => ({
        ...character,
        abilities: abilities[character.id],
        hp: hp[character.id]
      })).reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});

      res.send({ characters });
    })
    .catch(error => {
      console.error('PG Error:', error);
    });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(config.port, () => console.log(`Express app listening at http://localhost:${config.port}`));


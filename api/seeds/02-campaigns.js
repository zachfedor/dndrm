// Seed Campaign Data

exports.seed = function(knex) {
  return knex('campaigns').insert([{
    // id: 1,
    name: 'Lost Mines of Phandelver',
    'user_id': 1,
    // 'created_at': defaults to now()
  }, {
    // id: 2,
    name: 'Waterdeep: Dragon Heist',
    'user_id': 5,
  }]);
};

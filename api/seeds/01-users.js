// Seed User Data

// Hashed and salted values for password of 'test'
const password = '5487b3c51ba69746f5b9009379ee0d2a7f9fd199d59d8897115fadf959b6fad54b5108f8d7fce9b885f84f4b2371743c7bf90df3679bcbadcb62ac85e6495e1cf7a0db464d01c6f107e7b6fdd2dc6b060f26ed125054b26c2fdbfdc28fafc7821b6df02cce8c4f94057da138322107f5b5db993beb6771924191c4978dbba27c3b2dafa91882b66c43dbf205dd146adb96050e84be45d2623cef050407012785ebc7759ba48f0e50f753d334075b3b8e38a5b258c1dfc65e2847eac56178879a49e4d7f168553d9659c1eee5401bdcc44a7923a18c662786bf3de98b6912ffa7a1803d7a4a7ee87528886960a5653d1686efa275b105cf713fb9d0fffbc2089985bac48e5c824d1fba833ee75badf043b6bbb027281d5c5b5993d9d19dd6dae0f6d85fbe3a6885982ed6648c8d7d8ce9712e384bc1b2d8067e454d61d2ec8a7ca90520456c74b2f4d6cb286c22096e6d935b71ada4194ddad7bc4f1dd5000cb6a8a22617225e775f99a356ed8aa2f8bef49d92eb6a0e81b097ddeafbf483c75d5434186f83c820c107b2efede719eeb10b3f8b02a2373abdcff0f69d96a709a9b0d66f3b72430c16e20569aa5e72c1bb8e07a502c1934a449dc8025e09cfe3109c152d962a4a30af80500c9b1613b80d6cc326aa2184da3baa069446737bca54b4660f585343cf0474ca666798b5517953792004a06c5b247e63901556ef5658';
const salt = '5038010b8422d095ff39d3581524d943';

exports.seed = function(knex) {
  // Delete all existing records first
  return knex('users').del().then(function() {
    return knex('users').insert([{
      id: 1,
      email: 'dm@test.co',
      username: 'dm',
      password: password,
      salt: salt,
    }, {
      id: 2,
      email: 'player1@test.co',
      username: 'player1',
      password: password,
      salt: salt,
    }, {
      id: 3,
      email: 'player2@test.co',
      username: 'player2',
      password: password,
      salt: salt,
    }, {
      id: 4,
      email: 'player3@test.co',
      username: 'player3',
      password: password,
      salt: salt,
    }, {
      id: 5,
      email: 'dm2@test.co',
      username: 'dm2',
      password: password,
      salt: salt,
    }]);
  });
};

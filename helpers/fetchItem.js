// const fetch = require('node-fetch');

const fetchItem = async (ItemID) => {
  if (!ItemID) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

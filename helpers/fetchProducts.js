const fetchProducts = async (item) => {
  if (!item) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
    // implemente seus testes aqui
    it('Teste se fetchItem é uma função', () => {
      // console.log(typeof fetchProducts);
      expect(typeof fetchItem).toBe('function');
    })
    it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled()
    }) 
    it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
    })
    it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
      const fetchSearch = await fetchItem('MLB1615760527');
      expect(fetchSearch).toEqual(item)
    })
    it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url' , async () => {
      expect(fetchItem()).rejects.toThrow()
    })
  // fail('Teste vazio');
});

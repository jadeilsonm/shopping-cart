const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCarItems com o argumeno <ol><li>Item</li></ol>, o metodo localstorage.setItem é chamado', ()=> {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Teste se, ao executar saveCarItems com o argumeno <ol><li>Item</li></ol>, o metodo localstorage.setItem é chamado', ()=> {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>');
  })
  
});

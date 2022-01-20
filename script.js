const itemsContainer = document.querySelector('.items');
const carr = document.querySelector('.cart__items');
const price = document.querySelector('.total-price');

const soma = () => {
  const cartItems = Array.from(document.querySelectorAll('.cart__item'));
  const totalPrice = cartItems.reduce((acc, curr) => {
    const arrayStr = curr.textContent.split('$');
    const itemPrice = arrayStr[1];
    return acc + +itemPrice;
  }, 0);
  price.innerText = totalPrice;
};

const limparTudo = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    const items = document.querySelectorAll('.cart__item');
    items.forEach((element) => element.remove()); 
    soma();
    saveCartItems(carr.innerHTML);
  });
};
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const item = event.target;
  item.remove();
  soma();
  saveCartItems(carr.innerHTML);
}

const carregando = () => {
  const container = document.querySelector('.container');
  const customElement = createCustomElement('section', 'loading', 'carregando...');
  container.appendChild(customElement);
};

const removeCarregando = () => {
  const aguardandoFetch = document.querySelector('.loading');
  aguardandoFetch.remove();
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const init = async (calback) => {
  carregando();
  const { results } = await calback('computador');
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const sectionProduct = createProductItemElement({ sku, name, image });
    itemsContainer.appendChild(sectionProduct);
  });
  removeCarregando();
};

const addToCar = async () => {
  // carregando();
  itemsContainer.addEventListener('click', async (event) => {
    const product = event.target;
    const idItem = product.parentElement.childNodes[0].innerText;
    const { id: sku, title: name, price: salePrice } = await fetchItem(idItem);
    const li = createCartItemElement({ sku, name, salePrice }); 
    carr.appendChild(li);
    soma();
    // removeCarregando();
    saveCartItems(carr.innerHTML);
  });
};

const restoreStorege = () => {
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  carr.innerHTML = getSavedCartItems();
  const list = carr.children;
  Array.from(list).map((el) => el.addEventListener('click', cartItemClickListener));
  soma();
};

window.onload = () => {
  init(fetchProducts);
  addToCar();
  restoreStorege();
  limparTudo();
 };

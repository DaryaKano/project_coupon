//показывается при пустой корзине
var emptyTemplate = '<div class="catalog_basket__line catalog_basket__line_empty">No items in cart</div>';

//upd:шаблон для корзины
var lineTemplate = '<div class="catalog_basket__line" id="$id">' +
                      '<div class="catalog_basket__product">$name</div>' +
                      '<div class="catalog_basket__price price">$price</div>' +
                      '<div class="catalog_basket__close">' + 
                      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 44.238 44.238" style="enable-background:new 0 0 44.238 44.238;" xml:space="preserve">' +
              '<g>' +
                '<g>' +
                  '<g>' +
                    '<path d="M15.533,29.455c-0.192,0-0.384-0.073-0.53-0.22c-0.293-0.293-0.293-0.769,0-1.062l13.171-13.171     c0.293-0.293,0.768-0.293,1.061,0s0.293,0.768,0,1.061L16.063,29.235C15.917,29.382,15.725,29.455,15.533,29.455z" fill="#546e7a"/>' +
                  '</g>' +
                  '<g>' +
                    '<path d="M28.704,29.455c-0.192,0-0.384-0.073-0.53-0.22L15.002,16.064c-0.293-0.293-0.293-0.768,0-1.061s0.768-0.293,1.061,0     l13.171,13.171c0.293,0.293,0.293,0.769,0,1.062C29.088,29.382,28.896,29.455,28.704,29.455z" fill="#546e7a"/>' +
                  '</g>' +
                  '<path d="M22.119,44.237C9.922,44.237,0,34.315,0,22.12C0,9.924,9.922,0.001,22.119,0.001S44.238,9.923,44.238,22.12    S34.314,44.237,22.119,44.237z M22.119,1.501C10.75,1.501,1.5,10.751,1.5,22.12s9.25,20.619,20.619,20.619    s20.619-9.25,20.619-20.619S33.488,1.501,22.119,1.501z" fill="#546e7a"/>' +
                '</g>' +
              '</g>' +
            '</svg>' +
                    '</div>';
//создаем корзину для добавления товаров
var basket = [];
var basketElement = document.querySelector('.catalog_basket__list');
var id = 0;


//функция добавление элементов в корзину
function addToBucket(e) {
    e.preventDefault();/*убр. переход по ссылке*/
  var product = this.closest('.catalog_cart');

  if(product.classList.contains('catalog_cart--disabled')) {/*возврат для недоступных товаров*/
    return;
  }
//объект 
  var item = {
    id: id++,
    price: product.dataset.price,
    name: product.querySelector('.catalog_cart__title').innerText,
    count: 1
  }
  basket.push(item);

  renderBasket();
  renderSum();

}

//навешиваем события на кнопочки

var btns = document.querySelectorAll('.catalog_cart .btn');

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', addToBucket);
}


document.addEventListener('click', function (e) {
  e.preventDefault();
  var item = e.target.closest('.catalog_basket__line');
  if(e.target.classList.contains('catalog_basket__close') || e.target.closest('.catalog_basket__close')) {

    for (var i = 0; i < basket.length; i++) {
      if(basket[i].id == item.id) {
        basket.splice(i, 1)
      }
    }
    renderBasket();
    renderSum();
  }
});

//перезапись содержимого корзины

function renderBasket () {

  basketElement.innerHTML = "";/*очистить корзину*/

  if (basket.length === 0) {
    basketElement.innerHTML += emptyTemplate;/*если пустая-шаблончик вверху*/
  }

  for (var i = 0; i < basket.length; i++) {/*наполняем шаблон*/
    var template = lineTemplate;
    var item = basket[i];
    template = template.replace('$name', item.name);
    template = template.replace('$price', item.price);
    template = template.replace('$id', item.id);
    basketElement.innerHTML += template;
  }

}

//перезапись суммы товаров

function renderSum () {
  var sum = 0;

  for (var i = 0; i < basket.length; i++) {
    sum += Number(basket[i].price);
  }

  document.querySelector('.catalog_basket__summ_text').innerText = sum;
}

renderBasket();
renderSum();

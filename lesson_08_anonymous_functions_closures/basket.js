'use strict';

class Cart {
  fillingCart = {};
  basketEl = document.querySelector('.basket')
  cartIconWrapEl = document.querySelector('.cartIconWrap');
  featuredItemEls = document.querySelectorAll('.featuredItem');
  basketHeaderEl = document.querySelector('.basketHeader');
  basketCountEl = document.querySelector('.basketCount');
  basketTotalValueEl = document.querySelector('.basketTotalValue');

  constructor() {
    this.setFunctionalToggleCart();
    this.setFunctionalAddProductToCart();
    this.setCartCount();
  }

  setFunctionalToggleCart() {
    this.cartIconWrapEl.addEventListener('click', () => {
      this.basketEl.classList.toggle('hidden');
    });
  }

  setFunctionalAddProductToCart() {
    this.featuredItemEls.forEach(el => {
        el.addEventListener('click', ({target}) => {
          if (target.tagName === "BUTTON") {
            if (this.fillingCart[el.dataset['id']]) {
              // Изменяем в fillingCart колличество уже добавленного товара
              this.incProductInCart(el);
            } else {
              // Добавляенм в fillingCart новый товар
              this.addNewProductToCart(el);
            }

            // Обновим значения на странице
            this.redrawCart();
          }
        });
      }
    );
  }

  redrawCart() {
    // Обновим значения строк товаров в корзине
    this.setFunctionalShowProduct();
    // Установим счетчик товаров в корзине
    this.setCartCount();
    // Установим полную сумму покупки в корзине
    this.setTotalCartPrice();
    // Добавим возможность удалить данный продукт
    this.delProductFromCart();
  }

  setFunctionalShowProduct() {
    //Удалим уже добавленные для в корзине показа строки из объекта
    document.querySelectorAll('.dynamicBasketRow').forEach(el => {
      el.remove();
    });

    // Пройдемся по свем товарам в объекте
    for (let productId in this.fillingCart) {
      // Создадим строки товаров с тегами html
      let str = `<div class="basketRow dynamicBasketRow">
                    <div>${this.fillingCart[productId]['name']}</div>
                    <div>${this.fillingCart[productId]['count']}</div>
                    <div>$${this.fillingCart[productId]['price']}</div>
                    <div>$${this.fillingCart[productId]['total']}</div>
                    <div><i class="fas fa-trash-alt" style="color:red" id="productTrash" data-id="${productId}"></i></div>
                </div>`;
      // Вставим строки с товарами после заголовка
      this.basketHeaderEl.insertAdjacentHTML('afterend', str);

    }
  }

  setCartCount(count) {
    let allCount = 0;
    for (let productId in this.fillingCart) {
      allCount += this.fillingCart[productId]['count'];
    }
    this.basketCountEl.innerHTML = `${allCount}`;
  }


  setTotalCartPrice() {
    let totalPrice = 0;
    for (let productId in this.fillingCart) {
      totalPrice += this.fillingCart[productId]['total'];
    }
    this.basketTotalValueEl.innerText = totalPrice
  }

  addNewProductToCart(el) {
    this.fillingCart[el.dataset['id']] = {
      'name': el.dataset['name'],
      'count': 1,
      'price': +el.dataset['price'],
      'total': +el.dataset['price'],
    }
  }

  incProductInCart(el) {
    this.fillingCart[el.dataset['id']]['count'] += 1;
    this.fillingCart[el.dataset['id']]['total'] = this.fillingCart[el.dataset['id']]['price'] * this.fillingCart[el.dataset['id']]['count'];
  }

  delProductFromCart() {
    const productTrashEls = document.querySelectorAll('#productTrash');
    productTrashEls.forEach(el => {
      el.addEventListener('click', ({target}) => {
        delete this.fillingCart[el.dataset['id']];
        console.log(this.fillingCart)
        // Обновим значения на странице
        this.redrawCart();
      });
    });
  }

}

let cart = new Cart();
const basketBox = document.querySelector('.basket__box');
const productsBtn = document.querySelectorAll('[data-btn]');
let productsCount = 0;

if (productsBtn) {
  productsBtn.forEach(product => {
      product.addEventListener('click', e => {
        const target = e.target;
        const basketNone = document.querySelector('.basket-product__none');
        if(!target.classList.contains('btn-none')){
           productsCount++;
           if(basketNone) {basketNone.remove();};
  
           let product = target.closest(".product-element");
  
           const imgMain = product.querySelector(".product-img").querySelector("img");
            const name = product.querySelector("h3");
            const newPrice = product.querySelector(".product-price-new");
  
  
          let article = document.createElement('article');
          let divImg = document.createElement('div');
          let img = document.createElement('img');
          let divInfo = document.createElement('div');
          let h4 = document.createElement('h4');
          let info = document.createElement('p');
          let counterPrice = document.createElement('div');
          let counter = document.createElement('div');
          let divMinus = document.createElement('div');
          let divPlus = document.createElement('div');
          let divInput = document.createElement('div');
          let totalPrice = document.createElement('div');
          let price = document.createElement('p');
          let input = document.createElement('input');
  
          article.className = "basket-product";
          divImg.className = "basket-img";
          divInfo.className = "info-product";
          counterPrice.className = "counter__price";
          divMinus.className = "counter__button counter__button_minus";
          divPlus.className = "counter__button counter__button_plus";
          divInput.className = "counter__input";
          counter.className = "counter";
          totalPrice.className = "total-price";
          counter.setAttribute('data-counter', '');
          input.setAttribute('disabled', '');
  
          product.querySelector('a').className = "btn-none";
  
          basketBox.append(article);
          article.prepend(divImg);
          divImg.prepend(img);
          article.append(divInfo);
          divInfo.prepend(h4);
          divInfo.append(info);
          article.append(counterPrice);
          counterPrice.prepend(counter);
          counterPrice.append(totalPrice);
          counter.prepend(divMinus);
          counter.append(divInput);
          counter.append(divPlus);
          divInput.prepend(input);
          totalPrice.prepend(price);
  
          img.src= imgMain.src;
          h4.innerHTML = name.textContent;
          info.innerHTML = "Сажанецов: <br><span>100 штук</span>";
          divMinus.innerHTML = "-";
          divPlus.innerHTML = "+";
          price.innerHTML = "Цена: " + newPrice.textContent;
          input.value = "1";
  
          mainPrice();
          handleCounterButtons(target, article, newPrice);
        }
    });
});

}

function handleCounterButtons(targ, article, newPrice) {
const counter = article.querySelector('[data-counter]');
if(counter){
counter.addEventListener('click', e =>{
const target = e.target;

      if(target.closest('.counter__button')) {
          let value = parseInt(target.closest('.counter').querySelector('input').value);
          const priceText = article.querySelector('.counter__price').querySelector('.total-price').querySelector('p');
          const info = article.querySelector('.info-product').querySelector('p');
          const price = parseInt(newPrice.textContent.match(/\d+/g).join(""));

          if(target.classList.contains('counter__button_plus')){
              value++;
          } else{
              --value;
          }

          if(value <= 0) {
            --productsCount;
            if(productsCount == 0){
              let articleNone = document.createElement('article');
              let pNone = document.createElement('p');

              articleNone.className = "basket-product basket-product__none";
              pNone.className = "basket-none ";

              basketBox.prepend(articleNone);
              articleNone.append(pNone);

              pNone.innerHTML = "Корзина пуста"
            }

            targ.className = "btn";
            article.remove();
          } 

          if(value >= 10){
            value = 10;
            target.closest('.counter').querySelector('.counter__button_plus').classList.add("disabled");
          } else {
            target.closest('.counter').querySelector('.counter__button_plus').classList.remove("disabled");
          }

          priceText.innerHTML = "Цена: "+ (price*value).toLocaleString() + " ₽";
          info.innerHTML = "Сажанецов: <br><span>"+ 100*value +" штук</span>";
          target.closest('.counter').querySelector('input').value = value;
          mainPrice();
      }
  })
}

}

function mainPrice(){
  let totalPrice = 0;
  const priceElements = document.querySelectorAll('article .counter__price .total-price p');
  const resultPriceElement = document.querySelector('.result-price');

  priceElements.forEach((resultPriceElement) => {
    const priceString = resultPriceElement.textContent.match(/\d+/g).join("");
    const price = parseInt(priceString);
    totalPrice += price;
  })
  resultPriceElement.innerHTML = "Итог: <span>"+ totalPrice.toLocaleString() +" ₽</span>";
}
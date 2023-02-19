// 產品陣列
axios
  .get("https://json-server-vercel-ashen.vercel.app/productData")
  .then((res) => {
    console.log(res.data);
    const productData = res.data;
    console.log(productData);
    //--------------------------------------------
    const cartBtn = document.querySelector("#cartBtn");
    const mySidenav = document.querySelector("#mySidenav");

    const closBtn = document.querySelector(".closebtn");

    cartBtn.addEventListener("click", function (e) {
      mySidenav.style.display = "block";
    });
    closBtn.addEventListener("click", function (e) {
      mySidenav.style.display = "none";
    });
    // -------------------------------------------

    // 取得addtocart的DOM
    const addToCartBtn = document.querySelectorAll(".addToCart");
    // 宣告購物車清單
    let cart;
    // 確認購物車內是否已經有資料
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);
    } else {
      cart = [];
    }
    console.log(cart);

    // 監聽add to cart btn
    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const id = e.target.dataset.id;
        console.log(id);
        let addedProduct;
        productData.forEach(function (item) {
          if (item.id == id) {
            addedProduct = item;
          }
        });
        const title = addedProduct.title;
        const price = addedProduct.price;
        const imgUrl = addedProduct.imgUrl;
        console.log(title, price, imgUrl);

        let targetItem = cart.find(function (item) {
          return item.id === id;
        });

        console.log(targetItem);

        if (targetItem) {
          targetItem.quantity += 1;
        } else {
          cart.push({
            id,
            title,
            price,
            imgUrl,
            quantity: 1,
          });
        }

        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      });
    });

    const cartRenderArea = document.querySelector(".cartRenderArea");
    // 監聽整個購物車渲染區域
    cartRenderArea.addEventListener("click", function (event) {
      const id = event.target.dataset.id;
      console.log(id);
      if (event.target.matches(".addQty")) {
        addQty(id);
        updateCart();
      } else if (event.target.matches(".minusQty")) {
        minusQty(id);
        updateCart();
      } else if (event.target.matches(".deleteBtn")) {
        deleteCartItem(id);
        updateCart();
      }
    });
    // 數量增加
    function addQty(id) {
      cart.forEach(function (item, index) {
        if (item.id === id) {
          cart[index].quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }
    // 數量減少
    function minusQty(id) {
      cart.forEach(function (item, index) {
        if (item.id === id) {
          if (cart[index].quantity === 1) {
            alert("Order quantity cannot be 0.");
            return;
          }
          cart[index].quantity--;
          if (cart[index].quantity === 0) {
            alert("Order quantity cannot be 0.");
            return;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }

    // 刪除購物車項目
    function deleteCartItem(id) {
      cart.forEach(function (item, index) {
        if (item.id === id) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }

    // 更新購物車
    function updateCart() {
      console.log("updateCart");
      let cartTemp = "";
      let total = 0;
      const subtotal = document.querySelector(".subtotal");
      // let cart = JSON.parse(localStorage.getItem("cart"));
      // console.log(cart);

      // 先將購物車列表清空
      document.querySelector(".cartRenderArea").innerHTML = "";
      // 重新渲染購物車
      cart.forEach(function (item) {
        cartTemp += `<tr>
      <td>
        <div class="cartItem-title">
          <img src="${item.imgUrl}" alt="${item.title}" />
          <p>${item.title}</p>
        </div>
      </td>
      <td>${item.price}</td>
      <td class="qty_ctrl">
        <a href="#" class='minusQty' data-id=${item.id}>-</a>
        <a class="qty">${item.quantity}</a>
        <a href="#" class='addQty' data-id=${item.id}>+</a>
      </td>
      <td>${item.price * item.quantity}</td>
      <td class="discardBtn_side">
        <i class="fa-solid fa-trash-can deleteBtn" data-id=${item.id}></i>
      </td>
    </tr>`;
        total += item.price * item.quantity;
      });
      document.querySelector(".cartRenderArea").innerHTML = cartTemp;
      subtotal.textContent = total;
    }
    updateCart();
  });

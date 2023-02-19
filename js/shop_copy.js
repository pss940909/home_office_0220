window.onload = function () {
  AOS.init();
  // 取得產品id
  let id = location.href.split("=")[1].charAt(0);
  console.log(id); // str

  // 產品渲染區域DOM
  const productRenderPanel = document.querySelector(".product_main");
  console.log(productRenderPanel);

  const cartBtn = document.querySelector("#cartBtn");
  const mySidenav = document.querySelector("#mySidenav");

  const closBtn = document.querySelector(".closebtn");

  cartBtn.addEventListener("click", function (e) {
    mySidenav.style.display = "block";
  });
  closBtn.addEventListener("click", function (e) {
    mySidenav.style.display = "none";
  });

  axios
    .get(`https://json-server-vercel-ashen.vercel.app/productData`)
    .then((res) => {
      // axios 取得產品陣列
      const productData = res.data;
      console.log(productData);

      // 取得當前產品資訊
      let current_product;
      productData.forEach(function (item) {
        if (item.id == id) {
          current_product = item;
        }
      });
      console.log(current_product);
      let product_qty = 1;
      let productTemp = `<div class="product_img"><img src="${current_product.imgUrl}" alt="" width='500'/></div>
    <div class="product_text">
      <h3 class="product_title">${current_product.title}</h3>
      <h3 class="product__item_price">$${current_product.price}</h3>
      <ul class="product_details">
        <li>Dimensions: $${current_product.dimensions}</li>
        <li>Color: ${current_product.color}</li>
        <li>
          Material: ${current_product.material}
        </li>
        <li>Assembly Required:${current_product.assembly_required}</li>
      </ul>
      <ul class="product_qty">
        <li>
          <a href="#" class='minusqty'>-</a>
        </li>
        <li class='qty'>${product_qty}</li>
        <li>
          <a href="#" class='addqty'>+</a>
        </li>
      </ul>
      <a href="#" class="add_to_cart_btn">Add to Cart</a>
    </div>`;
      // 當前產品分頁渲染
      productRenderPanel.innerHTML = productTemp;

      // 數量增加
      document.addEventListener("click", function (e) {
        if (e.target.matches(".addqty")) {
          console.log("add");
          e.preventDefault();
          product_qty++;
          console.log(product_qty);

          let productTemp = `<div class="product_img"><img src="${current_product.imgUrl}" alt="" width='500'/></div>
          <!-- 右側產品內容 -->
          <div class="product_text">
            <h3 class="product_title">${current_product.title}</h3>
            <h3 class="product__item_price">$${current_product.price}</h3>
            <ul class="product_details">
              <li>Dimensions: $${current_product.dimensions}</li>
              <li>Color: ${current_product.color}</li>
              <li>
                Material: ${current_product.material}
              </li>
              <li>Assembly Required:${current_product.assembly_required}</li>
            </ul>
            <ul class="product_qty">
              <li>
                <a href="#" class='minusqty'>-</a>
              </li>
              <li class='qty'>${product_qty}</li>
              <li>
                <a href="#" class='addqty'>+</a>
              </li>
            </ul>
            <a href="#" class="add_to_cart_btn">Add to Cart</a>
          </div>`;
          productRenderPanel.innerHTML = productTemp;
        }
      });
      // 數量減少
      document.addEventListener("click", function (e) {
        if (e.target.matches(".minusqty")) {
          console.log("minus");
          e.preventDefault();
          if (product_qty == 1) {
            alert("Order quantity cannot be 0");
            return;
          }
          product_qty--;
          console.log(product_qty);
          let productTemp = `<div class="product_img"><img src="${current_product.imgUrl}" alt="" width='500'/></div>
  <!-- 右側產品內容 -->
  <div class="product_text">
    <h3 class="product_title">${current_product.title}</h3>
    <h3 class="product__item_price">$${current_product.price}</h3>
    <ul class="product_details">
      <li>Dimensions: $${current_product.dimensions}</li>
      <li>Color: ${current_product.color}</li>
      <li>
        Material: ${current_product.material}
      </li>
      <li>Assembly Required:${current_product.assembly_required}</li>
    </ul>
    <ul class="product_qty">
      <li>
        <a href="#" class='minusqty'>-</a>
      </li>
      <li class='qty'>${product_qty}</li>
      <li>
        <a href="#" class='addqty'>+</a>
      </li>
    </ul>
    <a href="#" class="add_to_cart_btn">Add to Cart</a>
  </div>`;
          productRenderPanel.innerHTML = productTemp;
        }
      });

      // 點擊加入購物車按鈕
      document.addEventListener("click", function (e) {
        if (e.target.matches(".add_to_cart_btn")) {
          e.preventDefault();
          swal("Great!", "Item added to your cart!", "success");
          console.log(product_qty);
          console.log(cart);
          console.log(typeof id.charAt(0));

          let targetItem = cart.find(function (item) {
            return item.id == id.charAt(0);
          });
          console.log(targetItem);
          if (targetItem) {
            targetItem.quantity += product_qty;
          } else {
            cart.push({
              id: id.charAt(0),
              title: current_product.title,
              price: current_product.price,
              imgUrl: current_product.imgUrl,
              quantity: product_qty,
            });
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart();
        }
      });
      // -------------------------------

      // 宣告購物車清單
      let cart;
      console.log(cart);

      // 確認購物車內是否已經有資料
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
      } else {
        cart = [];
      }
      console.log(cart);
      // 嚴選商品
      // filter價格>30000
      const selected_item = res.data.filter(function (item) {
        return item.price > 30000;
      });
      console.log(selected_item);
      const other_prodcut_list = document.querySelector(".other_prodcut_list");
      console.log(other_prodcut_list);
      let other_productTemp = "";
      selected_item.forEach(function (item) {
        other_productTemp += ` <li>
          <a href="shop_copy.html?id=${item.id}">
            <img src="${item.imgUrl}" alt="" />
          </a>
          <i class="fa-solid fa-cart-plus fa-xl addToCartIcon" data-id='${item.id}'></i>
          <div class="other_product_des">
            <a href="#">
              <h4 class="other_product_name">${item.title}</h4>
            </a>
            <p class="other_product_price">${item.price}</p>
          </div>
        </li>`;
      });
      // 渲染嚴選商品
      other_prodcut_list.innerHTML = other_productTemp;

      document.addEventListener("click", function (e) {
        if (e.target.matches(".addToCartIcon")) {
          console.log("ok");
          // alert
          swal({
            title: "Awesome!",
            text: "Item added to your cart!",
            icon: "success",
          });
          // 取得商品id
          const id = e.target.dataset.id;
          console.log(id);
          let addedProduct;
          selected_item.forEach(function (item) {
            if (item.id == id) {
              addedProduct = item;
            }
          });
          console.log(addedProduct);
          // 取得title, price, 商品圖 for 側邊購物車
          const title = addedProduct.title;
          const price = addedProduct.price;
          const imgUrl = addedProduct.imgUrl;
          console.log(title, price, imgUrl);

          //看購物車裡是否有此項產品
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
        }
      });

      // ------------------------
      const cartRenderArea = document.querySelector(".cartRenderArea");
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
        <img src="${item.imgUrl}" alt="" />
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
};

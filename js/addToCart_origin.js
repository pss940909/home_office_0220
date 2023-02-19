// 產品陣列
const productData = [
  {
    id: 1,
    title: "Classic Sofa",
    color: "Ivory",
    material:
      "Construction - Kiln-Dried Wood And Poly Fill Cushions. Fabric - 95% Polyester, 5% Linen.",
    assembly_required: "No",
    origin_price: 23999,
    price: 21000,
    dimensions: '39"H x 81"W x 35"D',
    imgUrl: "../img/product4.jpg",
    category: "sofa",
  },
  {
    id: 2,
    title: "Modern Sofa, Ocean Velvet",
    color: "blue",
    material:
      "Construction - Kiln-Dried Wood And Poly Fill Cushions; Powdercoated Steel Legs. Fabric - 100% Polyester.",
    assembly_required: "No",
    origin_price: 27999,
    price: 25000,
    dimensions: '32"H X 89"W X 33.5"D',
    imgUrl: "../img/product2.jpg",
    category: "sofa",
  },
  {
    id: 3,
    title: "Carleton 81 Square Arm Sofa",
    color: "Durango Marine",
    material: "leather.",
    assembly_required: "No",
    origin_price: 45999,
    price: 42000,
    dimensions: '36"H X 81"W X 39"D',
    imgUrl: "../img/product3.jpg",
    category: "sofa",
  },
  {
    id: 4,
    title: "Kaila Sofa",
    color: "Reese Fog",
    material: "polyester",
    assembly_required: "No",
    origin_price: 32999,
    price: 31000,
    dimensions: "33'' H x 91'' W x 39'' D",
    imgUrl: "../img/product1.jpg",
    category: "sofa",
  },
  {
    id: 5,
    title: "Industrial Storage Modular Desk",
    color: "black",
    material: "Wood, Metal",
    assembly_required: "No",
    origin_price: 35999,
    price: 35000,
    dimensions: '64"H x 64"W x 35"D',
    imgUrl: "../img/product5.jpg",
    category: "desk",
  },
  {
    id: 6,
    title: "Rosamonde Desk",
    color: "Natural,Brown",
    material: "Wood, Metal",
    assembly_required: "No",
    origin_price: 31999,
    price: 30000,
    dimensions: '39"H x 81"W x 35"D',
    imgUrl: "../img/product6.jpg",
    category: "desk",
  },
  {
    id: 7,
    title: "Stacia Upholstered Side Chair",
    color: "black",
    material: "Wood, Metal",
    assembly_required: "No",
    origin_price: 12999,
    price: 12000,
    dimensions: '32"H x 20"W x 35"D',
    imgUrl: "../img/product7.jpg",
    category: "chair",
  },
  {
    id: 8,
    title: "Lombok Wooden Chair",
    color: "Natural",
    material: "Locally Sourced Wood",
    assembly_required: "No",
    origin_price: 15999,
    price: 15000,
    dimensions: '35"H x 25"W x 35"D',
    imgUrl: "../img/product8.jpg",
    category: "chair",
  },
  {
    id: 9,
    title: "Sydney Morgan Velvet Chair",
    color: "Gray",
    material: "Velvet",
    assembly_required: "No",
    origin_price: 18999,
    price: 18000,
    dimensions: '29.5"W X 31.9"D X 34"H',
    imgUrl: "../img/product9.jpg",
    category: "chair",
  },
];

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

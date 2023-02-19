const imgPanel = document.querySelector(".portfolio_main");
const img_modal = document.querySelector(".img_modal");
const lightbox_el = document.getElementById("lightbox");

const imgData = [
  {
    id: 1,
    imgUrl: "img/port1.jpg",
    category: "meeting room",
    title: "Woh Medical",
    area: "50P",
    project_leader: "Mike Chang",
    project_year: 2022,
  },
  {
    id: 2,
    imgUrl: "img/port2.jpg",
    category: "meeting room",
    title: "Neo East",
    area: "60P",
    project_leader: "Mike Chang",
    project_year: 2020,
  },
  {
    id: 3,
    imgUrl: "img/port3.jpg",
    category: "meeting room",
    title: "LaRe Limited",
    area: "100P",
    project_leader: "John Chen",
    project_year: 2021,
  },
  {
    id: 4,
    imgUrl: "img/port2_1.jpg",
    category: "office",
    title: "Grip Limited",
    area: "250P",
    project_leader: "John Chen",
    project_year: 2022,
  },
  {
    id: 5,
    imgUrl: "img/port2_2.jpg",
    category: "office",
    title: "Mosaic US",
    area: "500P",
    project_leader: "May Cho",
    project_year: 2018,
  },
  {
    id: 6,
    imgUrl: "img/port2_3.jpg",
    category: "office",
    title: "SGSCO",
    area: "300P",
    project_leader: "May Cho",
    project_year: 2018,
  },
  {
    id: 7,
    imgUrl: "img/port3_1.jpg",
    category: "staff lounge",
    title: "Grip Limited",
    area: "80P",
    project_leader: "May Cho",
    project_year: 2015,
  },
  {
    id: 8,
    imgUrl: "img/port3_2.jpg",
    category: "staff lounge",
    title: "DEF Limited",
    area: "80P",
    project_leader: "John Chen",
    project_year: 2019,
  },
  {
    id: 9,
    imgUrl: "img/port3_3.jpg",
    category: "staff lounge",
    title: "SGSCO",
    area: "80P",
    project_leader: "Mike Chang",
    project_year: 2016,
  },
];

//監聽圖片點擊事件 => 燈箱彈出
imgPanel.addEventListener("click", function (e) {
  //   console.log(e.target.nodeName);
  //   console.log(e.target.getAttribute("src"));
  let click_id = parseInt(e.target.getAttribute("data-id"));
  console.log(click_id);
  console.log(typeof click_id);
  let str = "";
  imgData.forEach(function (item) {
    if (click_id === item.id) {
      str = `  <article data-id=${item.id}>
      <div class="modal_img">
        <img src="${item.imgUrl}" alt="" />
      </div>
      <div class="modal_content">
        <img src="img/btn_modal_close.png" alt="" class="btn_modal_close" />
        <h3 class="modal_title">${item.title}</h3>
        <div class="modal_text">
          <p>
            <i class="fa-regular fa-calendar"></i>
            PROJECT YEAR
            <br />
            <span>${item.project_year}</span>
          </p>
          <p>
            <i class="fa-solid fa-house"></i>
            AREA
            <br />
            <span>${item.area}</span>
          </p>
          <p>
            <i class="fa-solid fa-user"></i>
            PROJECT LEADER
            <br />
            <span>${item.project_leader}</span>
          </p>
          <p>
            <i class="fa-solid fa-tag"></i>
            ${item.category}
          </p>
        </div>
      </div>
    </article>`;
      lightbox_el.innerHTML = str;
      lightbox_el.classList.remove("none");
    }
  });
});

// 點擊tab效果

$(".filter_category").on("click", function () {
  $(".filter_category").removeClass("active");
  $(this).addClass("active");
});

// 點擊按鈕關閉
const btn_modal_close = document.getElementsByClassName("btn_modal_close")[0];

btn_modal_close.addEventListener("click", function () {
  lightbox_el.classList.add("none");
});
// 整個燈箱關閉
lightbox_el.addEventListener("click", function () {
  this.classList.add("none");
  console.log(this);
});

// 點擊 lightbox 中的白色區域，不會關掉 modal
lightbox_el.querySelector("article").addEventListener("click", function (e) {
  e.stopPropagation(); // 冒泡事件
});

//----------------側邊選單篩選事件---------------
// 按鈕DOM
const all = document.querySelector("#all");
const meetingRoom = document.querySelector(" #meetingRoom");
const office = document.querySelector("#office");
const staffLounge = document.querySelector("#staffLounge");
// grid DOM
const grid1 = document.querySelector(".grid1");
const grid2 = document.querySelector(".grid2");
const grid3 = document.querySelector(".grid3");

// 監聽meeting room 分頁點擊事件
all.addEventListener("click", function (e) {
  grid1.classList.remove("none");
  grid2.classList.remove("none");
  grid3.classList.remove("none");
  grid1.classList.toggle("margin_bottom");
  grid2.classList.toggle("margin_bottom");
  grid3.classList.toggle("margin_bottom");
});
meetingRoom.addEventListener("click", function (e) {
  grid1.classList.remove("none");
  grid1.classList.add("margin_bottom");
  grid2.classList.add("none");
  grid3.classList.add("none");
});
office.addEventListener("click", function (e) {
  grid1.classList.add("none");
  grid2.classList.remove("none");
  grid3.classList.add("none");
  grid2.classList.add("margin_bottom");
});
staffLounge.addEventListener("click", function (e) {
  grid1.classList.add("none");
  grid2.classList.add("none");
  grid3.classList.remove("none");
  grid3.classList.add("margin_bottom");
});

const grid_panel = document.querySelector(".grid");

const newsData = [
  {
    id: "1",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/left_news.jpg",
    date: "2023.01.14",
  },
  {
    id: "2",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/right_news.jpg",
    date: "2023.01.14",
  },
  {
    id: "3",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news3.jpg",
    date: "2023.01.14",
  },
  {
    id: "4",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news4.jpg",
    date: "2023.01.14",
  },
  {
    id: "5",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news5.jpg",
    date: "2023.01.14",
  },
  {
    id: "6",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news6.jpg",
    date: "2023.01.14",
  },
  {
    id: "7",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news7.jpg",
    date: "2023.01.14",
  },
  {
    id: "8",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news8.jpg",
    date: "2023.01.14",
  },
  {
    id: "9",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news9.jpg",
    date: "2023.01.14",
  },
  {
    id: "10",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news10.jpg",
    date: "2023.01.14",
  },
  {
    id: "11",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news11.jpg",
    date: "2023.01.14",
  },
  {
    id: "12",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news3.jpg",
    date: "2023.01.14",
  },
  {
    id: "13",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/left_news.jpg",
    date: "2023.01.14",
  },
  {
    id: "14",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news6.jpg",
    date: "2023.01.14",
  },
  {
    id: "15",
    title: "Style your Office, and your Mind.",
    imgUrl: "img/news7.jpg",
    date: "2023.01.14",
  },
];

let str = newsData
  .map(
    (item) => `<div class="grid-item" data-id=${item.id}>
<img src="${item.imgUrl}" alt="${item.title}" class='newsLink'/>

<div class="card-content">
  <p class="date">${item.date}</p>
  <h3>${item.title}</h3>
</div>
</div>`
  )
  .join("");
grid_panel.innerHTML = str;

window.onload = function () {
  // element argument can be a selector string
  //   for an individual element
  let elem = document.querySelector(".grid");
  let msnry = new Masonry(elem, {
    itemSelector: ".grid-item",
    percentPosition: true,
  });
  AOS.init();
};

// -------------------- AOS --------------------

const newsLink = document.querySelectorAll(".newsLink");
console.log(newsLink);

function newsLinktoPage() {
  newsLink.forEach(function (item) {
    item.addEventListener("click", function () {
      window.location = "news_item.html";
    });
  });
}

newsLinktoPage();

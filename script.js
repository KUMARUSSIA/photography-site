const config = window.PHOTO_SITE_CONFIG || {};
const imageBaseUrl = (config.imageBaseUrl || "").replace(/\/$/, "");

const photos = [
  {
    title: "Urban Light",
    album: "城市",
    year: "2026",
    file: "/sample/urban-light-1200.webp",
    ratio: "4 / 5",
  },
  {
    title: "Quiet Portrait",
    album: "人像",
    year: "2026",
    file: "/sample/quiet-portrait-1200.webp",
    ratio: "3 / 4",
  },
  {
    title: "After Rain",
    album: "街拍",
    year: "2025",
    file: "/sample/after-rain-1200.webp",
    ratio: "5 / 4",
  },
  {
    title: "Concrete Edge",
    album: "建筑",
    year: "2025",
    file: "/sample/concrete-edge-1200.webp",
    ratio: "4 / 3",
  },
  {
    title: "Evening Walk",
    album: "旅行",
    year: "2024",
    file: "/sample/evening-walk-1200.webp",
    ratio: "2 / 3",
  },
  {
    title: "Studio Study",
    album: "商业",
    year: "2024",
    file: "/sample/studio-study-1200.webp",
    ratio: "1 / 1",
  },
];

const albums = [
  {
    title: "人像 Portraits",
    description: "个人肖像、环境人像与编辑类拍摄。",
    cover: "/sample/quiet-portrait-1200.webp",
  },
  {
    title: "城市 City",
    description: "街道、建筑、夜景与城市切片。",
    cover: "/sample/urban-light-1200.webp",
  },
  {
    title: "项目 Projects",
    description: "长期观察、委托拍摄和完整专题。",
    cover: "/sample/concrete-edge-1200.webp",
  },
];

function imageUrl(file) {
  if (/^https?:\/\//.test(file)) return file;
  return `${imageBaseUrl}${file}`;
}

function placeholder(node, label) {
  node.removeAttribute("src");
  node.alt = label;
  node.style.background = "linear-gradient(135deg, #d8d2c8, #87938d)";
}

function mountHero() {
  const heroImage = document.querySelector("#heroImage");
  const first = photos[0];
  heroImage.src = imageUrl(first.file);
  heroImage.alt = first.title;
  heroImage.onerror = () => placeholder(heroImage, "请上传首页封面图");
}

function mountPhotos() {
  const masonry = document.querySelector("#work");
  masonry.innerHTML = photos
    .map(
      (photo, index) => `
        <button class="photo-card" style="--ratio:${photo.ratio}" data-index="${index}">
          <img src="${imageUrl(photo.file)}" alt="${photo.title}" loading="lazy" />
          <span class="photo-meta">
            <strong>${photo.title}</strong>
            <span>${photo.album} · ${photo.year}</span>
          </span>
        </button>
      `,
    )
    .join("");

  masonry.querySelectorAll("img").forEach((img) => {
    img.onerror = () => placeholder(img, "请上传作品图片");
  });

  masonry.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(photos[card.dataset.index]));
  });
}

function mountAlbums() {
  const grid = document.querySelector("#albumGrid");
  grid.innerHTML = albums
    .map(
      (album) => `
        <article class="album-card">
          <img src="${imageUrl(album.cover)}" alt="${album.title}" loading="lazy" />
          <div>
            <h3>${album.title}</h3>
            <p>${album.description}</p>
          </div>
        </article>
      `,
    )
    .join("");

  grid.querySelectorAll("img").forEach((img) => {
    img.onerror = () => placeholder(img, "请上传相册封面");
  });
}

function openLightbox(photo) {
  const dialog = document.querySelector("#lightbox");
  const image = document.querySelector("#lightboxImage");
  const caption = document.querySelector("#lightboxCaption");
  image.src = imageUrl(photo.file);
  image.alt = photo.title;
  caption.textContent = `${photo.title} / ${photo.album} / ${photo.year}`;
  if (typeof dialog.showModal === "function") dialog.showModal();
}

document.querySelector("#closeLightbox").addEventListener("click", () => {
  document.querySelector("#lightbox").close();
});

document.querySelector("#year").textContent = new Date().getFullYear();

mountHero();
mountPhotos();
mountAlbums();

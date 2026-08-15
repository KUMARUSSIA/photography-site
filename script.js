const config = window.PHOTO_SITE_CONFIG || {};
const imageBaseUrl = (config.imageBaseUrl || "").replace(/\/$/, "");

const groups = [
  {
    id: "digitalColor",
    title: "数码摄影 / 彩色摄影",
    items: [
      { title: "Urban Light", year: "2026", file: "public-images/digital/color-01.webp", ratio: "4 / 5" },
      { title: "Street Motion", year: "2025", file: "public-images/digital/color-02.webp", ratio: "3 / 4" },
    ],
  },
  {
    id: "digitalMono",
    title: "数码摄影 / 黑白摄影",
    items: [
      { title: "Quiet Portrait", year: "2026", file: "public-images/digital/mono-01.webp", ratio: "3 / 4" },
      { title: "Concrete Edge", year: "2025", file: "public-images/digital/mono-02.webp", ratio: "4 / 5" },
    ],
  },
  {
    id: "filmColor",
    title: "胶卷摄影 / 彩色摄影",
    items: [
      { title: "After Rain", year: "2025", file: "public-images/film/color-01.webp", ratio: "5 / 4" },
      { title: "Evening Walk", year: "2024", file: "public-images/film/color-02.webp", ratio: "2 / 3" },
    ],
  },
  {
    id: "filmMono",
    title: "胶卷摄影 / 黑白摄影",
    items: [
      { title: "Shadow Study", year: "2024", file: "public-images/film/mono-01.webp", ratio: "4 / 3" },
      { title: "Window Frame", year: "2024", file: "public-images/film/mono-02.webp", ratio: "1 / 1" },
    ],
  },
  {
    id: "projectGrid",
    title: "项目摄影",
    items: [
      { title: "Editorial Set", year: "2026", file: "public-images/project/project-01.webp", ratio: "4 / 5" },
      { title: "Long Term Study", year: "2025", file: "public-images/project/project-02.webp", ratio: "3 / 4" },
      { title: "Commission Work", year: "2025", file: "public-images/project/project-03.webp", ratio: "5 / 4" },
    ],
  },
];

function imageUrl(file) {
  if (/^https?:\/\//i.test(file) || file.startsWith("data:")) return file;
  if (!imageBaseUrl || imageBaseUrl === "./") return `./${file}`;
  return `${imageBaseUrl.replace(/\/$/, "")}/${file.replace(/^\//, "")}`;
}

function placeholder(node, label) {
  node.removeAttribute("src");
  node.alt = label;
  node.style.background = "linear-gradient(135deg, #d8d2c8, #87938d)";
}

function renderHero() {
  const heroImage = document.querySelector("#heroImage");
  const first = groups[0].items[0];
  heroImage.src = imageUrl(first.file);
  heroImage.alt = first.title;
  heroImage.onerror = () => placeholder(heroImage, "请放入首页封面图");
}

function renderGroup(group) {
  const root = document.querySelector(`#${group.id}`);
  if (!root) return;
  root.innerHTML = group.items
    .map(
      (item, index) => `
        <button class="photo-card" style="--ratio:${item.ratio}" data-group="${group.id}" data-index="${index}">
          <img src="${imageUrl(item.file)}" alt="${item.title}" loading="lazy" />
          <span class="photo-meta">
            <strong>${item.title}</strong>
            <span>${group.title} · ${item.year}</span>
          </span>
        </button>
      `,
    )
    .join("");

  root.querySelectorAll("img").forEach((img) => {
    img.onerror = () => placeholder(img, "请放入作品图片");
  });

  root.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const groupData = groups.find((entry) => entry.id === card.dataset.group);
      const photo = groupData.items[Number(card.dataset.index)];
      openLightbox(photo, groupData.title);
    });
  });
}

function openLightbox(photo, groupTitle) {
  const dialog = document.querySelector("#lightbox");
  const image = document.querySelector("#lightboxImage");
  const caption = document.querySelector("#lightboxCaption");
  image.src = imageUrl(photo.file);
  image.alt = photo.title;
  caption.textContent = `${photo.title} / ${groupTitle} / ${photo.year}`;
  if (typeof dialog.showModal === "function") dialog.showModal();
}

document.querySelector("#closeLightbox").addEventListener("click", () => {
  document.querySelector("#lightbox").close();
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll(".photo-card img").forEach((img) => {
  img.onerror = () => placeholder(img, "请放入作品图片");
});

renderHero();
groups.forEach(renderGroup);

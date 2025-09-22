let bookPages = []; // Global list to store page counts

function loadBooks() {
  Papa.parse("includes/goodreads_library_export.csv", {
    download: true,
    header: true, // use first row as keys
    complete: function(results) {
      const data = results.data;

      bookPages = [];
      data.forEach(row => {
        const pages = parseInt(row["Number of Pages"]);
        const title = row["Title"] || "Unknown";
        if (pages) {
          bookPages.push({ pages: pages, title: title });
        }
      });

      displayRectangles();
    },
    error: function(err) {
      console.error("Error parsing CSV:", err);
    }
  });
}

function displayRectangles() {
  const list = document.getElementById("book-list");
  list.innerHTML = "";

  const maxPages = Math.max(...bookPages.map(book => book.pages));

  bookPages.forEach(book => {
    const li = document.createElement("li");
    const rectangle = document.createElement("div");
    rectangle.className = "book-rectangle";

    const maxHeight = 200;
    const height = (book.pages / maxPages) * maxHeight;
    rectangle.style.height = height + "px";

    rectangle.title = `${book.title} - ${book.pages} pages`;

    li.appendChild(rectangle);
    list.appendChild(li);
  });

  // Animate all rectangles with GSAP stagger when the grid scrolls into view
  gsap.from(".book-rectangle", {
    scrollTrigger: {
      trigger: "#book-list",
      start: "top 80%",
    },
    scaleY: 0,
    transformOrigin: "bottom",
    duration: 1,
    ease: "power3.out",
    stagger: 0.05
  });
}

loadBooks();

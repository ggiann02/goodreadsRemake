// Utility: parse CSV (basic, assumes no commas inside quotes)
function parseCSV(text) {
  const rows = text.split("\n").map(row => row.split(","));
  return rows;
}

function loadBooks() {
  fetch("goodreads_library_export.csv")
    .then(res => res.text())
    .then(text => {
      const data = parseCSV(text);

      // Goodreads CSV has a header row — "Title" is usually column 1
      const header = data[0];
      const titleIndex = header.indexOf("Title");

      if (titleIndex === -1) {
        console.error("Couldn't find 'Title' column in CSV");
        return;
      }

      const list = document.getElementById("book-list");
      list.innerHTML = "";

      // Skip header row
      data.slice(1).forEach(row => {
        if (row[titleIndex]) {
          const li = document.createElement("li");
          li.textContent = row[titleIndex];
          list.appendChild(li);
        }
      });
    })
    .catch(err => console.error("Error loading CSV:", err));
}

loadBooks();

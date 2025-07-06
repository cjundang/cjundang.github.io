let csvData = [];

// Load and parse CSV
document.getElementById('csvFileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      csvData = results.data;
      console.log("CSV Loaded", csvData);
      displayResults(csvData); // Show all by default
    }
  });
});

// Search function
function searchCSV() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = csvData.filter(row => {
    return Object.values(row).some(
      value => value.toLowerCase().includes(query)
    );
  });
  displayResults(filtered);
}

// Display results in HTML table
function displayResults(data) {
  const table = document.getElementById('resultsTable');
  table.innerHTML = ""; // Clear table

  if (data.length === 0) {
    table.innerHTML = "<tr><td colspan='8'>No results found.</td></tr>";
    return;
  }

  // Headers
  const headers = Object.keys(data[0]);
  const headerRow = table.insertRow();
  headers.forEach(header => {
    const cell = headerRow.insertCell();
    cell.textContent = header;
  });

  // Data Rows
  data.forEach(row => {
    const rowElement = table.insertRow();
    headers.forEach(header => {
      const cell = rowElement.insertCell();
      cell.textContent = row[header];
    });
  });
}

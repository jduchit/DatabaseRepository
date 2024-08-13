let data = []; // Variable to store the data from CSV

// Function to load data from CSV
function loadData() {
    fetch('https://raw.githubusercontent.com/jduchit/DatabaseRepository/631b0cac5b7723e836c56dfb7b558068f0835a5d/Data/OpenDataHrefsBases.csv')
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split('\n');
            const headers = rows[0].split(',');
            data = rows.slice(1).map(row => {
                const values = row.split(',');
                let obj = {};
                headers.forEach((header, index) => {
                    obj[header.trim()] = values[index].trim();
                });
                return obj;
            });
            displayData(data); // Call function to display data in table
        })
        .catch(error => console.error('Error loading CSV data:', error));
}

// Function to display data in the table
function displayData(data) {
    const resultsTableBody = document.querySelector('#resultsTable tbody');
    resultsTableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="${item.HrefBases}" target="_blank">${item.MetaTitle}</a></td>
            <td>${item.Author}</td>
            <td>${item['Last Update']}</td>
            <td>${item.Tags}</td>
        `;
        resultsTableBody.appendChild(row);
    });
}

// Function to perform search based on input and filters
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filters = {
        journal: document.getElementById('journal').checked,
        conference: document.getElementById('conference').checked,
        working: document.getElementById('working').checked,
        report: document.getElementById('report').checked,
        book: document.getElementById('book').checked,
        thesis: document.getElementById('thesis').checked,
    };

    const resultsTableBody = document.querySelector('#resultsTable tbody');
    resultsTableBody.innerHTML = '';

    const filteredResults = data.filter(item => {
        const matchesSearch = item.MetaTitle.toLowerCase().includes(searchInput) ||
            item.Author.toLowerCase().includes(searchInput) ||
            item.Tags.toLowerCase().includes(searchInput);
        const matchesFilter = (filters.journal && item.PublicationType === 'Journal Article') ||
            (filters.conference && item.PublicationType === 'Conference Paper') ||
            (filters.working && item.PublicationType === 'Working Paper') ||
            (filters.report && item.PublicationType === 'Report') ||
            (filters.book && item.PublicationType === 'Book/Chapter') ||
            (filters.thesis && item.PublicationType === 'Thesis/Dissertation');

        return matchesSearch && matchesFilter;
    });

    filteredResults.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="${item.HrefBases}" target="_blank">${item.MetaTitle}</a></td>
            <td>${item.Author}</td>
            <td>${item['Last Update']}</td>
            <td>${item.Tags}</td>
        `;
        resultsTableBody.appendChild(row);
    });
}

// Function to switch between languages
function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        element.innerText = element.getAttribute(`data-lang-${lang}`);
    });
}

// Load data from CSV file when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

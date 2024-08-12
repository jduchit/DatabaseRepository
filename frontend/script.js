let data = []; // Variable to store the data from Excel

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

// Load data from Excel file
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.xlsx')
        .then(response => response.arrayBuffer())
        .then(dataBuffer => {
            const workbook = XLSX.read(dataBuffer, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            data = XLSX.utils.sheet_to_json(worksheet);
        });
});
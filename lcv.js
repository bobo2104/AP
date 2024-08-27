document.addEventListener('DOMContentLoaded', function () {
    fetchLCVData();
});

async function fetchLCVData() {
    try {
        const response = await fetch('/api/lcv');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        displayLCVData(data);
    } catch (error) {
        console.error('Failed to fetch LCV market data:', error);
    }
}

function displayLCVData(data) {
    const container = document.getElementById('lcv-market-container');
    container.innerHTML = '';

    data.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'segment-row';
        row.innerHTML = `
            <strong>${item.year}</strong>: ${item.segment} - ${item.sales} units (${item.marketShare.toFixed(2)}%)
        `;
        container.appendChild(row);
    });
}

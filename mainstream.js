document.addEventListener('DOMContentLoaded', function () {
    fetchMainstreamData();
});

async function fetchMainstreamData() {
    try {
        const response = await fetch('/api/mainstream');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        displayMainstreamData(data);
    } catch (error) {
        console.error('Failed to fetch mainstream market data:', error);
    }
}

function displayMainstreamData(data) {
    const container = document.getElementById('mainstream-market-container');
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

document.addEventListener('DOMContentLoaded', function () {
    fetchRentalData();
});

async function fetchRentalData() {
    try {
        const response = await fetch('/api/rental');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        displayRentalData(data);
    } catch (error) {
        console.error('Failed to fetch rental market data:', error);
    }
}

function displayRentalData(data) {
    const container = document.getElementById('rental-market-container');
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

document.addEventListener('DOMContentLoaded', function () {
    fetchRetailData();
});

async function fetchRetailData() {
    try {
        const response = await fetch('/api/retail');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        displayRetailData(data);
    } catch (error) {
        console.error('Failed to fetch retail market data:', error);
    }
}

function displayRetailData(data) {
    const container = document.getElementById('retail-market-container');
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

document.addEventListener('DOMContentLoaded', function () {
    fetchPremiumData();
});

async function fetchPremiumData() {
    try {
        const response = await fetch('/api/premium');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        displayPremiumData(data);
    } catch (error) {
        console.error('Failed to fetch premium market data:', error);
    }
}

function displayPremiumData(data) {
    const container = document.getElementById('premium-market-container');
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

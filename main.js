Chart.register('chartjs-annotation');

function calculateY(x) {
    return 3 + 0.5 * Math.sin(1.2* x + 2) + 0.3 * Math.cos(1 * x) + 0.4 * Math.sin(0.7 * x - 3) + 0.2 * Math.cos(1.6 * x);
}

function calculateCappedY(x, floor, ceiling) {
    const y = calculateY(x);
    if (y < floor) {
        return floor;
    }
    if (y > ceiling) {
        return ceiling;
    }
    return y;
}

// Generate data points
const data = {
    labels: [

    ], // x values
    datasets: [{
        label: 'Market Price',
        data: [
        ], // y values
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
    },
    {
        label: 'Contract Price',
        data: [
        ], // y values
        fill: false,
        borderColor: 'rgb(192, 75, 75)',
        tension: 0.3,
        borderDash: [10, 15]
    }]
};

// Generate data points
const data1 = {
    labels: [

    ], // x values
    datasets: [{
        label: 'Market Price',
        data: [
        ], // y values
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
    },
    {
        label: 'Contract Price',
        data: [
        ], // y values
        fill: false,
        borderColor: 'rgb(192, 75, 75)',
        tension: 0.3,
        borderDash: [10, 15]
    }]
};

const data2 = {
    labels: [

    ], // x values
    datasets: [{
        label: 'Contract Price',
        data: [
        ], // y values
        fill: false,
        tension: 0.3,
        borderColor: 'rgb(192, 75, 75)',
        borderDash: [10, 15]
    },
    {
        label: 'Market Price',
        data: [
        ], // y values
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
    }]
};

console.log(data)

// Populate data points
for (let x = -10; x <= 10; x += 0.5) {
    data.labels.push(
        new Date(Date.now() + x * 3600 * 24 * 2000).toDateString()
    );
    data1.labels.push(
        new Date(Date.now() + x * 3600 * 24 * 2000).toDateString()
    );
    data2.labels.push(
        new Date(Date.now() + x * 3600 * 24 * 2000).toDateString()
    );
    data.datasets[0].data.push(calculateY(x));
    data.datasets[1].data.push(calculateY(x) - 0.25);
    data1.datasets[0].data.push(calculateY(x));
    data1.datasets[1].data.push(calculateY(-10));
    data2.datasets[1].data.push(calculateY(x));
    data2.datasets[0].data.push(calculateCappedY(x, 2.2, 3.4));
}

// Chart configuration
// Chart configuration
// Adjust the global default options
Chart.defaults.font.family = 'Arial, sans-serif';
Chart.defaults.font.size = 14;
Chart.defaults.color = '#666'; // Default font color for all text

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    display: false // Only display grid lines for the Y axis
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20 // Adjust based on your data to avoid clutter
                }
            },
            y: {
                max: 5,
                min: 1,
                title: {
                    display: true,
                    text: 'Gas Price (USD)',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    color: "#ddd" // Lighter grid lines
                }
            }
        },
        plugins: {
            legend: {
                position: 'top', // Adjust legend position
                labels: {
                    padding: 20, // Add some padding for legibility
                    usePointStyle: true, // Use point style for a cleaner look
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.8)', // Light background
                titleColor: '#333', // Darker color for the title
                bodyColor: '#666', // Default text color
                borderColor: '#ddd',
                borderWidth: 1,
                usePointStyle: true,
                boxPadding: 6 // Padding inside the tooltip
            }
        },
        elements: {
            line: {
                borderWidth: 2 // Thicker lines for better visibility
            },
            point: {
                radius: 3 // Larger points
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        maintainAspectRatio: false // Allows chart to be fully responsive
    }
};

//copy config
const config1 = JSON.parse(JSON.stringify(config));
config1.data = data1;

console.log(config1)
console.log(config)

const config2 = JSON.parse(JSON.stringify(config));
config2.options.plugins.annotation = {
    annotations: {
        line1: {
            type: 'line',
            yMin: 3.4,
            yMax: 3.4,
            borderColor: 'rgba(192, 75, 75, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
                enabled: true,
                content: 'Ceiling',
                position: 'end'
            }
        },
        line2: {
            type: 'line',
            yMin: 2.2,
            yMax: 2.2,
            borderColor: 'rgba(192, 75, 75, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
                enabled: true,
                content: 'Floor',
                position: 'end'
            }
        }
    }
}
config2.options.plugins.legend.reverse = true;
config2.data = data2;


// Render the chart
new Chart(document.getElementById('myChart'), config);
new Chart(document.getElementById('myChart2'), config1);
new Chart(document.getElementById('myChart3'), config2);
// remove element 1 of the initial dataset
data.datasets.pop();
new Chart(document.getElementById('myChart1'), config);
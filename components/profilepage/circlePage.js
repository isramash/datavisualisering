function circleDiagram() {
    let div = document.querySelector("#ProfilePage");
    let managerID = parseInt(div.className);

    //  Hämta DJ-ID:n för den här chefen

    let djIds = DJs.filter(dj => dj.managerID === managerID)
        .map(dj => dj.id);
    console.log("DJ IDs:", djIds);

    // Hämta cityID:n för konserterna som dessa DJs har gjort
    let cityIDs = Gigs.filter(gig => djIds.includes(gig.djID))
        .map(gig => gig.cityID);

    let totalGigs = cityIDs.length;

    console.log(totalGigs);
    console.log(cityIDs);

    // Räkna antal gigs per stad
    let cityGigCount = {}; // { cityID: antal gånger }

    cityIDs.forEach(cityID => {
        cityGigCount[cityID] = (cityGigCount[cityID] || 0) + 1;
    });
    console.log(cityGigCount);

    // Räkna antal gigs per kontinent baserat på städernas gigs
    let dataArray = [];

    for (const continent in citiesByContinent) {
        const cities = citiesByContinent[continent];
        console.log(cities);

        let count = 0;

        cities.forEach(city => {
            if (cityGigCount[city.id]) {
                count += cityGigCount[city.id];
                console.log(cityGigCount[city.id]);
            }
        });

        if (count > 0) {
            dataArray.push({ continent: continent, gigs: count });
        }
    }
    console.log(dataArray);
    drawPieWithD3(dataArray);
}

function drawPieWithD3(dataArray) {
    const width = 300;
    const height = 300;
    const svgWidth = 300;
    const svgHeight = 300;
    const radius = Math.min(width, height) / 2;

    const total = dataArray.reduce((sum, d) => sum + d.gigs, 0);

    const colors = d3.scaleOrdinal()
        .domain(dataArray.map(d => d.continent))
        .range(d3.schemeCategory10);

    const svg = d3.select("#circleDiagram")
        .append("svg")
        .attr("id", "d3chart")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${svgWidth / 2},${svgHeight / 2})`);

    const pie = d3.pie()
        .value(d => d.gigs);

    const data_ready = pie(dataArray);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => colors(d.data.continent))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px");

    svg.selectAll("text")
        .data(data_ready)
        .enter()
        .append("text")
        .text(d => {
            const percent = ((d.data.gigs / total) * 100).toFixed(1);
            return `${d.data.continent} (${percent}%)`;
        })
        .attr("transform", d => {
            const [x, y] = arc.centroid(d);
            const offset = 1.8;
            return `translate(${x * offset}, ${y * offset})`;
        })
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#fff");
}

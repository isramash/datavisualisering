function circleDiagram() {

    let div = document.querySelector("#ProfilePage");
    let managerID = parseInt(div.className);

    let djIds = DJs.filter(dj => dj.managerID === managerID)
        .map(dj => dj.id);

    let cityIDs = Gigs.filter(gig => djIds.includes(gig.djID))
        .map(gig => gig.cityID);

    let totalGigs = cityIDs.length;

    let cityGigCount = {};

    cityIDs.forEach(cityID => {
        cityGigCount[cityID] = (cityGigCount[cityID] || 0) + 1;
    });

    const continentColors = {
        Europe: "#E57373",
        NorthAmerica: "#FFA41D",
        SouthAmerica: "#716BE4",
        Africa: "#FF57CC",
        Oceania: "#90C547",
        Asia: "#6AE1D3"
    };

    let dataArray = [];

    for (const continent in citiesByContinent) {
        const cities = citiesByContinent[continent];

        let count = 0;

        cities.forEach(city => {
            if (cityGigCount[city.id]) {
                count += cityGigCount[city.id];
            }
        });

        if (count > 0) {
            dataArray.push({ continent: continent, gigs: count });
        }
    }
    drawPieWithD3(dataArray, continentColors);
    continentList(dataArray, continentColors)
}

function drawPieWithD3(dataArray, continentColors) {

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const total = dataArray.reduce((sum, d) => sum + d.gigs, 0);

    const svg = d3.select("#contentDiagram")
        .append("svg")
        .attr("id", "d3chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie()
        .value(d => d.gigs);

    const dataReady = pie(dataArray);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    svg.selectAll('path')
        .data(dataReady)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => continentColors[d.data.continent])
        .attr("stroke", "#fff")
        .style("stroke-width", "1px");

    svg.selectAll("text")
        .data(dataReady)
        .enter()
        .append("text")
        .text(d => {
            const percent = ((d.data.gigs / total) * 100).toFixed(1);
            return `${percent}%`;
        })
        .attr("transform", d => {
            const [x, y] = arc.centroid(d);
            const offset = 1.4;
            return `translate(${x * offset}, ${y * offset})`;
        })
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#fff")
        .style("font-family", "Arial, Helvetica, sans-serif");
}

function continentList(dataArray, continentColors) {

    const parentID = document.querySelector('#contentDiagram')
    const continentList = document.createElement('div');
    continentList.id = 'continentList';

    dataArray.forEach(continent => {
        const item = document.createElement("div");
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.marginBottom = "6px";

        const colorCircle = document.createElement("span");
        colorCircle.style.display = "inline-block";
        colorCircle.style.width = "12px";
        colorCircle.style.height = "12px";
        colorCircle.style.borderRadius = "50%";
        colorCircle.style.backgroundColor = continentColors[continent.continent];
        colorCircle.style.marginRight = "8px";

        const label = document.createElement("span");
        label.textContent = continent.continent;
        label.style.color = '#fff'
        label.style.fontSize = "16px";
        label.style.fontFamily = "Arial, Helvetica, sans-serif";

        parentID.append(continentList)
        item.appendChild(colorCircle);
        item.appendChild(label);
        continentList.appendChild(item);
    })
}
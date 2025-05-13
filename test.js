

const wSvg = 600, hSvg = 400,
  hViz = .8 * hSvg, wViz = .8 * wSvg,
  hPadding = (hSvg - hViz) / 2, wPadding = (wSvg - wViz) / 2
  ;

// Get the Dataset
const managerDataset = [];

for (let manager of Managers) {
  const managerID = manager.id;

  const dataset = {
    id: managerID,
    name: manager.name,
    managerEarnings: [],
    nGigs: [],
  };

  const djIDs = DJs
    .filter(dj => dj.managerID === managerID)
    .map(dj => dj.id);

  const managerGigs = Gigs.filter(g => djIDs.includes(g.djID));

  //  console.log(managerGigs);

  const earningsPerYearMap = {};
  const nGigsPerYearMap = {};
  console.log(earningsPerYearMap);

  console.log(nGigsPerYearMap);

  for (let gig of managerGigs) {
    const year = new Date(gig.date).getFullYear();

    earningsPerYearMap[year] = (earningsPerYearMap[year] || 0) + gig.managerEarnings;

    nGigsPerYearMap[year] = (nGigsPerYearMap[year] || 0) + 1;

  }
  // console.log(earningsPerYearMap);

  for (let year in earningsPerYearMap) {
    const totalEarnings = earningsPerYearMap[year];

    dataset.managerEarnings.push({
      year: parseInt(year),
      totalEarnings: totalEarnings
    });

    for (let year in nGigsPerYearMap) {
      const totalGigs = nGigsPerYearMap[year];
      dataset.nGigs.push({
        year: parseInt(year),
        totalGigs: totalGigs
      });
    }

  }

  //   console.log(earningsPerYearMap);

  managerDataset.push(dataset);

  //   console.log(dataset);

}
// console.log(managerDataset);

// Förbered en array med alla värden på X-skalan (months)
let years = [];
for (let year = 2015; year < 2025; year++) { years.push(year); }

console.log(years);

// Hitta max antal
let maxEarnings = 0;
let maxGigs = 0;

for (let dataset of managerDataset) {
  for (let point of dataset.managerEarnings) {
    maxEarnings = Math.max(maxEarnings, point.totalEarnings);
  }
  for (let point of dataset.nGigs) {
    maxGigs = Math.max(maxGigs, point.totalGigs);
  }


}

d3.select("main").append("div")
  .selectAll("div")
  .data(managerDataset)
  .enter()
  .append("button")
  .text(d => d.name)
  .on("click", (event, d) => {
    let line = d3.select(`#line_${d.id}`);
    let points = d3.selectAll(`#points_${d.id} .data-point`);

    let gigsLine = d3.select(`#gigsLine_${d.id}`);
    let gigsPoints = d3.selectAll(`#gigsPoints_${d.id} .gigs-point`);

    let visible = line.attr("visibility");
    let newValue = (visible == "hidden") ? "visible" : "hidden";

    d3.selectAll(".data-line").attr("visibility", "hidden");
    d3.selectAll(".data-point").attr("visibility", "hidden");

    d3.selectAll(".gigs-line").attr("visibility", "hidden");
    d3.selectAll(".gigs-point").attr("visibility", "hidden");

    let activeButton = document.querySelector("button.active");
    if (activeButton) activeButton.classList.remove("active")

    let classAction = newValue == "hidden" ? "remove" : "add";
    event.target.classList[classAction]("active");

    line.attr("visibility", newValue);
    points.attr("visibility", newValue);

    gigsLine.attr("visibility", newValue);
    gigsPoints.attr("visibility", newValue);
  })


const svg = d3.select("main").append("svg")
  .attr("width", wSvg)
  .attr("height", hSvg);

const svg2 = d3.select("main").append("svg")
  .attr("width", wSvg)
  .attr("height", hSvg);
//Skala
let xScale = d3.scaleBand().domain(years).range([wPadding, wPadding + wViz]);
let yScale = d3.scaleLinear().domain([0, maxEarnings]).range([hPadding + hViz, hPadding]);
let yScaleGigs = d3.scaleLinear().domain([0, maxGigs]).range([hPadding + hViz, hPadding]);

// x-axel
svg.append("g")
  .call(d3.axisBottom(xScale))
  .attr("transform", `translate(0, ${hPadding + hViz})`);

svg2.append("g")
  .call(d3.axisBottom(xScale))
  .attr("transform", `translate(0, ${hPadding + hViz})`);

// y-axel
svg.append("g")
  .call(d3.axisLeft(yScale))
  .attr("transform", `translate(${wPadding}, 0)`);

svg2.append("g")
  .call(d3.axisLeft(yScaleGigs))
  .attr("transform", `translate(${wPadding}, 0)`);


const dMaker = d3.line()
  .x(d => xScale(d.year) + xScale.bandwidth() / 2)
  .y(d => yScale(d.totalEarnings))

const dMakerGigs = d3.line()
  .x(d => xScale(d.year) + xScale.bandwidth() / 2)
  .y(d => yScaleGigs(d.totalGigs));


// skapa lines
svg.append("g")
  .selectAll("path")
  .data(managerDataset)
  .enter()
  .append("path")
  .attr("id", d => `line_${d.id}`)
  .attr("class", "data-line")
  .attr("d", d => dMaker(d.managerEarnings))
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("visibility", "hidden");

// skapa gigs lines
svg2.append("g")
  .selectAll("path")
  .data(managerDataset)
  .enter()
  .append("path")
  .attr("id", d => `gigsLine_${d.id}`)
  .attr("class", "gigs-line")
  .attr("d", d => dMakerGigs(d.nGigs))
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("visibility", "hidden");



// skapa points (circles)
svg.append("g")
  .selectAll("g")
  .data(managerDataset)
  .enter()
  .append("g")
  .attr("id", d => `points_${d.id}`)
  .selectAll("circle")
  .data(d => d.managerEarnings.map(p => ({ ...p, id: d.id })))
  .enter()
  .append("circle")
  .attr("class", "data-point")
  .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
  .attr("cy", d => yScale(d.totalEarnings))
  .attr("r", 4)
  .attr("fill", "red")
  .attr("visibility", "hidden");

//   // skapa gigs points
// svg2.append("g")
//   .selectAll("g")
//   .data(managerDataset)
//   .enter()
//   .append("g")
//   .attr("id", d => `gigsPoints_${d.id}`)
//   .selectAll("circle")
//   .data(d => d.nGigs.map(p => ({ ...p, id: d.id })))
//   .enter()
//   .append("circle")
//   .attr("class", "gigs-point")
//   .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
//   .attr("cy", d => yScaleGigs(d.totalGigs))
//   .attr("r", 4)
//   .attr("fill", "blue")
//   .attr("visibility", "hidden");




function renderGraphs() {
  const wSvg = 600, hSvg = 400,
        hViz = 0.8 * hSvg, wViz = 0.8 * wSvg,
        hPadding = (hSvg - hViz) / 2, wPadding = (wSvg - wViz) / 2;

  earningSvg = d3.select("#graphCon").append("svg")
    .attr("width", wSvg)
    .attr("height", hSvg)
    .attr("id", "earningsSvg");

  gigsSvg = d3.select("#graphCon").append("svg")
    .attr("width", wSvg)
    .attr("height", hSvg)
    .attr("id", "gigsSvg");

  const years = [2020, 2021, 2022, 2023, 2024];
  let maxEarnings = 0, maxGigs = 0;

  for (let manager of Managers) {
    let managerID = manager.id;
    let managerName = manager.name;
    const managedDJs = DJs.filter(dj => dj.managerID === managerID);

    let yearlyData = {};
    for (let year of years) {
      yearlyData[year] = { totalIncome: 0, totalGigs: 0, djList: [] };
    }

    for (let dj of managedDJs) {
      const djGigs = Gigs.filter(gig => gig.djID === dj.id);
      for (let gig of djGigs) {
        const year = new Date(gig.date).getFullYear();
        if (year >= 2020 && year <= 2024) {
          yearlyData[year].totalIncome += gig.djEarnings;
          yearlyData[year].totalGigs += 1;
          if (!yearlyData[year].djList.includes(dj.id)) {
            yearlyData[year].djList.push(dj.id);
          }
        }
      }
    }

    const yearlyAverages = [];
    for (let year of years) {
      const data = yearlyData[year];
      const numDJs = data.djList.length;
      const avgEarnings = numDJs > 0 ? data.totalIncome / numDJs : 0;
      const avgGigs = numDJs > 0 ? data.totalGigs / numDJs : 0;
      maxEarnings = Math.max(maxEarnings, avgEarnings);
      maxGigs = Math.max(maxGigs, avgGigs);
      yearlyAverages.push({ year, averageIncome: Math.round(avgEarnings), averageGigs: avgGigs });
    }

    managerDataset.push({
      managerId: managerID,
      managerName: managerName,
      yearlyAverages: yearlyAverages
    });
  }

  xScale = d3.scalePoint()
    .domain(years)
    .range([wPadding, wPadding + wViz]);

  yScaleEarnings = d3.scaleLinear()
    .domain([0, maxEarnings])
    .range([hPadding + hViz, hPadding]);

  yScaleGigs = d3.scaleLinear()
    .domain([0, maxGigs])
    .range([hPadding + hViz, hPadding]);

  // Axlar
  earningSvg.append("g")
    .attr("transform", `translate(0, ${hPadding + hViz})`)
    .classed("axis", true)
    .call(d3.axisBottom(xScale));
  earningSvg.append("g")
    .attr("transform", `translate(${wPadding}, 0)`)
    .classed("axis", true)
    .call(d3.axisLeft(yScaleEarnings));

  gigsSvg.append("g")
    .attr("transform", `translate(0, ${hPadding + hViz})`)
    .classed("axis", true)
    .call(d3.axisBottom(xScale));
  gigsSvg.append("g")
    .attr("transform", `translate(${wPadding}, 0)`)
    .classed("axis", true)
    .call(d3.axisLeft(yScaleGigs));
}
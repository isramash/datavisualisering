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
    let maxEarnings = 0;
    let maxGigs = 0;

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
        let signedDjs = [];
        for (let year of years) {
            const data = yearlyData[year];
            const numDJs = data.djList.length;

            let avgEarnings = 0;
            let avgGigs = 0;

            if (numDJs > 0) {
                avgEarnings = data.totalIncome / numDJs;
                avgGigs = data.totalGigs / numDJs;
            } else {
                avgEarnings = 0;
                avgGigs = 0;
            }

            maxEarnings = Math.max(maxEarnings, avgEarnings);
            maxGigs = Math.max(maxGigs, avgGigs);


            signedDjs = data.djList.map(djID => {
                const dj = DJs.find(d => d.id === djID);
                return dj.name;
            })

            yearlyAverages.push({ year, averageIncome: Math.round(avgEarnings), averageGigs: avgGigs, signedDjs: signedDjs });
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

    // Axlar – Earnings
    earningSvg.append("g")
        .attr("transform", `translate(0, ${hPadding + hViz})`)
        .classed("axis", true)
        .call(d3.axisBottom(xScale));

    earningSvg.append("g")
        .attr("transform", `translate(${wPadding}, 0)`)
        .classed("axis", true)
        .call(d3.axisLeft(yScaleEarnings));

    // Axeltexter – Earnings
    earningSvg.append("text")
        .attr("x", xScale(2024) + 30)
        .attr("y", hPadding + hViz + 5)
        .attr("text-anchor", "start")
        .classed("paragraphsAxis", true)
        .text("Year");

    earningSvg.append("text")
        .attr("x", wPadding) // i linje med y-axeln
        .attr("y", yScaleEarnings(maxEarnings) - 20)
        .attr("text-anchor", "end")
        .classed("paragraphsAxis", true)
        .text("Earnings");

    // Axlar – Gigs
    gigsSvg.append("g")
        .attr("transform", `translate(0, ${hPadding + hViz})`)
        .classed("axis", true)
        .call(d3.axisBottom(xScale));

    gigsSvg.append("g")
        .attr("transform", `translate(${wPadding}, 0)`)
        .classed("axis", true)
        .call(d3.axisLeft(yScaleGigs));

    gigsSvg.append("text")
        .attr("x", xScale(2024) + 30)
        .attr("y", hPadding + hViz + 5)
        .attr("text-anchor", "start")
        .classed("paragraphsAxis", true)
        .text("Year");

    gigsSvg.append("text")
        .attr("x", wPadding)
        .attr("y", yScaleGigs(maxGigs) - 20)
        .attr("text-anchor", "end")
        .classed("paragraphsAxis", true)
        .text("Gigs");
}

function toggleManagerGraph(manager) {
    const maxActive = 4;
    const active = activeManagers.includes(manager.id);

    const tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .html(`<div>${manager.name}</div><div>Klicka för att läsa mer</div>`)


    if (!active && activeManagers.length >= maxActive) return;

    if (!active) {
        const color = getAvailableColor();

        activeManagers.push(manager.id);
        managerActiveColor[manager.id] = color;  // sätt färg i objektet

        const data = managerDataset.find(d => d.managerId === manager.id);

        const earningsLine = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScaleEarnings(d.averageIncome));

        const gigsLine = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScaleGigs(d.averageGigs));

        earningSvg.append("path")
            .data([data.yearlyAverages])
            .attr("class", `line${manager.id}`)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 5)
            .attr("d", earningsLine)
            .on("mouseover", function (event) {
                tooltip.transition().duration(200).style("opacity", 1);
                d3.select(this).style("stroke-width", 7);
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200).style("opacity", 0);
                d3.select(this).style("stroke-width", 5);
            })
            .on("click", () => {
                profilepage(manager);
                window.scrollTo({
                    top: window.innerHeight * 2,
                    behavior: "smooth"
                });
            });

        gigsSvg.append("path")
            .data([data.yearlyAverages])
            .attr("class", `line${manager.id}`)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 5)
            .attr("d", gigsLine)
            .on("mouseover", function (event) {
                tooltip.transition().duration(200).style("opacity", 1);
                d3.select(this).style("stroke-width", 7);
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200).style("opacity", 0);
                d3.select(this).style("stroke-width", 5);
            })
            .on("click", () => {
                profilepage(manager);
                window.scrollTo({
                    top: window.innerHeight * 2,
                    behavior: "smooth"
                });
            })


        d3.select(`#img${manager.id}`).style("border", `6px solid ${color}`);


    } else {
        const index = activeManagers.indexOf(manager.id);
        if (index !== -1) activeManagers.splice(index, 1); // Ta bort manager

        const color = managerActiveColor[manager.id];
        delete managerActiveColor[manager.id];  // ta bort från objektet

        earningSvg.select(`.line${manager.id}`).remove();
        gigsSvg.select(`.line${manager.id}`).remove();
        d3.select(`#img${manager.id}`).style("border", "none");
    }
}

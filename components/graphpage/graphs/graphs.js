function renderGraphs() {
    // Storlek och padding
    const wSvg = 600, hSvg = 400,
        hViz = 0.8 * hSvg, wViz = 0.8 * wSvg,
        hPadding = (hSvg - hViz) / 2, wPadding = (wSvg - wViz) / 2;

    // Svg Earnings
    const earningSvg = d3.select("#graphCon").append("svg")
        .attr("width", wSvg)
        .attr("height", hSvg);
    
    // Svg Gigs
        const gigsSvg = d3.select("#graphCon").append("svg")
        .attr("width", wSvg)
        .attr("height", hSvg);
    

    // Deklarerar alla år
    const years = [2020, 2021, 2022, 2023, 2024];
    const managerDataset = [];
    let maxEarnings = 0;
    let maxGigs = 0;

    for (let manager of Managers) {
        let managerID = manager.id;
        let managerName = manager.name;
        const managedDJs = DJs.filter(dj => dj.managerID === managerID);

        // Initiera inkomstdata per år
        let yearlyData = {};
        for (let year of years) {
            yearlyData[year] = {
                totalIncome: 0,
                totalGigs: 0,
                djList: [] // samlar unika DJ-id:n som spelat detta år
            };
        }

        for (let dj of managedDJs) {
            const djGigs = Gigs.filter(gig => gig.djID === dj.id);

            for (let gig of djGigs) {
                const year = new Date(gig.date).getFullYear();
                if (year >= 2020 && year <= 2024) {
                    yearlyData[year].totalIncome += gig.djEarnings;
                    yearlyData[year].totalGigs += 1;

                    // Lägg till DJ om hen inte redan finns i listan för detta år
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

            const avgEarnings = (numDJs > 0) ? data.totalIncome / numDJs : 0;
            const avgGigs = (numDJs > 0) ? data.totalGigs / numDJs : 0;
            maxEarnings = Math.max(maxEarnings, avgEarnings);
            maxGigs = Math.max(maxGigs, avgGigs);

            yearlyAverages.push({
                year: year,
                averageIncome: Math.round(avgEarnings),
                averageGigs: avgGigs
            });
        }

        managerDataset.push({
            managerId: managerID,
            managerName: managerName,
            yearlyAverages: yearlyAverages
        });
    }

    // Skala
    const xScale = d3.scalePoint()
        .domain(years)
        .range([wPadding, wPadding + wViz]);

    const yScaleEarnings = d3.scaleLinear()
        .domain([0, maxEarnings])
        .range([hPadding + hViz, hPadding]);

    const yScaleGigs = d3.scaleLinear()
        .domain([0, maxGigs])
        .range([hPadding + hViz, hPadding]);


    // Axlar
    // Graf 1
    earningSvg.append("g")
        .attr("transform", `translate(0, ${hPadding + hViz})`)
        .classed("axis", true)
        .call(d3.axisBottom(xScale));

    earningSvg.append("g")
        .attr("transform", `translate(${wPadding}, 0)`)
        .classed("axis", true)
        .call(d3.axisLeft(yScaleEarnings));

    // Graf 2
    gigsSvg.append("g")
        .attr("transform", `translate(0, ${hPadding + hViz})`)
        .classed("axis", true)
        .call(d3.axisBottom(xScale));

    gigsSvg.append("g")
        .attr("transform", `translate(${wPadding}, 0)`)
        .classed("axis", true)
        .call(d3.axisLeft(yScaleGigs));

    // Line generator
    const dMakerEarnings = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScaleEarnings(d.averageIncome));

    const colorScaleEarnings = d3.scaleOrdinal(d3.schemeTableau10);

    // Rita linjer
    managerDataset.forEach((managerData, i) => {
        earningSvg.append("path")
            .data([managerData.yearlyAverages])
            .attr("fill", "none")
            .attr("stroke", colorScaleEarnings(i))
            .attr("stroke-width", 2)
            .attr("d", dMakerEarnings);
    });

    // Line generator
    const dMakerGigs = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScaleGigs(d.averageGigs));

    const colorScaleGigs = d3.scaleOrdinal(d3.schemeTableau10);

    // Rita linjer
    managerDataset.forEach((managerData, i) => {
        gigsSvg.append("path")
            .data([managerData.yearlyAverages])
            .attr("fill", "none")
            .attr("stroke", colorScaleGigs(i))
            .attr("stroke-width", 2)
            .attr("d", dMakerGigs);
    });
}

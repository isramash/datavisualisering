
function renderGraphs() {
    // Bestämmer storlekar på graferna
    const wSvg = 600, hSvg = 400,
        hViz = .8 * hSvg, wViz = .8 * wSvg,
        hPadding = (hSvg - hViz) / 2, wPadding = (wSvg - wViz) / 2;

    const earningSvg = d3.select("#graphpageCon").append("svg")
        .attr("width", wSvg)
        .attr("height", hSvg);

    // Skapa ett nytt dataset
    const managerDataset = [];

    for (let manager of Managers) {
        let managerID = manager.id;
        let managerName = manager.name;

        // Hitta alla DJs som har den här managern
        const managedDJs = DJs.filter(dj => dj.managerID === managerID);

        let totalIncome = 0;
        let totalGigs = 0;

        for (let dj of managedDJs) {
            // Hitta gigs för denna DJ
            const djGigs = Gigs.filter(gig => gig.djID === dj.id);

            // Summera inkomst för varje gig
            for (let gig of djGigs) {
                totalIncome += gig.djEarnings;


                totalGigs++;
            }
        }

        const averageIncome = (managedDJs.length > 0) ? totalIncome / managedDJs.length : 0;

        // Spara i dataset
        managerDataset.push({
            managerId: managerID,
            managerName: managerName,
            averageIncomePerDJ: Math.round(averageIncome),
            nGigs: totalGigs
        });

        console.log(averageIncome);

        
    }

    let maxAverageNumber = managerDataset[0].averageIncomePerDJ;
    managerDataset.forEach(d => {
        maxAverageNumber = Math.max(maxAverageNumber, d.averageIncomePerDJ);
    });

    console.log("max nummer:" + maxAverageNumber);


    // Logga resultatet
    // console.log("managerDataset:", managerDataset);


    let years = [];

    for (let year = 2020; year < 2025; year++) {
        years.push(year);
    }

    console.log(years);


    // Här kan du lägga till kod för att visualisera det med D3 eller liknande





    let xScale = d3.scaleBand(years, [wPadding, wPadding + wViz]);
    let yScale = d3.scaleLinear([0, (maxAverageNumber)], [hPadding + hViz, hPadding]);

    let xAxis = d3.axisBottom(xScale);
    let xGroup = earningSvg.append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${hPadding + hViz})`)
    
    let yAxis = d3.axisLeft(yScale);
    let yGroup = earningSvg.append("g")
        .call(yAxis)
        .attr("transform", `translate(${wPadding}, 0)`)

    // const dMaker = d3.line()
    //     .x(d => )

}



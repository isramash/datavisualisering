
/* function renderGraphs() {
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


*/

function renderGraphs() {
    // Bestäm storlekar på SVG och grafyta
    const wSvg = 600, hSvg = 400,
        hViz = 0.8 * hSvg, wViz = 0.8 * wSvg,
        hPadding = (hSvg - hViz) / 2, wPadding = (wSvg - wViz) / 2;

    const earningSvg = d3.select("#graphpageCon").append("svg")
        .attr("width", wSvg)
        .attr("height", hSvg);

    const years = [2020, 2021, 2022, 2023, 2024];

    const managerDataset = [];

    let globalMaxIncome = 0; // För y-axeln

    for (let manager of Managers) {
        let managerID = manager.id;
        let managerName = manager.name;

        const managedDJs = DJs.filter(dj => dj.managerID === managerID);

        // Skapa ett objekt för årsbaserad inkomst
        let yearlyIncomes = {};
        for (let year of years) {
            yearlyIncomes[year] = {
                totalIncome: 0,
                totalGigs: 0
            };
        }

        for (let dj of managedDJs) {
            const djGigs = Gigs.filter(gig => gig.djID === dj.id);

            for (let gig of djGigs) {
                const year = new Date(gig.date).getFullYear();
                if (year >= 2020 && year < 2025) {
                    yearlyIncomes[year].totalIncome += gig.djEarnings;
                    yearlyIncomes[year].totalGigs++;
                }
            }
        }

        const yearlyAverages = [];

        for (let year of years) {
            const data = yearlyIncomes[year];
            const avg = (data.totalGigs > 0) ? data.totalIncome / data.totalGigs : 0;
            globalMaxIncome = Math.max(globalMaxIncome, avg); // håll koll på max för yScale

            yearlyAverages.push({
                year: year,
                averageIncome: Math.round(avg)
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

    const yScale = d3.scaleLinear()
        .domain([0, globalMaxIncome])
        .range([hPadding + hViz, hPadding]);

    // Axlar
    const xAxis = d3.axisBottom(xScale); // formaterar år som heltal
    earningSvg.append("g")
        .attr("transform", `translate(0, ${hPadding + hViz})`)
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    earningSvg.append("g")
        .attr("transform", `translate(${wPadding}, 0)`)
        .call(yAxis);

    // Line generator
    const dMaker = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averageIncome));

    // Färgskala
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    // Rita en linje för varje manager
    managerDataset.forEach((managerData, i) => {
        earningSvg.append("path")
            .datum(managerData.yearlyAverages)
            .attr("fill", "none")
            .attr("stroke", colorScale(i))
            .attr("stroke-width", 2)
            .attr("d", dMaker);

        // Lägg till namntext på slutet av linjen
        const lastPoint = managerData.yearlyAverages[managerData.yearlyAverages.length - 1];
        earningSvg.append("text")
            .attr("x", xScale(lastPoint.year) + 5)
            .attr("y", yScale(lastPoint.averageIncome))
            .text(managerData.managerName)
            .attr("font-size", "10px")
            .attr("fill", colorScale(i));
    });
}
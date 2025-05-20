const activeManagers = [];
const maxActive = 4;
const colorScale = ["yellow", "blue", "green", "red"];
const managerActiveColor = {};
let managerDataset = [];
let xScale, yScaleEarnings, yScaleGigs;
let earningSvg, gigsSvg;

function graphpage() {
    let main = document.querySelector("main");
    
    let graphpageCon = document.createElement("div");
    graphpageCon.id = "graphpageCon";
    let graphCon = document.createElement("div");
    graphCon.id = "graphCon";
    
    main.append(graphpageCon);
    renderManagers();
    graphpageCon.append(graphCon);
    renderGraphs();

    // let infoCon = document.createElement("div");
    // infoCon
}

function getAvailableColor() {
    const usedColors = [];
    for (const key in managerActiveColor) {
        usedColors.push(managerActiveColor[key]);
    }

    for (const color of colorScale) {
        if (!usedColors.includes(color)) {
            return color;
        }
    }
}

function toggleManagerGraph(manager) {
    const isActive = activeManagers.includes(manager.id);

    if (!isActive && activeManagers.length >= maxActive) return;

    if (!isActive) {
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
            .attr("stroke-width", 3)
            .attr("d", earningsLine)


        gigsSvg.append("path")
            .data([data.yearlyAverages])
            .attr("class", `line${manager.id}`)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 3)
            .attr("d", gigsLine);

        d3.select(`#img${manager.id}`).style("border", `6px solid ${color}`);

        console.log(managerActiveColor);

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

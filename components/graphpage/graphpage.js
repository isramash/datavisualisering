const managerActiveColor = {};
let managerDataset = [];
const activeManagers = [];
let xScale, yScaleEarnings, yScaleGigs;
let earningSvg, gigsSvg;

function graphpage() {
    let main = document.querySelector("main");
    
    let graphpageCon = document.createElement("div");
    graphpageCon.id = "graphpageCon";
    let graphCon = document.createElement("div");
    graphCon.id = "graphCon";

    let earningsInfo = document.createElement("div");
    earningsInfo.className = "graphInfo paragraphs";
    earningsInfo.textContent = "Average income value of the managers signed DJ:s for the last 5 years";

    let gigsInfo = document.createElement("div");
    gigsInfo.className = "graphInfo paragraphs";
    gigsInfo.textContent = "Average gigs per DJ that the manager have booked for the last 5 years";

    main.append(graphpageCon);
    renderManagers();
    graphpageCon.append(graphCon);
    renderGraphs();
    
    graphCon.append(earningsInfo);
    graphCon.append(gigsInfo);
}

function getAvailableColor() {
    const colorScale = ["yellow", "blue", "green", "red"];
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
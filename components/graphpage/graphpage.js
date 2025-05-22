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

    let infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<p>Click on one or multiple managers to see and compare statistics</p><br><p>Maximum four at the same time</p>`;
    infoDiv.classList.add("infoDiv");
    infoDiv.style.display = "none";

    let infoIcon = document.createElement("div");
    infoIcon.classList.add("infoIcon");
    infoIcon.innerHTML = getInfoIcon("info");
    infoIcon.addEventListener("click", () => {
        const isVisible = infoDiv.style.display === "block";

        if (isVisible === true) {
            infoDiv.style.display = "none";
            infoIcon.innerHTML = getInfoIcon("info");
        } else {
            infoDiv.style.display = "block";
            infoIcon.innerHTML = getInfoIcon("close");
        }
    });

    graphpageCon.append(infoIcon);
    graphpageCon.append(infoDiv);

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

function getInfoIcon(type) {
    if (type === "close") {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="white" stroke-width="2"/>
        </svg>`;
    } else {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 15C10.2833 15 10.521 14.904 10.713 14.712C10.905 14.52 11.0007 14.2827 11 14V10C11 9.71667 10.904 9.47933 10.712 9.288C10.52 9.09667 10.2827 9.00067 10 9C9.71733 8.99933 9.48 9.09533 9.288 9.288C9.096 9.48067 9 9.718 9 10V14C9 14.2833 9.096 14.521 9.288 14.713C9.48 14.905 9.71733 15.0007 10 15ZM10 7C10.2833 7 10.521 6.904 10.713 6.712C10.905 6.52 11.0007 6.28267 11 6C10.9993 5.71733 10.9033 5.48 10.712 5.288C10.5207 5.096 10.2833 5 10 5C9.71667 5 9.47933 5.096 9.288 5.288C9.09667 5.48 9.00067 5.71733 9 6C8.99933 6.28267 9.09533 6.52033 9.288 6.713C9.48067 6.90567 9.718 7.00133 10 7ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667932 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="white"/>
        </svg>`;
    }
}

function getAvailableColor() {
    const colorScale = ["#FBFF00", "#716BE4", "#90C547", "#FF57CC"];
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
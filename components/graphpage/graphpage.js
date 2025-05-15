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
}
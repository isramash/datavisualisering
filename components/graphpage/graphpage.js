function graphpage() {
    let main = document.querySelector("main");
    let graphpageCon = document.createElement("div");
    graphpageCon.id = "graphpageCon";

    main.append(graphpageCon);

    renderManagers();
    renderGraphs();
}
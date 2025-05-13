function graphPage () {
    let main = document.querySelector("main");

    let container = document.createElement("div");
    container.classList.add("graphPageContainer");
    main.append(container);

    renderManagers();
}
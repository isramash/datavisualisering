function frontpage() {
    let main = document.querySelector("main");
    let frontpageCon = document.createElement("div");

    frontpageCon.id = 'firstPage';

    let headerCon = document.createElement("div");
    headerCon.id = "headerCon";

    let subheadingCon = document.createElement("div");
    subheadingCon.innerHTML = "<p> Find your </p>";
    subheadingCon.id = "subheadingCon";

    let managerTextCon = document.createElement("div");
    managerTextCon.innerHTML = "<p> Manager </p>";
    managerTextCon.id = "managerTextCon";

    main.append(frontpageCon);
    frontpageCon.append(headerCon);
    headerCon.append(subheadingCon, managerTextCon);
}
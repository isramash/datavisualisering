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

    let reviewCon = document.createElement("div");
    reviewCon.id = "reviewCon";

    reviewCon.innerHTML = `<div id = 'firstReview'>
    <p>"The best site ever"</p>
    <p>"I found my manager here"</p>
    </div>
    <div id = 'secondReview'>
    <p>"The best site ever"</p>
    <p>"The best site ever"</p>
    </div>
    <div id = 'thirdReview'>
    <p>"The best site ever"</p>
    <p>"The best site ever"</p>
    </div>
    `

    let downButton = document.createElement("div");
    downButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M36 18L24 30L12 18" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    downButton.addEventListener("click", () => {

    });

    main.append(frontpageCon);
    frontpageCon.append(headerCon, reviewCon, downButton);
    headerCon.append(subheadingCon, managerTextCon);
}
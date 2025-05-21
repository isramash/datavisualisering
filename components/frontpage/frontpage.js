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
    <p>"Wanted to play more in America and I got to do that"</p>
    <p>"I earned alot more money"</p>
    </div>
    <div id = 'thirdReview'>
    <p>"Talented, amazing, recommend"</p>
    <p>"I found more than a manager, a soulmate"</p>
    </div>
    `

    let downButton = document.createElement("div");
    downButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M36 18L24 30L12 18" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
   downButton.addEventListener("click", () => {
    window.scrollTo({
        top: window.innerHeight,  
        behavior: "smooth"
    });
});


    main.append(frontpageCon);
    frontpageCon.append(headerCon, reviewCon, downButton);
    headerCon.append(subheadingCon, managerTextCon);
}
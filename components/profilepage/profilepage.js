
function profilepage (manager) {

    let existingProfile = document.querySelector('#ProfilePage');
    if (existingProfile) {
        existingProfile.remove();
    }
    
    let main = document.querySelector('main');
    
    let container = document.createElement('div');
    container.innerHTML = "";

    container.id = 'ProfilePage';
    container.innerHTML = `
                <div id ='uppButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M12 30L24 18L36 30" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div id = 'firstCon'>
                    <img src = '/media/profile.png'>
                    <div id ='aboutCon'>
                        <p id = 'managerName' style ='color: var(--textGray);     font-family: var(--fontMaven);     font-size: 3.78vw;  font-weight: 500;'> ${manager.name}</p>
                        <p id = 'aboutManager'>${manager.about}</p>
                    </div>
                </div>

                <div id = 'secondCon'>
                    <div id ='signedList'>
                        <p>Signed Djs</p>
                        <p></p>
                    </div>
                    <div id ='latestList'>
                        <p>Latest Shows</p>
                        <p></p>
                    </div>
                    <div>
                    <p>Most Active in</p>
                    </div>
                </div>
    `;

    main.append(container)
}
function renderProfilePage(){
    let main = document.querySelector('main');
    

    let ProfilePage = document.createElement('div');
    ProfilePage.id = 'ProfilePage';
    ProfilePage.innerHTML = `
                <div id ='uppButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M12 30L24 18L36 30" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div id = 'firstCon'>
                    <img src = '/media/profile.png'>
                    <div id ='aboutCon'>
                        <p id = 'managerName' style ='color: var(--textGray);     font-family: var(--fontMaven);     font-size: 3.78vw;  font-weight: 500;'> Tomek Garcia</p>
                        <p id = 'aboutManager'> Jag heter Tomek Garcia och arbetar som DJ-manager med fokus på att bygga starka, långsiktiga karriärer för mina artister. Genom åren har jag hjälpt DJs att nå ut globalt, särskilt i Europa och Sydostasien, där jag har ett brett kontaktnät. Jag tror på tydlig kommunikation, strategisk planering och att varje artist ska känna sig sedd och stöttad. För mig handlar det inte bara om gigs – det handlar om att skapa möjligheter där DJs verkligen får skina. Jag brinner för mångfald, nytänkande och att alltid hitta rätt scen för rätt sound.</p>
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

    main.append(ProfilePage)
}
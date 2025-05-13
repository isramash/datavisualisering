function renderManagers() {
    d3.select("#graphpageCon").append("div")
      .attr("id", "managerCon")  
      .selectAll("div")
      .data(Managers)
      .enter()
      .append("div")  // Skapar en div för varje manager
      .attr("class", "manager")  // Lägg till en klass för stilmöjligheter
  
      // Lägg till bild som syskon till knappen
      .each(function(d) {

        // Lägg till punkter
        d3.select(this).append("p")
            .html(`&#8230;`)  // Använd .html() istället för .text() för att tolka HTML-tecken
            .attr("class", "managerInfo")
            .on("click", function () {
                console.log(d);

                profilepage(d);
                // anropa profilepage med d som argument
            })

        // Lägg till bilden
        d3.select(this).append("img")
          .attr("src", d.image)  // Anta att varje manager har en imageUrl
          .attr("width", 80)  // Exempel på bildstorlek
          .attr("height", 80)
          .on("click", function() {
            // Exempel på vad som händer när knappen klickas
            console.log(`${d.name} clicked!`);
          });
  
        // Lägg till knappen
        d3.select(this).append("button")
          .text(d.name)  // Sätter knappens text till managerns namn
          .on("click", function() {
            // Exempel på vad som händer när knappen klickas
            console.log(`${d.name} clicked!`);
          });
      });
  }
  
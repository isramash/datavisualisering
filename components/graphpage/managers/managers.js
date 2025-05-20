function renderManagers() {
  d3.select("#graphpageCon").append("div")
    .attr("id", "managerCon")  
    .selectAll("div")
    .data(Managers)
    .enter()
    .append("div")
    .attr("class", "manager")
    .each(function(d, i) {
      const managerDiv = d3.select(this);

      managerDiv.append("p")
        .html(`&#8230;`)
        .attr("class", "managerInfo")
        .on("click", () => profilepage(d));

      managerDiv.append("img")
        .attr("src", d.image)
        .attr("width", 80)
        .attr("height", 80)
        .attr("id", `img${d.id}`)
        .on("click", () => toggleManagerGraph(d, i));

      managerDiv.append("button")
        .text(d.name)
        .on("click", () => toggleManagerGraph(d, i));
    });
}

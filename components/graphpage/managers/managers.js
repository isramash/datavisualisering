function renderManagers () {
    d3.select("main").append("div")
  .selectAll("div")
  .data(managerDataset)
  .enter()
  .append("button")
  .text(d => d.name)
  .on("click", (event, d) => {
    let line = d3.select(`#line_${d.id}`);
    let points = d3.selectAll(`#points_${d.id} .data-point`);
    let gigsLine = d3.select(`#gigsLine_${d.id}`);
    let gigsPoints = d3.selectAll(`#gigsPoints_${d.id} .gigs-point`);

    let visible = line.attr("visibility");
    let newValue = (visible == "hidden") ? "visible" : "hidden";

    d3.selectAll(".data-line").attr("visibility", "hidden");
    d3.selectAll(".data-point").attr("visibility", "hidden");
    d3.selectAll(".gigs-line").attr("visibility", "hidden");
    d3.selectAll(".gigs-point").attr("visibility", "hidden");

    let activeButton = document.querySelector("button.active");
    if (activeButton) activeButton.classList.remove("active");

    let classAction = newValue == "hidden" ? "remove" : "add";
    event.target.classList[classAction]("active");

    line.attr("visibility", newValue);
    points.attr("visibility", newValue);
    gigsLine.attr("visibility", newValue);
    gigsPoints.attr("visibility", newValue);
  });
}
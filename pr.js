addEventListener("keydown", moveRect);
addEventListener("keyup", moveRect2);
function moveRect2(){
  svg
  .off("keydown",moveRect);
}
function moveRect(e){
  if (e.shiftKey === true && e.ctrlKey === true )
    go();
}

let width = 1200;
let height = 600;
let newWidth = width/2;
let newHeight = height/2;

const svg = d3.select("div").append("svg")
.style("width", width)
.style("height", height);

function go(){
  svg.on("mousedown", mousedown)
  .on("dblclick", () => {
    svg.selectAll("path").remove();
  })
  .on("contextmenu", () => {
    svg
    .style("width", width = newWidth)
    .style("height", height = newHeight);
  });

  const line = d3.line()
  .x(d => d[0])
  .y(d => d[1])
  .curve(d3.curveLinear);

  const myColor = "green";

  function mousedown() {
    let data = [];
    const path = d3.select(this)
    .append("path")
    .attr("stroke", myColor)
    .attr("stroke-width", 4)
    .attr("fill", "none");


    d3.select(this)
    .on("mousemove", () => {
      data.push(d3.mouse(this));
      let coords = d3.mouse(this);

      if (coords[0] > width - 5 || coords[0] <= 5 || coords[1] > height - 5 || coords[1] <= 5) { //проверка на выход за границы
        path.attr("d", line(data));
        d3.select(this).on("mousemove", null).on("mouseup", null);
        data = [];
        return;
      }

      path.attr("d", line(data));
    })
    .on("mouseup", () => {
      d3.select(this).on("mousemove", null);
      data = [];
    });
  }
}
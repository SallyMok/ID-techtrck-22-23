// api ophalen
fetch('https://api.jikan.moe/v4/top/anime')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

// eerst de top 10 in een array zetten door wat niet in de top 10 wegfitleren
// vervolgens de overige data ook in dezelfde array zetten
    // const newArray = data.data
    // .filter(item => item.year == NaN)
    // .map(item => {
    //     return{
    //         title: item.title,
    //         img: item.url,
    //         year: item.year,
    //         rank: item.rank,
    //         episodes: item.episodes

    //     }
        
    // })

    const newArray = data.data.map(item => {
        console.log(item);
        return {
            title: item.title,
            score: item.score,
            image: item.images.jpg.image_url,
            year: item.year,
            rank: item.rank,
            episodes: item.episodes
        }
    })


console.log(newArray)




let xScale
let yScale

let width = 800
let height = 500
let padding= 40



let svg = d3.select("svg")
let tooltip = d3.select("#tooltip")



let drawCanvas = () => {
    svg.attr("width", width)
    svg.attr("height", height)
}



let generateScales = () => {
    xScale = d3.scaleLinear()
                .domain([d3.min(newArray, (item) => {
                    return item ["rank"]
                }) -.5, d3.max(newArray, (item) => {
                    return item ["rank"]
                }) +.5])
                .range([padding, width - padding])

    yScale = d3.scaleTime()
                .domain([d3.max(newArray, (item) => {
                    return item["year"]
                })+.5, d3.min(newArray, (item) => {
                    return item ["year"]
                }) -.5])
                .range([padding, height - padding])            
}


let drawPoints = () => {

    svg.selectAll("circle")
        .data(newArray)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", "13")
        .attr("data-xvalue", (item) => {
            return item["rank"]
        })
        .attr("data-yvalue", (item) => {
            return item["year"]
        })
        .attr("cx", (item) => {
            return xScale(item["rank"])
        })
        .attr("cy", (item) => {
            return yScale(item["year"])
        })
       .attr("fill", (item) => {
            if(item["episodes"] > 14) {
                return "orange"
            }else if(item["episodes"] == 13){
                return "green"
            }
            else {
                return "blue"
            }
       })
       .on("mouseover", (item) => {
            tooltip.transition()
                    .style("visibility", "visible")
            if(item["score"] < 8.80) {

                
                
            }
            else{
                
                tooltip.text("Title: " + item["title"]  + " | " + "Score: " + item["score"] + " | " + "Rank: " + item["rank"])
                    .attr("x", 10)
                const img = new Image(); 
                img.src = item["image"];
                document.getElementById('tooltip').appendChild(img);
               
                

                
            
               
        }
       })
       .on("mouseout", (item) => {
            tooltip.transition()
                    .style("visibility", "hidden")
            
                  
       })
        
}


let generateAxes = () => {
    
    let xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format("d"))
                    

    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.format("d"))
    
    svg.append("g")
        .call(xAxis.ticks(20))
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + (height - padding) + ")")
        .selectAll("text")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        
    

    svg.append("g")
        .call(yAxis.ticks(25))
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + " , 0)")
        .selectAll("text")
        .style("font-size", "14px")
        .style("font-weight", "bold")




}


drawCanvas();
generateScales();
drawPoints();
generateAxes()













});
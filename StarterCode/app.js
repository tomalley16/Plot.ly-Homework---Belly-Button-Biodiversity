// Set up inital data:

d3.json("samples.json").then(function(sample_data){
    console.log(sample_data);

    Object.values(sample_data.names).forEach(function(name) {
        d3.selectAll("#selDataset").append("option").text(name).property(name);
    });

    Data(sample_data.names[0]);
    Demographics(sample_data.names[0]);
});


// ---------------------------


// Set up function to filter data:

function Data(id) {
    d3.json("samples.json").then(function(sample_data){
        console.log(sample_data);

        var filteredSampleInfo = sample_data.samples.filter(details => details.id.toString() === id)[0];
    
        var sample_values = filteredSampleInfo.sample_values
        console.log(sample_values)

        var otu_ids = filteredSampleInfo.otu_ids
        console.log(otu_ids) 

        var top_otus = otu_ids.map(function(otuNumber){
            return "OTU " + otuNumber;
        })

        var otu_labels = filteredSampleInfo.otu_labels
        console.log(otu_labels) 

 // ---------------------------

// Set up horizontal bar graph:
      
        var barTrace = {
            x: sample_values.slice(0,10).reverse(),
            y: top_otus.slice(0,10).reverse(),
            text: otu_labels,
            type: "bar",
            orientation: "h",
            marker: {
                color: "blue",
            },
            bgcolor: "transparent"
        };

        var barData = [barTrace];

        var subject_id = filteredSampleInfo.id

        var barLayout = {
            title: `Top Ten OTU Values for Subject ${subject_id}`,
            titlefont:{
                family: 'Quicksand, sans-serif',
                size: 28
              },
            font:{
                family: 'Quicksand, sans-serif',
                size: 14
              },
            xaxis: {gridcolor: '#fff', zerolinecolor: '#5a5a5a'},
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 75,
                r: 75,
                t: 50,
                b: 50
            },
            plot_bgcolor: "transparent",
            paper_bgcolor: "transparent"
        };
    Plotly.newPlot("bar", barData, barLayout)   

 // ---------------------------

//  Set up bubble chart:
    
        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
            size: sample_values,
            color: "Earth"
            },
            text: otu_labels
        };
      
        var bubbleData = [bubbleTrace];
      
        var bubbleLayout = {
            title: `All OTU Values for Subject ${subject_id}`,
            titlefont:{
                family: 'Quicksand, sans-serif',
                size: 28
            },
            font:{
                family: 'Quicksand, sans-serif',
                size: 14
            },
            showlegend: false,
            height: 600,
            width: 1200,
            plot_bgcolor: "transparent",
            paper_bgcolor: "transparent",
            xaxis: {gridcolor: '#fff', zerolinecolor: 'white'},
            yaxis: {gridcolor: '#fff', zerolinecolor: 'white'},
            margin: {
                l: 50,
                r: 0,
                t: 50,
                b: 50
            }, 
      };
      
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

 // ---------------------------

//  Set up guage chart:

        var filteredWFreq = sample_data.metadata.filter(details => details.id.toString() === id)[0];
        var washingFreq = filteredWFreq.wfreq
        // console.log(washingFreq)

// Set up needle:

        var level = washingFreq*20;    
        var degrees = 180 - level,
            radius = .5;
        var radians = (degrees * Math.PI) / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
    
        var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
            
        var gaugeData = [{ type: 'scatter',
            x: [0], y:[0],
            value: level,
            marker: {size: 28, color:'#4e4e4e'},
            showlegend: false,
            name: 'Washing Frequency',
            text: level/20,
            hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:['#703177','#7d3c84', '#8f4996', '#ad5aa1', '#b563a9cc','#bb76a1cc', '#d291a8cc', '#d29191c7', 'd291917a', 'transparent']},
            labels: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
            }];
        
        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '#4e4e4e',
            line: { color: '#4e4e4e' }
            }],
        autosize: true,
        xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
        font: { family: "Quicksand", size: 14 },
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        title: 'Scrubs per Week',
        titlefont: { family: "Quicksand", size: 24 },
        margin: { t: 40, b: 0, l:0, r:0},
        };
        
    Plotly.newPlot("gauge", gaugeData, layout);
    
    });
}

 // ---------------------------

// Set Up functions:

function Demographics(id) {

    d3.json("samples.json").then(function(sample_data) {
        var filteredDemoInfo = sample_data.metadata.filter(details => details.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");
            
        demographicInfo.html("");
    
        Object.entries(filteredDemoInfo).forEach(function([key, value]) {   
            demographicInfo.append("h4").text(`${key}: ${value}`);    
        });
    });
}


// ---------------------------

// Set Up function to change chart:

function optionChanged(id) {
    Data(id);
    Demographics(id);
}

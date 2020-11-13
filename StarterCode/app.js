// Populate the data:
d3.json("samples.json").then(function(sample_data){
    console.log(sample_data);
// Set Up dropdown:
    Object.values(sample_data.names).forEach(function(name) {
        d3.selectAll("#selDataset").append("option").text(name).property(name);
    });

//  Set up iniital charts:
    Data(sample_data.names[0]);
    Demographics(sample_data.names[0]);
});

// -----------------------------------------

// Set up chart function and then insert data:
function Data(id) {
    d3.json("samples.json").then(function(sample_data){
        console.log(sample_data);

        let filteredSampleInfo = sample_data.samples.filter(details => details.id.toString() === id)[0];
    
        let sample_values = filteredSampleInfo.sample_values
        console.log(sample_values)

        let otu_ids = filteredSampleInfo.otu_ids
        console.log(otu_ids) 

        let top_otus = otu_ids.map(function(otuNumber){
            return "OTU " + otuNumber;
        })

        let otu_labels = filteredSampleInfo.otu_labels
        console.log(otu_labels) 

// Set up horizontal bar graph:
let barTrace = {
    x: sample_values.slice(0,10).reverse(),
    y: top_otus.slice(0,10).reverse(),
    text: otu_labels,
    type: "bar",
    orientation: "h",
    marker: {
        color: "#6b5b9c",
    },
    bgcolor: "transparent"
};

let barData = [barTrace];

let subject_id = filteredSampleInfo.id

let barLayout = {
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

    


// -----------------------------------
// Set up bubble chart:
let bubbleTrace = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
    size: sample_values,
    color: otu_ids
    },
    text: otu_labels
};

let bubbleData = [bubbleTrace];

let bubbleLayout = {
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

// ---------------------------------------------------------------

// Populate dropdown, initial demographics, and charts
d3.json("samples.json").then(function(sample_data){
    console.log(sample_data);
// Populate dropdown
    Object.values(sample_data.names).forEach(function(name) {
        d3.selectAll("#selDataset").append("option").text(name).property(name);
    });
// Generate initial demographics and charts
//     Data(sample_data.names[0]);
//     Demographics(sample_data.names[0]);
// });
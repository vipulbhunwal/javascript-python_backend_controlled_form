var field_data = null;
var tax_selected = null;
var list_fields = null;


$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
      'type': 'POST',
      'url': url,
      'contentType': 'application/json; charset=utf-8',
      'data': JSON.stringify(data),
      'dataType': 'json',
      'success': callback
    });
  };
document.addEventListener('DOMContentLoaded',function(){
    var container = document.getElementById("mode_select");
    console.log("sfldsajfk");
    $.getJSON('http://localhost:5000/list_taxes',function(mydata){
        console.log("Sadfsfa");
        console.log(mydata);
        var tax_types = Object.keys(mydata);
        var dropdown = document.getElementById("mode_select");
        var opt = new Option();
        opt.text = 'Select tax type';
        opt.value = '';
        dropdown.options.add(opt);
        console.log(tax_types)
        for (i=0;i<tax_types.length;i++){
            var opt = document.createElement("option");
            opt.text = tax_types[i];
            opt.value = tax_types[i];
            dropdown.options.add(opt);
        }
    });
});
function process_data(){
    for (i=0;i<list_fields.length;i++){
        console.log(list_fields[i]+" >>> "+document.getElementById("count"+i.toString()).value);
    }
}

function fetch_fields(){
    var tax_type = document.getElementById("mode_select").value;
    tax_selected = tax_type;
    const data = {
        tax_type : tax_type
    }
    $.getJSON('http://localhost:5000/fetch_fields',data,function(mydata){
        console.log("changing tax_type to "+tax_type)
        var container = document.getElementById("insert_data");
        field_data = mydata;
        while(container.hasChildNodes()){
            container.removeChild(container.lastChild);
        }
        console.log(mydata);
        var fields = Object.keys(mydata);
        list_fields = fields;
        console.log(fields);
        for (i=0; i<fields.length;i++){
            container.appendChild(document.createTextNode(fields[i]));
            $("#insert_data").append('<input id="count'+i.toString()+'"name='+fields[i]+'" type="'+mydata[fields[i]]+'"><br/>');
        }
        $("#insert_data").append('<button onclick="process_data()">Process</button>')
    })
}
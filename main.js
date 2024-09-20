//$(document).ready(function(){
//$("submit-button").click(function(){
  //getData();
//});

//});
getExchanges();
function getExchanges() {
	// ajax call to get list of stock exchanges
  
	// variable to store ajax response in
var responseData;
   $.ajax({
    url: "https://api.polygon.io/v3/reference/exchanges?asset_class=stocks&apiKey=tqbCpLZEIgUaoxwa8Pq4wpa_oonoxIiC",
    method: "GET"
	  }).done(function(data) {
          var len = data.results.length;
		  $("#exchange").html("");
		  for(i =0; i < len; i++){
			$("#exchange").append("<option value='" + data.results[i].operating_mic + "'>" + data.results[i].name + "</option>");
		  }
	  });
}
function displayStocksForExchange(){
//what the user is selecting	
var user_input = $('#exchange').val();
console.log(user_input);
//use the user_input variable in the url 
$.ajax({
  url:"https://api.polygon.io/v3/reference/tickers?exchange=" + user_input + "&active=true&apiKey=tqbCpLZEIgUaoxwa8Pq4wpa_oonoxIiC",
   method: "GET"
}).done(function(data) {
console.log("received");
var len = data.results.length;
console.log(data);
	$("#stock").html("");
	for(i =0; i < len; i++){
                        $("#stock").append("<option value='" + data.results[i].ticker + "'>" + data.results[i].name + "</option>");
                  }

});	


}
function getDetails(){

  var user_stock = $("#stock").val();
$.ajax({
   url:"https://api.polygon.io/v3/reference/tickers/" + user_stock + "?apiKey=tqbCpLZEIgUaoxwa8Pq4wpa_oonoxIiC", 
   method: "GET"
   }).done(function(data) {
       console.log(data);	   
    	   
     $("#active").html("active: " + data.results.active);
     $("#address").html("address: " + data.results.address);
     $("#branding").html("branding: " + data.results.branding);
     $("#cik").html("cik number: " + data.results.cik);
     $("#composite_figi").html("composite OpenFIGI number: " + data.results.composite_figi);
     $("#currency_name").html("currency: " + data.results.currency_name);
     $("#description").html("description: " + data.results.currency_name);
     $("#homepage_url").html("homepage url: " + data.results.currency_name);
     $("#list_date").html("list date: " + data.results.list_date);
     $("#locale").html("locale: " + data.results.locale);
     $("#market").html("market: " + data.results.market);
     $("#market_cap").html("market cap: " + data.results.market_cap);
     $("#name").html("name: " + data.results.name);
     $("#phone_number").html("phone number: " + data.results.phone_number);
     $("#primary_exchange").html("primary exchange: " + data.results.primary_exchange);
     $("#round_lot").html("round lot: " + data.results.round_lot);
     $("#share_class_figi").html("share class number: " + data.results.share_class_figi);
     $("#share_class_shares_outstanding").html("share class outstanding: " + data.results.share_class_shares_outstanding);
     $("#sic_code").html("sic code: " + data.results.sic_code);
     $("#sic_description").html("sic description: " + data.results.sic_description);
     $("#ticker").html("ticker: " + data.results.ticker);
     $("#ticker_root").html("ticker root: " + data.results.ticker_root);
     $("#total_employees").html("total employees: " + data.results.total_employees);
     $("#type").html("type: " + data.results.type);
	$("#weighted_shares_outstanding").html("weighted shares outstanding: " + data.results.weighted_shares_outstanding);
	  storeInfo(user_stock, 'detail', data.results);
});
}
function getClosingPrice(){
	var user_stock = $("#stock").val();
	const current = new Date().toISOString().substring(0,10); 
	const prior = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().substring(0,10); // Subtract 7 days in milliseconds from the current date
        


	Url= "https://api.polygon.io/v2/aggs/ticker/" + user_stock + "/range/1/day/" + prior + "/" + current + "?adjusted=true&sort=asc&limit=120&apiKey=tqbCpLZEIgUaoxwa8Pq4wpa_oonoxIiC",
	 chartdata= [0];
	$.ajax({
	url: Url,
	method: "GET"
	}).done(function(data){
	console.log("my url:" + Url);
	var len = data.results.length;
	for( i = 0; i < len; i++){
		
	 chartdata[i]= data.results[i].c	 
	}
	xVal= ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
	new Chart("myChart", {
	type: "line",
	data: {  
	labels: xVal,  // x value: dates
	datasets: [{
	backgroundColor: "rgba(239,207,227,1.0)" ,
	data: chartdata,   // y value: prices 
	borderColor:"rgba(0,0,255,0.1)" ,
	}]
	}
	});
});
		
}
function getNews(){
	 var user_stock = $("#stock").val();
	$.ajax({
	url:"https://api.polygon.io/v2/reference/news?ticker=" + user_stock +"&apiKey=tqbCpLZEIgUaoxwa8Pq4wpa_oonoxIiC",
	method:"GET"
	}).done(function(data){
	var held = data;
	var len = data.results.length;
console.log(data);	
        for(i=0; i < len; i++){
//	$("#author").html("Author: " + data.results[i].author);
//	$("#description").html("Description " + data.results[i].description.substring(0,150) + "..." );


//		$("#title").html("Titlee: " + data.results[i].title);
	console.log("this:" + len);
		console.log("my dataaa: " , data);
	var rowString = '<tr><td>' + '<a href="' + data.results[i].article_url + '"> Click Me!</a></p>' +data.results[i].title  + '</td><td>' + data.results[i].author + '</td><td>' + data.results[i].description.substring(0,150) + "..."  + '</td></tr>';		
		$("#body").append(rowString);	
	}
	
		storeInfo(user_stock, 'news', data);


	});
	}
function storeInfo(stock, qType, data){
	$.ajax({
		url: "http://172.17.13.3/cse383_final/final.php",
		async: false,
		type: 'POST',
		data: {
			method: 'setStock',
			stockTicker: stock,
			queryType: qType,
			jsonData: JSON.stringify(data),


		}
	});	
	
	
	}

let myData = null;

function getData(){
var date = $("#date").val();
var maxNum = $("#maxlines").val();
var iterator = 10;

$.ajax({
        url: 'http://172.17.13.3/cse383_final/final.php',
        async: false,
        method: "GET",
        data: {
        method: 'getStock',
        date: date,
}
}).done(function (data) {
        myData = data;
        if(data.result.length < maxNum){
        iterator = data.result.length;
        } else {
        iterator= maxNum;
        }
	$("#body").html("");
for(let i =0; i < iterator; i++){
        $("#body").append('<tr><td>' + data.result[i].dateTime + '</td><td>' + data.result[i].queryType + '</td><td>' + data.result[i].stockTicker + '<td><button type="button" id="submit-button" onclick="moreDetails('+ i + ')">More</button></td></tr>');   
}

});


}
function moreDetails(j)
{
data = JSON.parse(myData.result[j].jsonData);
	if(myData.result[j].queryType === 'detail'){
        $('#entry').empty();
        $('#entry').append('<p>Company Name: ' + data.name + '</p>');
        $('#entry').append('<p>Ticker: ' + data.ticker + '</p>');
        $('#entry').append('<p>Locale: ' + data.locale + '</p>');
        $('#entry').append('<p>Type: ' + data.type + '</p>');
        $('#entry').append('<p>Primary Exchange: ' + data.name + '</p>');
        $('#entry').append('<p>Total Employees: ' + data.total_employees + '</p>');
        $('#entry').append('<p>Market Cap: ' + data.market_cap + '</p>');
        $('#entry').append('<p>Description: ' + data.description + '</p>');
        $('#entry').append('<p>Outstanding class shares: ' + data.share_class_shares_outstanding  + '</p>');
        $('#entry').append('<p>Website URL: ' + data.homepage_url + '</p>');
} else {
        $('#entry').empty();
        for(let i =0; i < data.results.length; i++){
        $('#entry').append('<h2>' + data.results[i].title + '</h2> <em>' + (i + 1) +' of ' + data.results.length + '</em>');
        $('#entry').append('<p> Author: ' + data.results[i].author + '</p>');
        $('#entry').append('<p> <a href="' + data.results[i].article_url + '"> Link  </a></p>');
        }

}
}


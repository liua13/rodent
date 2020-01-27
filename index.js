// sets up map
var map = L.map("mapid").setView([40.730610, -73.935242], 10);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl1YTEiLCJhIjoiY2s1dmk1cHFnMWt0bDNrbm51bnp4dWpnNSJ9.bC8XaM5r2Kot4XVVD5l76g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoibGl1YTEiLCJhIjoiY2s1dmk1cHFnMWt0bDNrbm51bnp4dWpnNSJ9.bC8XaM5r2Kot4XVVD5l76g'
}).addTo(map);

// gets data 
$.ajax({
    url: "https://data.cityofnewyork.us/resource/p937-wjvj.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "cLhx6wc3THHO11NmY9WpueUEb"
    }
}).done(function(data) {
	// displays markers
	var markerClusters = L.markerClusterGroup();
	for(var i = 0; i < data.length; i++){
		if(data[i].latitude!=null && data[i].street_name!=null && data[i].street_name.trim()!=""){
			(data[i].house_number==null) ? house_num = "" : house_num = data[i].house_number; // if no apartment / house number --> empty string
			var date = formatDate(data[i].inspection_date);
			var popup = "<b>" + house_num + " <span style='text-transform:capitalize;'>" + data[i].street_name.toLowerCase() + "</span><br/>" + 
				data[i].borough + ", " + "NY " + data[i].zip_code + "</b><br/><br/>" + 
				data[i].inspection_type + " INSPECTION:</br/><i>" + data[i].result + "</i> " + date;

		var m = L.marker([data[i].latitude, data[i].longitude]).bindPopup(popup);
		markerClusters.addLayer(m);
		}
	}
	map.addLayer(markerClusters);
});

// formats dates to display
function formatDate(date){
	//var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var year = date.substring(0, 4);
	var month = date.substring(5, 7);
	var day = date.substring(8, 10);
	return month + "/" + day + "/" + year;

}
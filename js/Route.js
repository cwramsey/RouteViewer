var Route = {
    construct: function() {
        var mapOptions = {
            center: { lat: -34.397, lng: 150.644},
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    },

    loadMapListener: function() {
        google.maps.event.addDomListener(window, 'load', Route.construct);
    }
};
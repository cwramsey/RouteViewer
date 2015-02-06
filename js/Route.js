var Route = {

    directionsDisplay: null,
    directionsService: new google.maps.DirectionsService(),
    map: null,
    stepTemplate: "",
    errorTemplate: "",

    construct: function() {
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
            zoom:7,
            center: chicago
        };
        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        this.directionsDisplay.setMap(this.map);

        $.get('templates/step.html', function(data) {
            Route.stepTemplate = data;
        });

        $.get('templates/error.html', function(data) {
            Route.errorTemplate = data;
        });
    },

    getRoute: function() {
        var start = $('#start').val();
        var end = $('#end').val();

        $('.step').remove();

        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        this.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                Route.directionsDisplay.setDirections(response);

                $.each(response.routes[0].legs[0].steps, function(i, obj) {

                    var num = i + 1;

                    var image_url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+obj.start_location.k+","+obj.start_location.D+"&fov=90";

                    $('.results').append(Route.stepTemplate);
                    $('.step:last .step-num').text(num);
                    $('.step:last .instruction').html(obj.instructions);
                    $('.step:last .street-view img').attr('src', image_url);

                })
            } else {
                $('.results').append(Route.errorTemplate);
            }
        });
    }
};

$('#go').click(function(e) {
    e.preventDefault();
    Route.getRoute();
});

$(document).keypress(function(e) {
   if (e.which == 13 && $('input').is(':focus')) {
       e.preventDefault();
       Route.getRoute();
   }
});
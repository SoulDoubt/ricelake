    // begin module
    var GoogleMapsIntegration = (function() {

        var map; // the google map instance
        var address = "1458 Rice Lake Road, Iroquois Falls, ON";
        var rlfc; // the google place for rlfc
        var startLocation; // user entered journey start location
        var directionService;
        var directionRenderer;

        return {

            initMap: function() {

                // setup necessary API Services
                var geocoder = new google.maps.Geocoder();
                directionService = new google.maps.DirectionsService();
                directionRenderer = new google.maps.DirectionsRenderer();

                var title = "Rice Lake Family Campground";

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: 48.678147,
                        lng: -80.809743
                    },
                    zoom: 16
                });

                directionRenderer.setMap(map);

                geocoder.geocode({
                    'address': address
                }, function(result, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        rlfc = result[0];
                        map.setCenter(rlfc.geometry.location);

                        var infowindow = new google.maps.InfoWindow({
                            content: '<b>' + title + '</b><br/>' + address,
                            size: new google.maps.Size(150, 50)
                        });

                        var marker = new google.maps.Marker({
                            position: rlfc.geometry.location,
                            map: map,
                            title: title
                        });

                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                        var input = (document.getElementById('txtDirectionFrom'));

                        var autocomplete = new google.maps.places.Autocomplete(input);
                        autocomplete.bindTo('bounds', map);
                        autocomplete.addListener('place_changed', function() {
                            startLocation = autocomplete.getPlace();
                            if (!startLocation.geometry) {
                                console.error("Autocomplete's returned place contains no geometry");
                                return;
                            }
                        });
                    }
                });
            },


            forceResizeMap: function() {
                google.maps.event.trigger(map, 'resize');
                map.setZoom(map.getZoom());
            },

            calculateAndDisplayRoute: function() {
                if (startLocation && directionService && directionRenderer) {
                    directionService.route({
                        origin: startLocation.geometry.location,
                        destination: rlfc.geometry.location,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function(response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionRenderer.setDirections(response);
                            if (response.routes) {
                                GoogleMapsIntegration.printRouteDetails(response.routes[0]);
                            }
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                }
            },

            printRouteDetails: function(route) {
                if (route.legs) {
                    var leg = route.legs[0];
                    var htmlstring = "";
                    var div = $("#routeDetails");
                    htmlstring += "Distance:&nbsp;" + leg.distance.text + "<br/>Time:&nbsp;" + leg.duration.text;

                    var steps = leg.steps;
                    for (var i = 0; i < steps.length; i++) {
                        var step = steps[i];
                        htmlstring += "<br/>" + step.instructions;
                    }

                    div.html(htmlstring);
                }
            }
        }
    }());
    // end module
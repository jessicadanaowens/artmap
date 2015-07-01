describe('map', function() {
    describe('searchbar', function () {
        beforeEach(module('mapApp'));

        var $scope, $controller, lon, lat, formattedAddress;

        beforeEach(inject(function (_$rootScope_, _$controller_) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_;

            lon = 39;
            lat = -104;
            formattedAddress = "Denver, CO 80218";

            $controller('mapCtrl', {$scope: $scope, lon: lon, lat: lat, formattedAddress: formattedAddress});
        }));

        describe('initial map load', function () {
            it("populates the search bar with the query passed from the home page", function() {
                $scope.init();
                expect($scope.formattedAddress).toEqual("Denver, CO 80218")
            });

            it("sets up the google maps autocomplete service", function() {
                spyOn(google.maps.places, "Autocomplete");

                $scope.init();

                expect($scope.autocomplete).toBeDefined();
                expect(google.maps.places.Autocomplete).toHaveBeenCalled();
            });

            it("uses the autocomplete service to return cities in the restricted country", function() {
                spyOn(google.maps.places, "Autocomplete");

                $scope.init();

                expect(google.maps.places.Autocomplete).toHaveBeenCalledWith(
                    (document.getElementById('autocomplete')),
                    {types: ['(cities)'], componentRestrictions: $scope.countryRestrict}
                )
            });

            it('uses google api to listen to when the user changes the search', function() {
                spyOn(google.maps.event, "addListener").and.callThrough;

                $scope.init();

                expect(google.maps.event.addListener).toHaveBeenCalledWith($scope.autocomplete, 'place_changed', $scope.onPlaceChanged);
            });
        });
    });
});

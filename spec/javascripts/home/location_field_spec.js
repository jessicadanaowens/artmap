describe('home', function() {
    describe('locationField', function () {
        beforeEach(module('mapApp'));

        var $scope, $controller, $state;

        beforeEach(inject(function (_$rootScope_, _$controller_, _$state_) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_;
            $state = _$state_;

            $controller('homeCtrl', {$scope: $scope, $state: $state});
        }));

        describe('search functionality', function() {
            it("restricts the search to the US by default", function() {
                $scope.init();

                expect($scope.countryRestrict.country).toEqual('us');
            });

            it("uses the google maps autocomplete service", function() {
                spyOn(google.maps.places, "Autocomplete").and.callThrough;

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

            it('creates a google listener for the search field', function() {
                spyOn(google.maps.event, "addListener").and.callThrough;

                $scope.init();

                expect(google.maps.event.addListener).toHaveBeenCalledWith($scope.autocomplete, 'place_changed', $scope.onPlaceChanged);
            });

            it('uses google maps api to get the selected place', function() {
            });

            it('goes to the map state if the user selects a place that has coordinates', function() {
            });

            it("shows 'Enter a city' text in the searchfield if the user does not select a place", function() {
            });
        });
    })
});
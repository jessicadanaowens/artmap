var google = {
  maps: {
    Animation: {
      DROP: function() {
        return true
      }
    },
    Marker: function() {
      return true;
    },
    InfoWindow: function() {
      return true;
    },
    event: {
      addListener: function(itemWatched, listenerTitle, functionFired) {
        return functionFired
      },
      addDomListener: function() {
        return 'domListener'
      }
    },
    places: {
      Autocomplete: function() {
        return 'autocomplete';
      },
      PlacesService: function() {
        return 'places';
      }
    },
    LatLng: function(lon, lat) {
      return {A: lon, F: lat}
    },
    Map: function() {
      return 'map';
    }
  }

};


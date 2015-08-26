(function ( $ ){
  "use strict";

  var feedID = 1125809548;

  // SET API KEY

  xively.setKey( "1utiYwVwm7QH1KCQowljICDEvikbpbCEUs0mDktH4baqg4Va" ); // do not use this one, create your own at xively.com

  // get all feed data in one shot

  xively.feed.get (feedID, function (data) {
    // this code is executed when we get data back from Xively

    var feed = data,
        datastream,
        value, value1, value2;

    // loop through datastreams

    for (var x = 0, len = feed.datastreams.length; x < len; x++) {
      datastream = feed.datastreams[x];
      value = parseInt(datastream["current_value"]);

      // Bedroom Light
      if ( datastream.id === "bedroom_light" ) {
        value1 = value;

        // make it live
        xively.datastream.subscribe( feedID, "bedroom_light", function ( event , data ) {
          ui.fakeLoad();
          ui.lights.auto( parseInt(data["current_value"]) | value2 );
        });
      }

      // Parlor Light
      if ( datastream.id === "parlor_light" ) {
        value2 = value;

        // make it live
        xively.datastream.subscribe( feedID, "parlor_light", function ( event , data ) {
          ui.fakeLoad();
          ui.lights.auto( parseInt(data["current_value"]) | value1 );
        });
      }

      // TEMPERATURE

      if ( datastream.id === "temperature" ) {
        $(".js-temperature").html( datastream["current_value"] );

        // make it live
        xively.datastream.subscribe( feedID, "temperature", function ( event , data ) {
          ui.fakeLoad();
          $(".js-temperature").html( data["current_value"] );
        });
      }
    }
    ui.lights.auto( value1 | value2 );

    // SHOW UI

    $(".app-loading").fadeOut(200, function(){
      $(".app-content-inner").addClass("open");
    });
  });


})( jQuery );

import React, { Component } from "react";
import { floodCoords } from "./Data";

// Safe marker loader
let MarkerWithLabel = null;

if (window.google && window.google.maps) {
  MarkerWithLabel = require("markerwithlabel")(window.google.maps);
} else {
  console.warn("Google Maps API not loaded. Map features disabled.");
}

export default class Map extends Component {
  componentDidMount() {
    // Bail out cleanly if Maps API is missing
    if (!window.google || !window.google.maps || !MarkerWithLabel) {
      return;
    }

    const map = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: {
          lat: 39.756177,
          lng: -104.970738
        },
        zoom: 14,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style:
            window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position:
            window.google.maps.ControlPosition.BOTTOM_CENTER
        },
        mapTypeId:
          window.google.maps.MapTypeId.ROADMAP
      }
    );

    new window.google.maps.Polygon({
      map: map,
      path: [],
      strokeColor: "#081EFC",
      strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: "#7B86FB",
      fillOpacity: 0.8
    });

    const Loop = i => {
      setTimeout(() => {
        if (!floodCoords[i]) return;

        new MarkerWithLabel({
          position: {
            lat: floodCoords[i].lat,
            lng: floodCoords[i].lng
          },
          icon: {
            path:
              "M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0",
            fillColor: "lightblue",
            fillOpacity: 0.9,
            strokeColor: "blue",
            strokeWeight: 1.1,
            scale: 0.15
          },
          draggable: true,
          raiseOnDrag: true,
          map: map,
          labelAnchor: new window.google.maps.Point(4, 22),
          labelClass: "",
          labelStyle: { opacity: 0.75 }
        });

        i++;
        if (i < floodCoords.length) {
          Loop(i);
        }
      }, 250);
    };

    map.addListener("click", () => {
      Loop(0);
    });
  }

  render() {
    return (
      <div id="app">
        <div
          id="map"
          style={{ width: "100%", height: "80vh" }}
        />
      </div>
    );
  }
}

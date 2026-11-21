import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapViewComponent({ style }) {
  return (
    <MapView
      style={style}
      initialRegion={{
        latitude: 33.6844,
        longitude: 73.0479,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      }}
      showsMyLocationButton={false}
      showsCompass={false}
      zoomControlEnabled={false}
    >
      <Marker
        coordinate={{ latitude: 33.6844, longitude: 73.0479 }}
        title="Premium Destination"
        description="Northern Pakistan exploration hub"
      />
    </MapView>
  );
}

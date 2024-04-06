import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const CurrLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState({
      city: null,
      district: null,
      country: null,
      region: null,
      streetNumber: null
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error fetching location');
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      // Fetch user-friendly location name using reverse geocoding
      (async () => {
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (reverseGeocode && reverseGeocode.length > 0) {
            const { city, region, country, district, streetNumber } = reverseGeocode[0];
            setUserLocation({
              city: city,
              region: region,
              country: country,
              district: district,
              streetNumber: streetNumber
            });
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
          setCity('Unknown Location');
        }
      })();
    }
  }, [location]);
  return (
      <Text>{userLocation.city || 'Waiting...'}</Text>
  );
};

export default CurrLocation;
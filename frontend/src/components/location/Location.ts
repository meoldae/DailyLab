import { UpdateLocation } from "@/api/User";

export function getUserLocation() {
    navigator.geolocation.watchPosition(function(position) {
        const locationParam = {
            "latitude" : position.coords.latitude,
            "longitude" : position.coords.longitude
        }
        UpdateLocation(locationParam, ({data}) => {}, (error) => console.log(error));
      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
          console.log("you denied me :-(");
      });
}
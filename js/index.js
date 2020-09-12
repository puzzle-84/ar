const  coordinates = [{lat:53.850547,long:27.491427,},{lat:53.850547,long:27.491427,},{lat:53.850547,long:27.491427,text:'test'}]
window.onload = () => {
  
  navigator.geolocation.getCurrentPosition(success);
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const delta = document.querySelector("#delta").value;

 
    let places = staticLoadPlaces(coordinates);
    renderPlaces(places, 53.850547, 27.491427);
    function staticLoadPlaces(coordinates) {
      return  coordinates.map((i,index)=>[
        {
          name: "Gift"+ index,
          location: {
            lat: i.lat,
            lng: i.long,
          },
        },
      ]);
    }
  }
};

var models = [
{
    url: "./data/flag.gltf",
    scale: "2 2 2",
    info: "flag, Lv. 5, HP 10/10",
    rotation: "0 0 0",
  },
  
];



function renderPlaces(places, latitude, longitude) {
  let scene = document.querySelector("a-scene");
  places.forEach((place) => {
    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("animation-mixer", ""); 
    scene.appendChild(model);
  });
}

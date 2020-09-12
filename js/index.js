window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  button.innerText = "﹖";
  navigator.geolocation.getCurrentPosition(success);
  function success(position) {
    console.log(position)
    const coordinates = document.querySelector(".coordinates");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const delta = document.querySelector("#delta").value;

    coordinates.textContent = `lat:${latitude + delta}, long:${
      longitude + delta
    }`;
    // 53.851930, 27.491437
    let places = staticLoadPlaces(53.850547, 27.491427);
    renderPlaces(places, 53.850547, 27.491427);
    function staticLoadPlaces(latitude
      ,longitude) {
      return [
        {
          name: "Gift",
          location: {
            lat: latitude,
            lng: longitude,
          },
        },
      ];
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
  
  {
    url: "./magnemite/scene.gltf",
    scale: "0.5 0.5 0.5",
    info: "Magnemite, Lv. 5, HP 10/10",
    rotation: "0 180 0",
  },
  
];

var modelIndex = 0;
var setModel = function (model, entity) {
  const scale = document.querySelector("#scale").value;
  const scaleData = `${scale} ${scale} ${scale}`;

  const rotation = `${document.querySelector("#rotation").value} ${
    document.querySelector("#rotation2").value
  } ${document.querySelector("#rotation3").value}`;

  if (model.scale) {
    entity.setAttribute("scale", scaleData);
  }

  if (model.rotation) {
    entity.setAttribute("rotation", rotation);
  }

  if (model.position) {
    entity.setAttribute("position", model.position);
  }

  entity.setAttribute("gltf-model", model.url);

  const div = document.querySelector(".instructions");
  div.innerText = model.info;
};

function renderPlaces(places, latitude, longitude) {
  let scene = document.querySelector("a-scene");
  places.forEach((place) => {
    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );

    setModel(models[modelIndex], model);

    model.setAttribute("animation-mixer", "");

    document
      .querySelector('button[data-action="change"]')
      .addEventListener("click", function () {
        var entity = document.querySelector("[gps-entity-place]");
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
        console.log("index", newIndex);
      });

    scene.appendChild(model);
  });
}

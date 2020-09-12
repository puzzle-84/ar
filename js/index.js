window.onload = () => {
    // debugger;
    const coordinates = [
        {
            lat: 53.850547,
            long: 27.491427,
            scale: 4,
            rotation: '0 0 0',
            url: './data/flag.gltf',
        },
        {
            lat: 53.85176,
            long: 27.490791,
            scale: 4,
            rotation: '0 0 0',
            url: './data/flag.gltf',
        },
        { lat: 53.850547, long: 27.491427, text: 'test' },
    ];
    let places = staticLoadPlaces(coordinates);
    renderPlaces(places);
    function staticLoadPlaces(coordinates) {
        return coordinates.map((i, index) => ({
            name: 'Gift' + index,
            location: {
                lat: i.lat,
                lng: i.long,
            },
            ...i,
        }));
    }
};
var setModel = function (entity, model) {
    const scaleData = `${model.scale} ${model.scale} ${model.scale}`;
    if (model.scale) {
        entity.setAttribute('scale', scaleData);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }
    entity.setAttribute('gltf-model', model.url);
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    places.forEach((place) => {
        let model = document.createElement('a-entity');
        model.setAttribute(
            'gps-entity-place',
            `latitude: ${place.location.lat}; longitude: ${place.location.lng};`,
        );
        setModel(model, place);
        model.setAttribute('animation-mixer', '');
        scene.appendChild(model);
    });
}

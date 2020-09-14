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
        // {
        //     lat: 53.85176,
        //     long: 27.490791,
        //     scale: 4,
        //     rotation: '0 0 0',
        //     url: './data/flag.gltf',
        // },
        // {
        //     lat: 53.85176,
        //     long: 27.490791,
        //     scale: 120,
        //     type: 'text',
        //     value: 'No markers around',
        // },
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
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    places.forEach((place) => {
        let model;
        if (place.type === 'text') {
            model = document.createElement('a-text');
            model.setAttribute('value', place.value);
        } else {
            model = document.createElement('a-entity');
        }
        model.setAttribute('look-at', '[gps-camera]');
        model.setAttribute(
            'gps-entity-place',
            `latitude: ${place.location.lat}; longitude: ${place.location.lng};`,
        );
        model.setAttribute('animation-mixer', '');
        setModel(model, place);
        scene.appendChild(model);
    });
}

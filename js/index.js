window.onload = () => {
    // debugger;
    const coordinates = [
        {
            lat: 53.850547,
            long: 27.491427,
            scale: 6,
            url: './data/flag.gltf',
        },
        {
            lat: 53.85176,
            long: 27.490791,
            scale: 6,
            url: './data/flag.gltf',
        },
        {
            lat: 53.852578,
            long: 27.49305,
            scale: 90,
            type: 'text',
            value: 'Belarus forever!',
        },
    ];

    renderPlaces(coordinates);

    function setModel(model) {
        const entity =
            model.type === 'text'
                ? document.createElement('a-text')
                : document.createElement('a-entity');
        const scaleData = `${model.scale} ${model.scale} ${model.scale}`;
        if (model.scale) {
            entity.setAttribute('scale', scaleData);
        }
        if (model.rotation) {
            entity.setAttribute('rotation', model.rotation);
        }

        if (model.position) {
            entity.setAttribute('position', model.position);
            entity.setAttribute('look-at', '[gps-camera]');
        }
        if (model.type === 'text') {
            entity.setAttribute('value', model.value);
            entity.setAttribute('look-at', '[gps-camera]');
        } else {
            entity.setAttribute('gltf-model', model.url);
        }
        entity.setAttribute(
            'gps-entity-place',
            `latitude: ${model.lat}; longitude: ${model.long};`,
        );

        return entity;
    }

    function renderPlaces(places) {
        let scene = document.querySelector('a-scene');
        places.forEach((place) => {
            scene.appendChild(setModel(place));
        });
    }
};

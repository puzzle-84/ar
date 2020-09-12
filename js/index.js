window.onload = () => {
    const coordinates = [
        { lat: 53.850547, long: 27.491427 },
        { lat: 53.850547, long: 27.491427 },
        { lat: 53.850547, long: 27.491427, text: 'test' },
    ];
    let places = staticLoadPlaces(coordinates);
    renderPlaces(places);
    function staticLoadPlaces(coordinates) {
        return coordinates.map((i, index) => [
            {
                name: 'Gift' + index,
                location: {
                    lat: i.lat,
                    lng: i.long,
                },
            },
        ]);
    }
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    places.forEach((place) => {
        let model = document.createElement('a-entity');
        model.setAttribute(
            'gps-entity-place',
            `latitude: ${place.location.lat}; longitude: ${place.location.lng};`,
        );
        model.setAttribute('animation-mixer', '');
        scene.appendChild(model);
    });
}

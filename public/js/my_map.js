// Initialize and add the map
function initMap() {
    // The location of Uluru
    const greenscape_nursery = { lat: 16.9154078, lng: 81.8077094 };
    // The map, centered at greenscape_nursery
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: greenscape_nursery
    });
    // The marker, positioned at greenscape_nursery
    const marker = new google.maps.Marker({
        position: greenscape_nursery,
        map: map,
    });
}


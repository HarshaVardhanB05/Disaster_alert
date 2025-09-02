// Initialize Map
const map = L.map('map').setView([20, 78], 5); // default India view

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Try to get user location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Center map on user
    map.setView([lat, lon], 12);

    // Mark user location
    L.marker([lat, lon]).addTo(map)
      .bindPopup("📍 You are here")
      .openPopup();

    // Example shelters (replace with real API or database)
    const shelters = [
      { name: "Community Shelter A", coords: [lat + 0.02, lon + 0.02] },
      { name: "Relief Camp B", coords: [lat - 0.01, lon + 0.03] },
      { name: "Safe Zone C", coords: [lat + 0.03, lon - 0.02] }
    ];

    shelters.forEach(shelter => {
      L.marker(shelter.coords).addTo(map)
        .bindPopup(`🏠 ${shelter.name}`);
    });

  }, () => {
    alert("⚠️ Location access denied. Showing default view.");
  });
} else {
  alert("❌ Geolocation not supported by your browser.");
}

document.addEventListener("DOMContentLoaded", () => {
  const sosBtn = document.querySelector("#sos-btn");
  const mapContainer = document.querySelector("#map");
  const shelterList = document.querySelector("#shelter-list");

  sosBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        alert(`🚨 SOS Triggered!\nLocation: ${lat}, ${lon}`);
    //!whatsapp navigation
        const message = `🚨 SOS! I need help. My location: https://maps.google.com/?q=${lat},${lon}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");

      }, () => {
        alert("⚠️ Location access denied!");
      });
    } else {
      alert("⚠️ Geolocation not supported.");
    }
  });

  //! Show Location on Map + Nearby Shelters
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const map = L.map(mapContainer).setView([lat, lon], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here").openPopup();

      const shelters = [
        { name: "City Hall Shelter", lat: lat + 0.01, lon: lon + 0.01 },
        { name: "Community Center", lat: lat - 0.01, lon: lon - 0.01 },
        { name: "School Shelter", lat: lat + 0.02, lon: lon - 0.01 }
      ];

      shelters.forEach(shelter => {
        L.marker([shelter.lat, shelter.lon]).addTo(map)
          .bindPopup(`🏠 ${shelter.name}`);
        
        const li = document.createElement("li");
        li.textContent = `${shelter.name} (${shelter.lat.toFixed(3)}, ${shelter.lon.toFixed(3)})`;
        shelterList.appendChild(li);
      });

    }, () => {
      mapContainer.innerHTML = "<p>⚠️ Location permission denied. Cannot load shelters.</p>";
    });
  }
});

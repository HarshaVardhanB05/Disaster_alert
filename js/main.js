document.addEventListener("DOMContentLoaded", () => {
  const sosBtn = document.querySelector("#sos-btn");
  const mapContainer = document.querySelector("#map");
  const shelterList = document.querySelector("#shelter-list");
  const langBtn = document.querySelector("#lang-toggle");
  const searchBar = document.querySelector("#search-bar");
  let isTamil = false;

  // ✅ SOS Button
  sosBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        alert(`🚨 SOS Triggered!\nLocation: ${lat}, ${lon}`);

        const message = `🚨 SOS! I need help. My location: https://maps.google.com/?q=${lat},${lon}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");

      }, () => {
        alert("⚠️ Location access denied!");
      });
    } else {
      alert("⚠️ Geolocation not supported.");
    }
  });

  // ✅ Map & Shelters
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const map = L.map(mapContainer).setView([lat, lon], 13);

      // ✅ Modern Carto Light Map
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
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

  // ✅ Language Toggle
  const translations = {
    en: {
      home: "Home",
      alerts: "🚨 Disaster Alerts",
      guidelines: "📖 Safety Guidelines",
      contacts: "📞 Emergency Contacts",
      shelters: "🏠 Nearby Shelters",
      news: "📰 Disaster News",
      sos: "🚨 SOS",
      tagline: "Stay safe with real-time alerts, emergency contacts, and shelters."
    },
    ta: {
      home: "முகப்பு",
      alerts: "🚨 அபாய எச்சரிக்கைகள்",
      guidelines: "📖 பாதுகாப்பு வழிகாட்டிகள்",
      contacts: "📞 அவசர தொடர்புகள்",
      shelters: "🏠 அருகிலுள்ள தங்குமிடங்கள்",
      news: "📰 பேரிடர் செய்திகள்",
      sos: "🚨 அவசரம்",
      tagline: "உண்மையான நேர எச்சரிக்கைகள், அவசர தொடர்புகள் மற்றும் தங்குமிடங்களுடன் பாதுகாப்பாக இருங்கள்."
    }
  };

  function updateLanguage(lang) {
    document.querySelector("#nav-home").textContent = lang.home;
    document.querySelector("#nav-alerts").textContent = lang.alerts;
    document.querySelector("#nav-guidelines").textContent = lang.guidelines;
    document.querySelector("#nav-contacts").textContent = lang.contacts;
    document.querySelector("#nav-shelters").textContent = lang.shelters;
    document.querySelector("#nav-news").textContent = lang.news;

    document.querySelector("#alerts-title").textContent = lang.alerts;
    document.querySelector("#guidelines-title").textContent = lang.guidelines;
    document.querySelector("#contacts-title").textContent = lang.contacts;
    document.querySelector("#shelters-title").textContent = lang.shelters;
    document.querySelector("#news-title").textContent = lang.news;

    document.querySelector("#sos-btn").textContent = lang.sos;
    document.querySelector("#tagline").textContent = lang.tagline;
  }

  langBtn.addEventListener("click", () => {
    isTamil = !isTamil;
    if (isTamil) {
      updateLanguage(translations.ta);
      langBtn.textContent = "English";
    } else {
      updateLanguage(translations.en);
      langBtn.textContent = "தமிழ்";
    }
  });

  // ✅ Search Functionality
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    // Filter alerts
    document.querySelectorAll(".alert-card").forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? "block" : "none";
    });

    // Filter contacts
    document.querySelectorAll(".contact-list li").forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(query) ? "block" : "none";
    });
  });
});


  // ✅ Dark Mode Toggle
  const darkBtn = document.querySelector("#dark-toggle");

  // Load preference from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkBtn.textContent = "☀️";
  }

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkBtn.textContent = "☀️"; // sun icon
      localStorage.setItem("darkMode", "enabled");
    } else {
      darkBtn.textContent = "🌙"; // moon icon
      localStorage.setItem("darkMode", "disabled");
    }
  });

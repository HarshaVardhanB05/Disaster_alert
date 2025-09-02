async function fetchAlerts() {
  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  try {
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById("alerts");

    container.innerHTML = "";
    data.features.slice(0, 5).forEach(eq => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow border-l-4 border-red-500 mb-4";
      card.innerHTML = `
        <h3 class="font-bold text-lg text-red-600">Earthquake - M${eq.properties.mag}</h3>
        <p class="text-gray-600">${eq.properties.place}</p>
        <p class="text-sm text-gray-400">${new Date(eq.properties.time).toLocaleString()}</p>
        <a href="${eq.properties.url}" target="_blank" class="text-teal-600 underline">More Info</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching alerts:", err);
  }
}

window.addEventListener("load", fetchAlerts);

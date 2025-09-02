import shelters from "../data/shelters.json" assert { type: "json" };

function renderShelters(filter = "") {
  const list = document.getElementById("shelters");
  list.innerHTML = "";
  shelters
    .filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(shelter => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded-lg shadow";
      div.innerHTML = `
        <h3 class="font-bold text-lg text-teal-600">${shelter.name}</h3>
        <p class="text-gray-600"><i class="fas fa-map-marker-alt mr-2"></i>${shelter.location}</p>
        <p class="text-green-600 font-semibold">${shelter.status}</p>
        <p>${shelter.capacity}</p>
        <p class="mt-2 text-sm text-teal-500">${shelter.resources}</p>
      `;
      list.appendChild(div);
    });
}

window.addEventListener("load", () => renderShelters());

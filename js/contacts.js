import contacts from "../data/contacts.json" assert { type: "json" };

function renderContacts(filter = "") {
  const list = document.getElementById("contacts");
  list.innerHTML = "";
  contacts
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(contact => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded-lg shadow flex justify-between items-center";
      div.innerHTML = `
        <div>
          <h3 class="font-bold text-lg text-teal-600">${contact.name}</h3>
          <p class="text-gray-600">${contact.number}</p>
        </div>
        <a href="tel:${contact.number}" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-full">
          <i class="fas fa-phone"></i>
        </a>
      `;
      list.appendChild(div);
    });
}

window.addEventListener("load", () => renderContacts());

const sections = ['home', 'alerts', 'guidelines', 'contacts', 'shelters', 'news'];

function showSection(sectionId) {
  sections.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active-nav');
    if (item.getAttribute('onclick').includes(sectionId)) {
      item.classList.add('active-nav');
    }
  });
}

// SOS modal logic
const sosButton = document.getElementById('sos-button');
const sosModal = document.getElementById('sos-modal');
const cancelSosButton = document.getElementById('cancel-sos');
const confirmSosButton = document.getElementById('confirm-sos');
const alertSentDiv = document.getElementById('alert-sent');

if (sosButton) {
  sosButton.addEventListener('click', () => sosModal.classList.remove('hidden'));
  cancelSosButton.addEventListener('click', () => sosModal.classList.add('hidden'));
  confirmSosButton.addEventListener('click', () => {
    sosModal.classList.add('hidden');
    alertSentDiv.classList.remove('hidden');
    setTimeout(() => alertSentDiv.classList.add('hidden'), 3000);
  });
}

// SOS button → Direct WhatsApp
document.getElementById("sosButton").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const message = encodeURIComponent(
        `🚨 SOS! I need help. My location: https://www.google.com/maps?q=${lat},${lon}`
      );

      // Option 1: Let user choose contact
      window.open(`https://wa.me/?text=${message}`, "_blank");

      // Option 2: Send directly to one number
      // window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, "_blank`);
    });
  } else {
    alert("Geolocation not supported!");
  }
});

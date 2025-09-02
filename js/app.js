document.getElementById("sosButton").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const message = encodeURIComponent(
        `🚨 SOS! I need help. My location: https://www.google.com/maps?q=${lat},${lon}`
      );

      // If you want user to pick contact (no number given):
      window.open(`https://wa.me/?text=${message}`, "_blank");

      // If you want to send directly to a specific number:
      // window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, "_blank");
    });
  } else {
    alert("Geolocation not supported!");
  }
});

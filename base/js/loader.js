
window.addEventListener("load", () => {
  const key = localStorage.getItem('guru');
  if (!key) {
    window.open("../../index.html", "_self");
  } else {
    fetch('https://herestohope.onrender.com/contacts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key,
      },
    }).then((res) => {
      if (res.status == 200) {
        window.location.href = '../../base/admin.html';
      } else {
        window.open("./admin-login.html", "_self");
      }
    });
  }
});

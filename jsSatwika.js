const form = document.getElementById("bookingForm"); 

const successMessage =
document.getElementById("successMessage");

const bookingHistory =
document.getElementById("bookingHistory");

let bookings =
JSON.parse(localStorage.getItem("bookings")) || [];

bookings = bookings.map((booking) => ({
  ...booking,
  guests: booking.guests
    ? booking.guests.replace(/People/gi, "Orang")
    : booking.guests,
}));

renderBookings();

/* SUBMIT */
form.addEventListener("submit", function(e){

  e.preventDefault();

  const guestCount =
  parseInt(document.getElementById("guests").value);

  let paket = "";

  if(guestCount === 1){

    paket = "Paket Wanci (1 orang)";

  }else if(guestCount === 2){

    paket = "Paket Sapasang (2 orang)";

  }else if(guestCount >= 3 && guestCount <= 10){

    paket = "Paket Serumpun (Family 3-10 orang)";

  }else if(guestCount > 10){

    paket = "Paket Kenduri (Grup >10 orang)";

  }

  const booking = {

    id: Date.now(),

    name:
    document.getElementById("name").value,

    phone:
    document.getElementById("phone").value,

    date:
    document.getElementById("date").value,

    time:
    document.getElementById("time").value,

    guests:
    guestCount + " Orang",

    paket:
    paket,

    notes:
    document.getElementById("notes").value

  };

  bookings.unshift(booking);

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );

  renderBookings();

  successMessage.style.display = "block";

  form.reset();

  setTimeout(() => {

    successMessage.style.display = "none";

  },3000);

});

/* RENDER HISTORY */
function renderBookings(){

  if(bookings.length === 0){

    bookingHistory.innerHTML = `
      <p class="empty-message">
        No booking history yet.
      </p>
    `;

    return;
  }

  bookingHistory.innerHTML = "";

  bookings.forEach((booking, index) => {

    bookingHistory.innerHTML += `

      <div class="history-card">

        <h3>${booking.name}</h3>

        <p>
          <strong>Nomor Telepon:</strong>
          ${booking.phone}
        </p>

        <p>
          <strong>Tanggal:</strong>
          ${booking.date}
        </p>

        <p>
          <strong>Waktu:</strong>
          ${booking.time}
        </p>

        <p>
          <strong>Tamu:</strong>
          ${booking.guests}
        </p>

        <p>
          <strong>Pilihan Paket:</strong>
          ${booking.paket}
        </p>

        <p>
          <strong>Catatan:</strong>
          ${booking.notes}
        </p>

        <button 
          class="cancel-btn"
          onclick="deleteBooking(${index})"
        >
          Batalkan Reservasi
        </button>

      </div>

    `;

  });

}

/* DELETE SATU RESERVASI */
function deleteBooking(index){

  bookings.splice(index, 1);

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );

  renderBookings();

}

/* INTERACTIVE EFFECT */
document.addEventListener("mousemove", (e) => {

  const card =
  document.querySelector(".booking-form");

  let x =
  (window.innerWidth / 2 - e.pageX) / 40;

  let y =
  (window.innerHeight / 2 - e.pageY) / 40;

  card.style.transform =
  `rotateY(${x}deg) rotateX(${-y}deg)`;

});

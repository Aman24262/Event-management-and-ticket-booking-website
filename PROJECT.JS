function bookTicket() {
    document.getElementById('bookingForm').style.displ
    ay = 'block';
    }
    function submitForm(event) {
    event.preventDefault();
    const eventName =
    document.getElementById('eventName').value;
    const name =
    document.getElementById('name').value;
    const email =
    document.getElementById('email').value;
    const quantity =
    document.getElementById('quantity').value;
    alert(`Booking confirmed for ${quantity} ticket(s)
    to ${eventName} for ${name} (${email})`);
    // Additional processing or API call can be added
    here
    }
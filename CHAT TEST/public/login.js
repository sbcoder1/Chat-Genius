document.getElementById('generate-otp').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Store in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('otp', otp);

        alert(`Your OTP is: ${otp}`);

        // Show OTP input and verify button
        document.getElementById('otp').style.display = 'block';
        document.getElementById('verify-otp').style.display = 'block';
    } else {
        alert('Please fill all fields');
    }
});

document.getElementById('verify-otp').addEventListener('click', () => {
    const enteredOtp = document.getElementById('otp').value;
    const storedOtp = localStorage.getItem('otp');

    if (enteredOtp === storedOtp) {
        alert('OTP Verified Successfully!');
        window.location.href = 'chatgpt.html'; // Redirect to next page
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

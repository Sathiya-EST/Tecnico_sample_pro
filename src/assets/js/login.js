  const form = document.getElementById("loginForm");
      const errorMsg = document.getElementById("errorMsg");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        // Dummy login logic (replace with actual API call)
        if (email === "user@example.com" && password === "123456") {
          alert("Login successful!");
          // Redirect to dashboard or home page
        } else {
          errorMsg.classList.remove("hidden");
        }
      });

      function togglePassword() {
        const passwordInput = document.getElementById("password");
        passwordInput.type =
          passwordInput.type === "password" ? "text" : "password";
      }
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        if (email === "user@example.com" && password === "123456") {
          window.location.href = "index.html"; // Redirect to dashboard
        } else {
          errorMsg.classList.remove("hidden");
        }
      });
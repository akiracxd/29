document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const orderButtons = document.querySelectorAll(".btn");
    const userInfo = document.getElementById("user-info");
    const orderHistory = document.getElementById("order-history");

    registerForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const login = document.getElementById("reg-login").value;
        const password = document.getElementById("reg-password").value;
        localStorage.setItem("user", JSON.stringify({ login, password }));
        alert("Регистрация успешна!");
    });

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.login === login && storedUser.password === password) {
            localStorage.setItem("loggedIn", login);
            window.location.href = "profile.html";
        } else {
            alert("Неверные данные!");
        }
    });

    function orderMovie(movie) {
        const loggedInUser = localStorage.getItem("loggedIn");
        if (!loggedInUser) {
            alert("Сначала войдите в аккаунт!");
            return;
        }
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({ user: loggedInUser, movie });
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Фильм добавлен в заказ!");
    }

    orderButtons.forEach(button => {
        button.addEventListener("click", () => orderMovie(button.previousElementSibling.textContent));
    });

    if (userInfo && orderHistory) {
        const loggedInUser = localStorage.getItem("loggedIn");
        if (loggedInUser) {
            userInfo.textContent = `Вы вошли как ${loggedInUser}`;
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.filter(o => o.user === loggedInUser).forEach(order => {
                const li = document.createElement("li");
                li.textContent = order.movie;
                orderHistory.appendChild(li);
            });
        }
    }
});

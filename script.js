document.addEventListener("DOMContentLoaded", () => {
    const orderButtons = document.querySelectorAll(".order-btn");
    const loggedInUser = localStorage.getItem("loggedIn");

    // Проверяем, если пользователь вошёл, меняем текст кнопки на "Заказать"
    if (loggedInUser) {
        orderButtons.forEach(button => {
            button.textContent = "Заказать";  // меняем текст кнопки на "Заказать"
        });
    }

    // Обработчик кнопки "Заказать"
    orderButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const movieTitle = e.target.getAttribute("data-movie");

            if (!loggedInUser) {
                alert("Сначала войдите в аккаунт!");
                return;
            }

            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push({ user: loggedInUser, movie: movieTitle });
            localStorage.setItem("orders", JSON.stringify(orders));
            alert(`${movieTitle} добавлен в ваш заказ!`);
        });
    });
});

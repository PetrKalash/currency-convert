document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".currency-option").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault()
            document.querySelectorAll(".currency-option").forEach(function (btn) {
                btn.classList.remove('selected')
            })
            button.classList.add('selected')
        })
    })

    document.getElementById("currency_form").addEventListener("submit", async function (event) {
        event.preventDefault()

        const amount = document.getElementById("amount").value
        const from = document.getElementById("from").value
        const to = document.getElementById("to").value

        try {
            const response = await fetch(`/convert?amount=${amount}&from=${from}&to=${to}`);
            const result = await response.text()
            document.getElementById("result").innerText = `Результат: ${amount}, ${from}, ${result}, ${to}`
        } catch (error) {
            console.error("Ошибка при конвертации! ", error)
            document.getElementById("result").innerText = "Ошибка при конвертации!"
        }
    })
})
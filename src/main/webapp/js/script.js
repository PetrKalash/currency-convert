document.addEventListener("DOMContentLoaded", function () {
    function handleCurrencySelection(event) {
        event.preventDefault();

        const [currency, type] = this.id.split("-");
        document.getElementById(type).value = currency;

        this.closest('.menu_convert_items').querySelectorAll('a').forEach(link => {
            link.classList.remove('selected');
        });
        this.classList.add('selected');
    }
    document.querySelectorAll(".currency-option").forEach(item => {
        item.addEventListener("click", handleCurrencySelection);
    });

     ['from', 'to'].forEach(type => {
         const value = document.getElementById(type).value
         const button = document.getElementById(`${value}-${type}`)
         if (button) button.classList.add('selected')
     });

    async function handleCurrencyForm(event) {
        event.preventDefault()

        const amount = document.getElementById("amount-from").value
        const from = document.getElementById("from").value
        const to = document.getElementById("to").value

        try {
            const response = await fetch(`/convert?amount=${amount}&from=${from}&to=${to}`);
            document.getElementById("amount-to").value = await response.text()
        } catch (error) {
            console.error("Ошибка при конвертации! ", error)
            document.getElementById("result").innerText = "Ошибка при конвертации!"
        }
    }
    document.getElementById("currency_form").addEventListener("submit", handleCurrencyForm)
})
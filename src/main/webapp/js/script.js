document.addEventListener("DOMContentLoaded", () => {
    const currencyForm = document.getElementById("currency_form");
    const amountFromInput = document.getElementById("amount-from");
    const amountToInput = document.getElementById("amount-to");
    const fromCurrency = document.getElementById("from");
    const toCurrency = document.getElementById("to");
    const rateFromToDisplay = document.getElementById("rate-from-to");
    const rateToFromDisplay = document.getElementById("rate-to-from");
    const currencyOptions = document.querySelectorAll(".currency-option");

    // Конвертация валют
    async function fetchExchangeRate(from, to, amount = 1) {
        try {
            const response = await fetch(`/convert?amount=${amount}&from=${from}&to=${to}`);
            if (!response.ok) {
                throw new Error("Ошибка при получении данных");
            }
            return await response.text();
        } catch (error) {
            console.error("Ошибка при обновлении курса!", error);
            throw error;
        }
    }

    // Обновление курса валют
    async function updateExchangeRate() {
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (from === to) {
            rateFromToDisplay.textContent = `1 ${from} = 1.0 ${to}`;
            rateToFromDisplay.textContent = `1 ${to} = 1.0 ${from}`;
        } else {
            try {
                const [rateFrom, rateTo] = await Promise.all([
                    fetchExchangeRate(from, to),
                    fetchExchangeRate(to, from),
                ]);

                rateFromToDisplay.textContent = `1 ${from} = ${rateFrom} ${to}`;
                rateToFromDisplay.textContent = `1 ${to} = ${rateTo} ${from}`;
            } catch (error) {
                console.error("Ошибка при обновлении курса!", error);
            }
        }
    }

    // Обработка выбранных кнопок
    function handleCurrencySelection(event) {
        event.preventDefault();
        const [currency, type] = event.target.id.split("-");
        document.getElementById(type).value = currency;

        event.target.closest('.menu_convert_items').querySelectorAll('a').forEach(link => link.classList.remove('selected'));
        event.target.classList.add('selected');

        updateExchangeRate().catch(error => {console.error("Ошибка при обновлении курса:", error);});
    }

    // Обработка конвертируемых валют
    async function handleCurrencyForm(event) {
        event.preventDefault();
        const amount = amountFromInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        try {
            amountToInput.value = await fetchExchangeRate(from, to, amount);
        } catch (error) {
            document.getElementById("result").innerText = "Ошибка при конвертации!";
        }
    }

    // Выбор начальной подсветки кнопок
    ['from', 'to'].forEach(type => {
        const selectedCurrency = document.getElementById(type).value;
        document.getElementById(`${selectedCurrency}-${type}`).classList.add('selected');
    });

    currencyOptions.forEach(option => option.addEventListener("click", handleCurrencySelection));
    currencyForm.addEventListener("submit", handleCurrencyForm);
    updateExchangeRate().catch(error => console.error("Ошибка при первичном обновлении курса:", error));
});

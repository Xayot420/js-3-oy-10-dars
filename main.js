document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("cityInput");
    const button = document.getElementById("searchButton");
    const result = document.getElementById("weatherResult");

    button.addEventListener("click", async () => {
        const city = input.value.trim();
        if (!city) return;
        button.textContent = "Yuklanmoqda...";
        button.disabled = true;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
            const data = await response.json();
            if (data.cod === 200) {
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                
                result.innerHTML = `
                    <h2>${data.name}</h2>
                    <img class="weather-icon" src="${iconUrl}" alt="Ob-havo ikonkasi">
                    <p>${data.main.temp}°C</p>
                    <p>${data.weather[0].description}</p>
                    <p>Minimal: ${data.main.temp_min}°C | Maksimal: ${data.main.temp_max}°C</p>
                `;
            } else {
                result.textContent = "Shahar topilmadi.";
            }
        } catch (error) {
            result.textContent = "Xatolik yuz berdi.";
        }
        
        button.textContent = "Ko'rish";
        button.disabled = false;
    });
});

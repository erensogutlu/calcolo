const hesaplamalar = [
    { baslik: "Toplama", alanlar: ["Sayı 1", "Sayı 2"], hesapla: (a, b) => a + b },
    { baslik: "Çıkarma", alanlar: ["Sayı 1", "Sayı 2"], hesapla: (a, b) => a - b },
    { baslik: "Çarpma", alanlar: ["Sayı 1", "Sayı 2"], hesapla: (a, b) => a * b },
    { baslik: "Bölme", alanlar: ["Sayı 1", "Sayı 2"], hesapla: (a, b) => b !== 0 ? a / b : "Tanımsız" },
    { baslik: "Karekök", alanlar: ["Sayı"], hesapla: (a) => a >= 0 ? Math.sqrt(a) : "Geçersiz" },
    { baslik: "Üs Alma", alanlar: ["Taban", "Üs"], hesapla: (a, b) => Math.pow(a, b) },
    { baslik: "Yüzde Hesaplama", alanlar: ["Sayı", "Yüzde"], hesapla: (a, b) => (a * b) / 100 },
    { baslik: "Vücut Kitle İndeksi", alanlar: ["Kilo (kg)", "Boy (m)"], hesapla: (k, b) => k / (b * b) },
    { baslik: "Kare Alanı", alanlar: ["Kenar"], hesapla: (a) => a * a },
    { baslik: "Daire Alanı", alanlar: ["Yarıçap"], hesapla: (r) => Math.PI * r * r },
    { baslik: "Küre Hacmi", alanlar: ["Yarıçap"], hesapla: (r) => (4 / 3) * Math.PI * r ** 3 },
    { baslik: "Faiz Hesaplama", alanlar: ["Anapara", "Faiz Oranı", "Yıl"], hesapla: (p, r, t) => (p * r * t) / 100 },
    { baslik: "Yaş Hesaplama", alanlar: ["Doğum Yılı"], hesapla: (y) => new Date().getFullYear() - y },
    { baslik: "Ortalama", alanlar: ["Sayı 1", "Sayı 2", "Sayı 3"], hesapla: (a, b, c) => (a + b + c) / 3 },
    { baslik: "En Büyük Sayı", alanlar: ["Sayı 1", "Sayı 2", "Sayı 3"], hesapla: (a, b, c) => Math.max(a, b, c) },
    { baslik: "Asal mı?", alanlar: ["Sayı"], hesapla: (n) => { if (n <= 1 || !Number.isInteger(n)) return "Hayır"; for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) return "Hayır"; } return "Evet"; } },
    { baslik: "Faktöriyel", alanlar: ["Sayı"], hesapla: (n) => { if (n < 0 || !Number.isInteger(n)) return "Geçersiz"; let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; } },
    { baslik: "Ondalık -> İkilik", alanlar: ["Ondalık"], hesapla: (n) => Number.isInteger(n) ? n.toString(2) : "Geçersiz" },
    { baslik: "Gün -> Saat:Dakika", alanlar: ["Gün"], hesapla: (g) => `${g * 24} saat / ${g * 1440} dakika` },
    { baslik: "Mod Alma", alanlar: ["Sayı", "Bölen"], hesapla: (a, b) => b !== 0 ? a % b : "Tanımsız" },
    { baslik: "Hipotenüs", alanlar: ["Kenar 1", "Kenar 2"], hesapla: (a, b) => Math.sqrt(a * a + b * b) }
]

// https://github.com/erensogutlu 

const container = document.getElementById("calculations")

function renderCalculations(filter = "") {
    container.innerHTML = ""
    hesaplamalar.forEach((h, index) => {
    if (!h.baslik.toLowerCase().includes(filter.toLowerCase())) return

    const section = document.createElement("div")
    section.className = "calc-section"
    section.innerHTML = `<h3>${h.baslik}</h3>`

    const inputs = []
    h.alanlar.forEach((ph, i) => {
        const input = document.createElement("input")
        input.type = "number"
        input.placeholder = ph
        input.id = `input-${index}-${i}`
        section.appendChild(input)
        inputs.push(input)
    })

    const button = document.createElement("button")
    button.textContent = "Hesapla"
    const resultDiv = document.createElement("div")
    resultDiv.className = "result"
    resultDiv.id = `result-${index}`

    button.onclick = () => {
        const values = inputs.map(input => parseFloat(input.value))
        const sonuc = h.hesapla(...values)
        resultDiv.textContent = `Sonuç: ${sonuc}`
    }

    section.appendChild(button)
    section.appendChild(resultDiv)
    container.appendChild(section)
 })
}

function filterCalculations() {
    const filter = document.getElementById("searchInput").value
    renderCalculations(filter)
}

// sayfa ilk yüklendiğinde tüm hesaplamaları göster
 renderCalculations()
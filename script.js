// State Konfigurasi Stok Awal Nilai Game
let coins = 0; let water = 5; let currentArticleIdx = 0;
let selectedIngredients = []; let ownedItems = [];

// Database Karakteristik 6 Tanaman Khas Indonesia
let plants = {
    'Telang': { progress: 0, stock: 0, emoji: '🪻' },
    'Sereh': { progress: 0, stock: 0, emoji: '🌾' },
    'Kunci': { progress: 0, stock: 0, emoji: '🥔' },
    'Jahe': { progress: 0, stock: 0, emoji: '🫚' },
    'Temulawak': { progress: 0, stock: 0, emoji: '🍠' },
    'Kunyit': { progress: 0, stock: 0, emoji: '💛' }
};

// Inventori Formula Jamu Selesai Diproduksi
let craftedPotions = { 'Jamu Telang Sereh': 0, 'Jamu Sereh Kunci': 0, 'Super Jamu Nusantara': 0 };

// Bank Konten Edukasi Hak Dasar Perlindungan Anak
const articles = [
    { title: "Artikel 1: Memutus Rantai Pekerja Anak di Sektor Pertanian", content: "Pekerja anak merampas hak belajar mereka. Menuju Indonesia Emas 2045, setiap anak wajib berada di sekolah demi masa depan bangsa." },
    { title: "Artikel 2: Membangun Ruang Kelas Aman Bebas Perundungan", content: "Kasus bullying menghancurkan kesehatan mental generasi muda. Penegakan hak anak mengharuskan posko pengaduan sekolah yang aktif." },
    { title: "Artikel 3: Nutrisi Tepat untuk Menghentikan Stunting Nasional", content: "Hak kesehatan anak dimulai dari nutrisi piring makan mereka. Penyaluran makanan bergizi tinggi menjamin masa depan cerdas." }
];

// Daftar 10 Macam Perlengkapan Penguras Koin Drastis (Total: 114.500 Koin)
const shopItems = [
    { id: 'item1', name: '👑 Mahkota Garuda Emas', price: 1500, desc: 'Aksesori kepala legendaris bertabur berlian nusantara.' },
    { id: 'item2', name: '🥋 Jubah Batik Anti-Bullying', price: 2500, desc: 'Kostum epik yang memancarkan aura pelindung anak.' },
    { id: 'item3', name: '🐱 Kucing Oranye Cyberpunk', price: 3500, desc: 'Peliharaan (pet) setia yang menemani Anda menjaga desa.' },
    { id: 'item4', name: '🦅 Garuda Robotik Mecha', price: 5000, desc: 'Pet terbang kelas super langka dengan sensor pendeteksi kekerasan anak.' },
    { id: 'item5', name: '🛹 Skateboard Energi Surya 2045', price: 6500, desc: 'Alat transportasi keren untuk meluncur cepat antar pos.' },
    { id: 'item6', name: '🏍️ Motor Listrik Gatotkaca vX', price: 8500, desc: 'Kendaraan berat berperforma tinggi bercat merah putih.' },
    { id: 'item7', name: '🚗 Mobil Terbang Kancil-Neo', price: 12000, desc: 'Mobil masa depan berkecepatan suara untuk menolong anak pelosok.' },
    { id: 'item8', name: '🏰 Rumah Kebun Hidroponik Megah', price: 15000, desc: 'Pangkalan kebun herbal raksasa dengan sistem penyiraman otomatis.' },
    { id: 'item9', name: '✨ Efek Aura "Pelindung Nusantara"', price: 20000, desc: 'Efek visual animasi berpendar emas di sekitar avatar Anda.' },
    { id: 'item10', name: '📜 Gelar Kehormatan "Pahlawan Utama 2045"', price: 30000, desc: 'Gelar kasta tertinggi di server game yang wajib dipajang di profil.' }
];

// Kamus Pusat Validasi 22 Kode Redeem Poin Hadiah Besar
const redeemDatabase = {
    "AWALTAHUNINDONESIAGEM1LANG!": 2027, "2045SEJAHTRATUJUANMU?!": 2045, "?NASIONALISCILIK?": 1945,
    "AKUCINTAINDONESIA+++": 2000, "2026BAHAGIAKITA!@#": 2026, "GENERASIEMAS2045!!": 2045,
    "?MERDEKAATAUMATI79?": 1708, "PANCASILADASARKU+++": 5000, "MAJUTERUSINDONESIA~": 2030,
    "17AGUSTUS1945UUU!": 1945, "?BUDAYANUSANTARA?": 3000, "GARUDADIDADAKU###": 2500,
    "NUSANTARABARU2026!": 2026, "BINEKATUNGGALIKA": 4500, "?PANJIMERAHPUTIH?": 1700,
    "SAWUNGGALINGMENANG+++": 3500, "INDONESIASUKSES?!": 2045, "PEMUDAHARAPANBANGSA": 2000,
    "?K0TEKAMELESAT?": 1945, "SATUNUSA&BANGSA!!!": 2027, "JAYALAHNEGRIKU~": 4000, "?KITACINTAINDONESIA?": 2045
};

// Inisialisasi Database Riwayat Klaim Kode Sekali Pakai Browser
if (!localStorage.getItem('usedCodesV4')) { localStorage.setItem('usedCodesV4', JSON.stringify([])); }
// Fungsi Mekanis Perpindahan Tab
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('nav button').forEach(btn => {
        btn.className = "flex-1 py-2.5 rounded-xl text-xs font-black tracking-wider bg-slate-800 text-slate-400 cursor-pointer uppercase";
    });
    document.getElementById('btn-' + tabId).className = "flex-1 py-2.5 rounded-xl text-xs font-black tracking-wider bg-emerald-600 text-white cursor-pointer uppercase";
    if(tabId === 'tab-lab') renderLab(); if(tabId === 'tab-toko') renderToko();
}

// Fungsi Membaca Artikel Guna Meraih Air Siraman
function readArticle() {
    water += 1; currentArticleIdx = (currentArticleIdx + 1) % articles.length;
    document.getElementById('artikel-title').innerText = articles[currentArticleIdx].title;
    document.querySelector('#tab-kebun p.text-slate-400').innerText = articles[currentArticleIdx].content;
    updateUI();
}

// Render Antarmuka Kebun 6 Tanaman
function renderKebun() {
    const grid = document.getElementById('plants-grid'); grid.innerHTML = '';
    for (let name in plants) {
        let p = plants[name];
        grid.innerHTML += `
            <div class="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center flex flex-col justify-between items-center">
                <div class="text-2xl">${p.emoji}</div><div class="text-xs font-bold mt-1">${name}</div>
                <div class="text-[10px] text-slate-500">Gudang: ${p.stock}</div>
                <div class="w-full bg-slate-800 h-1.5 rounded-full my-2 overflow-hidden"><div class="bg-blue-500 h-full" style="width: ${p.progress}%"></div></div>
                <button onclick="waterPlant('${name}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 rounded text-[10px] cursor-pointer uppercase">Siram 💧</button>
            </div>`;
    }
}

// Logika Penyiraman Air pada Tanaman Herbal
function waterPlant(name) {
    if (water < 1) { alert("Air habis! Selesaikan misi membaca artikel."); return; }
    water -= 1; plants[name].progress += 34;
    if (plants[name].progress >= 100) { plants[name].progress = 0; plants[name].stock += 1; alert(`🎉 Berhasil memanen 1 ${name}!`); }
    updateUI();
}

// Render Komponen Inventori Lab
function renderLab() {
    const invGrid = document.getElementById('inventory-grid'); invGrid.innerHTML = '';
    for (let name in plants) {
        invGrid.innerHTML += `
            <button onclick="addIngredient('${name}')" class="bg-slate-950 border border-slate-800 p-2 rounded-xl text-center hover:border-amber-500 transition cursor-pointer">
                <span class="text-lg block">${plants[name].emoji}</span><span class="text-[10px] font-bold block">${name}</span>
                <span class="text-[9px] text-slate-500 block">Stok: ${plants[name].stock}</span>
            </button>`;
    }
    document.getElementById('mix-slots').innerText = selectedIngredients.length > 0 ? selectedIngredients.join(' + ') : 'Belum ada bahan';

    const pInv = document.getElementById('potion-inventory'); pInv.innerHTML = '';
    for (let name in craftedPotions) {
        pInv.innerHTML += `
            <div class="flex justify-between items-center bg-slate-900 border border-slate-800 p-2 rounded-lg">
                <div class="text-xs font-bold text-amber-300">🧪 ${name} (${craftedPotions[name]})</div>
                <button onclick="sellPotion('${name}')" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3 py-1 rounded text-[10px] cursor-pointer uppercase">Jual (15-30 2045 🪙)</button>
            </div>`;
    }
}

function addIngredient(name) { if (plants[name].stock < 1 || selectedIngredients.length >= 3) return; plants[name].stock -= 1; selectedIngredients.push(name); renderLab(); }
function clearMix() { selectedIngredients.forEach(name => { plants[name].stock += 1; }); selectedIngredients = []; renderLab(); }

// Formulasi Pencampuran Jamu Tradisional Nusantara
function craftPotion() {
    if (selectedIngredients.length < 2) return;
    let sorted = [...selectedIngredients].sort().join(','); let result = "Super Jamu Nusantara";
    if (sorted === "Sereh,Telang") result = "Jamu Telang Sereh"; else if (sorted === "Kunci,Sereh") result = "Jamu Sereh Kunci";
    
    craftedPotions[result] += 1; alert(`🧪 Berhasil membuat [${result}]!`); selectedIngredients = []; renderLab();
}

// Penjualan Produk Menghasilkan Untung Koin Emas Acak (15-30)
function sellPotion(name) {
    if (craftedPotions[name] < 1) return; craftedPotions[name] -= 1;
    let earned = Math.floor(Math.random() * (30 - 15 + 1)) + 15; coins += earned;
    alert(`💰 Jamu terjual! +${earned} Koin.`); updateUI(); renderLab();
}

// Proteksi Penukaran Kupon Hadiah Satu Kali Pakai
function useRedeemCode() {
    const input = document.getElementById('redeem-input'); const code = input.value.trim().toUpperCase();
    let usedCodes = JSON.parse(localStorage.getItem('usedCodesV4'));
    if (usedCodes.includes(code)) { alert("Gagal! Kode ini sudah hangus terpakai."); return; }
    if (redeemDatabase[code]) {
        coins += redeemDatabase[code]; usedCodes.push(code); localStorage.setItem('usedCodesV4', JSON.stringify(usedCodes));
        alert("✨ KLAIM BERHASIL!"); input.value = ""; updateUI(); if(document.getElementById('tab-toko').classList.contains('active')) renderToko();
    } else { alert("Kode salah!"); }
}

// Sinkronisasi Katalog Penjualan Toko Senopati
function renderToko() {
    const container = document.getElementById('shop-items-list'); container.innerHTML = '';
    shopItems.forEach(item => {
        let isOwned = ownedItems.includes(item.name);
        container.innerHTML += `
            <div class="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                <div><h4 class="text-xs font-black text-white">${item.name}</h4><p class="text-[10px] text-slate-400 mt-0.5">${item.desc}</p></div>
                <button onclick="buyItem('${item.name}', ${item.price})" class="font-black px-4 py-2 rounded-lg text-xs cursor-pointer min-w-[100px] transition text-center ${isOwned ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'}">${isOwned ? 'TERKOLEKSI' : item.price + ' 🪙'}</button>
            </div>`;
    });
    document.getElementById('owned-items-display').innerHTML = ownedItems.length > 0 ? ownedItems.map(i => `<span class="bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded text-[10px]">${i}</span>`).join(' ') : 'Belum ada barang';
    document.getElementById('shop-progress').innerText = `${ownedItems.length} / 10`;
}

// Pengurangan Saldo Akibat Belanja Wajib Perlengkapan
function buyItem(name, price) {
    if (ownedItems.includes(name)) return;
    if (coins >= price) { coins -= price; ownedItems.push(name); alert(`🛍️ Sukses mengoleksi [${name}]!`); updateUI(); renderToko(); }
    else { alert("Koin tidak cukup! Cari kode redeem di Ketok Mejik Studio Developer."); }
}

// Cek Syarat Kelulusan Kunci 10 Barang untuk Menamatkan Game
function claimVictory() {
    if (ownedItems.length < 10) alert(`🔮 SEGEL GAGAL! Gerbang Dimensi terlalu berat. Baru mengumpulkan ${ownedItems.length} dari 10 perlengkapan.`);
    else alert("🏆 GERBANG DIMENSI TERBUKA! Selamat datang di masa depan cerah INDONESIA EMAS 2045! 🎉");
}

// Penyegaran Seluruh Panel Tampilan Monitor UI
function updateUI() { document.getElementById('coin-val').innerText = coins; document.getElementById('water-val').innerText = water; document.getElementById('shop-progress').innerText = `${ownedItems.length} / 10`; renderKebun(); }
updateUI();

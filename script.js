// Menunggu semua elemen halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // Mengambil elemen-elemen yang kita butuhkan
    const mainContainer = document.getElementById('mainContainer');
    const successMessage = document.getElementById('successMessage');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const heartsContainer = document.querySelector('.hearts-container');

    // Ukuran awal untuk tombol "Mau!"
    let yesButtonSize = 18; // dalam px (font-size)
    let yesButtonPaddingX = 25; // padding horizontal
    let yesButtonPaddingY = 12; // padding vertikal

    // Menambahkan 'event listener' saat tombol "Nggak" di-hover
    noButton.addEventListener('mouseover', moveNoButton);
    // Juga tambahkan event saat diklik (kalau-kalau berhasil diklik)
    noButton.addEventListener('click', moveNoButton);

    function moveNoButton() {
        // Mendapatkan ukuran layar
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Mendapatkan ukuran tombol "Nggak"
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        // Menghasilkan posisi acak baru
        // Kita kurangi dengan ukuran tombol agar tidak keluar layar
        let newTop = Math.random() * (viewportHeight - buttonHeight);
        let newLeft = Math.random() * (viewportWidth - buttonWidth);

        // Mengubah posisi tombol "Nggak" menjadi 'absolute' agar bisa dipindah-pindah
        noButton.style.position = 'absolute';
        noButton.style.top = `${newTop}px`;
        noButton.style.left = `${newLeft}px`;

        // Memperbesar tombol "Mau!" setiap kali tombol "Nggak" di-hover/diklik
        yesButtonSize += 4; // Tambah ukuran font
        yesButtonPaddingX += 6;
        yesButtonPaddingY += 3;
        
        yesButton.style.fontSize = `${yesButtonSize}px`;
        yesButton.style.padding = `${yesButtonPaddingY}px ${yesButtonPaddingX}px`;
    }

    // Menambahkan 'event listener' saat tombol "Mau!" diklik
    yesButton.addEventListener('click', () => {
        // Sembunyikan container pertanyaan
        mainContainer.style.transform = 'scale(0)';
        mainContainer.style.opacity = '0';
        
        // Tampilkan pesan sukses setelah 0.3 detik (agar animasinya mulus)
        setTimeout(() => {
            mainContainer.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Mulai animasi hati berterbangan
            startHeartAnimation();
        }, 300);
    });

    // Fungsi untuk memulai animasi hati
    function startHeartAnimation() {
        // Buat hati baru setiap 300 milidetik
        setInterval(createHeart, 300);
    }

    // Fungsi untuk membuat satu hati
    function createHeart() {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        
        // Emoji hati yang berbeda-beda
        const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💞'];
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Posisi horizontal awal yang acak
        heart.style.left = `${Math.random() * 100}%`;
        
        // Properti custom CSS untuk gerakan horizontal acak
        heart.style.setProperty('--random-x', `${(Math.random() - 0.5) * 200}px`);

        // Tambahkan hati ke container
        heartsContainer.appendChild(heart);

        // Hapus elemen hati setelah 5 detik (durasi animasi) agar tidak menumpuk
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
});
# 🎾 Tenis Skorbord — PWA (yüklenebilir web uygulaması)

Bu klasör, skorbordu **uygulama mağazasına gerek olmadan** telefona "app gibi" kurmanı sağlar.
Android + iOS, tek link → "Ana ekrana ekle" → tam ekran, çevrimdışı çalışır.

**Dosyalar:** `index.html` (uygulama) · `manifest.json` · `sw.js` (servis çalışanı) · `icon.svg`

## Neden yayınlamak gerekiyor?
PWA'nın "yüklenebilir + çevrimdışı" olması için **HTTPS** üzerinden sunulmalı (servis çalışanı şartı).
Dosyayı bilgisayarda çift tıklamak yetmez; ücretsiz bir yere koyarız.

## Ücretsiz yayın — 2 seçenek

### A) GitHub Pages (senin afk416 hesabınla — önerilen)
1. github.com'da yeni **public** repo aç (ör. `tenis-skorbord`).
2. Bu `pwa/` klasöründeki 4 dosyayı repoya yükle (kökте olsun).
3. Repo → **Settings → Pages** → Source: `main` / root → Save.
4. 1-2 dk sonra: `https://afk416.github.io/tenis-skorbord/` hazır.

### B) Netlify Drop (giriş bile gerekmez, en hızlı)
1. app.netlify.com/drop adresine gir.
2. `pwa/` klasörünü sürükle-bırak → anında HTTPS link verir.

## Telefona kurma
1. Verilen HTTPS linki **telefonda** aç.
2. **Android/Chrome:** menü (⋮) → "Uygulamayı yükle" / "Ana ekrana ekle".
3. **iOS/Safari:** Paylaş → "Ana Ekrana Ekle".
4. Artık ikondan tam ekran açılır, internet gitse de çalışır.

## Notlar
- Uygulamayı güncellemek: dosyaları repoya tekrar yükle, `sw.js` içindeki `CACHE = 'tenis-skor-v1'` sürümünü artır (`v2`...) → telefon yeni sürümü çeker.
- **ESP32 bağlantısı:** Cihaz kendi WiFi'ında bu sayfayı `http://192.168.4.1` ile sunacak (yerelde HTTPS olmadığı için orada servis-çalışan/PWA kurulumu olmaz; sadece normal web olarak çalışır — sorun değil, kurulu PWA internetten, cihaz yerelden).
- İkon geçici (yeşil "0 0"); istersen sonra özel PNG ikon koyarız.

# Devlog: Latince Deklinasyon Eğitmeni (Gymnasium 8. Sınıf)
*Project Initialization & Progress Log*

## Proje Vizyonu ve Kapsamı
Bu proje, Almanya'daki Gymnasium 8. sınıf Latince müfredatına tam uyumlu olarak tasarlandı. Okulda karşılaşılan kelimeden çekim bulma ve çekilmiş kelimeden kök/deklinasyon türü belirleme senaryolarını simüle eder.

### Temel Özellikler
1. **Dinamik Soru Motoru:** Seçilen kategorilere göre her turda 10 adet rastgele ve pedagojik soru üretir.
2. **Kapsamlı Veritabanı:** a-Deklination, o-Deklination (m./n.), 3. Deklination (Konsonantisch & i-Stamm / Mischstamm), 4. Deklination (u) ve 5. Deklination (e) gruplarını tam kapsar.
3. **Akıllı Puanlama & Pas Hakkı:** Her doğru cevap +10 puan, her yanlış cevap -5 puan, 30 saniye zamanlayıcı ve 1 adet pass geçme hakkı.
4. **Detaylı Öğretmen Analizi:** Her soruda anında kurallı açıklama (Neutrum kuralı, i-Stamm -ium hatırlatmaları) ve tur sonunda zayıf olunan deklinasyonun tespiti.
5. **Modern Dark & Light Tema:** Latein-Practice 1.1 ile birebir aynı estetik, renk paleti ve ses efektleri (`ambient`, `click`, `correct`, `wrong`, `end`).
6. **Uzman Latince Eğitmen Ajanı:** `latin-expert-tutor` alt ajanı projeye tanımlandı.

---

## Günlük / Versiyon Geçmişi

### 2026-09-27 - v2.1 Pedagojik & Didaktik Revizyon (latin-expert-tutor Denetimi)
- **Stamm Bütünlüğü (Zero Cross-Noun Contamination):** Şıkların alakasız başka kelimelerden gelmesi engellendi. Artık 4 şıkkın tamamı aynı kelimeden ve gerçek okul sınavı tuzaklarından türetiliyor.
- **Tautolojik Soruların Kaldırılması:** Soru başlığında zaten verilen Nominativ Singular formunun sorulması engellendi.
- **Öğrenci Tuzakları (Schülerfallen):** Nötr Akkusativ `-em`, i-Stamm Genitiv `-um`, -er gövdesi `agerum` gibi gerçek sınav çeldiricileri algoritmaya eklendi.
- **Formenbestimmung Soru Tipi:** Verilen formun hangi Kasus/Numerus'a ait olduğunu bulma (KNG) soru tipi eklendi (Gymnasium sınavlarının %40'ı).
- **Dilbilgisi Düzeltmeleri:** `fides` (singulare tantum) ve `spes` çoğul kısıtlamaları getirildi.
- **Açıklama Metni Bug'ı Çözüldü:** `slice` kaynaklı kural açıklaması hataları giderildi.

### 2026-09-27 - v2.0 Tam Mimari ve Tasarım Yenilenmesi (Latein-Practice 1.1 Uyumu)
- **Tasarım & UI Entegrasyonu:** Tek parça HTML'den modüler yapıya (`index.html`, `style.css`, `script.js`, `data/deklinationen.js`) geçildi. Latein-Practice 1.1'in tüm renk paleti, SVG ikonları, HUD başlığı ve Lottie konfeti kutlaması dahil edildi.
- **Kategori Seçim Ekranı:** Oyuna başlamadan önce öğrencinin çalışmak istediği deklinasyonları seçebileceği ekran eklendi.
- **Almanca Gymnasium Standardı:** Tüm arayüz ve pedagojik terimler Almanya okul müfredatı standardında Almanca yapıldı, parantez içi Türkçe anlamlar korundu.
- **Kritik Gramer Düzeltmeleri:**
  - 3. Deklinasyon i-Stamm ve Mischstamm için Genitiv Plural eki `-ium` (`civium`, `urbium`) olarak düzeltildi.
  - Nötr i-Stamm (`mare`, `animal`) için Ablativ tekil `-i` ve çoğul `-ia` kuralları eklendi.
  - 4. (u-) ve 5. (e-) deklinasyonları veritabanına eklendi.
- **Otomatik Test Paketi:** 570 formluk otomatik gramer denetim betiği (`scratch/verify_declensions.js`) oluşturuldu ve %100 başarıyla geçti.
- **Git Entegrasyonu:** Yerel Git reposu yapılandırıldı.

### 2026-09-27 - v1.2 Sürüm Notları (Önceki Durum)
- Soru sayısı 12'den 20'ye çıkarıldı.
- Tailwind CSS tabanlı ilk prototip test edildi.
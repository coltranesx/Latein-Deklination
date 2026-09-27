# Latein-Deklination Nihai Uygulama Planı (v2.0)

Bu plan, **Latein-Deklination** projesini Almanya Gymnasium 8. sınıf standartlarında, pedagojik açıdan hatasız ve **Latein-Practice 1.1** ile birebir aynı görsel & teknik mimariyle bağımsız bir GitHub reposu haline getirmek için oluşturulmuştur.

---

## 🎯 Proje Hedefleri ve Alınan Kararlar

Kullanıcı geri bildirimleri doğrultusunda netleşen gereksinimler:
1. **Uzman Latince Eğitmen Ajanı (`latin-expert-tutor`):** Projede dilbilgisi, istisnalar (i-Stamm, nötr kuralı vb.) ve pedagojik açıklamaları denetleyen uzman ajan sisteme tanımlandı ve `GEMINI.md` protokollerine eklenecek.
2. **Arayüz Dili:** Almanya Gymnasium müfredatına tam uyum için tüm soru başlıkları, butonlar, açıklamalar ve dilbilgisi terimleri **Almanca** olacak. Kelime karşılıklarında Almanca ana anlam yer alırken parantez içinde Türkçe anlam da sunulacak.
3. **Oyun Dinamikleri & Süre:** Latein-Practice 1.1 ile birebir aynı model:
   - Tur başına **10 soru**
   - Soru başına **15 saniyelik dinamik zaman çubuğu**
   - Tur boyunca **1 adet "Passen" (Pas) hakkı**
   - Doğru: **+10 Puan**, Yanlış: **-5 Puan**, Süre aşımı: **0 Puan**
4. **Kategori Seçim Ekranı (`selection-screen`):** Oyuna başlamadan önce öğrencinin pratik yapmak istediği deklinasyon gruplarını seçebileceği çoklu seçim ekranı (a-Deklination, o-Deklination, 3. Deklination konsonantisch / i-Stamm, 4. & 5. Deklination).
5. **Plan Dosyası:** Plan, projenin içinde `plans/latein_deklination_plan.md` olarak arşivlenmiştir.

---

## 🧑‍🏫 Uzman Latince Eğitmeni (Latin Expert Tutor) Rolü ve Kural Tablosu

Proje bünyesinde tanımlanan `latin-expert-tutor` alt ajanı, veri tabanındaki tüm kelimelerin ve çekim algoritmalarının şu altın kurallara uymasını denetler:

| Kural Adı | Latincesi / Almancası | Denetim Kriteri |
| :--- | :--- | :--- |
| **Neutrum Kuralı** | *Regel der Neutra* | Tüm nötr isimlerde **Nom. = Akk.** (tekil ve çoğulda). Çoğulda her zaman **-a** (i-Stamm'da **-ia**) ile biter. |
| **i-Stamm Gen. Pl.** | *Genitiv Plural bei i-Stämmen* | `civis`, `navis` gibi i-Stamm ve `urbs`, `mors` gibi Mischstamm isimlerde Gen. Pl. daima **-ium** ile biter (`civium`, `urbium`). Asla `-um` olamaz! |
| **Neutra der i-Dekl.** | *Nötr i-Stamm kuralları* | `mare`, `animal` gibi nötrlerde Abl. Sg. **-i**, Nom/Akk Pl. **-ia**, Gen. Pl. **-ium**. |
| **o-Deklination (-er)** | *Maskulina auf -er* | `puer, pueri` (kök: puer-) ile `ager, agri` (kök: agr-) arasındaki kök ayrımı Genitiv tekilinden türetilir. |
| **Dativ/Ablativ Plural** | *Synkretismus Dat./Abl. Pl.* | a- ve o-Deklination'da **-is**, 3. ve 4. Deklination'da **-ibus**, 5. Deklination'da **-ebus**. |
| **Genitiv Belirleyiciliği** | *Genitiv als Stammform* | Kelimenin çekim grubu Nominativ'den değil, daima **Genitiv Singular** ekinden (`-ae`, `-i`, `-is`, `-us`, `-ei`) anlaşılır. |

---

## 🏗️ Proje Mimarisi ve Dosya Yapısı

```
Latein-Deklination/
├── .git/                      # Git reposu (git init ile başlatılacak)
├── .gitignore                 # İşletim sistemi ve geçici dosyalar
├── index.html                 # Latein-Practice 1.1 yapısında ana sayfa (HUD, ekranlar, modal)
├── style.css                  # Modern CSS değişkenleri, Dark & Light temalar, HUD, butonlar
├── script.js                  # Modüler oyun motoru, soru üreteci, ses, timer ve analiz
├── data/
│   └── deklinationen.js       # Zenginleştirilmiş ve doğrulanmış Latince isim veritabanı
├── plans/
│   └── latein_deklination_plan.md  # Bu planın proje içi kalıcı kopyası
├── sounds/                    # Latein-Practice 1.1'den aktarılan ses dosyaları
│   ├── ambient.mp3
│   ├── click.mp3
│   ├── correct.mp3
│   ├── end.mp3
│   └── wrong.mp3
├── scripts/
│   └── lottie.min.js          # Konfeti animasyon kütüphanesi
├── confetti.json              # Lottie konfeti verisi
├── iconLeave.webp             # Uygulama ikonu
├── GEMINI.md                  # Proje ve latin-expert-tutor protokolü
├── README.md                  # Profesyonel GitHub dokümantasyonu & Pages yönergesi
└── devlog.md                  # Güncellenmiş versiyon geçmişi
```

---

## 📋 Önerilen Değişiklikler ve Adımlar

### 1. Bileşen: Varlıklar ve Altyapı Transferi
- `sounds/` dizini oluşturulacak ve kardeş projeden (`Latein-Practice-1.1/sounds/`) 5 ses dosyası kopyalanacak.
- `scripts/lottie.min.js`, `confetti.json` ve `iconLeave.webp` projeye aktarılacak.
- `.gitignore` dosyası oluşturulacak.

### 2. Bileşen: Veritabanı ve Çekim Motoru (`data/deklinationen.js`)
- Gymnasium 8. sınıf için en sık kullanılan 50+ isim; kökleri, tekil Genitiv'leri, cinsiyetleri ve hem Almanca hem Türkçe karşılıklarıyla tanımlanacak.
- Gruplar:
  1. `a-Deklination` (puella, amica, rosa, insula, silva, via, pecunia...)
  2. `o-Deklination (m)` (dominus, servus, amicus, puer, ager, magister, equus...)
  3. `o-Deklination (n)` (templum, oppidum, donum, bellum, verbum, periculum...)
  4. `3. Deklination - Konsonantisch` (rex, miles, vox, consul, corpus, tempus, flumen...)
  5. `3. Deklination - i-Stamm / Mischstamm` (civis, navis, ignis, urbs, mors, mare, animal...)
  6. `4. Deklination (u)` (exercitus, senatus, casus, cornu...)
  7. `5. Deklination (e)` (res, dies, spes...)
- `getDeclinedForm(noun, caseName)` çekim fonksiyonu yukarıdaki kural tablosuna göre hatasız yazılacak.

### 3. Bileşen: Arayüz ve Stil (`index.html` & `style.css`)
- **Ekran 1: Karşılama Ekranı (`#welcome-screen`):**
  - Başlık: `Latein Deklinationstrainer`
  - Alt başlık: `Gymnasium Klasse 8 • Training & Prüfungsvorbereitung`
  - Butonlar: `Start`, `Spielregeln & Formenlehre` (Hilfe)
- **Ekran 2: Grup Seçim Ekranı (`#selection-screen`):**
  - Deklinasyon gruplarını seçmek için modern kart/checkbox listesi.
  - "Alle auswählen" (Tümünü seç) kolaylığı.
  - `Übung starten` butonu.
- **Ekran 3: Soru Ekranı (`#game-screen`):**
  - HUD: Exit (X), `Punkte: X`, `Frage X / 10`, ses ve tema anahtarları.
  - Dinamik süre çubuğu (`#timer-bar`) (15 saniye geri sayım).
  - Latince soru metni ve durum rozeti.
  - 4 adet cevap butonu (`.btn.btn-answer`).
  - `Passen (1)` butonu.
  - Açıklama kutusu (`#feedback-box`): Yanlış yapıldığında doğru cevabı ve pedagojik kuralı (Almanca) gösterir.
  - `Nächste Frage ➔` butonu.
- **Ekran 4: Sonuç Ekranı (`#score-screen`):**
  - Toplam Puan, `Richtig`, `Falsch`, `Pass/Zeit`, `Erfolgsquote %` istatistik kartları.
  - Öğretmen analizi (`Ergebnis-Analyse`): Hangi deklinasyonda kaç hata yapıldığını tespit edip spesifik çalışma önerisi sunar.
  - Lottie Konfeti kutlaması (yüksek başarıda).
  - `Nochmal üben` butonu.
- **Yardım Modalı (`#help-modal`):**
  - Oyun kuralları + mini Deklinasyon Özet Tablosu (Spickzettel).

### 4. Bileşen: Oyun Mantığı (`script.js`)
- 10 soruluk rastgele soru havuzu oluşturma (seçilen deklinasyonlara göre).
- Soru Tipleri:
  - **Typ 1: Formenbildung** ("Wie lautet der Akkusativ Singular von 'miles, militis m.'?")
  - **Typ 2: Deklinationsklasse** ("Zu welcher Deklination gehört 'donum, doni n.'?")
  - **Typ 3: Formenbestimmung / KNG** ("Welche Bestimmung passt zu 'urbibus'?")
- Zamanlayıcı yönetimi (cevap verildiğinde veya modal açıldığında durur).
- Pas geçme (Passen) mantığı (puan kırmaz, süreyi sıfırlar, soru hakkını tüketir).
- Kalıcı Dark/Light tema tercihi (`localStorage`).
- Ses kontrolleri (müzik ve ses efektleri).

### 5. Bileşen: Dokümantasyon, Plan ve Git
- `plans/latein_deklination_plan.md` dosyası oluşturulacak.
- `GEMINI.md`: `latin-expert-tutor` ajanı, veri ekleme adımları ve mimari haritayı içerecek.
- `README.md`: Ekran görüntüleri taslağı, kurulum ve GitHub Pages yayınlama adımları.
- `devlog.md`: v2.0 sürüm notlarıyla güncellenecek.
- `git init`, `.gitignore`, `git add`, `git commit` ile repo yerel olarak tamamlanacak ve GitHub'a yüklemeye hazır komutlar verilecek.

---

## 🧪 Doğrulama Planı (Verification Plan)

### Otomatik Testler:
1. Bir Node.js test betiği (`scratch/verify_declensions.js`) çalıştırılarak:
   - Tüm deklinasyon türlerinin 10 kasus çekimi kontrol edilecek (`civium`, `urbium`, `corpora`, `maria`, `agri` test edilecek).
   - Hiçbir çekimin `undefined` veya hatalı ek üretmediği doğrulanacak.

### Manuel Testler:
1. `index.html` bir tarayıcı veya yerel sunucu üzerinden açılarak:
   - Tema geçişi (Güneş/Ay) ve renk geçişlerinin sorunsuz çalıştığı,
   - Ses açma/kapatma ve ses efektlerinin doğru tetiklendiği,
   - 15 saniyelik geri sayım çubuğunun doğru çalıştığı,
   - Pas butonunun yalnızca 1 kez kullanılabildiği,
   - Tur bitiminde konfetinin patladığı ve analiz kartlarının hatasız hesaplandığı test edilecek.

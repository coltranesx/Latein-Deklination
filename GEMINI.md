# 🤖 Agent Proje Rehberi (GEMINI.md)

Bu dosya, projeye yeni katılan AI Agent'lar için mimariyi, dosya yapısını, geliştirme kurallarını ve uzman Latince alt ajan protokolünü özetler.

---

## 🏛️ 1. Proje Mimarisi

- **Core**: Vanilla JavaScript (ESM yok, script tag loading).
- **UI**: ID bazlı ekran geçişleri (`.hidden` class yönetimi) ve mobil öncelikli responsive CSS değişken sistemi (`style.css`).
- **Data**: `data/deklinationen.js`. Tüm Latince isimler `window.LATIN_NOUNS`, gruplar `window.LATIN_GROUPS` ve kasuslar `window.LATIN_CASES` içerisinde tanımlıdır.
- **Audio & FX**: 5 adet ses efekti (`sounds/`) ve Lottie konfeti animasyonu (`scripts/lottie.min.js` & `confetti.json`).
- **Gramer Çekim Motoru**: `getDeclinedForm(noun, caseName)` fonksiyonu, Alman Gymnasium 6-8. sınıf müfredatı kurallarına (i-Stamm, Neutrum kuralı vb.) göre 10 kasus formunu dinamik üretir.

---

## 🧑‍🏫 2. Uzman Latince Eğitmen Ajanı: `latin-expert-tutor`

Bu projede Latince dilbilgisi, kök tespiti, kasus son ekleri veya yeni kelime ekleme işlemleri yapılırken **`latin-expert-tutor`** subajanı yetkilidir.

### Alt Ajanı Çağırma (Prosedür):
```javascript
// Gerektiğinde invoke_subagent ile çalıştırılır:
invoke_subagent({
  Subagents: [{
    TypeName: "latin-expert-tutor",
    Role: "Latin Grammar Auditor",
    Prompt: "data/deklinationen.js dosyasına yeni eklenen kelimelerin gövde, kök ve çekimlerini denetle."
  }]
})
```

### Denetlenecek Temel Dilbilgisi Kuralları:
1. **Regel der Neutra (Nötr Kuralı):** Tüm nötr isimlerde Nom. = Akk. ve çoğulda mutlaka *-a* (veya *-ia*) ile biter.
2. **i-Stamm & Mischstamm:** `civis`, `navis`, `urbs`, `mors` gibi kelimelerin Genitiv Plural eki **MUTLAKA -ium** ile biter (`civium`, `urbium`). Asla *-um* olamaz.
3. **Neutra der i-Deklination:** `mare`, `animal` gibi nötrlerde Abl. Sg. *-i*, Nom/Akk Pl. *-ia*, Gen Pl. *-ium*.
4. **o-Deklination Maskulina auf -er:** `puer, pueri` (kök: puer-) ile `ager, agri` (kök: agr-) kök farkları.
5. **Dativ & Ablativ Plural:** a-/o-Deklination'da *-is*, 3./4. Deklination'da *-ibus*, 5. Deklination'da *-ebus*.

---

## 📚 3. Yeni Kelime / Deklinasyon Ekleme Protokolü

Yeni bir isim eklemek için:
1. `data/deklinationen.js` dosyasını aç.
2. `LATIN_NOUNS` dizisine şu formatta obje ekle:
```javascript
{
    word: "donum",               // Nominativ Singular
    gen: "doni",                 // Genitiv Singular
    stem: "don",                 // Kelime kökü
    gender: "n",                 // "m", "f", "n"
    group: "o_dekl_n",           // a_dekl, o_dekl_m, o_dekl_n, dritte_kons, dritte_i, u_dekl, e_dekl
    declName: "o-Deklination (n)",
    german: "Geschenk, Gabe",    // Almanca anlam
    turkish: "Hediye"            // Türkçe anlam
}
```
3. `node scratch/verify_declensions.js` çalıştırarak gramer testlerinden 0 hata ile geçtiğini doğrula.

---

## 🛠️ 4. Test Komutları

- `node scratch/verify_declensions.js`: 570+ formu otomatik denetleyen gramer doğrulama testi.

const rootScope = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

rootScope.LATIN_GROUPS = [
    {
        id: "a_dekl",
        title: "a-Deklination (f./m.)",
        description: "z.B. amica, puella, insula (Femininum) / nauta (Maskulinum)",
        ruleHint: "Kennzeichen: Genitiv Singular endet immer auf -ae. Dativ/Ablativ Plural auf -is."
    },
    {
        id: "o_dekl_m",
        title: "o-Deklination (Maskulina)",
        description: "z.B. dominus, servus (-us) / puer, ager, magister (-er)",
        ruleHint: "Kennzeichen: Genitiv Singular endet immer auf -i. Akkusativ Sg. auf -um."
    },
    {
        id: "o_dekl_n",
        title: "o-Deklination (Neutra)",
        description: "z.B. templum, oppidum, donum, bellum (-um)",
        ruleHint: "Goldene Neutrum-Regel: Nom. = Akk.! Plural endet immer auf -a."
    },
    {
        id: "dritte_kons",
        title: "3. Deklination (Konsonantisch)",
        description: "z.B. rex (regis), miles (militis) / corpus (corporis n.)",
        ruleHint: "Stamm ist am Genitiv Sg. (-is) zu erkennen! Genitiv Plural endet auf -um."
    },
    {
        id: "dritte_i",
        title: "3. Deklination (i-Stamm & Mischstamm)",
        description: "z.B. civis, navis, urbs, mors / mare (n.)",
        ruleHint: "Wichtig: Genitiv Plural endet immer auf -ium! Bei Neutra (mare) Nom/Akk Pl. auf -ia."
    },
    {
        id: "u_dekl",
        title: "u-Deklination (4. Deklination)",
        description: "z.B. senatus, exercitus, casus / cornu (n.)",
        ruleHint: "Kennzeichen: Genitiv Singular endet auf -us. Dativ/Ablativ Plural auf -ibus."
    },
    {
        id: "e_dekl",
        title: "e-Deklination (5. Deklination)",
        description: "z.B. res, dies, spes, fides",
        ruleHint: "Kennzeichen: Genitiv Singular endet auf -ei. Genitiv Plural auf -erum."
    }
];

rootScope.LATIN_CASES = [
    { name: "Nominativ Singular", abbr: "Nom. Sg.", kasus: "Nominativ", numerus: "Singular" },
    { name: "Genitiv Singular", abbr: "Gen. Sg.", kasus: "Genitiv", numerus: "Singular" },
    { name: "Dativ Singular", abbr: "Dat. Sg.", kasus: "Dativ", numerus: "Singular" },
    { name: "Akkusativ Singular", abbr: "Akk. Sg.", kasus: "Akkusativ", numerus: "Singular" },
    { name: "Ablativ Singular", abbr: "Abl. Sg.", kasus: "Ablativ", numerus: "Singular" },
    { name: "Nominativ Plural", abbr: "Nom. Pl.", kasus: "Nominativ", numerus: "Plural" },
    { name: "Genitiv Plural", abbr: "Gen. Pl.", kasus: "Genitiv", numerus: "Plural" },
    { name: "Dativ Plural", abbr: "Dat. Pl.", kasus: "Dativ", numerus: "Plural" },
    { name: "Akkusativ Plural", abbr: "Akk. Pl.", kasus: "Akkusativ", numerus: "Plural" },
    { name: "Ablativ Plural", abbr: "Abl. Pl.", kasus: "Ablativ", numerus: "Plural" }
];

rootScope.LATIN_NOUNS = [
    // --- a-Deklination (f./m.) ---
    { word: "amica", gen: "amicae", stem: "amic", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Freundin", turkish: "Kız arkadaş" },
    { word: "puella", gen: "puellae", stem: "puell", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Mädchen", turkish: "Kız çocuk" },
    { word: "rosa", gen: "rosae", stem: "ros", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Rose", turkish: "Gül" },
    { word: "aqua", gen: "aquae", stem: "aqu", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Wasser", turkish: "Su" },
    { word: "insula", gen: "insulae", stem: "insul", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Insel", turkish: "Ada" },
    { word: "silva", gen: "silvae", stem: "silv", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Wald", turkish: "Orman" },
    { word: "via", gen: "viae", stem: "vi", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Weg, Straße", turkish: "Yol, cadde" },
    { word: "familia", gen: "familiae", stem: "famili", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Familie, Hausgemeinschaft", turkish: "Aile" },
    { word: "pecunia", gen: "pecuniae", stem: "pecuni", gender: "f", group: "a_dekl", declName: "a-Deklination", german: "Geld, Vermögen", turkish: "Para, servet" },
    { word: "nauta", gen: "nautae", stem: "naut", gender: "m", group: "a_dekl", declName: "a-Deklination", german: "Seemann (Maskulinum!)", turkish: "Denizci" },

    // --- o-Deklination (m.) ---
    { word: "dominus", gen: "domini", stem: "domin", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Herr, Hausherr", turkish: "Efendi, ev sahibi" },
    { word: "servus", gen: "servi", stem: "serv", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Sklave, Diener", turkish: "Köle, hizmetçi" },
    { word: "amicus", gen: "amici", stem: "amic", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Freund", turkish: "Erkek arkadaş" },
    { word: "equus", gen: "equi", stem: "equ", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Pferd", turkish: "At" },
    { word: "filius", gen: "filii", stem: "fili", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Sohn", turkish: "Erkek evlat" },
    { word: "puer", gen: "pueri", stem: "puer", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Junge, Knabe", turkish: "Erkek çocuk" },
    { word: "ager", gen: "agri", stem: "agr", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Acker, Feld", turkish: "Tarla, arazi" },
    { word: "magister", gen: "magistri", stem: "magistr", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Lehrer", turkish: "Öğretmen" },
    { word: "vir", gen: "viri", stem: "vir", gender: "m", group: "o_dekl_m", declName: "o-Deklination (m)", german: "Mann", turkish: "Erkek, adam" },

    // --- o-Deklination (n.) ---
    { word: "templum", gen: "templi", stem: "templ", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Tempel, Heiligtum", turkish: "Tapınak" },
    { word: "oppidum", gen: "oppidi", stem: "oppid", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Stadt, befestigte Siedlung", turkish: "Kasaba, hisar" },
    { word: "donum", gen: "doni", stem: "don", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Geschenk, Gabe", turkish: "Hediye" },
    { word: "bellum", gen: "belli", stem: "bell", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Krieg", turkish: "Savaş" },
    { word: "verbum", gen: "verbi", stem: "verb", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Wort", turkish: "Kelime, söz" },
    { word: "periculum", gen: "periculi", stem: "pericul", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Gefahr", turkish: "Tehlike" },
    { word: "gaudium", gen: "gaudii", stem: "gaudi", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Freude", turkish: "Sevinç" },
    { word: "forum", gen: "fori", stem: "for", gender: "n", group: "o_dekl_n", declName: "o-Deklination (n)", german: "Marktplatz, Forum", turkish: "Meydan, forum" },

    // --- 3. Deklination (Konsonantische Stämme m./f./n.) ---
    { word: "rex", gen: "regis", stem: "reg", gender: "m", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "König", turkish: "Kral" },
    { word: "miles", gen: "militis", stem: "milit", gender: "m", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Soldat, Krieger", turkish: "Asker" },
    { word: "consul", gen: "consulis", stem: "consul", gender: "m", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Konsul", turkish: "Konsül" },
    { word: "vox", gen: "vocis", stem: "voc", gender: "f", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Stimme, Ausruf", turkish: "Ses" },
    { word: "lux", gen: "lucis", stem: "luc", gender: "f", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Licht", turkish: "Işık" },
    { word: "laus", gen: "laudis", stem: "laud", gender: "f", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Lob, Ruhm", turkish: "Övgü" },
    { word: "corpus", gen: "corporis", stem: "corpor", gender: "n", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Körper, Leib", turkish: "Vücut, gövde" },
    { word: "tempus", gen: "temporis", stem: "tempor", gender: "n", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Zeit, Zeitraum", turkish: "Zaman, mevsim" },
    { word: "carmen", gen: "carminis", stem: "carmin", gender: "n", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Lied, Gedicht", turkish: "Şiir, şarkı" },
    { word: "flumen", gen: "fluminis", stem: "flumin", gender: "n", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Fluss, Strom", turkish: "Nehir" },
    { word: "caput", gen: "capitis", stem: "capit", gender: "n", group: "dritte_kons", declName: "3. Deklination (konsonantisch)", german: "Kopf, Hauptstadt", turkish: "Kafa, baş" },

    // --- 3. Deklination (i-Stamm & Mischstamm) ---
    { word: "civis", gen: "civis", stem: "civ", gender: "m", group: "dritte_i", declName: "3. Deklination (i-Stamm)", german: "Bürger, Mitbürger", turkish: "Vatandaş" },
    { word: "navis", gen: "navis", stem: "nav", gender: "f", group: "dritte_i", declName: "3. Deklination (i-Stamm)", german: "Schiff", turkish: "Gemi" },
    { word: "ignis", gen: "ignis", stem: "ign", gender: "m", group: "dritte_i", declName: "3. Deklination (i-Stamm)", german: "Feuer", turkish: "Ateş" },
    { word: "hostis", gen: "hostis", stem: "host", gender: "m", group: "dritte_i", declName: "3. Deklination (i-Stamm)", german: "Feind (Landesfeind)", turkish: "Düşman" },
    { word: "urbs", gen: "urbis", stem: "urb", gender: "f", group: "dritte_i", declName: "3. Deklination (Mischstamm)", german: "Stadt (oft Rom)", turkish: "Şehir, kent" },
    { word: "nox", gen: "noctis", stem: "noct", gender: "f", group: "dritte_i", declName: "3. Deklination (Mischstamm)", german: "Nacht", turkish: "Gece" },
    { word: "mors", gen: "mortis", stem: "mort", gender: "f", group: "dritte_i", declName: "3. Deklination (Mischstamm)", german: "Tod", turkish: "Ölüm" },
    { word: "pars", gen: "partis", stem: "part", gender: "f", group: "dritte_i", declName: "3. Deklination (Mischstamm)", german: "Teil, Seite, Richtung", turkish: "Kısım, parça" },
    { word: "mare", gen: "maris", stem: "mar", gender: "n", group: "dritte_i", declName: "3. Deklination (Neutrum i-Stamm)", german: "Meer", turkish: "Deniz", special: "neuter_i" },
    { word: "animal", gen: "animalis", stem: "animal", gender: "n", group: "dritte_i", declName: "3. Deklination (Neutrum i-Stamm)", german: "Lebewesen, Tier", turkish: "Hayvan, canlı", special: "neuter_i" },

    // --- 4. Deklination (u-Deklination) ---
    { word: "senatus", gen: "senatus", stem: "senat", gender: "m", group: "u_dekl", declName: "u-Deklination (4. Deklination)", german: "Senat, Ältestenrat", turkish: "Senato" },
    { word: "exercitus", gen: "exercitus", stem: "exercit", gender: "m", group: "u_dekl", declName: "u-Deklination (4. Deklination)", german: "Heer, Streitmacht", turkish: "Ordu" },
    { word: "casus", gen: "casus", stem: "cas", gender: "m", group: "u_dekl", declName: "u-Deklination (4. Deklination)", german: "Fall, Zufall, Ereignis", turkish: "Durum, olay" },
    { word: "manus", gen: "manus", stem: "man", gender: "f", group: "u_dekl", declName: "u-Deklination (4. Deklination)", german: "Hand, Schar (Femininum!)", turkish: "El, birlik" },
    { word: "cornu", gen: "cornus", stem: "corn", gender: "n", group: "u_dekl", declName: "u-Deklination (4. Deklination)", german: "Horn, Heeresflügel", turkish: "Boynuz, ordu kanadı", special: "u_neuter" },

    // --- 5. Deklination (e-Deklination) ---
    { word: "res", gen: "rei", stem: "r", gender: "f", group: "e_dekl", declName: "e-Deklination (5. Deklination)", german: "Sache, Ding, Angelegenheit", turkish: "Şey, olay, durum" },
    { word: "dies", gen: "diei", stem: "di", gender: "m", group: "e_dekl", declName: "e-Deklination (5. Deklination)", german: "Tag, Termin", turkish: "Gün" },
    { word: "spes", gen: "spei", stem: "sp", gender: "f", group: "e_dekl", declName: "e-Deklination (5. Deklination)", german: "Hoffnung", turkish: "Umut" },
    { word: "fides", gen: "fidei", stem: "fid", gender: "f", group: "e_dekl", declName: "e-Deklination (5. Deklination)", german: "Treue, Verlässlichkeit, Glaube", turkish: "Sadakat, güven" }
];

/**
 * Kernfunktion der Deklination: Bildet anhand des Nomens und Kasus die grammatisch korrekte Form.
 * Folgt streng den Regeln des Gymnasiums Klasse 6-8.
 */
function getDeclinedForm(noun, caseName) {
    const stem = noun.stem;
    const isNeuter = noun.gender === "n";
    const group = noun.group;

    switch (group) {
        case "a_dekl":
            switch (caseName) {
                case "Nominativ Singular": return noun.word;
                case "Genitiv Singular": return stem + "ae";
                case "Dativ Singular": return stem + "ae";
                case "Akkusativ Singular": return stem + "am";
                case "Ablativ Singular": return stem + "a";
                case "Nominativ Plural": return stem + "ae";
                case "Genitiv Plural": return stem + "arum";
                case "Dativ Plural": return stem + "is";
                case "Akkusativ Plural": return stem + "as";
                case "Ablativ Plural": return stem + "is";
            }
            break;

        case "o_dekl_m":
            switch (caseName) {
                case "Nominativ Singular": return noun.word;
                case "Genitiv Singular": return stem + "i";
                case "Dativ Singular": return stem + "o";
                case "Akkusativ Singular": return stem + "um";
                case "Ablativ Singular": return stem + "o";
                case "Nominativ Plural": return stem + "i";
                case "Genitiv Plural": return stem + "orum";
                case "Dativ Plural": return stem + "is";
                case "Akkusativ Plural": return stem + "os";
                case "Ablativ Plural": return stem + "is";
            }
            break;

        case "o_dekl_n":
            switch (caseName) {
                case "Nominativ Singular":
                case "Akkusativ Singular": return noun.word; // Neutrum-Gesetz: Nom = Akk
                case "Genitiv Singular": return stem + "i";
                case "Dativ Singular":
                case "Ablativ Singular": return stem + "o";
                case "Nominativ Plural":
                case "Akkusativ Plural": return stem + "a"; // Neutrum-Gesetz: Plural endet auf -a
                case "Genitiv Plural": return stem + "orum";
                case "Dativ Plural":
                case "Ablativ Plural": return stem + "is";
            }
            break;

        case "dritte_kons":
            if (isNeuter) {
                switch (caseName) {
                    case "Nominativ Singular":
                    case "Akkusativ Singular": return noun.word;
                    case "Genitiv Singular": return stem + "is";
                    case "Dativ Singular": return stem + "i";
                    case "Ablativ Singular": return stem + "e";
                    case "Nominativ Plural":
                    case "Akkusativ Plural": return stem + "a";
                    case "Genitiv Plural": return stem + "um";
                    case "Dativ Plural":
                    case "Ablativ Plural": return stem + "ibus";
                }
            } else {
                switch (caseName) {
                    case "Nominativ Singular": return noun.word;
                    case "Genitiv Singular": return stem + "is";
                    case "Dativ Singular": return stem + "i";
                    case "Akkusativ Singular": return stem + "em";
                    case "Ablativ Singular": return stem + "e";
                    case "Nominativ Plural": return stem + "es";
                    case "Genitiv Plural": return stem + "um";
                    case "Dativ Plural":
                    case "Ablativ Plural": return stem + "ibus";
                    case "Akkusativ Plural": return stem + "es";
                }
            }
            break;

        case "dritte_i":
            if (noun.special === "neuter_i") {
                // Neutrum i-Stamm (z.B. mare, animal)
                switch (caseName) {
                    case "Nominativ Singular":
                    case "Akkusativ Singular": return noun.word;
                    case "Genitiv Singular": return stem + "is";
                    case "Dativ Singular":
                    case "Ablativ Singular": return stem + "i"; // Ablativ Sg. auf -i!
                    case "Nominativ Plural":
                    case "Akkusativ Plural": return stem + "ia"; // Plural auf -ia!
                    case "Genitiv Plural": return stem + "ium"; // Genitiv Plural auf -ium!
                    case "Dativ Plural":
                    case "Ablativ Plural": return stem + "ibus";
                }
            } else {
                // Maskulina / Feminina (civis, navis, urbs, mors)
                switch (caseName) {
                    case "Nominativ Singular": return noun.word;
                    case "Genitiv Singular": return stem + "is";
                    case "Dativ Singular": return stem + "i";
                    case "Akkusativ Singular": return stem + "em";
                    case "Ablativ Singular": return stem + "e";
                    case "Nominativ Plural": return stem + "es";
                    case "Genitiv Plural": return stem + "ium"; // Wichtig: -ium!
                    case "Dativ Plural":
                    case "Ablativ Plural": return stem + "ibus";
                    case "Akkusativ Plural": return stem + "es";
                }
            }
            break;

        case "u_dekl":
            if (noun.special === "u_neuter") {
                // Neutrum u-Deklination (cornu)
                switch (caseName) {
                    case "Nominativ Singular":
                    case "Akkusativ Singular":
                    case "Dativ Singular":
                    case "Ablativ Singular": return noun.word; // cornu
                    case "Genitiv Singular": return stem + "us";
                    case "Nominativ Plural":
                    case "Akkusativ Plural": return stem + "ua";
                    case "Genitiv Plural": return stem + "uum";
                    case "Dativ Plural":
                    case "Ablativ Plural": return stem + "ibus";
                }
            } else {
                // Maskulina / Feminina (senatus, exercitus, manus)
                switch (caseName) {
                    case "Nominativ Singular": return noun.word;
                    case "Genitiv Singular": return stem + "us";
                    case "Dativ Singular": return stem + "ui";
                    case "Akkusativ Singular": return stem + "um";
                    case "Ablativ Singular": return stem + "u";
                    case "Nominativ Plural": return stem + "us";
                    case "Genitiv Plural": return stem + "uum";
                    case "Dativ Plural":
                    case "Ablativ Plural": return stem + "ibus";
                    case "Akkusativ Plural": return stem + "us";
                }
            }
            break;

        case "e_dekl":
            switch (caseName) {
                case "Nominativ Singular": return noun.word;
                case "Genitiv Singular":
                case "Dativ Singular": return stem + "ei";
                case "Akkusativ Singular": return stem + "em";
                case "Ablativ Singular": return stem + "e";
                case "Nominativ Plural": return stem + "es";
                case "Genitiv Plural": return stem + "erum";
                case "Dativ Plural":
                case "Ablativ Plural": return stem + "ebus";
                case "Akkusativ Plural": return stem + "es";
            }
            break;
    }
    return noun.word;
}

// Node.js Modulkompatibilität für automatische Tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LATIN_GROUPS: rootScope.LATIN_GROUPS,
        LATIN_CASES: rootScope.LATIN_CASES,
        LATIN_NOUNS: rootScope.LATIN_NOUNS,
        getDeclinedForm: getDeclinedForm
    };
}

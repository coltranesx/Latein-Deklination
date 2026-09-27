/**
 * Latein-Deklination Trainer
 * Spiellogik, Timer, Audio und didaktische Fehleranalyse
 * Entspricht Latein-Practice 1.1 Standard
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM-Elemente ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const selectionScreen = document.getElementById('selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const scoreScreen = document.getElementById('score-screen');

    const startBtn = document.getElementById('start-btn');
    const startPracticeBtn = document.getElementById('start-practice-btn');
    const restartBtn = document.getElementById('restart-btn');
    const helpBtn = document.getElementById('help-btn');
    const passBtn = document.getElementById('pass-btn');
    const nextBtn = document.getElementById('next-btn');
    const exitBtn = document.getElementById('exit-btn');
    const selectAllBtn = document.getElementById('select-all-btn');

    const groupListOptions = document.getElementById('group-list-options');
    const scoreEl = document.getElementById('score');
    const questionCounterEl = document.getElementById('question-counter');
    const timerBar = document.getElementById('timer-bar');

    const questionTypeBadge = document.getElementById('question-type-badge');
    const questionTitle = document.getElementById('question-title');
    const questionWord = document.getElementById('question-word');
    const questionSubtext = document.getElementById('question-subtext');
    const answerButtons = document.querySelectorAll('.btn-answer');

    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');

    const congratsMessageEl = document.getElementById('congrats-message');
    const finalScoreEl = document.getElementById('final-score');
    const statCorrectEl = document.getElementById('stat-correct');
    const statWrongEl = document.getElementById('stat-wrong');
    const statPassedEl = document.getElementById('stat-passed');
    const statAccuracyEl = document.getElementById('stat-accuracy');
    const teacherFeedbackEl = document.getElementById('teacher-feedback');
    const analysisListEl = document.getElementById('analysis-list');
    const confettiContainer = document.getElementById('confetti-container');

    const helpModal = document.getElementById('help-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const musicToggleBtn = document.getElementById('music-toggle-btn');

    const ambientSound = document.getElementById('ambient-sound');
    const clickSound = document.getElementById('click-sound');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const endSound = document.getElementById('end-sound');

    // --- Spielzustand ---
    const TOTAL_QUESTIONS = 10;
    const TIME_PER_QUESTION = 15;

    let selectedGroupIds = [];
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let passedCount = 0;
    let passUsed = false;
    let timerInterval = null;
    let timeLeft = TIME_PER_QUESTION;
    let isMuted = false;
    let confettiAnim = null;
    let roundHistory = [];
    let mistakesByGroup = {};

    // --- Monochrome SVG-Icons (Latein-Practice 1.1) ---
    const ICONS = {
        sun: `<svg class="icon-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,
        moon: `<svg class="icon-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`,
        soundOn: `<svg class="icon-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`,
        soundOff: `<svg class="icon-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line></svg>`
    };

    // --- Hilfsfunktionen ---
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function playSound(audioEl) {
        if (isMuted || !audioEl) return;
        try {
            audioEl.currentTime = 0;
            const playPromise = audioEl.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log("Audio play blocked:", e));
            }
        } catch (e) {
            console.log("Audio error:", e);
        }
    }

    // --- Konfetti-Animation (Lottie) ---
    function triggerConfetti() {
        if (typeof lottie === 'undefined' || !confettiContainer) return;
        try {
            stopConfetti();
            confettiContainer.classList.remove('hidden');
            confettiAnim = lottie.loadAnimation({
                container: confettiContainer,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: 'confetti.json'
            });
            confettiAnim.addEventListener('complete', stopConfetti);
            setTimeout(stopConfetti, 5500);
        } catch (e) {
            console.log("Confetti animation failed:", e);
        }
    }

    function stopConfetti() {
        if (confettiAnim) {
            try { confettiAnim.destroy(); } catch (e) {}
            confettiAnim = null;
        }
        if (confettiContainer) {
            confettiContainer.classList.add('hidden');
            confettiContainer.innerHTML = '';
        }
    }

    // --- Theme & Sound Toggle ---
    function initTheme() {
        const savedTheme = localStorage.getItem('latein_theme') || 'dark';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = ICONS.sun;
        } else {
            document.body.classList.remove('dark-theme');
            themeToggleBtn.innerHTML = ICONS.moon;
        }
    }

    function toggleTheme() {
        playSound(clickSound);
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('latein_theme', isDark ? 'dark' : 'light');
        themeToggleBtn.innerHTML = isDark ? ICONS.sun : ICONS.moon;
    }

    function initSound() {
        const savedMuted = localStorage.getItem('latein_muted');
        isMuted = savedMuted === 'true';
        updateMusicIcon();
        if (ambientSound) {
            ambientSound.volume = 0.2;
            if (!isMuted) {
                ambientSound.play().catch(() => {});
            }
        }
    }

    function toggleSound() {
        isMuted = !isMuted;
        localStorage.setItem('latein_muted', isMuted);
        updateMusicIcon();
        if (isMuted) {
            if (ambientSound) ambientSound.pause();
        } else {
            playSound(clickSound);
            if (ambientSound) ambientSound.play().catch(() => {});
        }
    }

    function updateMusicIcon() {
        musicToggleBtn.innerHTML = isMuted ? ICONS.soundOff : ICONS.soundOn;
    }

    // --- Auswahl-Bildschirm (Deklinationsgruppen) ---
    function populateSelectionScreen() {
        groupListOptions.innerHTML = '';
        const groups = window.LATIN_GROUPS || [];

        // Vorherige Auswahl aus localStorage oder alle standardmäßig
        const savedGroups = JSON.parse(localStorage.getItem('latein_selected_groups') || '[]');

        groups.forEach(grp => {
            const item = document.createElement('div');
            item.className = 'checkbox-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'grp_' + grp.id;
            checkbox.value = grp.id;
            checkbox.checked = savedGroups.length === 0 || savedGroups.includes(grp.id);

            const textWrap = document.createElement('div');
            textWrap.className = 'group-text-wrap';

            const label = document.createElement('label');
            label.htmlFor = 'grp_' + grp.id;
            label.textContent = grp.title;

            const desc = document.createElement('span');
            desc.className = 'group-desc';
            desc.textContent = grp.description;

            textWrap.appendChild(label);
            textWrap.appendChild(desc);
            item.appendChild(checkbox);
            item.appendChild(textWrap);

            item.addEventListener('click', (e) => {
                if (e.target !== checkbox && e.target !== label) {
                    checkbox.checked = !checkbox.checked;
                    updateSelectionState();
                }
            });

            checkbox.addEventListener('change', updateSelectionState);
            groupListOptions.appendChild(item);
        });

        updateSelectionState();
    }

    function updateSelectionState() {
        const checkboxes = groupListOptions.querySelectorAll('input[type="checkbox"]');
        selectedGroupIds = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        startPracticeBtn.disabled = selectedGroupIds.length === 0;
        localStorage.setItem('latein_selected_groups', JSON.stringify(selectedGroupIds));
    }

    // --- Didaktische Hilfsfunktionen für Fragenerzeugung ---
    function getPedagogicalExplanation(noun, targetCase, correctAns) {
        let expl = `Das Wort gehört zur <strong>${noun.declName}</strong> (Stamm: <em>${noun.stem}-</em>). Die korrekte Form für <strong>${targetCase.name}</strong> lautet <strong>${correctAns}</strong>.`;
        if (noun.gender === "n" && targetCase.name.includes("Akkusativ Singular")) {
            expl += `<br>💡 <em>Neutrum-Regel:</em> Im Singular sind Nominativ und Akkusativ immer formgleich mit der Grundform (<em>${noun.word}</em>)!`;
        } else if (noun.gender === "n" && targetCase.name.includes("Plural")) {
            const ending = noun.special === "neuter_i" ? "-ia" : (noun.special === "u_neuter" ? "-ua" : "-a");
            expl += `<br>💡 <em>Neutrum-Regel:</em> Im Plural enden Nominativ und Akkusativ bei Neutra immer auf <strong>${ending}</strong> (<em>${correctAns}</em>)!`;
        } else if (noun.group === "dritte_i" && targetCase.name === "Genitiv Plural") {
            expl += `<br>💡 <em>i-Stamm Regel:</em> Bei i-Stämmen und Mischstämmen endet der Genitiv Plural <strong>immer auf -ium</strong> (<em>${correctAns}</em>), niemals auf -um!`;
        } else if (noun.group === "dritte_kons" && targetCase.name === "Genitiv Plural") {
            expl += `<br>💡 <em>Konsonantische Regel:</em> Reine konsonantische Stämme enden im Genitiv Plural auf <strong>-um</strong> (<em>${correctAns}</em>)!`;
        } else if (noun.word.endsWith("er") && noun.stem !== noun.word) {
            expl += `<br>💡 <em>-er Stammregel:</em> Bei <em>${noun.word}</em> entfällt das -e- im Stamm (Genitiv: <em>${noun.gen}</em> ➔ Stamm: <em>${noun.stem}-</em> ➔ <em>${correctAns}</em>)!`;
        } else if (noun.special === "neuter_i" && targetCase.name === "Ablativ Singular") {
            expl += `<br>💡 <em>Neutrum i-Stamm:</em> Der Ablativ Singular reiner i-Neutra endet auf <strong>-i</strong> (<em>${correctAns}</em>), nicht auf -e!`;
        }
        return expl;
    }

    function generateFormDistractors(noun, targetCase, correctAns) {
        const optionsSet = new Set([correctAns]);
        const cases = window.LATIN_CASES || [];

        // 1. Didaktische Schülerfallen (Typische gymnasiale Prüfungsfallen)
        if (noun.gender === 'n' && targetCase.name.includes("Akkusativ Singular")) {
            optionsSet.add(noun.stem + "em"); // Trap: corporem, carminem
        }
        if (noun.gender === 'n' && targetCase.name.includes("Plural")) {
            optionsSet.add(noun.stem + "es"); // Trap: tempores, donos
        }
        if (noun.group === 'dritte_i' && targetCase.name === 'Genitiv Plural') {
            optionsSet.add(noun.stem + "um"); // Trap: civum, urbum
        }
        if (noun.group === 'dritte_kons' && targetCase.name === 'Genitiv Plural') {
            optionsSet.add(noun.stem + "ium"); // Trap: regium, militium
        }
        if (noun.word.endsWith("er") && noun.stem !== noun.word) {
            optionsSet.add(noun.word + "um"); // Trap: agerum
            optionsSet.add(noun.word + "o");  // Trap: agero
        }
        if (noun.special === 'neuter_i' && targetCase.name === 'Ablativ Singular') {
            optionsSet.add(noun.stem + "e");  // Trap: mare statt mari
        }
        if (noun.group === 'u_dekl' && targetCase.name === 'Genitiv Singular') {
            optionsSet.add(noun.stem + "i");  // Trap: senati statt senatus
        }
        if (noun.group === 'o_dekl_m' && targetCase.name === 'Genitiv Singular') {
            optionsSet.add(noun.stem + "us"); // Trap: dominus statt domini
        }

        // 2. Echte Formen desselben Wortes aus anderen Kasus
        cases.forEach(c => {
            const f = getDeclinedForm(noun, c.name);
            if (f && f !== correctAns) {
                optionsSet.add(f);
            }
        });

        // 3. Notfall-Generierung mit stammgleichen Suffixen
        const fallbackEndings = ["is", "ibus", "as", "os", "am", "um", "e", "i", "o", "a", "es"];
        for (let end of fallbackEndings) {
            if (optionsSet.size >= 4) break;
            optionsSet.add(noun.stem + end);
        }

        const distractorPool = Array.from(optionsSet).filter(o => o !== correctAns);
        const shuffledDistractors = shuffleArray(distractorPool);
        const finalOptions = shuffleArray([correctAns, ...shuffledDistractors.slice(0, 3)]);
        return finalOptions;
    }

    // --- Fragengenerator (Algorithmus auf Gymnasial-Niveau) ---
    function generateQuestions() {
        const allNouns = window.LATIN_NOUNS || [];
        const filteredNouns = allNouns.filter(n => selectedGroupIds.includes(n.group));
        
        if (filteredNouns.length === 0) {
            return [];
        }

        const cases = window.LATIN_CASES || [];
        const questions = [];
        const shuffledNouns = shuffleArray(filteredNouns);

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const noun = shuffledNouns[i % shuffledNouns.length];
            // Typ 1: Formenbildung (50%), Typ 2: Formenbestimmung (30%), Typ 3: Deklinationsklasse (20%)
            const randType = Math.random();
            const qType = randType < 0.5 ? 1 : (randType < 0.8 ? 2 : 3);

            if (qType === 1) {
                // Typ 1: Formenbildung (Nominativ Singular wird ausgeschlossen, da Wort schon vorgegeben)
                let eligibleCases = cases.filter(c => c.name !== "Nominativ Singular");
                if (noun.onlySingular) {
                    eligibleCases = eligibleCases.filter(c => !c.name.includes("Plural"));
                } else if (noun.defectivePlural) {
                    eligibleCases = eligibleCases.filter(c => !c.name.includes("Plural") || c.name.includes("Akkusativ"));
                }

                const targetCase = eligibleCases[Math.floor(Math.random() * eligibleCases.length)];
                const correctAns = getDeclinedForm(noun, targetCase.name);
                const options = generateFormDistractors(noun, targetCase, correctAns);
                const explanation = getPedagogicalExplanation(noun, targetCase, correctAns);

                questions.push({
                    type: "Formenbildung",
                    category: noun.group,
                    noun: noun,
                    title: `Wie lautet der <strong>${targetCase.name}</strong> von:`,
                    word: noun.word,
                    subtext: `(${noun.gen}, ${noun.gender}. • ${noun.german} / ${noun.turkish})`,
                    correct: correctAns,
                    options: options,
                    explanation: explanation
                });
            } else if (qType === 2) {
                // Typ 2: Formenbestimmung (Klassenarbeits-Klassiker: Welcher Kasus liegt vor?)
                let candidateCases = cases.filter(c => c.name !== "Nominativ Singular");
                if (noun.onlySingular) candidateCases = candidateCases.filter(c => !c.name.includes("Plural"));
                
                const sampleCase = candidateCases[Math.floor(Math.random() * candidateCases.length)];
                const sampleForm = getDeclinedForm(noun, sampleCase.name);

                // Alle passenden Kasus für diese Form sammeln
                const matchingCases = [];
                cases.forEach(c => {
                    if (getDeclinedForm(noun, c.name) === sampleForm) {
                        matchingCases.push(c.abbr);
                    }
                });

                const correctAns = matchingCases.join(" / ");

                // Plausible alternative Kasus-Bündel als Distraktoren
                const allCaseBundles = [
                    "Nom. Sg.", "Gen. Sg.", "Dat. Sg.", "Akk. Sg.", "Abl. Sg.",
                    "Nom. Pl.", "Gen. Pl.", "Dat. Pl.", "Akk. Pl.", "Abl. Pl.",
                    "Nom. Pl. / Akk. Pl.", "Dat. Pl. / Abl. Pl.", "Dat. Sg. / Abl. Sg.",
                    "Gen. Sg. / Nom. Pl.", "Gen. Sg. / Dat. Sg."
                ];

                const distractorSet = new Set();
                const shuffledBundles = shuffleArray(allCaseBundles);
                for (let b of shuffledBundles) {
                    if (b !== correctAns) {
                        distractorSet.add(b);
                        if (distractorSet.size >= 3) break;
                    }
                }

                const options = shuffleArray([correctAns, ...Array.from(distractorSet)]);

                let explanation = `Die Form <strong>${sampleForm}</strong> entspricht bei <em>${noun.word}</em> (${noun.declName}): <strong>${correctAns}</strong>.`;
                if (noun.gender === "n" && sampleForm.endsWith("a")) {
                    explanation += `<br>💡 <em>Neutrum-Regel:</em> Im Plural enden Nominativ und Akkusativ stets auf -a!`;
                }

                questions.push({
                    type: "Formenbestimmung",
                    category: noun.group,
                    noun: noun,
                    title: `Welche grammatische Bestimmung passt zu der Form:`,
                    word: sampleForm,
                    subtext: `(von ${noun.word}, ${noun.gen} ${noun.gender}. • ${noun.german} / ${noun.turkish})`,
                    correct: correctAns,
                    options: options,
                    explanation: explanation
                });
            } else {
                // Typ 3: Deklinationsklasse & Zweifelsfälle bestimmen
                const correctAns = noun.declName;
                const allGroupTitles = (window.LATIN_GROUPS || []).map(g => g.title);

                const distractorSet = new Set();
                const shuffledTitles = shuffleArray(allGroupTitles);
                for (let t of shuffledTitles) {
                    if (t !== correctAns) {
                        distractorSet.add(t);
                        if (distractorSet.size >= 3) break;
                    }
                }
                const options = shuffleArray([correctAns, ...Array.from(distractorSet)]);

                const explanation = `Die Deklinationsklasse wird stets über den <strong>Genitiv Singular (${noun.gen})</strong> bestimmt. Da dieser auf <em>-${noun.gen.slice(-2)}</em> endet, gehört <em>${noun.word}</em> zur <strong>${noun.declName}</strong>.`;

                questions.push({
                    type: "Klassifikation",
                    category: noun.group,
                    noun: noun,
                    title: `Zu welcher Deklination gehört das Substantiv:`,
                    word: `${noun.word}, ${noun.gen}`,
                    subtext: `(${noun.gender}. • ${noun.german} / ${noun.turkish})`,
                    correct: correctAns,
                    options: options,
                    explanation: explanation
                });
            }
        }

        return questions;
    }

    // --- Spielsteuerung ---
    function startPractice() {
        currentQuestions = generateQuestions();
        if (currentQuestions.length === 0) return;

        currentIndex = 0;
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        passedCount = 0;
        passUsed = false;
        roundHistory = [];
        mistakesByGroup = {};
        selectedGroupIds.forEach(id => mistakesByGroup[id] = 0);

        passBtn.disabled = false;
        passBtn.textContent = "Passen (1)";

        selectionScreen.classList.add('hidden');
        scoreScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        loadQuestion();
    }

    function loadQuestion() {
        const q = currentQuestions[currentIndex];

        // HUD aktualisieren
        scoreEl.textContent = score;
        questionCounterEl.textContent = `${currentIndex + 1} / ${TOTAL_QUESTIONS}`;

        // Soru Alanı
        questionTypeBadge.textContent = q.type;
        questionTitle.innerHTML = q.title;
        questionWord.textContent = q.word;
        questionSubtext.textContent = q.subtext;

        // Şıkları yükle
        answerButtons.forEach((btn, idx) => {
            btn.textContent = q.options[idx] || "";
            btn.className = "btn btn-answer";
            btn.disabled = false;
            btn.style.display = q.options[idx] ? "flex" : "none";
            btn.onclick = () => selectAnswer(btn.textContent, btn);
        });

        // Geri bildirim ve sonraki butonunu gizle
        feedbackBox.classList.add('hidden');
        nextBtn.classList.add('hidden');
        passBtn.classList.remove('hidden');

        // Timer başlat
        startTimer();
    }

    // --- Timer Logik ---
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = TIME_PER_QUESTION;
        timerBar.style.width = "100%";
        timerBar.style.backgroundColor = "#2ecc71";

        timerInterval = setInterval(() => {
            timeLeft--;
            const pct = (timeLeft / TIME_PER_QUESTION) * 100;
            timerBar.style.width = pct + "%";

            if (timeLeft <= 5) {
                timerBar.style.backgroundColor = "#e74c3c";
            } else if (timeLeft <= 8) {
                timerBar.style.backgroundColor = "#f39c12";
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function handleTimeout() {
        playSound(wrongSound);
        wrongCount++;
        const q = currentQuestions[currentIndex];
        mistakesByGroup[q.category] = (mistakesByGroup[q.category] || 0) + 1;

        answerButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === q.correct) {
                btn.classList.add('correct');
            }
        });

        feedbackBox.className = "feedback-wrong";
        feedbackTitle.textContent = "⏱️ Zeit abgelaufen!";
        feedbackText.innerHTML = `Die richtige Antwort lautet: <strong>${q.correct}</strong>.<br>${q.explanation}`;
        feedbackBox.classList.remove('hidden');

        roundHistory.push({
            word: q.word,
            question: q.title,
            selected: "Zeit abgelaufen",
            correct: q.correct,
            status: "timeout",
            group: q.noun.declName
        });

        passBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
    }

    // --- Cevap Seçimi ---
    function selectAnswer(chosenAns, selectedBtn) {
        stopTimer();
        const q = currentQuestions[currentIndex];
        const isCorrect = chosenAns === q.correct;

        answerButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === q.correct) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            playSound(correctSound);
            score += 10;
            correctCount++;
            selectedBtn.classList.add('correct');

            feedbackBox.className = "feedback-correct";
            feedbackTitle.textContent = "🎉 Richtig!";
            feedbackText.innerHTML = q.explanation;
        } else {
            playSound(wrongSound);
            score = Math.max(0, score - 5);
            wrongCount++;
            mistakesByGroup[q.category] = (mistakesByGroup[q.category] || 0) + 1;
            selectedBtn.classList.add('wrong');

            feedbackBox.className = "feedback-wrong";
            feedbackTitle.textContent = "❌ Falsch!";
            feedbackText.innerHTML = `Deine Antwort: <em>${chosenAns}</em>. Richtig ist: <strong>${q.correct}</strong>.<br>${q.explanation}`;
        }

        scoreEl.textContent = score;
        feedbackBox.classList.remove('hidden');

        roundHistory.push({
            word: q.word,
            question: q.title,
            selected: chosenAns,
            correct: q.correct,
            status: isCorrect ? "correct" : "wrong",
            group: q.noun.declName
        });

        passBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
    }

    // --- Passen (Überspringen) ---
    function handlePass() {
        if (passUsed) return;
        playSound(clickSound);
        passUsed = true;
        stopTimer();
        passedCount++;
        passBtn.disabled = true;
        passBtn.textContent = "Passen (0)";

        const q = currentQuestions[currentIndex];
        roundHistory.push({
            word: q.word,
            question: q.title,
            selected: "Übersprungen (Pass)",
            correct: q.correct,
            status: "passed",
            group: q.noun.declName
        });

        goToNext();
    }

    function goToNext() {
        playSound(clickSound);
        currentIndex++;
        if (currentIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            showScoreScreen();
        }
    }

    // --- Ergebnis-Bildschirm ---
    function showScoreScreen() {
        stopTimer();
        gameScreen.classList.add('hidden');
        scoreScreen.classList.remove('hidden');
        playSound(endSound);

        finalScoreEl.textContent = score;
        statCorrectEl.textContent = correctCount;
        statWrongEl.textContent = wrongCount;
        statPassedEl.textContent = passedCount;

        const accuracy = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
        statAccuracyEl.textContent = accuracy + "%";

        // Glückwunsch-Titel
        if (accuracy === 100) {
            congratsMessageEl.textContent = "🌟 Perfekt! Meisterleistung!";
            triggerConfetti();
        } else if (accuracy >= 80) {
            congratsMessageEl.textContent = "🎉 Ausgezeichnet!";
            triggerConfetti();
        } else if (accuracy >= 60) {
            congratsMessageEl.textContent = "👍 Gut gemacht!";
        } else {
            congratsMessageEl.textContent = "💪 Weiter üben!";
        }

        // Lehrer-Feedback & Fehleranalyse
        let worstGroup = null;
        let maxMistakes = 0;
        for (const [grpId, count] of Object.entries(mistakesByGroup)) {
            if (count > maxMistakes) {
                maxMistakes = count;
                worstGroup = grpId;
            }
        }

        const grpObj = window.LATIN_GROUPS.find(g => g.id === worstGroup);

        if (maxMistakes === 0) {
            teacherFeedbackEl.innerHTML = "<strong>Magister Linguae Latinae:</strong> Fantastisch! Du hast alle Kasus- und Deklinationsfragen fehlerfrei gemeistert. Du bist optimal auf die nächste Schulaufgabe vorbereitet!";
        } else if (grpObj) {
            teacherFeedbackEl.innerHTML = `<strong>Magister Linguae Latinae:</strong> In der <strong>${grpObj.title}</strong> gab es ${maxMistakes} Unsicherheiten.<br>💡 <em>Tipp:</em> ${grpObj.ruleHint}`;
        } else {
            teacherFeedbackEl.innerHTML = "<strong>Magister Linguae Latinae:</strong> Solide Runde! Gehe die falsch beantworteten Formen in der folgenden Liste noch einmal in Ruhe durch.";
        }

        // Liste der Fragen aufbauen
        analysisListEl.innerHTML = "";
        roundHistory.forEach(item => {
            const card = document.createElement('div');
            card.className = `analysis-item item-${item.status}`;

            let badgeClass = "badge-wrong";
            let badgeText = "Falsch";
            if (item.status === "correct") {
                badgeClass = "badge-correct";
                badgeText = "Richtig";
            } else if (item.status === "passed") {
                badgeClass = "badge-passed";
                badgeText = "Pass";
            } else if (item.status === "timeout") {
                badgeClass = "badge-timeout";
                badgeText = "Zeit";
            }

            card.innerHTML = `
                <div class="analysis-header">
                    <span class="analysis-word">${item.word} <small style="font-weight:normal; color:var(--text-muted);">(${item.group})</small></span>
                    <span class="analysis-badge ${badgeClass}">${badgeText}</span>
                </div>
                <div class="analysis-details">
                    <div class="analysis-detail-row">
                        <span class="analysis-label">Frage:</span>
                        <span>${item.question.replace(/<[^>]*>?/gm, '')}</span>
                    </div>
                    ${item.status !== "correct" ? `
                    <div class="analysis-detail-row">
                        <span class="analysis-label">Deine Wahl:</span>
                        <span class="analysis-ans-wrong">${item.selected}</span>
                    </div>` : ''}
                    <div class="analysis-detail-row">
                        <span class="analysis-label">Lösung:</span>
                        <span class="analysis-ans-correct">${item.correct}</span>
                    </div>
                </div>
            `;
            analysisListEl.appendChild(card);
        });
    }

    // --- Event Listeners ---
    startBtn.addEventListener('click', () => {
        playSound(clickSound);
        welcomeScreen.classList.add('hidden');
        selectionScreen.classList.remove('hidden');
        populateSelectionScreen();
    });

    startPracticeBtn.addEventListener('click', () => {
        playSound(clickSound);
        startPractice();
    });

    restartBtn.addEventListener('click', () => {
        playSound(clickSound);
        stopConfetti();
        scoreScreen.classList.add('hidden');
        selectionScreen.classList.remove('hidden');
        populateSelectionScreen();
    });

    nextBtn.addEventListener('click', goToNext);
    passBtn.addEventListener('click', handlePass);

    exitBtn.addEventListener('click', () => {
        playSound(clickSound);
        if (confirm("Möchtest du diese Übungsrunde wirklich abbrechen?")) {
            stopTimer();
            gameScreen.classList.add('hidden');
            welcomeScreen.classList.remove('hidden');
        }
    });

    selectAllBtn.addEventListener('click', () => {
        playSound(clickSound);
        const checkboxes = groupListOptions.querySelectorAll('input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
        selectAllBtn.textContent = allChecked ? "Alle auswählen" : "Auswahl aufheben";
        updateSelectionState();
    });

    // Theme & Music
    themeToggleBtn.addEventListener('click', toggleTheme);
    musicToggleBtn.addEventListener('click', toggleSound);

    // Modal
    helpBtn.addEventListener('click', () => {
        playSound(clickSound);
        helpModal.classList.add('visible');
    });

    closeModalBtn.addEventListener('click', () => {
        playSound(clickSound);
        helpModal.classList.remove('visible');
    });

    window.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.classList.remove('visible');
        }
    });

    // Initialisierung
    initTheme();
    initSound();
});

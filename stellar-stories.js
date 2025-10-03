// Stellar Stories - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Stellar Stories initializing...');
    
    // Initialize loading sequence
    startLoadingSequence();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup timeline
    setupTimeline();
    
    console.log('🌟 Stellar Stories ready!');
});

// Global variables
let currentScene = 1;
let currentQuestion = 0;
let quizScore = 0;

// Quiz data
const quizQuestions = [
    {
        question: "How long does it take for light from a solar flare to reach Earth?",
        answers: [
            { text: "8 seconds", correct: false },
            { text: "8 minutes", correct: true },
            { text: "8 hours", correct: false },
            { text: "8 days", correct: false }
        ],
        explanation: "That's right! Light travels at 299,792,458 meters per second, so it takes about 8 minutes and 20 seconds to travel the 93 million miles from the Sun to Earth."
    },
    {
        question: "What creates the beautiful aurora lights?",
        answers: [
            { text: "Flare particles colliding with Earth's atmosphere", correct: true },
            { text: "Earth's core heating up", correct: false },
            { text: "Moon reflecting sunlight", correct: false },
            { text: "Satellites beaming down light", correct: false }
        ],
        explanation: "Exactly! When solar particles hit Earth's atmosphere, they excite oxygen and nitrogen atoms, which then release energy as beautiful colored light."
    },
    {
        question: "Which technology is MOST affected by space weather?",
        answers: [
            { text: "GPS navigation systems", correct: true },
            { text: "Microwave ovens", correct: false },
            { text: "Television sets", correct: false },
            { text: "Refrigerators", correct: false }
        ],
        explanation: "GPS systems rely on precise timing signals from satellites. Space weather can disrupt these signals, causing navigation errors."
    },
    {
        question: "What is the name of Earth's magnetic field?",
        answers: [
            { text: "Atmosphere", correct: false },
            { text: "Magnetosphere", correct: true },
            { text: "Ionosphere", correct: false },
            { text: "Stratosphere", correct: false }
        ],
        explanation: "The magnetosphere is Earth's invisible magnetic shield that protects us from harmful solar radiation and particles."
    },
    {
        question: "What causes geomagnetically induced currents in power lines?",
        answers: [
            { text: "Solar particles directly hitting power lines", correct: false },
            { text: "Changes in Earth's magnetic field inducing electrical currents", correct: true },
            { text: "Power companies turning off systems", correct: false },
            { text: "Increased electricity demand", correct: false }
        ],
        explanation: "When Earth's magnetic field changes rapidly due to space weather, it can induce electrical currents in long conductors like power lines, potentially causing damage."
    }
];

// Hotspot data
const hotspotData = {
    sunspot: {
        title: "Sunspot Facts",
        content: "Sunspots are dark regions on the Sun's surface caused by intense magnetic activity. They can be larger than Earth and are often the source of solar flares!"
    },
    magnetic: {
        title: "Magnetic Fields",
        content: "The Sun's magnetic field is incredibly complex and dynamic. When field lines get twisted and snap, they release massive amounts of energy in the form of solar flares."
    },
    mercury: {
        title: "Mercury",
        content: "Mercury has no atmosphere to protect it from solar radiation. During solar storms, its surface gets bombarded with high-energy particles, making it the most vulnerable planet."
    },
    venus: {
        title: "Venus",
        content: "Venus has a thick atmosphere that provides some protection from solar radiation, but it has no magnetic field, so it still experiences significant space weather effects."
    },
    earth: {
        title: "Earth's Protection",
        content: "Earth is unique because it has both an atmosphere AND a magnetic field. The magnetosphere deflects most solar particles, protecting life on our planet."
    },
    gps: {
        title: "GPS Disruption",
        content: "GPS satellites orbit at about 20,000 km altitude. During solar storms, the ionosphere becomes disturbed, causing signal delays and positioning errors."
    },
    power: {
        title: "Power Grid Impact",
        content: "Geomagnetically induced currents can flow through power lines during solar storms, potentially overloading transformers and causing blackouts affecting millions."
    },
    radio: {
        title: "Radio Communications",
        content: "Solar radiation can ionize Earth's upper atmosphere, creating radio blackouts that affect communications, especially on the sunlit side of Earth."
    },
    satellite: {
        title: "Satellite Effects",
        content: "Satellites in low Earth orbit experience increased atmospheric drag during solar storms, which can cause orbital decay and require more frequent station-keeping maneuvers."
    }
};

// Loading sequence
function startLoadingSequence() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Event listeners
function setupEventListeners() {
    // Mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            scrollToSection(target);
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Hotspots
    setupHotspots();
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentScene > 1) {
            showScene(currentScene - 1);
        } else if (e.key === 'ArrowRight' && currentScene < 6) {
            showScene(currentScene + 1);
        }
    });
}

// Timeline setup
function setupTimeline() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    timelineDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const sceneNumber = parseInt(this.dataset.scene);
            showScene(sceneNumber);
            updateTimelineProgress(sceneNumber);
        });
    });
}

// Scene management
function showScene(sceneNumber) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    const targetScene = document.getElementById(`scene-${sceneNumber}`);
    if (targetScene) {
        targetScene.classList.add('active');
        currentScene = sceneNumber;
        updateTimelineDots(sceneNumber);
    }
}

function updateTimelineDots(sceneNumber) {
    document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.dataset.scene) <= sceneNumber) {
            dot.classList.add('active');
        }
    });
}

function updateTimelineProgress(sceneNumber) {
    const progress = document.getElementById('timeline-progress');
    const progressPercent = ((sceneNumber - 1) / 5) * 100;
    if (progress) {
        progress.style.width = progressPercent + '%';
    }
}

// Navigation functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function startJourney() {
    scrollToSection('story');
    showScene(1);
}

// Hotspot functions
function setupHotspots() {
    // Planet hotspots
    const planetInfos = document.querySelectorAll('.planet-info');
    planetInfos.forEach(info => {
        info.addEventListener('click', function() {
            const planet = this.dataset.planet;
            showHotspot(planet);
        });
    });
    
    // Tech hotspots
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            const tech = this.dataset.tech;
            showHotspot(tech);
        });
    });
    
    // Sun surface hotspots
    const sunspots = document.querySelectorAll('.sunspot');
    sunspots.forEach((sunspot, index) => {
        sunspot.addEventListener('click', function() {
            showHotspot('sunspot');
        });
    });
    
    const magneticField = document.querySelector('.magnetic-field');
    if (magneticField) {
        magneticField.addEventListener('click', function() {
            showHotspot('magnetic');
        });
    }
}

function showHotspot(type) {
    const panel = document.getElementById('hotspot-panel');
    const title = document.getElementById('hotspot-title');
    const content = document.getElementById('hotspot-content');
    
    if (hotspotData[type]) {
        title.textContent = hotspotData[type].title;
        content.textContent = hotspotData[type].content;
        panel.classList.add('active');
        
        setTimeout(() => {
            panel.classList.remove('active');
        }, 5000);
    }
}

function closeHotspot() {
    const panel = document.getElementById('hotspot-panel');
    panel.classList.remove('active');
}

// Quiz functions
function startQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    
    scrollToSection('interactive');
    
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    
    if (quizContainer) {
        quizContainer.style.display = 'block';
    }
    if (quizResults) {
        quizResults.style.display = 'none';
    }
    
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const progressText = document.getElementById('quiz-progress-text');
    const progressFill = document.getElementById('quiz-progress');
    
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    if (progressText) {
        progressText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    }
    if (progressFill) {
        progressFill.style.width = ((currentQuestion + 1) / quizQuestions.length) * 100 + '%';
    }
    
    if (answersContainer) {
        answersContainer.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer-option';
            answerElement.innerHTML = `
                <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
                <div class="answer-text">${answer.text}</div>
            `;
            
            answerElement.addEventListener('click', function() {
                selectAnswer(answer, answerElement);
            });
            
            answersContainer.appendChild(answerElement);
        });
    }
}

function selectAnswer(selectedAnswer, answerElement) {
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
        option.style.pointerEvents = 'none';
    });
    
    answerElement.classList.add('selected');
    
    if (selectedAnswer.correct) {
        quizScore++;
        answerElement.style.background = 'var(--aurora-green)';
        answerElement.style.color = 'var(--deep-space-blue)';
    } else {
        answerElement.style.background = 'var(--solar-orange)';
        answerElement.style.color = 'var(--cosmic-white)';
        
        const correctAnswer = quizQuestions[currentQuestion].answers.find(answer => answer.correct);
        const correctIndex = quizQuestions[currentQuestion].answers.indexOf(correctAnswer);
        const correctElement = document.querySelectorAll('.answer-option')[correctIndex];
        if (correctElement) {
            correctElement.style.background = 'var(--aurora-green)';
            correctElement.style.color = 'var(--deep-space-blue)';
        }
    }
    
    setTimeout(() => {
        showAnswerExplanation(selectedAnswer);
    }, 1000);
}

function showAnswerExplanation(selectedAnswer) {
    const explanation = document.createElement('div');
    explanation.className = 'answer-explanation';
    explanation.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(78, 205, 196, 0.1);
        border-left: 3px solid var(--aurora-green);
        border-radius: 0 10px 10px 0;
        font-style: italic;
    `;
    explanation.textContent = quizQuestions[currentQuestion].explanation;
    
    const answersContainer = document.getElementById('answers-container');
    if (answersContainer) {
        answersContainer.appendChild(explanation);
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showQuizResults();
        }
    }, 3000);
}

function showQuizResults() {
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const scoreNumber = document.getElementById('score-number');
    const resultsTitle = document.getElementById('results-title');
    const resultsMessage = document.getElementById('results-message');
    
    if (quizContainer) {
        quizContainer.style.display = 'none';
    }
    if (quizResults) {
        quizResults.style.display = 'block';
    }
    
    if (scoreNumber) {
        scoreNumber.textContent = quizScore;
    }
    
    const percentage = (quizScore / quizQuestions.length) * 100;
    if (percentage >= 80) {
        if (resultsTitle) resultsTitle.textContent = 'Space Weather Expert! 🌟';
        if (resultsMessage) resultsMessage.textContent = 'Outstanding! You truly understand Flare\'s journey and space weather impacts. You\'re ready to explore the cosmos!';
    } else if (percentage >= 60) {
        if (resultsTitle) resultsTitle.textContent = 'Great Job! 🚀';
        if (resultsMessage) resultsMessage.textContent = 'Well done! You\'ve learned a lot about space weather. Keep exploring to become a true space weather expert!';
    } else {
        if (resultsTitle) resultsTitle.textContent = 'Keep Learning! 📚';
        if (resultsMessage) resultsMessage.textContent = 'Good start! Review Flare\'s journey to learn more about space weather and try the quiz again!';
    }
    
    animateScore();
}

function animateScore() {
    const scoreNumber = document.getElementById('score-number');
    if (!scoreNumber) return;
    
    let currentScore = 0;
    const targetScore = quizScore;
    const increment = targetScore / 20;
    
    const scoreInterval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(scoreInterval);
        }
        scoreNumber.textContent = Math.floor(currentScore);
    }, 50);
}

function retakeQuiz() {
    startQuiz();
}

console.log('🚀 Stellar Stories JavaScript loaded!');

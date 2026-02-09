/* ============================================
   CÉUS ESTRELADO ROMÂNTICO - JAVASCRIPT
   Página interativa com constelações animadas
   ============================================ */

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

const CONFIG = {
    // Quantidade de estrelas de fundo
    STAR_COUNT: 400,
    
    // Tamanhos das estrelas (mínimo e máximo em pixels)
    STAR_SIZE_MIN: 0.5,
    STAR_SIZE_MAX: 3,
    
    // Velocidade de piscar (em ms)
    TWINKLE_SPEED_MIN: 1000,
    TWINKLE_SPEED_MAX: 4000,
    
    // Delay antes de iniciar a constelação (ms)
    CONSTELLATION_DELAY: 2500,
    
    // Velocidade de desenho das linhas (ms por linha)
    LINE_DRAW_SPEED: 300,
    
    // Intervalo entre estrelas cadentes (ms)
    SHOOTING_STAR_INTERVAL_MIN: 3000,
    SHOOTING_STAR_INTERVAL_MAX: 8000,
    
    // Cores
    COLORS: {
        starNormal: '#fffacd',        // Amarelo claro
        starBright: '#ffd700',         // Dourado
        constellationLine: '#ffd700',  // Dourado
        constellationGlow: '#ffeb3b'   // Amarelo brilhante
    }
};

// ============================================
// DEFINIÇÃO DAS CONSTELAÇÕES
// Cada constelação é um array de pontos normalizados (0-1)
// que serão convertidos para coordenadas reais
// ============================================

const CONSTELLATIONS = {
    // "EU TE AMO" - Texto formado por pontos
    "EU TE AMO": {
        points: [
            // E
            {x: 0.08, y: 0.35}, {x: 0.08, y: 0.45}, {x: 0.08, y: 0.55}, {x: 0.08, y: 0.65},
            {x: 0.12, y: 0.35}, {x: 0.11, y: 0.50}, {x: 0.12, y: 0.65},
            // U
            {x: 0.18, y: 0.35}, {x: 0.18, y: 0.45}, {x: 0.18, y: 0.55}, {x: 0.18, y: 0.65},
            {x: 0.22, y: 0.65}, {x: 0.26, y: 0.65},
            {x: 0.26, y: 0.35}, {x: 0.26, y: 0.45}, {x: 0.26, y: 0.55},
            // T
            {x: 0.34, y: 0.35}, {x: 0.38, y: 0.35}, {x: 0.42, y: 0.35},
            {x: 0.38, y: 0.45}, {x: 0.38, y: 0.55}, {x: 0.38, y: 0.65},
            // E
            {x: 0.48, y: 0.35}, {x: 0.48, y: 0.45}, {x: 0.48, y: 0.55}, {x: 0.48, y: 0.65},
            {x: 0.52, y: 0.35}, {x: 0.51, y: 0.50}, {x: 0.52, y: 0.65},
            // A
            {x: 0.62, y: 0.65}, {x: 0.60, y: 0.55}, {x: 0.58, y: 0.45}, {x: 0.62, y: 0.35}, {x: 0.66, y: 0.45},
            {x: 0.68, y: 0.55}, {x: 0.70, y: 0.65}, {x: 0.64, y: 0.52},
            // M
            {x: 0.76, y: 0.65}, {x: 0.76, y: 0.55}, {x: 0.76, y: 0.45}, {x: 0.76, y: 0.35},
            {x: 0.80, y: 0.45}, {x: 0.84, y: 0.35},
            {x: 0.88, y: 0.35}, {x: 0.88, y: 0.45}, {x: 0.88, y: 0.55}, {x: 0.88, y: 0.65},
            // O
            {x: 0.94, y: 0.40}, {x: 0.92, y: 0.50}, {x: 0.94, y: 0.60},
            {x: 0.98, y: 0.60}, {x: 1.00, y: 0.50}, {x: 0.98, y: 0.40}
        ],
        connections: [
            // E
            [0,1], [1,2], [2,3], [0,4], [1,5], [2,5], [3,6],
            // U
            [7,8], [8,9], [9,10], [10,11], [11,12], [12,13], [13,14], [14,15],
            // T
            [16,17], [17,18], [17,19], [19,20], [20,21],
            // E
            [22,23], [23,24], [24,25], [22,26], [23,27], [24,27], [25,28],
            // A
            [29,30], [30,31], [31,32], [32,33], [33,34], [34,35], [31,36], [33,36],
            // M
            [37,38], [38,39], [39,40], [40,41], [41,42], [42,43], [43,44], [44,45], [45,46],
            // O
            [47,48], [48,49], [49,50], [50,51], [51,52], [52,47]
        ]
    },
    
    // "V + M" - Iniciais com coração
    "V + M": {
        points: [
            // V
            {x: 0.20, y: 0.35}, {x: 0.28, y: 0.65}, {x: 0.36, y: 0.35},
            // +
            {x: 0.50, y: 0.42}, {x: 0.50, y: 0.50}, {x: 0.50, y: 0.58},
            {x: 0.44, y: 0.50}, {x: 0.56, y: 0.50},
            // M
            {x: 0.64, y: 0.65}, {x: 0.64, y: 0.50}, {x: 0.64, y: 0.35},
            {x: 0.72, y: 0.50}, {x: 0.80, y: 0.35},
            {x: 0.80, y: 0.50}, {x: 0.80, y: 0.65}
        ],
        connections: [
            // V
            [0,1], [1,2],
            // +
            [3,4], [4,5], [6,4], [4,7],
            // M
            [8,9], [9,10], [10,11], [11,12], [12,13], [13,14]
        ]
    },
    
    // Coração
    "CORAÇÃO": {
        points: [
            // Ponta inferior
            {x: 0.50, y: 0.75},
            // Lado esquerdo
            {x: 0.35, y: 0.55}, {x: 0.25, y: 0.42}, {x: 0.28, y: 0.30},
            // Topo esquerdo (curvinha)
            {x: 0.38, y: 0.25}, {x: 0.45, y: 0.32},
            // Centro topo
            {x: 0.50, y: 0.38},
            // Topo direito (curvinha)
            {x: 0.55, y: 0.32}, {x: 0.62, y: 0.25},
            // Lado direito
            {x: 0.72, y: 0.30}, {x: 0.75, y: 0.42}, {x: 0.65, y: 0.55}
        ],
        connections: [
            [0,1], [1,2], [2,3], [3,4], [4,5], [5,6],
            [6,7], [7,8], [8,9], [9,10], [10,11], [11,0]
        ]
    },
    
    // "13/05/2023" - Data do relacionamento
    "13/09/2025": {
        points: [
            // 1
            {x: 0.08, y: 0.35}, {x: 0.10, y: 0.35}, {x: 0.10, y: 0.45}, {x: 0.10, y: 0.55}, {x: 0.10, y: 0.65},
            {x: 0.07, y: 0.65}, {x: 0.13, y: 0.65},
            // 3
            {x: 0.18, y: 0.37}, {x: 0.22, y: 0.35}, {x: 0.25, y: 0.40},
            {x: 0.22, y: 0.48}, {x: 0.25, y: 0.56}, {x: 0.22, y: 0.65}, {x: 0.18, y: 0.62},
            // /
            {x: 0.32, y: 0.65}, {x: 0.38, y: 0.35},
            // 0
            {x: 0.43, y: 0.40}, {x: 0.42, y: 0.50}, {x: 0.43, y: 0.60},
            {x: 0.48, y: 0.65}, {x: 0.53, y: 0.60}, {x: 0.54, y: 0.50}, {x: 0.53, y: 0.40}, {x: 0.48, y: 0.35},
            // 5
            {x: 0.64, y: 0.35}, {x: 0.59, y: 0.35}, {x: 0.59, y: 0.45},
            {x: 0.63, y: 0.48}, {x: 0.65, y: 0.55}, {x: 0.62, y: 0.65}, {x: 0.58, y: 0.63},
            // /
            {x: 0.70, y: 0.65}, {x: 0.76, y: 0.35},
            // 2
            {x: 0.80, y: 0.40}, {x: 0.84, y: 0.35}, {x: 0.88, y: 0.40},
            {x: 0.84, y: 0.50}, {x: 0.80, y: 0.60}, {x: 0.80, y: 0.65}, {x: 0.88, y: 0.65},
            // 0 (segundo)
            {x: 0.91, y: 0.40}, {x: 0.90, y: 0.50}, {x: 0.91, y: 0.60},
            {x: 0.94, y: 0.65}, {x: 0.97, y: 0.60}, {x: 0.98, y: 0.50}, {x: 0.97, y: 0.40}, {x: 0.94, y: 0.35}
        ],
        connections: [
            // 1
            [0,1], [1,2], [2,3], [3,4], [5,4], [4,6],
            // 3
            [7,8], [8,9], [9,10], [10,11], [11,12], [12,13],
            // /
            [14,15],
            // 0
            [16,17], [17,18], [18,19], [19,20], [20,21], [21,22], [22,23], [23,16],
            // 5
            [24,25], [25,26], [26,27], [27,28], [28,29], [29,30],
            // /
            [31,32],
            // 2
            [33,34], [34,35], [35,36], [36,37], [37,38], [38,39],
            // 0
            [40,41], [41,42], [42,43], [43,44], [44,45], [45,46], [46,47], [47,40]
        ]
    },
    
    // "MEU DOCINHO"
    "MEU DOCINHO": {
        points: [
            // M
            {x: 0.05, y: 0.65}, {x: 0.05, y: 0.50}, {x: 0.05, y: 0.35},
            {x: 0.09, y: 0.48}, {x: 0.13, y: 0.35},
            {x: 0.13, y: 0.50}, {x: 0.13, y: 0.65},
            // E
            {x: 0.18, y: 0.35}, {x: 0.18, y: 0.50}, {x: 0.18, y: 0.65},
            {x: 0.22, y: 0.35}, {x: 0.21, y: 0.50}, {x: 0.22, y: 0.65},
            // U
            {x: 0.27, y: 0.35}, {x: 0.27, y: 0.50}, {x: 0.27, y: 0.65},
            {x: 0.31, y: 0.65}, {x: 0.35, y: 0.65},
            {x: 0.35, y: 0.50}, {x: 0.35, y: 0.35},
            // D
            {x: 0.42, y: 0.35}, {x: 0.42, y: 0.50}, {x: 0.42, y: 0.65},
            {x: 0.46, y: 0.65}, {x: 0.49, y: 0.55}, {x: 0.49, y: 0.45}, {x: 0.46, y: 0.35},
            // O
            {x: 0.54, y: 0.40}, {x: 0.53, y: 0.50}, {x: 0.54, y: 0.60},
            {x: 0.58, y: 0.65}, {x: 0.62, y: 0.60}, {x: 0.63, y: 0.50}, {x: 0.62, y: 0.40}, {x: 0.58, y: 0.35},
            // C
            {x: 0.72, y: 0.38}, {x: 0.68, y: 0.35}, {x: 0.66, y: 0.45}, {x: 0.66, y: 0.55},
            {x: 0.68, y: 0.65}, {x: 0.72, y: 0.62},
            // I
            {x: 0.76, y: 0.35}, {x: 0.76, y: 0.50}, {x: 0.76, y: 0.65},
            // N
            {x: 0.81, y: 0.65}, {x: 0.81, y: 0.50}, {x: 0.81, y: 0.35},
            {x: 0.85, y: 0.50}, {x: 0.89, y: 0.35}, {x: 0.89, y: 0.50}, {x: 0.89, y: 0.65},
            // H
            {x: 0.93, y: 0.35}, {x: 0.93, y: 0.50}, {x: 0.93, y: 0.65},
            {x: 0.97, y: 0.50}, {x: 1.00, y: 0.35}, {x: 1.00, y: 0.50}, {x: 1.00, y: 0.65}
        ],
        connections: [
            // M
            [0,1], [1,2], [2,3], [3,4], [4,5], [5,6],
            // E
            [7,8], [8,9], [7,10], [8,11], [9,12],
            // U
            [13,14], [14,15], [15,16], [16,17], [17,18], [18,19],
            // D
            [20,21], [21,22], [22,23], [23,24], [24,25], [25,26], [26,20],
            // O
            [27,28], [28,29], [29,30], [30,31], [31,32], [32,33], [33,34], [34,27],
            // C
            [35,36], [36,37], [37,38], [38,39], [39,40],
            // I
            [41,42], [42,43],
            // N
            [44,45], [45,46], [46,47], [47,48], [48,49], [49,50],
            // H
            [51,52], [52,53], [52,54], [54,55], [55,56], [56,57]
        ]
    },
    
    // "VIVO POR VOCÊ"
    "VIVO POR VOCÊ": {
        points: [
            // V
            {x: 0.05, y: 0.35}, {x: 0.09, y: 0.65}, {x: 0.13, y: 0.35},
            // I
            {x: 0.18, y: 0.35}, {x: 0.18, y: 0.50}, {x: 0.18, y: 0.65},
            // V
            {x: 0.23, y: 0.35}, {x: 0.27, y: 0.65}, {x: 0.31, y: 0.35},
            // O
            {x: 0.36, y: 0.40}, {x: 0.35, y: 0.50}, {x: 0.36, y: 0.60},
            {x: 0.40, y: 0.65}, {x: 0.44, y: 0.60}, {x: 0.45, y: 0.50}, {x: 0.44, y: 0.40}, {x: 0.40, y: 0.35},
            // P
            {x: 0.52, y: 0.65}, {x: 0.52, y: 0.50}, {x: 0.52, y: 0.35},
            {x: 0.56, y: 0.35}, {x: 0.58, y: 0.42}, {x: 0.56, y: 0.50},
            // O
            {x: 0.63, y: 0.40}, {x: 0.62, y: 0.50}, {x: 0.63, y: 0.60},
            {x: 0.67, y: 0.65}, {x: 0.71, y: 0.60}, {x: 0.72, y: 0.50}, {x: 0.71, y: 0.40}, {x: 0.67, y: 0.35},
            // R
            {x: 0.76, y: 0.65}, {x: 0.76, y: 0.50}, {x: 0.76, y: 0.35},
            {x: 0.80, y: 0.35}, {x: 0.82, y: 0.42}, {x: 0.80, y: 0.50},
            {x: 0.82, y: 0.65},
            // V
            {x: 0.86, y: 0.35}, {x: 0.90, y: 0.65}, {x: 0.94, y: 0.35},
            // C (com cedilha)
            {x: 0.99, y: 0.38}, {x: 0.97, y: 0.35}, {x: 0.96, y: 0.50},
            {x: 0.97, y: 0.65}, {x: 0.99, y: 0.62}
        ],
        connections: [
            // V
            [0,1], [1,2],
            // I
            [3,4], [4,5],
            // V
            [6,7], [7,8],
            // O
            [9,10], [10,11], [11,12], [12,13], [13,14], [14,15], [15,16], [16,9],
            // P
            [17,18], [18,19], [19,20], [20,21], [21,22], [22,18],
            // O
            [23,24], [24,25], [25,26], [26,27], [27,28], [28,29], [29,30], [30,23],
            // R
            [31,32], [32,33], [33,34], [34,35], [35,36], [36,32], [36,37],
            // V
            [38,39], [39,40],
            // C
            [41,42], [42,43], [43,44], [44,45]
        ]
    }
};

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

let canvas, ctx;
let stars = [];
let constellationStars = [];
let currentConstellation = null;
let animationId = null;

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

/**
 * Inicializa o canvas e configura o tamanho
 */
function initCanvas() {
    canvas = document.getElementById('starfield');
    ctx = canvas.getContext('2d');
    
    // Define o tamanho do canvas para ocupar toda a tela
    resizeCanvas();
    
    // Reajusta ao redimensionar a janela
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Recalcula posições das estrelas da constelação
        if (currentConstellation) {
            calculateConstellationPositions();
        }
    });
}

/**
 * Ajusta o tamanho do canvas
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Gera uma cor aleatória para estrela entre branco e dourado
 */
function getRandomStarColor() {
    const colors = [
        '#ffffff',  // Branco puro
        '#fffacd',  // Amarelo claro
        '#ffefd5',  // Papaya
        '#fff8dc',  // Cornsilk
        '#ffd700',  // Dourado
        '#e6e6fa'   // Lavanda (toque roxo)
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Cria todas as estrelas de fundo
 */
function createBackgroundStars() {
    stars = [];
    
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        const star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: CONFIG.STAR_SIZE_MIN + Math.random() * (CONFIG.STAR_SIZE_MAX - CONFIG.STAR_SIZE_MIN),
            color: getRandomStarColor(),
            // Propriedades para animação de piscar
            twinkleSpeed: CONFIG.TWINKLE_SPEED_MIN + Math.random() * (CONFIG.TWINKLE_SPEED_MAX - CONFIG.TWINKLE_SPEED_MIN),
            twinklePhase: Math.random() * Math.PI * 2, // Fase inicial aleatória
            baseOpacity: 0.5 + Math.random() * 0.5,
            currentOpacity: 0, // Começa invisível para efeito de entrada
            // Propriedades para interatividade
            isHovered: false,
            targetSize: 0
        };
        star.targetSize = star.size;
        stars.push(star);
    }
}

/**
 * Escolhe aleatoriamente uma constelação
 */
function chooseRandomConstellation() {
    const keys = Object.keys(CONSTELLATIONS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    currentConstellation = {
        name: randomKey,
        data: CONSTELLATIONS[randomKey],
        points: [],
        drawnLines: 0,
        isComplete: false,
        glowIntensity: 0
    };
    
    console.log('🌟 Constelação escolhida:', randomKey);
}

/**
 * Calcula as posições reais das estrelas da constelação
 */
function calculateConstellationPositions() {
    if (!currentConstellation) return;
    
    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    currentConstellation.points = currentConstellation.data.points.map(point => ({
        x: padding + point.x * width,
        y: padding + point.y * height,
        size: 3,
        opacity: 0,
        isConstellationStar: true
    }));
}

/**
 * Desenha uma única estrela
 */
function drawStar(star, time) {
    // Calcula opacidade com base no piscar
    const twinkle = Math.sin((time / star.twinkleSpeed) + star.twinklePhase);
    const opacity = star.currentOpacity * (0.5 + twinkle * 0.5);
    
    ctx.save();
    ctx.globalAlpha = opacity;
    
    // Efeito de brilho
    const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 2
    );
    gradient.addColorStop(0, star.color);
    gradient.addColorStop(0.5, star.color + '80');
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * (star.isHovered ? 1.5 : 1), 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
    
    // Halo de brilho
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();
}

/**
 * Desenha as estrelas da constelação
 */
function drawConstellationStars(time) {
    if (!currentConstellation) return;
    
    currentConstellation.points.forEach((point, index) => {
        if (point.opacity <= 0) return;
        
        const size = point.size * (1 + currentConstellation.glowIntensity * 0.5);
        const twinkle = Math.sin(time / 800 + index) * 0.3 + 0.7;
        
        ctx.save();
        ctx.globalAlpha = point.opacity * twinkle;
        
        // Brilho intenso para estrelas da constelação
        const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, size * 4
        );
        gradient.addColorStop(0, CONFIG.COLORS.constellationGlow);
        gradient.addColorStop(0.3, CONFIG.COLORS.starBright);
        gradient.addColorStop(1, 'transparent');
        
        // Desenha o núcleo
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Desenha o halo
        ctx.beginPath();
        ctx.arc(point.x, point.y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();
    });
}

/**
 * Desenha as linhas da constelação
 */
function drawConstellationLines(time) {
    if (!currentConstellation || currentConstellation.drawnLines === 0) return;
    
    const connections = currentConstellation.data.connections;
    const linesToDraw = Math.min(currentConstellation.drawnLines, connections.length);
    
    ctx.save();
    
    for (let i = 0; i < linesToDraw; i++) {
        const [startIdx, endIdx] = connections[i];
        const start = currentConstellation.points[startIdx];
        const end = currentConstellation.points[endIdx];
        
        if (!start || !end) continue;
        
        // Efeito de brilho pulsante nas linhas
        const pulse = Math.sin(time / 1000 + i * 0.5) * 0.2 + 0.8;
        const glowBoost = currentConstellation.isComplete ? currentConstellation.glowIntensity : 0;
        
        // Desenha o brilho da linha
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = CONFIG.COLORS.constellationLine;
        ctx.lineWidth = 1 + glowBoost * 2;
        ctx.globalAlpha = (0.6 + glowBoost * 0.4) * pulse;
        ctx.shadowBlur = 10 + glowBoost * 15;
        ctx.shadowColor = CONFIG.COLORS.constellationGlow;
        ctx.stroke();
        
        // Linha central mais fina e brilhante
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.8 * pulse;
        ctx.stroke();
    }
    
    ctx.restore();
}

/**
 * Anima o aparecimento gradual das estrelas
 */
function animateStarsAppearance() {
    let startTime = null;
    const duration = 2000; // 2 segundos para aparecer
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Faz as estrelas aparecerem gradualmente
        stars.forEach((star, index) => {
            const delay = (index / stars.length) * 0.5;
            const starProgress = Math.max(0, (progress - delay) / (1 - delay));
            star.currentOpacity = star.baseOpacity * easeOutCubic(starProgress);
        });
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Anima o aparecimento das estrelas da constelação
 */
function animateConstellationStars() {
    return new Promise(resolve => {
        let startTime = null;
        const duration = 1500;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            currentConstellation.points.forEach((point, index) => {
                const delay = (index / currentConstellation.points.length) * 0.5;
                const pointProgress = Math.max(0, (progress - delay) / (1 - delay));
                point.opacity = easeOutCubic(pointProgress);
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        requestAnimationFrame(animate);
    });
}

/**
 * Anima o desenho das linhas da constelação
 */
function animateConstellationLines() {
    return new Promise(resolve => {
        const connections = currentConstellation.data.connections;
        let currentLine = 0;
        
        function drawNextLine() {
            if (currentLine < connections.length) {
                currentConstellation.drawnLines = currentLine + 1;
                currentLine++;
                setTimeout(drawNextLine, CONFIG.LINE_DRAW_SPEED);
            } else {
                resolve();
            }
        }
        
        drawNextLine();
    });
}

/**
 * Anima o brilho final da constelação
 */
function animateConstellationGlow() {
    currentConstellation.isComplete = true;
    let startTime = null;
    const duration = 1500;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Efeito de pulso no brilho
        currentConstellation.glowIntensity = easeOutCubic(progress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Função de easing para animações suaves
 */
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Cria uma estrela cadente
 */
function createShootingStar() {
    const container = document.getElementById('shooting-stars-container');
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Posição inicial aleatória (parte superior da tela)
    star.style.left = `${Math.random() * 80 + 10}%`;
    star.style.top = `${Math.random() * 40}%`;
    
    container.appendChild(star);
    
    // Remove após a animação
    setTimeout(() => {
        star.remove();
    }, 1500);
}

/**
 * Inicia o loop de estrelas cadentes
 */
function startShootingStars() {
    function scheduleNext() {
        const delay = CONFIG.SHOOTING_STAR_INTERVAL_MIN + 
            Math.random() * (CONFIG.SHOOTING_STAR_INTERVAL_MAX - CONFIG.SHOOTING_STAR_INTERVAL_MIN);
        setTimeout(() => {
            createShootingStar();
            scheduleNext();
        }, delay);
    }
    
    scheduleNext();
}

/**
 * Configura interatividade do mouse
 */
function setupMouseInteraction() {
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Verifica hover nas estrelas
        stars.forEach(star => {
            const distance = Math.sqrt(
                Math.pow(mouseX - star.x, 2) + 
                Math.pow(mouseY - star.y, 2)
            );
            star.isHovered = distance < 30;
        });
    });
    
    canvas.addEventListener('mouseleave', () => {
        stars.forEach(star => {
            star.isHovered = false;
        });
    });
}

/**
 * Loop principal de renderização
 */
function render(timestamp) {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha estrelas de fundo
    stars.forEach(star => drawStar(star, timestamp));
    
    // Desenha constelação
    drawConstellationLines(timestamp);
    drawConstellationStars(timestamp);
    
    // Continua o loop
    animationId = requestAnimationFrame(render);
}

/**
 * Função principal de inicialização
 */
async function init() {
    console.log('✨ Iniciando Céu Estrelado Romântico...');
    
    // Inicializa canvas
    initCanvas();
    
    // Cria estrelas de fundo
    createBackgroundStars();
    
    // Escolhe constelação aleatória
    chooseRandomConstellation();
    calculateConstellationPositions();
    
    // Configura interatividade
    setupMouseInteraction();
    
    // Inicia estrelas cadentes
    startShootingStars();
    
    // Inicia loop de renderização
    requestAnimationFrame(render);
    
    // Anima aparecimento das estrelas
    animateStarsAppearance();
    
    // Após delay, anima a constelação
    setTimeout(async () => {
        await animateConstellationStars();
        await animateConstellationLines();
        animateConstellationGlow();
        console.log('💫 Constelação completa:', currentConstellation.name);
    }, CONFIG.CONSTELLATION_DELAY);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', init);

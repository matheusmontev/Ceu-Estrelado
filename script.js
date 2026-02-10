/* ============================================
   CÉUS ESTRELADO ROMÂNTICO - JAVASCRIPT
   Página interativa com constelações animadas
   Melhorias: responsividade, camadas, parallax
   ============================================ */

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

const CONFIG = {
    // Quantidade de estrelas por camada (distante, média, próxima)
    STAR_LAYERS: [
        { count: 250, sizeMin: 0.3, sizeMax: 0.8, twinkleMin: 3000, twinkleMax: 6000, parallax: 0.01 },  // Distantes
        { count: 150, sizeMin: 0.8, sizeMax: 1.8, twinkleMin: 1500, twinkleMax: 4000, parallax: 0.025 }, // Médias
        { count: 60, sizeMin: 1.5, sizeMax: 3.5, twinkleMin: 800, twinkleMax: 2500, parallax: 0.05 }     // Próximas
    ],

    // Delay antes de iniciar a constelação (ms)
    CONSTELLATION_DELAY: 2500,

    // Velocidade de desenho das linhas (ms por linha)
    LINE_DRAW_SPEED: 300,

    // Intervalo entre estrelas cadentes (ms)
    SHOOTING_STAR_INTERVAL_MIN: 3000,
    SHOOTING_STAR_INTERVAL_MAX: 8000,

    // Responsividade - padding como porcentagem
    PADDING_PERCENT: 0.08,  // 8% da menor dimensão

    // Escala mínima para mobile
    MIN_CONSTELLATION_SCALE: 0.6,

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
            { x: 0.08, y: 0.35 }, { x: 0.08, y: 0.45 }, { x: 0.08, y: 0.55 }, { x: 0.08, y: 0.65 },
            { x: 0.12, y: 0.35 }, { x: 0.11, y: 0.50 }, { x: 0.12, y: 0.65 },
            // U
            { x: 0.18, y: 0.35 }, { x: 0.18, y: 0.45 }, { x: 0.18, y: 0.55 }, { x: 0.18, y: 0.65 },
            { x: 0.22, y: 0.65 }, { x: 0.26, y: 0.65 },
            { x: 0.26, y: 0.35 }, { x: 0.26, y: 0.45 }, { x: 0.26, y: 0.55 },
            // T
            { x: 0.34, y: 0.35 }, { x: 0.38, y: 0.35 }, { x: 0.42, y: 0.35 },
            { x: 0.38, y: 0.45 }, { x: 0.38, y: 0.55 }, { x: 0.38, y: 0.65 },
            // E
            { x: 0.48, y: 0.35 }, { x: 0.48, y: 0.45 }, { x: 0.48, y: 0.55 }, { x: 0.48, y: 0.65 },
            { x: 0.52, y: 0.35 }, { x: 0.51, y: 0.50 }, { x: 0.52, y: 0.65 },
            // A
            { x: 0.62, y: 0.65 }, { x: 0.60, y: 0.55 }, { x: 0.58, y: 0.45 }, { x: 0.62, y: 0.35 }, { x: 0.66, y: 0.45 },
            { x: 0.68, y: 0.55 }, { x: 0.70, y: 0.65 }, { x: 0.64, y: 0.52 },
            // M
            { x: 0.76, y: 0.65 }, { x: 0.76, y: 0.55 }, { x: 0.76, y: 0.45 }, { x: 0.76, y: 0.35 },
            { x: 0.80, y: 0.45 }, { x: 0.84, y: 0.35 },
            { x: 0.88, y: 0.35 }, { x: 0.88, y: 0.45 }, { x: 0.88, y: 0.55 }, { x: 0.88, y: 0.65 },
            // O
            { x: 0.94, y: 0.40 }, { x: 0.92, y: 0.50 }, { x: 0.94, y: 0.60 },
            { x: 0.98, y: 0.60 }, { x: 1.00, y: 0.50 }, { x: 0.98, y: 0.40 }
        ],
        connections: [
            // E
            [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [3, 6],
            // U
            [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
            // T
            [16, 17], [17, 18], [17, 19], [19, 20], [20, 21],
            // E
            [22, 23], [23, 24], [24, 25], [22, 26], [23, 27], [24, 27], [25, 28],
            // A
            [29, 30], [30, 31], [31, 32], [32, 33], [33, 34], [34, 35], [31, 36], [33, 36],
            // M
            [37, 38], [38, 39], [39, 40], [40, 41], [41, 42], [42, 43], [43, 44], [44, 45], [45, 46],
            // O
            [47, 48], [48, 49], [49, 50], [50, 51], [51, 52], [52, 47]
        ]
    },

    // "I + M" - Iniciais com coração
    "I + M": {
        points: [
            // I (linha vertical)
            { x: 0.28, y: 0.35 }, { x: 0.28, y: 0.50 }, { x: 0.28, y: 0.65 },
            // +
            { x: 0.50, y: 0.42 }, { x: 0.50, y: 0.50 }, { x: 0.50, y: 0.58 },
            { x: 0.44, y: 0.50 }, { x: 0.56, y: 0.50 },
            // M
            { x: 0.64, y: 0.65 }, { x: 0.64, y: 0.50 }, { x: 0.64, y: 0.35 },
            { x: 0.72, y: 0.50 }, { x: 0.80, y: 0.35 },
            { x: 0.80, y: 0.50 }, { x: 0.80, y: 0.65 }
        ],
        connections: [
            // I
            [0, 1], [1, 2],
            // +
            [3, 4], [4, 5], [6, 4], [4, 7],
            // M
            [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14]
        ]
    },

    // Coração
    "CORAÇÃO": {
        points: [
            // Ponta inferior
            { x: 0.50, y: 0.75 },
            // Lado esquerdo
            { x: 0.35, y: 0.55 }, { x: 0.25, y: 0.42 }, { x: 0.28, y: 0.30 },
            // Topo esquerdo (curvinha)
            { x: 0.38, y: 0.25 }, { x: 0.45, y: 0.32 },
            // Centro topo
            { x: 0.50, y: 0.38 },
            // Topo direito (curvinha)
            { x: 0.55, y: 0.32 }, { x: 0.62, y: 0.25 },
            // Lado direito
            { x: 0.72, y: 0.30 }, { x: 0.75, y: 0.42 }, { x: 0.65, y: 0.55 }
        ],
        connections: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
            [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0]
        ]
    },

    // "13/09/2025" - Data do relacionamento (Corrigido e Completo)
    "13/09/2025": {
        points: [
            // 1
            { x: 0.08, y: 0.35 }, { x: 0.08, y: 0.65 },
            // 3
            { x: 0.14, y: 0.35 }, { x: 0.20, y: 0.35 }, { x: 0.20, y: 0.50 },
            { x: 0.14, y: 0.50 }, { x: 0.20, y: 0.65 }, { x: 0.14, y: 0.65 },
            // /
            { x: 0.29, y: 0.35 }, { x: 0.23, y: 0.65 },
            // 0
            { x: 0.32, y: 0.35 }, { x: 0.38, y: 0.35 }, { x: 0.38, y: 0.65 }, { x: 0.32, y: 0.65 },
            // 9
            { x: 0.47, y: 0.50 }, { x: 0.47, y: 0.35 }, { x: 0.41, y: 0.35 },
            { x: 0.41, y: 0.50 }, { x: 0.47, y: 0.65 }, { x: 0.41, y: 0.65 },
            // /
            { x: 0.56, y: 0.35 }, { x: 0.50, y: 0.65 },
            // 2
            { x: 0.59, y: 0.35 }, { x: 0.65, y: 0.35 }, { x: 0.65, y: 0.50 },
            { x: 0.59, y: 0.50 }, { x: 0.59, y: 0.65 }, { x: 0.65, y: 0.65 },
            // 0
            { x: 0.68, y: 0.35 }, { x: 0.74, y: 0.35 }, { x: 0.74, y: 0.65 }, { x: 0.68, y: 0.65 },
            // 2
            { x: 0.77, y: 0.35 }, { x: 0.83, y: 0.35 }, { x: 0.83, y: 0.50 },
            { x: 0.77, y: 0.50 }, { x: 0.77, y: 0.65 }, { x: 0.83, y: 0.65 },
            // 5
            { x: 0.92, y: 0.35 }, { x: 0.86, y: 0.35 }, { x: 0.86, y: 0.50 },
            { x: 0.92, y: 0.50 }, { x: 0.92, y: 0.65 }, { x: 0.86, y: 0.65 }
        ],
        connections: [
            // 1
            [0, 1],
            // 3
            [2, 3], [3, 4], [4, 5], [4, 6], [6, 7],
            // /
            [8, 9],
            // 0
            [10, 11], [11, 12], [12, 13], [13, 10],
            // 9
            [14, 15], [15, 16], [16, 17], [17, 14], [14, 18], [18, 19],
            // /
            [20, 21],
            // 2
            [22, 23], [23, 24], [24, 25], [25, 26], [26, 27],
            // 0
            [28, 29], [29, 30], [30, 31], [31, 28],
            // 2
            [32, 33], [33, 34], [34, 35], [35, 36], [36, 37],
            // 5
            [38, 39], [39, 40], [40, 41], [41, 42], [42, 43]
        ]
    },

    // "MEU DOCINHO"
    "MEU DOCINHO": {
        points: [
            // M
            { x: 0.05, y: 0.65 }, { x: 0.05, y: 0.50 }, { x: 0.05, y: 0.35 },
            { x: 0.09, y: 0.48 }, { x: 0.13, y: 0.35 },
            { x: 0.13, y: 0.50 }, { x: 0.13, y: 0.65 },
            // E
            { x: 0.18, y: 0.35 }, { x: 0.18, y: 0.50 }, { x: 0.18, y: 0.65 },
            { x: 0.22, y: 0.35 }, { x: 0.21, y: 0.50 }, { x: 0.22, y: 0.65 },
            // U
            { x: 0.27, y: 0.35 }, { x: 0.27, y: 0.50 }, { x: 0.27, y: 0.65 },
            { x: 0.31, y: 0.65 }, { x: 0.35, y: 0.65 },
            { x: 0.35, y: 0.50 }, { x: 0.35, y: 0.35 },
            // D
            { x: 0.42, y: 0.35 }, { x: 0.42, y: 0.50 }, { x: 0.42, y: 0.65 },
            { x: 0.46, y: 0.65 }, { x: 0.49, y: 0.55 }, { x: 0.49, y: 0.45 }, { x: 0.46, y: 0.35 },
            // O
            { x: 0.54, y: 0.40 }, { x: 0.53, y: 0.50 }, { x: 0.54, y: 0.60 },
            { x: 0.58, y: 0.65 }, { x: 0.62, y: 0.60 }, { x: 0.63, y: 0.50 }, { x: 0.62, y: 0.40 }, { x: 0.58, y: 0.35 },
            // C
            { x: 0.72, y: 0.38 }, { x: 0.68, y: 0.35 }, { x: 0.66, y: 0.45 }, { x: 0.66, y: 0.55 },
            { x: 0.68, y: 0.65 }, { x: 0.72, y: 0.62 },
            // I
            { x: 0.76, y: 0.35 }, { x: 0.76, y: 0.50 }, { x: 0.76, y: 0.65 },
            // N
            { x: 0.81, y: 0.65 }, { x: 0.81, y: 0.50 }, { x: 0.81, y: 0.35 },
            { x: 0.85, y: 0.50 }, { x: 0.89, y: 0.35 }, { x: 0.89, y: 0.50 }, { x: 0.89, y: 0.65 },
            // H
            { x: 0.93, y: 0.35 }, { x: 0.93, y: 0.50 }, { x: 0.93, y: 0.65 },
            { x: 0.97, y: 0.50 }, { x: 1.00, y: 0.35 }, { x: 1.00, y: 0.50 }, { x: 1.00, y: 0.65 }
        ],
        connections: [
            // M
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
            // E
            [7, 8], [8, 9], [7, 10], [8, 11], [9, 12],
            // U
            [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19],
            // D
            [20, 21], [21, 22], [22, 23], [23, 24], [24, 25], [25, 26], [26, 20],
            // O
            [27, 28], [28, 29], [29, 30], [30, 31], [31, 32], [32, 33], [33, 34], [34, 27],
            // C
            [35, 36], [36, 37], [37, 38], [38, 39], [39, 40],
            // I
            [41, 42], [42, 43],
            // N
            [44, 45], [45, 46], [46, 47], [47, 48], [48, 49], [49, 50],
            // H
            [51, 52], [52, 53], [52, 54], [54, 55], [55, 56], [56, 57]
        ]
    },

    // "VIVO POR VOCÊ"
    "VIVO POR VOCÊ": {
        points: [
            // V
            { x: 0.05, y: 0.35 }, { x: 0.09, y: 0.65 }, { x: 0.13, y: 0.35 },
            // I
            { x: 0.18, y: 0.35 }, { x: 0.18, y: 0.50 }, { x: 0.18, y: 0.65 },
            // V
            { x: 0.23, y: 0.35 }, { x: 0.27, y: 0.65 }, { x: 0.31, y: 0.35 },
            // O
            { x: 0.36, y: 0.40 }, { x: 0.35, y: 0.50 }, { x: 0.36, y: 0.60 },
            { x: 0.40, y: 0.65 }, { x: 0.44, y: 0.60 }, { x: 0.45, y: 0.50 }, { x: 0.44, y: 0.40 }, { x: 0.40, y: 0.35 },
            // P
            { x: 0.52, y: 0.65 }, { x: 0.52, y: 0.50 }, { x: 0.52, y: 0.35 },
            { x: 0.56, y: 0.35 }, { x: 0.58, y: 0.42 }, { x: 0.56, y: 0.50 },
            // O
            { x: 0.63, y: 0.40 }, { x: 0.62, y: 0.50 }, { x: 0.63, y: 0.60 },
            { x: 0.67, y: 0.65 }, { x: 0.71, y: 0.60 }, { x: 0.72, y: 0.50 }, { x: 0.71, y: 0.40 }, { x: 0.67, y: 0.35 },
            // R
            { x: 0.76, y: 0.65 }, { x: 0.76, y: 0.50 }, { x: 0.76, y: 0.35 },
            { x: 0.80, y: 0.35 }, { x: 0.82, y: 0.42 }, { x: 0.80, y: 0.50 },
            { x: 0.82, y: 0.65 },
            // V
            { x: 0.86, y: 0.35 }, { x: 0.90, y: 0.65 }, { x: 0.94, y: 0.35 },
            // C (com cedilha)
            { x: 0.99, y: 0.38 }, { x: 0.97, y: 0.35 }, { x: 0.96, y: 0.50 },
            { x: 0.97, y: 0.65 }, { x: 0.99, y: 0.62 }
        ],
        connections: [
            // V
            [0, 1], [1, 2],
            // I
            [3, 4], [4, 5],
            // V
            [6, 7], [7, 8],
            // O
            [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 9],
            // P
            [17, 18], [18, 19], [19, 20], [20, 21], [21, 22], [22, 18],
            // O
            [23, 24], [24, 25], [25, 26], [26, 27], [27, 28], [28, 29], [29, 30], [30, 23],
            // R
            [31, 32], [32, 33], [33, 34], [34, 35], [35, 36], [36, 32], [36, 37],
            // V
            [38, 39], [39, 40],
            // C
        ]
    }
};

// ============================================
// CONSTELAÇÕES VERSÃO MOBILE (Layout Vertical)
// Para telas em modo portrait
// ============================================

const CONSTELLATIONS_MOBILE = {
    // "EU TE AMO" - Versão vertical em 3 linhas
    "EU TE AMO": {
        points: [
            // Linha 1: "EU"
            // E
            { x: 0.25, y: 0.18 }, { x: 0.25, y: 0.23 }, { x: 0.25, y: 0.28 },
            { x: 0.35, y: 0.18 }, { x: 0.33, y: 0.23 }, { x: 0.35, y: 0.28 },
            // U
            { x: 0.50, y: 0.18 }, { x: 0.50, y: 0.23 }, { x: 0.50, y: 0.28 },
            { x: 0.55, y: 0.28 }, { x: 0.60, y: 0.28 },
            { x: 0.60, y: 0.23 }, { x: 0.60, y: 0.18 },

            // Linha 2: "TE"
            // T
            { x: 0.25, y: 0.40 }, { x: 0.35, y: 0.40 }, { x: 0.45, y: 0.40 },
            { x: 0.35, y: 0.45 }, { x: 0.35, y: 0.50 },
            // E
            { x: 0.55, y: 0.40 }, { x: 0.55, y: 0.45 }, { x: 0.55, y: 0.50 },
            { x: 0.65, y: 0.40 }, { x: 0.63, y: 0.45 }, { x: 0.65, y: 0.50 },

            // Linha 3: "AMO"
            // A
            { x: 0.15, y: 0.72 }, { x: 0.20, y: 0.62 }, { x: 0.25, y: 0.72 },
            { x: 0.175, y: 0.68 }, { x: 0.225, y: 0.68 },
            // M
            { x: 0.35, y: 0.72 }, { x: 0.35, y: 0.67 }, { x: 0.35, y: 0.62 },
            { x: 0.40, y: 0.67 }, { x: 0.45, y: 0.62 },
            { x: 0.45, y: 0.67 }, { x: 0.45, y: 0.72 },
            // O
            { x: 0.58, y: 0.65 }, { x: 0.55, y: 0.67 }, { x: 0.58, y: 0.70 },
            { x: 0.65, y: 0.70 }, { x: 0.68, y: 0.67 }, { x: 0.65, y: 0.65 }
        ],
        connections: [
            // E (linha 1)
            [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
            // U
            [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
            // T (linha 2)
            [13, 14], [14, 15], [14, 16], [16, 17],
            // E
            [18, 19], [19, 20], [18, 21], [19, 22], [20, 23],
            // A (linha 3)
            [24, 25], [25, 26], [27, 28],
            // M
            [29, 30], [30, 31], [31, 32], [32, 33], [33, 34], [34, 35],
            // O
            [36, 37], [37, 38], [38, 39], [39, 40], [40, 41], [41, 36]
        ]
    },

    // "I + M" - Versão mobile com I vertical
    "I + M": {
        points: [
            // I (linha vertical)
            { x: 0.40, y: 0.25 }, { x: 0.40, y: 0.35 }, { x: 0.40, y: 0.45 },
            // +
            { x: 0.40, y: 0.52 }, { x: 0.40, y: 0.58 }, { x: 0.40, y: 0.64 },
            { x: 0.34, y: 0.58 }, { x: 0.46, y: 0.58 },
            // M
            { x: 0.25, y: 0.90 }, { x: 0.25, y: 0.80 }, { x: 0.25, y: 0.72 },
            { x: 0.40, y: 0.82 }, { x: 0.55, y: 0.72 },
            { x: 0.55, y: 0.80 }, { x: 0.55, y: 0.90 }
        ],
        connections: [
            // I
            [0, 1], [1, 2],
            // +
            [3, 4], [4, 5], [6, 4], [4, 7],
            // M
            [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14]
        ]
    },

    // Coração - Centralizado e maior
    "CORAÇÃO": {
        points: [
            { x: 0.50, y: 0.75 },
            { x: 0.30, y: 0.50 }, { x: 0.20, y: 0.35 }, { x: 0.25, y: 0.22 },
            { x: 0.38, y: 0.18 }, { x: 0.45, y: 0.28 },
            { x: 0.50, y: 0.35 },
            { x: 0.55, y: 0.28 }, { x: 0.62, y: 0.18 },
            { x: 0.75, y: 0.22 }, { x: 0.80, y: 0.35 }, { x: 0.70, y: 0.50 }
        ],
        connections: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
            [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0]
        ]
    },

    // Data vertical
    "13/09/2025": {
        points: [
            // 13 (linha 1)
            { x: 0.30, y: 0.15 }, { x: 0.35, y: 0.15 }, { x: 0.35, y: 0.22 },
            { x: 0.45, y: 0.15 }, { x: 0.50, y: 0.17 }, { x: 0.47, y: 0.19 },
            { x: 0.50, y: 0.21 }, { x: 0.45, y: 0.24 },
            // 09 (linha 2)
            { x: 0.28, y: 0.38 }, { x: 0.25, y: 0.42 }, { x: 0.28, y: 0.46 },
            { x: 0.35, y: 0.46 }, { x: 0.38, y: 0.42 }, { x: 0.35, y: 0.38 },
            { x: 0.50, y: 0.38 }, { x: 0.55, y: 0.40 }, { x: 0.52, y: 0.42 },
            { x: 0.55, y: 0.44 }, { x: 0.50, y: 0.47 },
            // 2025 (linha 3)
            { x: 0.18, y: 0.62 }, { x: 0.22, y: 0.60 }, { x: 0.25, y: 0.64 },
            { x: 0.20, y: 0.68 }, { x: 0.25, y: 0.72 },
            { x: 0.35, y: 0.62 }, { x: 0.32, y: 0.67 }, { x: 0.35, y: 0.72 },
            { x: 0.40, y: 0.72 }, { x: 0.43, y: 0.67 }, { x: 0.40, y: 0.62 },
            { x: 0.52, y: 0.60 }, { x: 0.48, y: 0.62 }, { x: 0.52, y: 0.66 },
            { x: 0.55, y: 0.69 }, { x: 0.50, y: 0.72 },
            { x: 0.62, y: 0.62 }, { x: 0.58, y: 0.64 }, { x: 0.62, y: 0.68 },
            { x: 0.65, y: 0.72 }, { x: 0.60, y: 0.72 }
        ],
        connections: [
            [0, 1], [1, 2], [3, 4], [4, 5], [5, 6], [6, 7],
            [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 8],
            [14, 15], [15, 16], [16, 17], [17, 18],
            [19, 20], [20, 21], [21, 22], [22, 23],
            [24, 25], [25, 26], [26, 27], [27, 28], [28, 29], [29, 24],
            [30, 31], [31, 32], [32, 33], [33, 34],
            [35, 36], [36, 37], [37, 38], [38, 39]
        ]
    },

    // MEU DOCINHO - Versão 2 linhas
    "MEU DOCINHO": {
        points: [
            // MEU (linha 1)
            { x: 0.10, y: 0.28 }, { x: 0.10, y: 0.23 }, { x: 0.10, y: 0.18 },
            { x: 0.15, y: 0.23 }, { x: 0.20, y: 0.18 }, { x: 0.20, y: 0.23 }, { x: 0.20, y: 0.28 },
            { x: 0.30, y: 0.18 }, { x: 0.30, y: 0.23 }, { x: 0.30, y: 0.28 },
            { x: 0.38, y: 0.18 }, { x: 0.36, y: 0.23 }, { x: 0.38, y: 0.28 },
            { x: 0.48, y: 0.18 }, { x: 0.48, y: 0.28 }, { x: 0.53, y: 0.28 },
            { x: 0.58, y: 0.28 }, { x: 0.58, y: 0.18 },
            // DOCINHO (linha 2)
            { x: 0.08, y: 0.50 }, { x: 0.08, y: 0.58 }, { x: 0.12, y: 0.62 },
            { x: 0.16, y: 0.58 }, { x: 0.16, y: 0.50 },
            { x: 0.24, y: 0.52 }, { x: 0.22, y: 0.56 }, { x: 0.24, y: 0.60 },
            { x: 0.30, y: 0.60 }, { x: 0.32, y: 0.56 }, { x: 0.30, y: 0.52 },
            { x: 0.42, y: 0.52 }, { x: 0.38, y: 0.50 }, { x: 0.38, y: 0.62 }, { x: 0.42, y: 0.60 },
            { x: 0.48, y: 0.50 }, { x: 0.48, y: 0.62 },
            { x: 0.55, y: 0.62 }, { x: 0.55, y: 0.56 }, { x: 0.55, y: 0.50 },
            { x: 0.60, y: 0.56 }, { x: 0.65, y: 0.50 }, { x: 0.65, y: 0.62 },
            { x: 0.72, y: 0.50 }, { x: 0.72, y: 0.56 }, { x: 0.72, y: 0.62 },
            { x: 0.78, y: 0.56 }, { x: 0.82, y: 0.50 }, { x: 0.82, y: 0.62 },
            { x: 0.88, y: 0.52 }, { x: 0.85, y: 0.56 }, { x: 0.88, y: 0.60 },
            { x: 0.94, y: 0.60 }, { x: 0.96, y: 0.56 }, { x: 0.94, y: 0.52 }
        ],
        connections: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
            [7, 8], [8, 9], [7, 10], [8, 11], [9, 12],
            [13, 14], [14, 15], [15, 16], [16, 17],
            [18, 19], [19, 20], [20, 21], [21, 22], [22, 18],
            [23, 24], [24, 25], [25, 26], [26, 27], [27, 28], [28, 23],
            [29, 30], [30, 31], [31, 32],
            [33, 34],
            [35, 36], [36, 37], [37, 38], [38, 39], [39, 40],
            [41, 42], [42, 43], [43, 44], [44, 45],
            [46, 47], [47, 48], [48, 49], [49, 50], [50, 51], [51, 46]
        ]
    },

    // VIVO POR VOCÊ - Versão 2 linhas
    "VIVO POR VOCÊ": {
        points: [
            // VIVO (linha 1)
            { x: 0.15, y: 0.18 }, { x: 0.22, y: 0.30 }, { x: 0.29, y: 0.18 },
            { x: 0.38, y: 0.18 }, { x: 0.38, y: 0.30 },
            { x: 0.47, y: 0.18 }, { x: 0.54, y: 0.30 }, { x: 0.61, y: 0.18 },
            { x: 0.70, y: 0.22 }, { x: 0.68, y: 0.26 }, { x: 0.72, y: 0.26 },
            { x: 0.78, y: 0.26 }, { x: 0.80, y: 0.22 }, { x: 0.76, y: 0.22 },
            // POR (linha 2)
            { x: 0.20, y: 0.45 }, { x: 0.20, y: 0.52 }, { x: 0.28, y: 0.45 },
            { x: 0.30, y: 0.48 }, { x: 0.28, y: 0.52 },
            { x: 0.40, y: 0.47 }, { x: 0.38, y: 0.50 }, { x: 0.40, y: 0.53 },
            { x: 0.47, y: 0.53 }, { x: 0.49, y: 0.50 }, { x: 0.47, y: 0.47 },
            { x: 0.58, y: 0.45 }, { x: 0.58, y: 0.52 }, { x: 0.65, y: 0.45 },
            { x: 0.67, y: 0.48 }, { x: 0.65, y: 0.52 }, { x: 0.68, y: 0.55 },
            // VOCÊ (linha 3)
            { x: 0.18, y: 0.68 }, { x: 0.28, y: 0.82 }, { x: 0.38, y: 0.68 },
            { x: 0.48, y: 0.71 }, { x: 0.45, y: 0.75 }, { x: 0.48, y: 0.79 },
            { x: 0.55, y: 0.79 }, { x: 0.58, y: 0.75 }, { x: 0.55, y: 0.71 },
            { x: 0.70, y: 0.70 }, { x: 0.65, y: 0.68 }, { x: 0.65, y: 0.82 }, { x: 0.70, y: 0.80 },
            { x: 0.80, y: 0.70 }, { x: 0.75, y: 0.68 }, { x: 0.75, y: 0.82 }, { x: 0.80, y: 0.80 }
        ],
        connections: [
            [0, 1], [1, 2], [3, 4], [5, 6], [6, 7],
            [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 8],
            [14, 15], [15, 16], [16, 17], [17, 18], [18, 15],
            [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], [24, 19],
            [25, 26], [26, 27], [27, 28], [28, 29], [29, 26], [29, 30],
            [31, 32], [32, 33],
            [34, 35], [35, 36], [36, 37], [37, 38], [38, 39], [39, 34],
            [40, 41], [41, 42], [42, 43],
            [44, 45], [45, 46], [46, 47]
        ]
    }
};

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

let canvas, ctx;
let starLayers = [[], [], []];  // Três camadas de estrelas
let currentConstellation = null;
let animationId = null;
let mousePosition = { x: 0.5, y: 0.5 };  // Posição normalizada do mouse (0-1)
let targetMousePosition = { x: 0.5, y: 0.5 };
let lastResize = { width: 0, height: 0 };

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

    // Armazena dimensões para comparação
    lastResize = { width: canvas.width, height: canvas.height };

    // Reajusta ao redimensionar a janela com transição suave
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            animateResize();
        }, 100);
    });
}

/**
 * Anima o redimensionamento de forma suave
 */
function animateResize() {
    const targetWidth = window.innerWidth;
    const targetHeight = window.innerHeight;

    // Atualiza dimensões do canvas
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Recalcula posições das estrelas proporcionalmente
    const scaleX = targetWidth / lastResize.width;
    const scaleY = targetHeight / lastResize.height;

    starLayers.forEach(layer => {
        layer.forEach(star => {
            star.x *= scaleX;
            star.y *= scaleY;
            star.baseX *= scaleX;
            star.baseY *= scaleY;
        });
    });

    // Recalcula constelação
    if (currentConstellation) {
        calculateConstellationPositions();
    }

    // Armazena novas dimensões
    lastResize = { width: targetWidth, height: targetHeight };
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
        '#e6e6fa',  // Lavanda (toque roxo)
        '#add8e6',  // Azul claro
        '#ffe4e1'   // Rosa claro
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Cria todas as estrelas em múltiplas camadas
 */
function createBackgroundStars() {
    starLayers = [[], [], []];

    CONFIG.STAR_LAYERS.forEach((layerConfig, layerIndex) => {
        for (let i = 0; i < layerConfig.count; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            const star = {
                x: x,
                y: y,
                baseX: x,  // Posição base para parallax
                baseY: y,
                size: layerConfig.sizeMin + Math.random() * (layerConfig.sizeMax - layerConfig.sizeMin),
                color: getRandomStarColor(),
                // Propriedades para animação de piscar
                twinkleSpeed: layerConfig.twinkleMin + Math.random() * (layerConfig.twinkleMax - layerConfig.twinkleMin),
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleType: Math.random() > 0.8 ? 'flicker' : 'sin', // Diferentes tipos de piscar
                baseOpacity: 0.4 + Math.random() * 0.6,
                currentOpacity: 0,
                // Parallax
                parallaxFactor: layerConfig.parallax,
                // Interatividade
                isHovered: false,
                layer: layerIndex
            };
            starLayers[layerIndex].push(star);
        }
    });
}

/**
 * Atualiza posições das estrelas com parallax
 */
function updateParallax() {
    // Interpolação suave da posição do mouse/giroscópio
    mousePosition.x += (targetMousePosition.x - mousePosition.x) * 0.05;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * 0.05;

    // Calcula offset do centro
    const offsetX = (mousePosition.x - 0.5) * canvas.width;
    const offsetY = (mousePosition.y - 0.5) * canvas.height;

    // Aplica parallax a cada camada
    starLayers.forEach(layer => {
        layer.forEach(star => {
            star.x = star.baseX - offsetX * star.parallaxFactor;
            star.y = star.baseY - offsetY * star.parallaxFactor;
        });
    });

    // Aplica um parallax leve também na constelação se ela existir
    if (currentConstellation && currentConstellation.points) {
        currentConstellation.points.forEach(point => {
            const parallaxX = offsetX * 0.015; // Parallax muito sutil
            const parallaxY = offsetY * 0.015;
            point.renderX = point.x - parallaxX;
            point.renderY = point.y - parallaxY;
        });
    }
}

/**
 * Escolhe aleatoriamente uma constelação
 * Detecta se está em mobile portrait e usa versão otimizada
 */
function chooseRandomConstellation() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const isMobilePortrait = aspectRatio < 0.85;

    // Escolhe qual conjunto de constelações usar
    const constellationSet = isMobilePortrait ? CONSTELLATIONS_MOBILE : CONSTELLATIONS;

    const keys = Object.keys(constellationSet);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    currentConstellation = {
        name: randomKey,
        data: constellationSet[randomKey],
        points: [],
        drawnLines: 0,
        isComplete: false,
        glowIntensity: 0,
        isMobileVersion: isMobilePortrait
    };

    console.log('🌟 Constelação escolhida:', randomKey, isMobilePortrait ? '(versão mobile)' : '(versão desktop)');
}

/**
 * Calcula as posições reais das estrelas da constelação
 * com responsividade melhorada para qualquer tela
 */
function calculateConstellationPositions() {
    if (!currentConstellation) return;

    const screenWidth = canvas.width;
    const screenHeight = canvas.height;
    const aspectRatio = screenWidth / screenHeight;
    const isMobilePortrait = aspectRatio < 0.8;

    // Define área segura (safe zone) para a constelação
    let safeWidth, safeHeight, marginX, marginY;

    if (isMobilePortrait) {
        // Mobile Portrait: Ocupa mais largura, centralizado verticalmente
        safeWidth = screenWidth * 0.85;
        safeHeight = screenHeight * 0.6; // Deixa espaço para lua e bordas
        marginX = (screenWidth - safeWidth) / 2;
        marginY = (screenHeight - safeHeight) / 2;
    } else {
        // Desktop / Landscape: Ocupa o centro
        const minDim = Math.min(screenWidth, screenHeight);
        safeWidth = minDim * 1.2;
        safeHeight = minDim * 0.7;

        // Limita ao tamanho da tela se necessário
        if (safeWidth > screenWidth * 0.8) safeWidth = screenWidth * 0.8;
        if (safeHeight > screenHeight * 0.8) safeHeight = screenHeight * 0.8;

        marginX = (screenWidth - safeWidth) / 2;
        marginY = (screenHeight - safeHeight) / 2;
    }

    currentConstellation.points = currentConstellation.data.points.map(point => {
        const x = marginX + point.x * safeWidth;
        const y = marginY + point.y * safeHeight;

        return {
            x: x,
            y: y,
            renderX: x, // Coordenada usada para desenhar (com parallax)
            renderY: y,
            size: 3,
            opacity: 0,
            isConstellationStar: true
        };
    });
}

/**
 * Desenha uma única estrela com efeito de brilho melhorado
 */
function drawStar(star, time) {
    // Calcula opacidade com base no tipo de piscar
    let twinkle;
    if (star.twinkleType === 'flicker') {
        // Piscar mais "nervoso" e aleatório
        twinkle = Math.random() > 0.95 ? 0.3 : 1;
    } else {
        // Piscar suave senoidal
        twinkle = 0.6 + Math.sin((time / star.twinkleSpeed) + star.twinklePhase) * 0.4;
    }

    const opacity = star.currentOpacity * twinkle;

    if (opacity <= 0.01) return;  // Não desenha se invisível

    ctx.save();
    ctx.globalAlpha = opacity;

    // Tamanho com efeito hover
    const displaySize = star.size * (star.isHovered ? 2.2 : 1);

    // Efeito de brilho (bloom) para estrelas maiores ou próximas
    if (star.layer >= 1 && star.currentOpacity > 0.5) {
        const glowSize = displaySize * (star.layer === 2 ? 6 : 4);
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.2, star.color + '44');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
    }

    // Núcleo da estrela
    ctx.beginPath();
    ctx.arc(star.x, star.y, displaySize, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; // Núcleo sempre branco para brilho máximo
    ctx.fill();

    // Cor da estrela (overlay)
    ctx.beginPath();
    ctx.arc(star.x, star.y, displaySize, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.globalAlpha = opacity * 0.7;
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
            point.renderX, point.renderY, 0,
            point.renderX, point.renderY, size * 4
        );
        gradient.addColorStop(0, CONFIG.COLORS.constellationGlow);
        gradient.addColorStop(0.3, CONFIG.COLORS.starBright);
        gradient.addColorStop(1, 'transparent');

        // Desenha o núcleo
        ctx.beginPath();
        ctx.arc(point.renderX, point.renderY, size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Desenha o halo
        ctx.beginPath();
        ctx.arc(point.renderX, point.renderY, size * 4, 0, Math.PI * 2);
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
        ctx.moveTo(start.renderX, start.renderY);
        ctx.lineTo(end.renderX, end.renderY);
        ctx.strokeStyle = CONFIG.COLORS.constellationLine;
        ctx.lineWidth = 1 + glowBoost * 2;
        ctx.globalAlpha = (0.6 + glowBoost * 0.4) * pulse;
        ctx.shadowBlur = 10 + glowBoost * 15;
        ctx.shadowColor = CONFIG.COLORS.constellationGlow;
        ctx.stroke();

        // Linha central mais fina e brilhante
        ctx.beginPath();
        ctx.moveTo(start.renderX, start.renderY);
        ctx.lineTo(end.renderX, end.renderY);
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
    const duration = 2500; // 2.5 segundos para aparecer

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Faz as estrelas aparecerem gradualmente, camada por camada
        starLayers.forEach((layer, layerIndex) => {
            const layerDelay = layerIndex * 0.2;  // Camadas aparecem em sequência

            layer.forEach((star, index) => {
                const delay = layerDelay + (index / layer.length) * 0.3;
                const starProgress = Math.max(0, (progress - delay) / (1 - delay));
                star.currentOpacity = star.baseOpacity * easeOutCubic(starProgress);
            });
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
    // Parallax com movimento do mouse
    document.addEventListener('mousemove', (e) => {
        targetMousePosition.x = e.clientX / window.innerWidth;
        targetMousePosition.y = e.clientY / window.innerHeight;

        // Verifica hover nas estrelas (apenas camada próxima)
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        starLayers[2].forEach(star => {
            const distance = Math.sqrt(
                Math.pow(mouseX - star.x, 2) +
                Math.pow(mouseY - star.y, 2)
            );
            star.isHovered = distance < 40;
        });
    });

    document.addEventListener('mouseleave', () => {
        // Retorna suavemente ao centro
        targetMousePosition.x = 0.5;
        targetMousePosition.y = 0.5;

        starLayers.forEach(layer => {
            layer.forEach(star => {
                star.isHovered = false;
            });
        });
    });

    // Para dispositivos touch
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetMousePosition.x = e.touches[0].clientX / window.innerWidth;
            targetMousePosition.y = e.touches[0].clientY / window.innerHeight;
        }
    });

    document.addEventListener('touchend', () => {
        targetMousePosition.x = 0.5;
        targetMousePosition.y = 0.5;
    });

    // Suporte a Giroscópio para Mobile Parallax
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            // Beta: inclinação frente/trás (-180 a 180)
            // Gamma: inclinação esquerda/direita (-90 a 90)
            if (e.beta !== null && e.gamma !== null) {
                // Normaliza inclinação para um range útil (aprox -30 a 30 graus)
                const normX = (e.gamma + 30) / 60;
                const normY = (e.beta - 10) / 60; // Offset de 10 graus natural de segurar o celular

                targetMousePosition.x = Math.max(0, Math.min(1, normX));
                targetMousePosition.y = Math.max(0, Math.min(1, normY));
            }
        }, true);
    }
}

/**
 * Loop principal de renderização
 */
function render(timestamp) {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza parallax
    updateParallax();

    // Desenha estrelas de fundo (todas as camadas, da mais distante para a mais próxima)
    starLayers.forEach(layer => {
        layer.forEach(star => drawStar(star, timestamp));
    });

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

    // Cria estrelas de fundo em camadas
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

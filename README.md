# ✨ Céu Estrelado Romântico

Uma página web interativa e romântica com céu estrelado que exibe constelações animadas formando mensagens de amor.

## 🌟 Funcionalidades

### Visuais
- 🌙 Fundo degradê simulando céu noturno (azul escuro → roxo → preto)
- ⭐ Mais de 400 estrelas piscando em ritmos e tamanhos diferentes
- 🌕 Lua decorativa com efeito de brilho pulsante
- 💫 Estrelas cadentes ocasionais cruzando a tela

### Constelações Aleatórias
A cada vez que a página é carregada, uma constelação é escolhida aleatoriamente:
- **"EU TE AMO"** - Declaração de amor
- **"V + M"** - Iniciais do casal
- **❤️ Coração** - Símbolo de amor
- **"13/09/2025"** - Data especial do relacionamento
- **"MEU DOCINHO"** - Apelido carinhoso
- **"VIVO POR VOCÊ"** - Mensagem romântica

### Animações
1. Estrelas aparecem gradualmente ao carregar
2. Após 2-3 segundos, linhas começam a conectar as estrelas
3. O desenho das linhas é suave e progressivo
4. Ao completar, a constelação brilha intensamente
5. Estrelas piscam continuamente em ritmos diferentes
6. Ao passar o mouse, estrelas crescem levemente

## 🚀 Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/matheusmontev/Ceu-Estrelado.git
```

2. Abra o arquivo `index.html` no navegador

3. Recarregue a página para ver diferentes constelações! 🔄

## 📱 Responsivo

O projeto é totalmente responsivo, adaptando-se a:
- 🖥️ Desktop
- 📱 Mobile
- 📲 Tablet

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Animações, gradientes e efeitos visuais
- **JavaScript Puro** - Sem bibliotecas externas

## 📁 Estrutura

```
Ceu-Estrelado/
├── index.html    # Página principal
├── style.css     # Estilos e animações
├── script.js     # Lógica das constelações
└── README.md     # Documentação
```

## 💕 Personalização

Para personalizar as mensagens, edite o objeto `CONSTELLATIONS` no arquivo `script.js`:

```javascript
const CONSTELLATIONS = {
    "SUA MENSAGEM": {
        points: [...],      // Coordenadas das estrelas
        connections: [...]  // Conexões entre estrelas
    }
};
```

---

Feito com 💜 para meu amor bell♥
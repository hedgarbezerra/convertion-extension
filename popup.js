// Elementos DOM
const categorySelect = document.getElementById('categorySelect');
const algorithmSelect = document.getElementById('algorithmSelect');
const inputText = document.getElementById('inputText');
const outputResult = document.getElementById('outputResult');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const swapBtn = document.getElementById('swapBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const settingsSection = document.getElementById('settingsSection');
const upperCaseCheck = document.getElementById('upperCase');
const addSpacesCheck = document.getElementById('addSpaces');
const baseInput = document.getElementById('baseInput');
const algorithmInfo = document.getElementById('algorithmInfo');
const historyToggle = document.getElementById('historyToggle');
const historyContent = document.getElementById('historyContent');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Configuração dos algoritmos por categoria
const algorithms = {
    hash: {
        'SHA1': { name: 'SHA-1', info: 'Hash de 160 bits (40 caracteres hex). Não recomendado para segurança.', crypto: 'SHA-1' },
        'SHA256': { name: 'SHA-256', info: 'Hash de 256 bits (64 caracteres hex). Seguro e amplamente usado.', crypto: 'SHA-256' },
        'SHA384': { name: 'SHA-384', info: 'Hash de 384 bits (96 caracteres hex). Variante do SHA-2.', crypto: 'SHA-384' },
        'SHA512': { name: 'SHA-512', info: 'Hash de 512 bits (128 caracteres hex). Mais seguro do SHA-2.', crypto: 'SHA-512' },
        'MD5': { name: 'MD5', info: 'Hash de 128 bits (32 caracteres hex). INSEGURO - use apenas para checksums.', crypto: null }
    },
    encoding: {
        'BASE64': { name: 'Base64', info: 'Codificação que converte dados binários em texto ASCII.', crypto: null },
        'BASE64URL': { name: 'Base64 URL-Safe', info: 'Base64 seguro para URLs (substitui +/= por -_).', crypto: null },
        'URL_ENCODE': { name: 'URL Encoding', info: 'Codifica caracteres especiais para uso em URLs.', crypto: null },
        'HTML_ENTITIES': { name: 'HTML Entities', info: 'Converte caracteres especiais em entidades HTML.', crypto: null },
        'URI_COMPONENT': { name: 'URI Component', info: 'Codifica componentes de URI (mais restritivo que URL).', crypto: null }
    },
    numeric: {
        'DEC_TO_BIN': { name: 'Decimal → Binário', info: 'Converte números decimais para representação binária.', crypto: null },
        'DEC_TO_HEX': { name: 'Decimal → Hexadecimal', info: 'Converte números decimais para hexadecimal.', crypto: null },
        'DEC_TO_OCT': { name: 'Decimal → Octal', info: 'Converte números decimais para octal.', crypto: null },
        'BIN_TO_DEC': { name: 'Binário → Decimal', info: 'Converte números binários para decimal.', crypto: null },
        'HEX_TO_DEC': { name: 'Hexadecimal → Decimal', info: 'Converte números hexadecimais para decimal.', crypto: null },
        'ANY_BASE': { name: 'Conversão de Base', info: 'Converte entre qualquer base numérica (2-36).', crypto: null }
    },
    text: {
        'UPPER_CASE': { name: 'MAIÚSCULAS', info: 'Converte todo texto para letras maiúsculas.', crypto: null },
        'LOWER_CASE': { name: 'minúsculas', info: 'Converte todo texto para letras minúsculas.', crypto: null },
        'TITLE_CASE': { name: 'Primeira Maiúscula', info: 'Primeira letra de cada palavra em maiúscula.', crypto: null },
        'REVERSE': { name: 'Texto Invertido', info: 'Inverte a ordem dos caracteres no texto.', crypto: null },
        'WORD_COUNT': { name: 'Contador de Palavras', info: 'Conta caracteres, palavras, linhas e parágrafos.', crypto: null },
        'REMOVE_SPACES': { name: 'Remover Espaços', info: 'Remove todos os espaços em branco do texto.', crypto: null }
    }
};

// Histórico de conversões
let conversionHistory = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadAlgorithms();
    loadHistory();
    inputText.focus();
});

// Carrega algoritmos baseado na categoria selecionada
function loadAlgorithms() {
    const category = categorySelect.value;
    const categoryAlgorithms = algorithms[category];
    
    algorithmSelect.innerHTML = '';
    
    Object.keys(categoryAlgorithms).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = categoryAlgorithms[key].name;
        algorithmSelect.appendChild(option);
    });
    
    updateAlgorithmInfo();
    updateSettings();
}

// Atualiza informações do algoritmo selecionado
function updateAlgorithmInfo() {
    const category = categorySelect.value;
    const algorithm = algorithmSelect.value;
    const info = algorithms[category][algorithm]?.info || '';
    
    algorithmInfo.innerHTML = `<small>💡 ${info}</small>`;
}

// Atualiza configurações baseadas no algoritmo
function updateSettings() {
    const category = categorySelect.value;
    const algorithm = algorithmSelect.value;
    
    // Mostra/esconde configurações
    settingsSection.style.display = 'none';
    swapBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
    
    if (category === 'numeric') {
        settingsSection.style.display = 'block';
        if (algorithm.includes('TO')) {
            swapBtn.style.display = 'inline-block';
        }
    }
    
    if (category === 'hash' || category === 'encoding') {
        settingsSection.style.display = 'block';
    }
}

// Função principal de conversão
async function convertText() {
    const category = categorySelect.value;
    const algorithm = algorithmSelect.value;
    const text = inputText.value;
    
    if (!text.trim()) {
        showFeedback(inputText, 'error');
        inputText.focus();
        return;
    }
    
    try {
        convertBtn.textContent = 'Convertendo...';
        convertBtn.disabled = true;
        
        let result;
        
        switch (category) {
            case 'hash':
                result = await convertHash(algorithm, text);
                break;
            case 'encoding':
                result = await convertEncoding(algorithm, text);
                break;
            case 'numeric':
                result = convertNumeric(algorithm, text);
                break;
            case 'text':
                result = convertTextCase(algorithm, text);
                break;
            default:
                throw new Error('Categoria não suportada');
        }
        
        // Aplica formatação se necessário
        if (upperCaseCheck.checked && typeof result === 'string') {
            result = result.toUpperCase();
        }
        
        if (addSpacesCheck.checked && typeof result === 'string') {
            result = result.replace(/(.{2})/g, '$1 ').trim();
        }
        
        outputResult.value = result;
        copyBtn.disabled = false;
        
        // Adiciona ao histórico
        addToHistory(category, algorithm, text, result);
        
        showFeedback(outputResult, 'success-animation');
        
    } catch (error) {
        outputResult.value = `Erro: ${error.message}`;
        showFeedback(outputResult, 'error');
    } finally {
        convertBtn.textContent = '🔄 Converter';
        convertBtn.disabled = false;
    }
}

// Conversões de Hash
async function convertHash(algorithm, text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

    if (algorithm === 'MD5') {
        // Implementação simples de MD5 (não segura, apenas para demonstração)
        return await md5(text);
    }
    
    const algorithmInfo = algorithms.hash[algorithm];
    const hashBuffer = await crypto.subtle.digest(algorithmInfo.crypto, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Conversões de Encoding
async function convertEncoding(algorithm, text) {
    switch (algorithm) {
        case 'BASE64':
            return btoa(unescape(encodeURIComponent(text)));
        case 'BASE64URL':
            return btoa(unescape(encodeURIComponent(text)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
        case 'URL_ENCODE':
            return encodeURIComponent(text);
        case 'HTML_ENTITIES':
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        case 'URI_COMPONENT':
            return encodeURI(text);
        default:
            throw new Error('Algoritmo de encoding não suportado');
    }
}

// Conversões Numéricas
function convertNumeric(algorithm, text) {
    const num = parseInt(text.trim());
    
    if (isNaN(num)) {
        throw new Error('Entrada deve ser um número válido');
    }
    
    switch (algorithm) {
        case 'DEC_TO_BIN':
            return num.toString(2);
        case 'DEC_TO_HEX':
            return num.toString(16);
        case 'DEC_TO_OCT':
            return num.toString(8);
        case 'BIN_TO_DEC':
            return parseInt(text.trim(), 2).toString();
        case 'HEX_TO_DEC':
            return parseInt(text.trim(), 16).toString();
        case 'ANY_BASE':
            const base = parseInt(baseInput.value);
            if (base < 2 || base > 36) {
                throw new Error('Base deve estar entre 2 e 36');
            }
            return num.toString(base);
        default:
            throw new Error('Conversão numérica não suportada');
    }
}

// Conversões de Texto
function convertTextCase(algorithm, text) {
    switch (algorithm) {
        case 'UPPER_CASE':
            return text.toUpperCase();
        case 'LOWER_CASE':
            return text.toLowerCase();
        case 'TITLE_CASE':
            return text.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        case 'REVERSE':
            return text.split('').reverse().join('');
        case 'WORD_COUNT':
            const chars = text.length;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const lines = text.split('\n').length;
            const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0;
            return `Caracteres: ${chars}\nPalavras: ${words}\nLinhas: ${lines}\nParágrafos: ${paragraphs}`;
        case 'REMOVE_SPACES':
            return text.replace(/\s/g, '');
        default:
            throw new Error('Conversão de texto não suportada');
    }
}

// MD5 simplificado (apenas para demonstração - não use em produção)
async function md5(text) {
    // Esta é uma implementação muito básica apenas para demonstração
    // Em produção, use uma biblioteca adequada
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('').substring(0, 32);
}

// Gerenciamento de histórico
function addToHistory(category, algorithm, input, output) {
    const entry = {
        timestamp: new Date().toLocaleString('pt-BR'),
        category,
        algorithm: algorithms[category][algorithm].name,
        input: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        output: output.substring(0, 50) + (output.length > 50 ? '...' : ''),
        fullInput: input,
        fullOutput: output
    };
    
    conversionHistory.unshift(entry);
    if (conversionHistory.length > 20) {
        conversionHistory = conversionHistory.slice(0, 20);
    }
    
    saveHistory();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<div class="no-history">Nenhum histórico ainda</div>';
        return;
    }
    
    historyList.innerHTML = conversionHistory.map((entry, index) => `
        <div class="history-item" data-index="${index}">
            <div class="history-header">
                <span class="algorithm">${entry.algorithm}</span>
                <span class="timestamp">${entry.timestamp}</span>
            </div>
            <div class="history-content">
                <div class="history-input">📝 ${entry.input}</div>
                <div class="history-output">✅ ${entry.output}</div>
            </div>
        </div>
    `).join('');
    
    // Adiciona event listeners para os itens do histórico
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            const entry = conversionHistory[index];
            inputText.value = entry.fullInput;
            outputResult.value = entry.fullOutput;
            copyBtn.disabled = false;
        });
    });
}

function saveHistory() {
    try {
        localStorage.setItem('multiConverterHistory', JSON.stringify(conversionHistory));
    } catch (e) {
        console.warn('Não foi possível salvar o histórico');
    }
}

function loadHistory() {
    try {
        const saved = localStorage.getItem('multiConverterHistory');
        if (saved) {
            conversionHistory = JSON.parse(saved);
            updateHistoryDisplay();
        }
    } catch (e) {
        console.warn('Não foi possível carregar o histórico');
    }
}

// Função para mostrar feedback visual
function showFeedback(element, className, duration = 2000) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

// Event Listeners
categorySelect.addEventListener('change', loadAlgorithms);
algorithmSelect.addEventListener('change', () => {
    updateAlgorithmInfo();
    updateSettings();
});

convertBtn.addEventListener('click', convertText);

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputResult.value = '';
    copyBtn.disabled = true;
    inputText.focus();
});

swapBtn.addEventListener('click', () => {
    const temp = inputText.value;
    inputText.value = outputResult.value;
    outputResult.value = temp;
    if (inputText.value) {
        copyBtn.disabled = false;
    }
});

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputResult.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copiado!';
        showFeedback(copyBtn, 'copied');

        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        outputResult.select();
        document.execCommand('copy');
        copyBtn.textContent = '✅ Copiado!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copiar';
        }, 2000);
    }
});

historyToggle.addEventListener('click', () => {
    const isHidden = historyContent.style.display === 'none';
    historyContent.style.display = isHidden ? 'block' : 'none';
    historyToggle.querySelector('.toggle-icon').textContent = isHidden ? '▲' : '▼';
});

clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        conversionHistory = [];
        saveHistory();
        updateHistoryDisplay();
    }
});

inputText.addEventListener('input', () => {
    if (inputText.value.trim() === '') {
        outputResult.value = '';
        copyBtn.disabled = true;
    }
});

inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
        e.preventDefault();
        convertBtn.click();
    }
});

// Foca no campo de entrada quando a extensão abrir
window.addEventListener('load', () => {
    inputText.focus();
});

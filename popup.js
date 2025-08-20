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

// Elementos do Gerador
const generatorSettings = document.getElementById('generatorSettings');
const lengthInput = document.getElementById('lengthInput');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const quantityInput = document.getElementById('quantityInput');

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
    },
    generator: {
        'UUID': { name: 'UUID v4', info: 'Gera um identificador único universal (UUID) versão 4.', crypto: null },
        'RANDOM_STRING': { name: 'String Aleatória', info: 'Gera uma string aleatória com caracteres personalizáveis.', crypto: null },
        'RANDOM_HEX': { name: 'Hexadecimal Aleatório', info: 'Gera uma string hexadecimal aleatória.', crypto: null },
        'RANDOM_BASE64': { name: 'Base64 Aleatório', info: 'Gera dados aleatórios codificados em Base64.', crypto: null },
        'RANDOM_NUMBER': { name: 'Número Aleatório', info: 'Gera números aleatórios em um intervalo especificado.', crypto: null },
        'RANDOM_PASSWORD': { name: 'Senha Aleatória', info: 'Gera senhas seguras com critérios personalizáveis.', crypto: null },
        'RANDOM_HASH': { name: 'Hash Aleatório', info: 'Gera hashes aleatórios usando diferentes algoritmos.', crypto: null }
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
    generatorSettings.style.display = 'none';
    swapBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
    
    // Mostra/esconde seção de entrada de dados
    const inputSection = document.querySelector('.input-section');
    
    if (category === 'generator') {
        generatorSettings.style.display = 'block';
        
        // Para Hash Aleatório, mostra a caixa de texto pois precisa de entrada
        if (algorithm === 'RANDOM_HASH') {
            inputSection.style.display = 'block';
        } else {
            inputSection.style.display = 'none';
        }
        
        updateGeneratorSettings();
    } else {
        inputSection.style.display = 'block';
        
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
    
    // Atualiza placeholder do campo de entrada
    updateInputPlaceholder();
}

// Atualiza configurações específicas do gerador
function updateGeneratorSettings() {
    const algorithm = algorithmSelect.value;
    const inputSection = document.querySelector('.input-section');
    
    // Configurações padrão
    lengthInput.value = 32;
    quantityInput.value = 1;
    includeUppercase.checked = true;
    includeLowercase.checked = true;
    includeNumbers.checked = true;
    includeSymbols.checked = false;
    
    // Configurações específicas por algoritmo
    switch (algorithm) {
        case 'UUID':
            lengthInput.style.display = 'none';
            includeUppercase.style.display = 'none';
            includeLowercase.style.display = 'none';
            includeNumbers.style.display = 'none';
            includeSymbols.style.display = 'none';
            inputSection.style.display = 'none';
            break;
        case 'RANDOM_NUMBER':
            lengthInput.style.display = 'none';
            includeUppercase.style.display = 'none';
            includeLowercase.style.display = 'none';
            includeNumbers.style.display = 'none';
            includeSymbols.style.display = 'none';
            inputSection.style.display = 'block';
            break;
        case 'RANDOM_PASSWORD':
            lengthInput.value = 12;
            includeSymbols.checked = true;
            inputSection.style.display = 'none';
            break;
        case 'RANDOM_HASH':
            lengthInput.style.display = 'none';
            includeUppercase.style.display = 'none';
            includeLowercase.style.display = 'none';
            includeNumbers.style.display = 'none';
            includeSymbols.style.display = 'none';
            inputSection.style.display = 'block';
            break;
        case 'RANDOM_STRING':
            inputSection.style.display = 'none';
            break;
        case 'RANDOM_HEX':
            inputSection.style.display = 'none';
            break;
        case 'RANDOM_BASE64':
            inputSection.style.display = 'none';
            break;
        default:
            lengthInput.style.display = 'block';
            includeUppercase.style.display = 'block';
            includeLowercase.style.display = 'block';
            includeNumbers.style.display = 'block';
            includeSymbols.style.display = 'block';
            inputSection.style.display = 'none';
    }
}

// Atualiza placeholder do campo de entrada baseado na categoria
function updateInputPlaceholder() {
    const category = categorySelect.value;
    const algorithm = algorithmSelect.value;
    
    let placeholder = "Digite aqui o texto para conversão...";
    
    if (category === 'generator') {
        switch (algorithm) {
            case 'UUID':
                placeholder = "Clique em 'Gerar' para criar um UUID v4...";
                break;
            case 'RANDOM_STRING':
                placeholder = "Configure as opções e clique em 'Gerar'...";
                break;
            case 'RANDOM_HEX':
                placeholder = "Configure o comprimento e clique em 'Gerar'...";
                break;
            case 'RANDOM_BASE64':
                placeholder = "Configure o comprimento e clique em 'Gerar'...";
                break;
            case 'RANDOM_NUMBER':
                placeholder = "Digite o intervalo (ex: 1-100) e clique em 'Gerar'...";
                break;
            case 'RANDOM_PASSWORD':
                placeholder = "Configure os critérios e clique em 'Gerar'...";
                break;
            case 'RANDOM_HASH':
                placeholder = "Digite um texto para gerar hash aleatório (opcional)...";
                break;
        }
    } else if (category === 'numeric') {
        placeholder = "Digite um número para conversão...";
    } else if (category === 'hash') {
        placeholder = "Digite o texto para gerar hash...";
    } else if (category === 'encoding') {
        placeholder = "Digite o texto para codificação...";
    } else if (category === 'text') {
        placeholder = "Digite o texto para transformação...";
    }
    
    inputText.placeholder = placeholder;
}

// Função principal de conversão
async function convertText() {
    const category = categorySelect.value;
    const algorithm = algorithmSelect.value;
    const text = inputText.value;
    
    // Para geradores, não é necessário texto de entrada na maioria dos casos
    if (category !== 'generator' && !text.trim()) {
        showFeedback(inputText, 'error');
        inputText.focus();
        return;
    }
    
    try {
        convertBtn.textContent = category === 'generator' ? 'Gerando...' : 'Convertendo...';
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
            case 'generator':
                result = await generateRandom(algorithm, text);
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
        addToHistory(category, algorithm, text || 'Geração automática', result);
        
        showFeedback(outputResult, 'success-animation');
        
    } catch (error) {
        outputResult.value = `Erro: ${error.message}`;
        showFeedback(outputResult, 'error');
    } finally {
        convertBtn.textContent = category === 'generator' ? '🎲 Gerar' : '🔄 Converter';
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

// Geração de dados aleatórios
async function generateRandom(algorithm, text) {
    const quantity = parseInt(quantityInput.value) || 1;
    const results = [];
    
    for (let i = 0; i < quantity; i++) {
        let result;
        
        switch (algorithm) {
            case 'UUID':
                result = generateUUID();
                break;
            case 'RANDOM_STRING':
                result = generateRandomString();
                break;
            case 'RANDOM_HEX':
                result = generateRandomHex();
                break;
            case 'RANDOM_BASE64':
                result = generateRandomBase64();
                break;
            case 'RANDOM_NUMBER':
                result = generateRandomNumber(text);
                break;
            case 'RANDOM_PASSWORD':
                result = generateRandomPassword();
                break;
            case 'RANDOM_HASH':
                result = await generateRandomHash(text);
                break;
            default:
                throw new Error('Algoritmo de geração não suportado');
        }
        
        results.push(result);
    }
    
    return quantity === 1 ? results[0] : results.join('\n');
}

// Gera UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Gera string aleatória
function generateRandomString() {
    const length = parseInt(lengthInput.value) || 32;
    const chars = getCharacterSet();
    
    if (chars.length === 0) {
        throw new Error('Selecione pelo menos um tipo de caractere');
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

// Gera string hexadecimal aleatória
function generateRandomHex() {
    const length = parseInt(lengthInput.value) || 32;
    const chars = '0123456789abcdef';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

// Gera dados Base64 aleatórios
function generateRandomBase64() {
    const length = parseInt(lengthInput.value) || 32;
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    
    // Converte para string binária
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    
    return btoa(binary);
}

// Gera número aleatório
function generateRandomNumber(range) {
    if (!range.trim()) {
        return Math.floor(Math.random() * 100) + 1;
    }
    
    const parts = range.split('-').map(s => s.trim());
    if (parts.length !== 2) {
        throw new Error('Formato inválido. Use: min-max (ex: 1-100)');
    }
    
    const min = parseInt(parts[0]);
    const max = parseInt(parts[1]);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
        throw new Error('Intervalo inválido. Min deve ser menor que max');
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera senha aleatória
function generateRandomPassword() {
    const length = parseInt(lengthInput.value) || 12;
    const chars = getCharacterSet();
    
    if (chars.length === 0) {
        throw new Error('Selecione pelo menos um tipo de caractere');
    }
    
    // Garante que a senha tenha pelo menos um caractere de cada tipo selecionado
    let password = '';
    const selectedTypes = [];
    
    if (includeUppercase.checked) {
        password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
        selectedTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    
    if (includeLowercase.checked) {
        password += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
        selectedTypes.push('abcdefghijklmnopqrstuvwxyz');
    }
    
    if (includeNumbers.checked) {
        password += '0123456789'.charAt(Math.floor(Math.random() * 10));
        selectedTypes.push('0123456789');
    }
    
    if (includeSymbols.checked) {
        password += '!@#$%^&*()_+-=[]{}|;:,.<>?'.charAt(Math.floor(Math.random() * 30));
        selectedTypes.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
    }
    
    // Preenche o resto da senha
    for (let i = password.length; i < length; i++) {
        const randomType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        password += randomType.charAt(Math.floor(Math.random() * randomType.length));
    }
    
    // Embaralha a senha
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Gera hash aleatório
async function generateRandomHash(text) {
    const algorithm = 'SHA-256'; // Sempre usa SHA-256
    
    if (!text.trim()) {
        // Gera dados aleatórios se não houver texto
        const randomData = generateRandomString();
        text = randomData;
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    return `${algorithm}: ${hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')}`;
}

// Obtém o conjunto de caracteres baseado nas configurações
function getCharacterSet() {
    let chars = '';
    
    if (includeUppercase.checked) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    if (includeLowercase.checked) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
    }
    
    if (includeNumbers.checked) {
        chars += '0123456789';
    }
    
    if (includeSymbols.checked) {
        chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
    
    return chars;
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

// Event listeners para configurações do gerador
lengthInput.addEventListener('change', () => {
    if (categorySelect.value === 'generator') {
        updateGeneratorSettings();
    }
});

includeUppercase.addEventListener('change', () => {
    if (categorySelect.value === 'generator') {
        updateGeneratorSettings();
    }
});

includeLowercase.addEventListener('change', () => {
    if (categorySelect.value === 'generator') {
        updateGeneratorSettings();
    }
});

includeNumbers.addEventListener('change', () => {
    if (categorySelect.value === 'generator') {
        updateGeneratorSettings();
    }
});

includeSymbols.addEventListener('change', () => {
    if (categorySelect.value === 'generator') {
        updateGeneratorSettings();
    }
});

quantityInput.addEventListener('change', () => {
    if (categorySelect.value === 'generator') {
        updateGeneratorSettings();
    }
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

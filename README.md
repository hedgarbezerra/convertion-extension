# 🔧 Multi Converter - Extensão para Microsoft Edge

Uma extensão poderosa e completa para conversões de texto, hash, encoding e muito mais diretamente no seu navegador Edge.

## ✨ Funcionalidades Principais

### 🔐 Hash/Criptografia
- ✅ **SHA-1** - Hash de 160 bits (40 caracteres hex)
- ✅ **SHA-256** - Hash de 256 bits (64 caracteres hex) 
- ✅ **SHA-384** - Hash de 384 bits (96 caracteres hex)
- ✅ **SHA-512** - Hash de 512 bits (128 caracteres hex)
- ✅ **MD5** - Hash de 128 bits (32 caracteres hex)

### 📝 Codificação/Encoding
- ✅ **Base64** - Codificação padrão Base64
- ✅ **Base64 URL-Safe** - Base64 seguro para URLs
- ✅ **URL Encoding** - Codifica caracteres especiais para URLs
- ✅ **HTML Entities** - Converte caracteres especiais em entidades HTML
- ✅ **URI Component** - Codificação de componentes URI

### 🔢 Conversões Numéricas
- ✅ **Decimal → Binário** - Converte números decimais para binário
- ✅ **Decimal → Hexadecimal** - Converte números decimais para hex
- ✅ **Decimal → Octal** - Converte números decimais para octal
- ✅ **Binário → Decimal** - Converte números binários para decimal
- ✅ **Hexadecimal → Decimal** - Converte números hex para decimal
- ✅ **Conversão de Base** - Entre qualquer base (2-36)

### 📋 Transformações de Texto
- ✅ **MAIÚSCULAS** - Converte para letras maiúsculas
- ✅ **minúsculas** - Converte para letras minúsculas
- ✅ **Primeira Maiúscula** - Capitaliza cada palavra
- ✅ **Texto Invertido** - Inverte a ordem dos caracteres
- ✅ **Contador de Palavras** - Conta caracteres, palavras, linhas
- ✅ **Remover Espaços** - Remove todos os espaços em branco

### 🎲 Gerador de Dados Aleatórios
- ✅ **UUID v4** - Gera identificadores únicos universais
- ✅ **String Aleatória** - Strings personalizáveis com critérios
- ✅ **Hexadecimal Aleatório** - Strings hex de comprimento configurável
- ✅ **Base64 Aleatório** - Dados aleatórios codificados em Base64
- ✅ **Número Aleatório** - Números em intervalo personalizado
- ✅ **Senha Aleatória** - Senhas seguras com critérios específicos
- ✅ **Hash Aleatório** - Hashes de dados aleatórios com algoritmos variados

## 🎯 Recursos Avançados

- 🔄 **Interface Intuitiva** - Seletor de categorias e algoritmos
- ⚙️ **Configurações Flexíveis** - Maiúsculas, espaços, bases numéricas
- ⇄ **Conversão Reversa** - Botão para inverter entrada/saída
- 📜 **Histórico Completo** - Salva últimas 20 conversões
- 📋 **Cópia Rápida** - Um clique para copiar resultados
- ⌨️ **Atalhos de Teclado** - Enter para converter
- 🛡️ **100% Offline** - Nenhum dado sai do seu navegador
- 💾 **Persistência Local** - Histórico salvo localmente

## 🚀 Como Instalar

### 1. Preparar os Ícones
Crie ou baixe ícones PNG com os seguintes tamanhos:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels) 
- `icon128.png` (128x128 pixels)

**Sugestão:** Use um ícone com símbolo de hash (#) ou ferramenta (🔧) nas cores azul/roxo.

### 2. Instalar no Edge

1. **Abra o Microsoft Edge**
2. **Acesse as extensões:**
   - Digite `edge://extensions/` na barra de endereços
   - Ou vá em Menu (...) → Extensões
3. **Ativar modo de desenvolvedor:**
   - Clique no botão "Modo de desenvolvedor" no canto inferior esquerdo
4. **Carregar extensão:**
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `edge-sha256-extension`
5. **Pronto!** A extensão aparecerá na barra de ferramentas

## 🎯 Como Usar

1. **Clique no ícone da extensão** na barra de ferramentas
2. **Selecione a categoria** (Hash, Encoding, Numérico, Texto)
3. **Escolha o algoritmo** específico
4. **Digite ou cole o texto** para conversão
5. **Configure opções** se necessário (maiúsculas, espaços, base)
6. **Clique em "🔄 Converter"** ou pressione Enter
7. **Copie o resultado** clicando em "📋 Copiar"

### ⌨️ Atalhos de Teclado
- **Enter:** Converter texto
- **Ctrl+Enter:** Nova linha no texto de entrada

## 🔧 Exemplos de Uso

### Hash/Criptografia
```
Entrada: "Hello World"
SHA-256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
MD5: b10a8db164e0754105b7a99be72e3fe5
```

### Encoding
```
Entrada: "Hello World!"
Base64: SGVsbG8gV29ybGQh
URL Encoding: Hello%20World%21
HTML Entities: Hello World!
```

### Numérico
```
Entrada: 255
Binário: 11111111
Hexadecimal: ff
Octal: 377
```

### Texto
```
Entrada: "hello world"
MAIÚSCULAS: HELLO WORLD
Primeira Maiúscula: Hello World
Invertido: dlrow olleh
```

### Gerador
```
UUID v4: 550e8400-e29b-41d4-a716-446655440000
String Aleatória (32 chars): K8mN2pQ9rS5tU7vW3xY1zA4bC6dE8fG
Hexadecimal (16 chars): a1b2c3d4e5f67890
Base64 (24 chars): dGVzdCBkYXRhIGZvciBiYXNlNjQ=
Número (1-100): 42
Senha (12 chars): Kj#9mN2$pQ5
Hash Aleatório: SHA-256: a1b2c3d4e5f67890...
```

## 📜 Histórico e Configurações

- **Histórico Automático:** As últimas 20 conversões são salvas automaticamente
- **Reutilização:** Clique em qualquer item do histórico para reutilizar
- **Configurações por Categoria:**
  - Hash/Encoding: Opções de maiúsculas e espaçamento
  - Numérico: Configuração de base numérica e inversão
  - Texto: Aplicação direta sem configurações extras
  - Gerador: Comprimento, tipos de caracteres, quantidade e critérios específicos
    - **String/Senha Aleatória:** Todas as configurações disponíveis
    - **Hexadecimal/Base64:** Todas as configurações disponíveis
    - **UUID/Número/Hash:** Configurações ocultadas (não aplicáveis)

## 🛡️ Segurança e Privacidade

- ✅ **100% Offline** - Todo processamento é local
- ✅ **Nenhum dado enviado** para servidores externos
- ✅ **Sem permissões especiais** - Não acessa sites ou dados
- ✅ **Código-fonte aberto** e auditável
- ✅ **Histórico local** - Armazenado apenas no seu navegador

## ⚠️ Avisos Importantes

**Para senhas:** SHA simples não é recomendado para armazenamento de senhas. Use bcrypt, scrypt ou Argon2.

**MD5:** Considerado inseguro para uso criptográfico. Use apenas para checksums não-críticos.

**Base de dados:** Para sistemas críticos, sempre valide os hashes com ferramentas dedicadas.

## 🐛 Solução de Problemas

**Extensão não carrega:**
- Verifique se todos os arquivos estão na pasta
- Certifique-se de que os ícones PNG estão presentes
- Tente recarregar a extensão em `edge://extensions/`

**Resultado diferente do esperado:**
- Verifique espaços extras no início/fim do texto
- Hash é case-sensitive (diferencia maiúsculas/minúsculas)
- Para numérico, certifique-se de usar números válidos

**Histórico não salva:**
- Verifique se o navegador permite localStorage
- O histórico é limitado a 20 itens mais recentes

## 📂 Estrutura dos Arquivos

```
edge-sha256-extension/
├── manifest.json      # Configuração da extensão (v2.0)
├── popup.html         # Interface principal expandida
├── popup.js          # Lógica de múltiplos algoritmos
├── style.css         # Estilos responsivos
├── icon16.png        # Ícone 16x16
├── icon48.png        # Ícone 48x48
├── icon128.png       # Ícone 128x128
├── README.md         # Este arquivo
├── ICONS_INFO.txt    # Instruções para ícones
└── test-extension.html # Arquivo de teste local
```

## 🔄 Atualizações

### Versão 2.0 - Multi Converter
- ✨ Adicionado 20+ algoritmos de conversão
- 🔧 Interface reorganizada com categorias
- 📜 Sistema de histórico completo
- ⚙️ Configurações avançadas
- 🎨 Design responsivo melhorado

### Versão 2.1 - Gerador de Dados Aleatórios
- 🎲 Nova categoria "Gerador" com 7 tipos de geração
- 🔐 UUID v4, strings aleatórias, hex, Base64
- 🎯 Números aleatórios em intervalos personalizados
- 🔑 Gerador de senhas seguras com critérios
- 🎲 Hashes aleatórios com algoritmos variados
- ⚙️ Configurações avançadas para cada tipo de geração

## 🤝 Contribuições

Sugestões de novos algoritmos ou melhorias são bem-vindas! Esta extensão foi projetada para ser facilmente expansível.

**Algoritmos que podem ser adicionados:**
- JWT decode/encode
- QR Code generation
- UUID generation
- Timestamp conversions
- Color code conversions

---

**Desenvolvido com ❤️ para facilitar todas as suas conversões de texto**

**Versão 2.1** - Multi Converter com Gerador de Dados Aleatórios

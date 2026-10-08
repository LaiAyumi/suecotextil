# SUECO Têxtil | Site institucional

Site institucional e catálogo digital para a SUECO Têxtil, com apresentação de coleções, cartela de cores, cartela de estampas e serviço de estampas personalizadas.

> **Status:** em desenvolvimento. O site ainda não foi publicado, e parte das fotos e dos textos aguarda o material do cliente (veja a seção "Conteúdo do cliente").

## 📄 Páginas

| Página | Arquivo | Conteúdo |
| --- | --- | --- |
| Home | `index.html` | Hero com slider, estampas, estampas personalizadas, serviços e formulário de contato |
| Catálogo | `catalogo.html` | Hero com slider e acesso às cartelas de cores e de estampas |
| Cartela de Cores | `cartela-de-cores.html` | Grid de cores com painel de detalhes (código e Pantone) |
| Cartela de Estampas | `cartela-de-estampas.html` | Grid de estampas com painel de detalhes |
| Coleções | `colecoes.html` | Coleções com filtro por segmento |
| Coleção | `colecao-aura.html` | Página de uma coleção, com cartela de estampas e painel técnico das bases |
| Estampas Personalizadas | `estampas-personalizadas.html` | Etapas, tecnologias, portfólio, dúvidas frequentes e pedido de orçamento |
| Sobre | `sobre.html` | Empresa, manifesto, história e preocupação ambiental |

## ✨ Funcionalidades

- Menu de navegação responsivo: em telas de até 860 px vira um botão de menu acessível (abre e fecha pelo teclado, o Tab segue para os links, fecha com Esc, ao escolher um link ou quando o foco sai do menu)
- Tema claro e escuro, com a escolha salva no navegador
- Sliders no hero e na seção de estampas da home
- Cartela de cores e cartela de estampas com painel em slider (setas na tela ou no teclado)
- Painel de detalhes das estampas na página de coleção, com as bases disponíveis
- Todos os painéis fecham pelo X, pela tecla Esc ou clicando fora, travam a rolagem da página enquanto estão abertos e devolvem o foco ao item que os abriu
- Filtro de coleções por segmento, com aviso quando não há resultados
- Dúvidas frequentes em acordeão (um item aberto por vez)
- Formulários de contato e de orçamento com validação do navegador e aviso na tela (veja a observação abaixo)
- Animação de entrada das seções ao rolar a página (desligada para quem prefere menos movimento). `index.html`, `catalogo.html` e `sobre.html` carregam o Anime.js do CDN e usam a versão nativa se ele não responder; as demais páginas usam sempre a versão nativa
- Links para seções (#contato, #servicos etc.) param abaixo da barra de navegação fixa
- Layout responsivo, sem rolagem horizontal de 360 px a 1366 px

> **Formulários:** o site é estático e ainda não tem backend. Ao enviar, o visitante vê um aviso de que o envio online ainda não está disponível, com o telefone e o e-mail da SUECO. Nada é enviado.

## 🛠️ Tecnologias

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

HTML, CSS e JavaScript puro, sem build. Dependências externas opcionais: fonte Outfit (Google Fonts) e Anime.js 3.2.1 (cdnjs, com `defer` e verificação de integridade, só em `index.html`, `catalogo.html` e `sobre.html`). O site funciona sem elas.

## 🚀 Como rodar

Não depende de build: basta abrir o `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## 💬 Configurar o WhatsApp

O número fica em uma única constante, no topo do `script.js`:

```js
const WHATSAPP_NUMERO = '55SEUNUMERO';
```

Troque pelo número comercial só com dígitos, com DDI e DDD (exemplo de formato: `5511999999999`).

- Enquanto o placeholder estiver lá, o botão "Chamar no WhatsApp" de `estampas-personalizadas.html` fica oculto e o botão "Tenho Interesse" do slider leva ao formulário de contato.
- Com um número válido, o botão de orçamento aparece e abre o WhatsApp com nome e segmento preenchidos, e o "Tenho Interesse" passa a abrir o WhatsApp com uma mensagem pronta (atributo `data-whatsapp` no HTML).

## 🧾 Conteúdo do cliente

Itens que dependem de informação ou material da SUECO e ainda estão como exemplo ou precisam de confirmação:

**Imagens**
- Não há fotos reais no projeto. Os fundos usam `images/dark-hero-bg.webp` e `images/wave-bg.webp`; a estampa floral `images/estampa-floral.webp` é ilustrativa e leva o selo "Ilustrativo" em CSS.
- Onde faltava foto (estampas, coleções, portfólio, painel da coleção) há blocos com padrões em CSS (`.ph-art`) marcados como "Ilustrativo". Para trocar por uma foto real:
  - nos cards de coleção, no portfólio e no slider da home, troque o bloco `.ph-art` (com o selo `.ph-art__label`) por um `<img>` com `alt` descritivo; onde o bloco tem `role="img"`, tire também o "(imagem ilustrativa)" do `aria-label`;
  - em `cartela-de-estampas.js`, preencha o campo `img` da estampa (o card mostra a foto; tire o selo "Ilustrativo" do modelo do card quando as estampas forem reais);
  - em `colecao-aura.html`, troque o `<span class="ph-art ...">` de dentro do botão de cada card por um `<img>` e preencha `data-img` (e, se quiser, `data-thumbs="a.jpg,b.jpg"`) no `<figure>`: esses atributos alimentam só o painel de detalhes.
- Imagens da seção "A Empresa" e "Manifesto" em `sobre.html` (hoje decorativas).

**Textos e dados**
- `colecoes.html`: os quatro cards ("SEASON", "NOME - COLEÇÃO", "DESCRIÇÃO", "TAG 1", "TAG 2") e os segmentos de cada card (`data-seg`).
- `colecao-aura.html`: título da aba (hoje "SUECO - Coleção", sem o nome da coleção), hero ("SEASON", "COLEÇÃO 1", "TAG · TAG · TAG"), os blocos Mood, Paleta, Bases e Segmento, e os quatro cards da cartela, que repetem a mesma estampa de exemplo (16635-LN-D, legendas "Stripe 01" a "Stripe 04") com as mesmas bases.
- `cartela-de-estampas.js`: as quatro estampas de exemplo (PRETTY DOTS, URBAN LINES, AQUARELA, TROPICAL), com códigos e coleções.
- `cartela-de-cores.js`: confirmar nomes, códigos e Pantones das cinco cores. A faixa de amostras de `catalogo.html` (`.swatch-strip`) repete os mesmos cinco hex no HTML: ao mudar as cores, atualize os dois arquivos.
- `sobre.html`: as marcas "TecidoX e FibraY" são placeholders; confirmar números e datas (anos de mercado, que aparecem como "mais de 40" e "mais de 20", unidades, clientes, área, linha do tempo, certificações e indicadores ambientais).
- `estampas-personalizadas.html`: confirmar prazos e mínimos das dúvidas frequentes.
- Hero (`index.html` e `catalogo.html`): os slides 2 e 3 apresentam as páginas de coleções e de catálogo; podem ser trocados por coleções em destaque quando houver nomes e textos oficiais.

**Links e contatos**
- Número do WhatsApp (veja a seção acima).
- Acesso Restrito (funcionários e representantes): a página ainda não existe, então o card da home ficou sem link. O card "Segunda Via de Boleto" leva ao formulário de contato.
- Termos de Uso e Política de Privacidade: as páginas não existiam e os links foram retirados do rodapé; voltam quando houver os textos.
- Endereços das redes sociais (LinkedIn, Instagram, Facebook), que foram retirados do rodapé até existirem links reais.
- Backend ou serviço de e-mail para os formulários.

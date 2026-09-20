// Catálogo do Lúmina, alinhado ao acervo local em ~/Desktop/estudo/Ebooks.
// Cada livro contém resumo editorial real: capítulos, ideias-chave e citações.

export type CatalogInsight = { title: string; body: string }
export type CatalogChapter = { title: string; body: string }
export type CatalogQuote = { text: string; chapterPosition: number }

export type CatalogBook = {
  slug: string
  title: string
  author: string
  category: string
  color: string
  tagline: string
  description: string
  insights: CatalogInsight[]
  chapters: CatalogChapter[]
  quotes: CatalogQuote[]
}

export const CATALOG_BOOKS: CatalogBook[] = [
  {
    slug: 'habitos-atomicos',
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    category: 'produtividade-foco',
    color: '#064e3b',
    tagline:
      'Pequenas mudanças de 1% se acumulam em resultados extraordinários.',
    description:
      'James Clear defende que o sucesso duradouro nasce de sistemas, não de metas: melhorar 1% ao dia soma cerca de 37 vezes ao fim de um ano. O livro apresenta o loop do hábito (deixa, desejo, resposta e recompensa) e as Quatro Leis da Mudança de Comportamento para construir bons hábitos e inverter cada uma delas para quebrar os maus. A chave é agir sobre a identidade, não apenas sobre resultados.',
    insights: [
      {
        title: 'O poder do 1% ao dia',
        body: 'Hábitos são os juros compostos da autoaperfeiçoamento: 1% melhor por dia ao longo de um ano leva a resultados cerca de 37 vezes maiores, enquanto 1% pior levanta quase a zero. O progresso costuma ficar invisível até atravessar o Platô do Potencial Latente.',
      },
      {
        title: 'Sistemas vencem metas',
        body: 'Metas definem a direção, mas são os sistemas que produzem o progresso. Clear resume: você não sobe ao nível das suas metas, você cai ao nível dos seus sistemas; o objetivo das metas é vencer o jogo, o dos sistemas é continuar jogando.',
      },
      {
        title: 'Identidade antes de resultado',
        body: 'A mudança mais eficaz não foca no que você quer alcançar, mas em quem você quer se tornar. Cada ação é um voto no tipo de pessoa que você deseja ser, e hábitos são a via prática para reescrever crenças sobre si mesmo.',
      },
      {
        title: 'As Quatro Leis da Mudança',
        body: 'Todo hábito segue o loop deixa, desejo, resposta e recompensa, traduzido nas leis: torne óbvio, torne atraente, torne fácil e torne satisfatório. Para abandonar um mau hábito, inverta cada lei: invisível, desinteressante, difícil e insatisfatório.',
      },
    ],
    chapters: [
      {
        title: '1. O poder dos hábitos atômicos e a identidade',
        body: 'Clear abre com a virada do ciclismo britânico sob Dave Brailsford e sua filosofia de agregação de ganhos marginais. Explica que hábitos são juros compostos: 1% ao dia vira 37 vezes mais em um ano, mas o progresso fica escondido no Platô do Potencial Latente, e desistimos no Vale da Decepção por confundir metas com sistemas. Defende que a mudança mais profunda ocorre na identidade: há três camadas (resultado, processo, identidade), e cada ação é um voto no tipo de pessoa que você quer se tornar.',
      },
      {
        title: '2. Torne óbvio e torne atraente',
        body: "A Primeira Lei ataca a deixa: preencha o Placar de Hábitos para criar consciência, use intenções de implementação ('eu vou [comportamento] às [hora] em [local]') e empilhamento de hábitos ('depois de [hábito atual], farei [novo hábito]'). Redesenhe o ambiente para que as deixas dos bons hábitos sejam visíveis e as dos maus fiquem escondidas. A Segunda Lei, tornar atraente, usa empacotamento de tentações, o poder do grupo (família e amigos) e rituais de motivação para ressaltar os benefícios de agir.",
      },
      {
        title: '3. Torne fácil e torne satisfatório',
        body: 'A Terceira Lei busca a lei do menor esforço: reduza o atrito, prepare o ambiente, domine os momentos decisivos e aplique a Regra dos Dois Minutos, encolhendo hábitos até começar em menos de dois minutos e automatizando o que puder. A Quarta Lei explora a recompensa imediata: reforce cada conclusão, acompanhe o progresso (o efeito de nunca quebrar a corrente) e adicione custo social via parceiro de responsabilidade e contrato de hábitos, pois punição e vergonha imediatas desestimulam maus hábitos.',
      },
      {
        title: '4. Táticas avançadas e a busca pela excelência',
        body: 'Clear trata da verdade sobre o talento: genes importam, mas escolher o campo em que suas aptidões se destacam é o que leva de bom a excelente. Apresenta a Regra de Goldilocks, manter a motivação na fronteira entre o fácil e o difícil, e alerta para o lado negativo dos bons hábitos, quando a automação vira complacência. Fecha com reflexão e revisão constantes, como sua Revisão Anual e o Relatório de Integridade, para evitar a deriva e continuar afinando o sistema que produz resultados duradouros.',
      },
    ],
    quotes: [
      {
        text: 'Você não sobe ao nível das suas metas. Você cai ao nível dos seus sistemas.',
        chapterPosition: 1,
      },
      {
        text: 'Cada ação que você toma é um voto no tipo de pessoa que deseja se tornar.',
        chapterPosition: 1,
      },
    ],
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'produtividade-foco',
    color: '#262e42',
    tagline:
      'A concentração sem distração virou raridade e, por isso, virou a maior vantagem competitiva do século XXI.',
    description:
      'Cal Newport sustenta que o trabalho profundo — esforço concentrado e sem interrupção, que leva a cognição ao limite — é cada vez mais raro ao mesmo tempo em que se torna cada vez mais valioso. Quem domina essa habilidade aprende rápido coisas difíceis, produz em nível de elite e encontra mais sentido no que faz; quem se entrega ao trabalho raso, disfarçado de ocupação, perde a capacidade de concentrar. O livro propõe quatro regras práticas para treinar o foco e reorganizar a vida profissional em torno da profundidade.',
    insights: [
      {
        title: 'Profundidade é vantagem econômica',
        body: "Numa economia da informação que muda rápido, aprender coisas complexas e produzir no mais alto nível exige concentração ininterrupta. Essa é a 'superpotência do século XXI': rara justamente quando mais recompensada.",
      },
      {
        title: 'Ocupação não é produtividade',
        body: 'E-mails, reuniões e redes criam a sensação de estar sempre ocupado, mas raramente geram valor novo. O trabalho raso é fácil de replicar e, em excesso, corrói a capacidade de ir fundo.',
      },
      {
        title: 'Ritual vence a força de vontade',
        body: 'Depender de motivação para começar a focar falha. Rotinas e rituais fixos — local, horário e regras claras — reduzem o esforço mental necessário para entrar e permanecer em concentração.',
      },
      {
        title: 'O foco é limitado e treinável',
        body: 'Poucos aguentam mais de quatro horas diárias de profundidade real, mas esse teto pode ser ampliado com treino. É preciso também reaprender a lidar com o tédio, fonte da distração compulsiva.',
      },
    ],
    chapters: [
      {
        title: '1. Trabalhe com profundidade',
        body: 'Newport mostra que o hábito de ir fundo não nasce de boas intenções, mas de rotinas e rituais que poupam a força de vontade. Ele apresenta quatro filosofias de agendamento — monástica, bimodal, rítmica e jornalística — para encaixar blocos de concentração na vida real, conforme o tipo de trabalho e o autocontrole de cada um. Em seguida, detalha o ritual: definir onde e por quanto tempo trabalhar, como conduzir a sessão e como se apoiar (café, caminhada, ambiente organizado). Grandes gestos, como isolar-se num hotel, elevam a percepção de importância da tarefa e reduzem a procrastinação.',
      },
      {
        title: '2. Abrace o tédio',
        body: "Se cada instante livre vira checagem de celular, o cérebro perde o músculo da concentração. Newport defende treinar deliberadamente a atenção, aceitando o tédio em vez de combatê-lo, e desconfia de paliativos como o 'sabbath da internet', que só adia o problema. As estratégias incluem agendar blocos de distração, meditação produtiva durante deslocamentos e exercícios de memória que exigem atenção inabalável. A ideia central é simples: a força para focar tem a medida exata do compromisso que você assume em treiná-la, e não de quanto tempo passa longe das telas.",
      },
      {
        title: '3. Abandone as redes sociais',
        body: 'Ferramentas de rede fragmentam a atenção e substituem a troca real de valor — produzir algo que merece atenção — por um jogo de atenção mútua e barata. Newport pede que você avalie cada aplicativo como um artesão avalia ferramentas: adote só o que sustenta de forma decisiva seus objetivos de alto valor e descarte o resto. Ele sugere um teste de trinta dias de abandono, sem anunciar publicamente, para ver o que realmente faz falta. Na maioria dos casos, as redes não passam no critério e liberam tempo e foco para trabalhos que importam de verdade.',
      },
      {
        title: '4. Drene o raso',
        body: 'A última regra ataca o trabalho raso diretamente. Newport propõe agendar cada minuto do dia, revisando o plano sempre que ele quebra, para dar às horas um propósito. Depois, ensina a quantificar a profundidade de cada atividade com uma pergunta: quanto tempo levaria para treinar um recém-formado brilhante para fazer isso? Tarefas que exigem anos de expertise são profundas; as aprendidas em semanas são rasas. Ele recomenda negociar um orçamento de trabalho raso, em geral de 30 a 50 por cento, e encerrar o dia com um ritual de desligamento que libera a mente do trabalho.',
      },
    ],
    quotes: [
      {
        text: 'A chave é ir além das boas intenções e adicionar rotinas e rituais à sua vida de trabalho.',
        chapterPosition: 1,
      },
      {
        text: 'Trate o trabalho raso com desconfiança: seu dano é muito subestimado e sua importância, muito superestimada.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'o-poder-do-habito',
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    category: 'produtividade-foco',
    color: '#904d00',
    tagline:
      'Como o loop deixa-rotina-recompensa governa a vida e como reprogramá-lo.',
    description:
      'Charles Duhigg mostra que boa parte das escolhas diárias não é decisão consciente, e sim hábito: mais de 40% das ações de um dia seguem padrões automáticos gravados no cérebro. A partir de casos reais como Alcoa, Starbucks e Target, o livro explica o loop deixa-rotina-recompensa, o papel do desejo (craving) e a regra de ouro da mudança: manter a mesma deixa e a mesma recompensa, trocando apenas a rotina. Entender esses mecanismos permite transformar hábitos pessoais, organizacionais e sociais.',
    insights: [
      {
        title: 'O loop do hábito',
        body: 'Todo hábito funciona como um circuito de três etapas: uma deixa (cue) que dispara o modo automático, uma rotina (física, mental ou emocional) e uma recompensa que ensina o cérebro se vale guardar aquele padrão. Com a repetição, o cérebro transforma a sequência em um bloco automático (chunking), e os hábitos ficam codificados para sempre, à espera das deixas certas.',
      },
      {
        title: 'O desejo move o loop',
        body: 'Deixa e recompensa só viram hábito quando surge o desejo (craving): o cérebro passa a antecipar o prazer antes mesmo de recebê-lo, como os macacos de Wolfram Schultz que sentiam o suco só de ver o símbolo na tela. É por isso que o aroma da Cinnabon ou o som de uma notificação nos fazem agir quase sem pensar.',
      },
      {
        title: 'A regra de ouro da mudança',
        body: 'Hábitos não se apagam, se substituem: para mudar, mantenha a mesma deixa e a mesma recompensa, mas insira uma nova rotina. É o que fazem os Alcoólicos Anônimos, ao oferecer novos rituais para as mesmas carências, e o técnico Tony Dungy, ao treinar reações automáticas a partir de sinais já conhecidos em campo.',
      },
      {
        title: 'Hábitos-chave (keystone)',
        body: "Alguns hábitos importam mais que outros porque, ao mudar, desencadeiam uma reação em cadeia. Paul O'Neill fez da segurança no trabalho o hábito-chave da Alcoa e transformou a empresa; Lisa Allen parou de fumar e, a partir daí, reescreveu alimentação, finanças e rotina. Focar poucas alavancas certas vale mais que tentar corrigir tudo de uma vez.",
      },
    ],
    chapters: [
      {
        title: '1. O loop do hábito: como os hábitos funcionam',
        body: 'Duhigg parte do caso do paciente Eugene Pauly, que perdeu a memória por uma encefalite viral e ainda assim formava novos hábitos. Experimentos com ratos no MIT mostraram que o cérebro, ao automatizar uma sequência, poupa esforço e grava o padrão nos gânglios da base. Surge então o circuito deixa-rotina-recompensa: um gatilho coloca o cérebro em modo automático, a rotina se desenrola e a recompensa confirma se o loop vale ser lembrado. Hábitos nunca desaparecem de fato; ficam à espera das pistas que os reativam.',
      },
      {
        title: '2. Desejo, força de vontade e a regra de ouro',
        body: "Para criar um hábito novo é preciso cultivar o desejo pela recompensa, como Claude Hopkins fez ao vender Pepsodent com a deixa do 'filme nos dentes' e a promessa de dentes bonitos. Para mudar hábitos antigos vale a regra de ouro: manter deixa e recompensa e trocar a rotina. O livro mostra ainda que a força de vontade é como um músculo, que se esgota (o experimento dos biscoitos e rabanetes) mas também se fortalece com treino. A Starbucks transformou autodisciplina em hábito organizacional com o método LATTE.",
      },
      {
        title: '3. Hábitos-chave e a transformação das organizações',
        body: "Paul O'Neill assumiu a Alcoa prometendo zero acidentes e fez da segurança um hábito-chave, que se espalhou por toda a empresa e multiplicou lucros. Duhigg explica que certos hábitos disparam mudanças em cadeia, e que crises são momentos em que líderes podem reconstruir rotinas organizacionais. Já a Target ilustra o outro lado: usando o Guest ID e previsões estatísticas, a rede identificava clientes grávidas e moldava hábitos de compra antes que as pessoas percebessem, mostrando o poder e os limites éticos de manipular padrões de consumo.",
      },
      {
        title: '4. Os hábitos das sociedades e a questão do livre-arbítrio',
        body: 'Na terceira parte, o foco recai sobre movimentos sociais. O boicote aos ônibus de Montgomery vingou porque laços fortes (amigos de Rosa Parks) e laços fracos (a pressão da comunidade) transformaram a adesão em hábito social. Rick Warren repetiu a lógica na Saddleback Church, unindo grandes cultos e pequenos grupos para tornar a fé um hábito cotidiano. O capítulo final discute se somos responsáveis por nossos hábitos, examinando o caso de um assassino britânico e a fronteira entre automatismo e culpa.',
      },
    ],
    quotes: [
      {
        text: 'Para mudar um hábito, você deve manter a mesma deixa, entregar a mesma recompensa, mas inserir uma nova rotina.',
        chapterPosition: 2,
      },
      {
        text: 'Os hábitos nunca realmente desaparecem. Eles ficam codificados nas estruturas do nosso cérebro.',
        chapterPosition: 1,
      },
    ],
  },
  {
    slug: 'foco',
    title: 'Foco',
    author: 'Daniel Goleman',
    category: 'produtividade-foco',
    color: '#3c4459',
    tagline:
      'A atenção é o músculo invisível da excelência: foque para dentro, para o outro e para os sistemas.',
    description:
      'Daniel Goleman mostra que a atenção, mais do que o QI, é a força oculta por trás do desempenho e da liderança. Ele divide esse foco em três direções — interno, no outro e externo — e defende que ele se fortalece com treino, como um músculo. O livro une neurociência, psicologia e casos reais para explicar por que dispersão, empatia e visão sistêmica definem quem se destaca.',
    insights: [
      {
        title: 'Foco é um músculo treinável',
        body: 'A atenção funciona como uma musculatura: usada mal, definha; treinada bem, cresce. Práticas como mindfulness e a habilidade de notar a própria distração fortalecem o autocontrole e a concentração.',
      },
      {
        title: 'Três focos de uma vida bem vivida',
        body: 'Excelência exige equilibrar o foco interno (autoconsciência), o foco no outro (empatia) e o foco externo (sistemas). Líderes sem essa tríade ficam sem bússola, alheios ou pegos de surpresa.',
      },
      {
        title: 'A distração digital empobrece o momento humano',
        body: 'Telas capturam a atenção e corroem a leitura não verbal e o convívio face a face. Goleman alerta que uma riqueza de informação gera uma pobreza de atenção e enfraquece vínculos.',
      },
      {
        title: 'Somos cegos para os sistemas',
        body: 'O cérebro evoluiu para reagir a ameaças imediatas, não para perceber os grandes sistemas que moldam nossa vida. Por isso, decisões simplistas geram soluções de curto prazo e problemas piores depois.',
      },
    ],
    chapters: [
      {
        title: '1. A anatomia da atenção',
        body: "Goleman abre com o detetive John Berger, cuja vigilância exemplifica a atenção em ação. Descreve as variedades do foco — atenção seletiva, alerta, orientação e mente vagando — e mostra que aprender depende de foco sustentado: sem ele não há memória nem compreensão. A atenção é comparada a um músculo que se fortalece com o uso. Em paralelo, denuncia o custo da distração digital contínua: telas capturam o olhar, reduzem a conversa face a face e empobrecem o 'momento humano', enfraquecendo o que nos conecta uns aos outros.",
      },
      {
        title: '2. Foco interno: autoconsciência e autocontrole',
        body: 'O foco voltado para dentro permite reconhecer emoções, intuições e valores, funcionando como uma bússola interna. Goleman recorre ao experimento do marshmallow, ao efeito da ansiedade sobre a memória de trabalho e à noção freudiana de ego para mostrar que perceber o próprio estado mental é o que permite regular impulsos. A meta-percepção — notar a atenção em si mesma — mantém a mente no estado ideal para a tarefa. Sem autoconsciência, os talentos não se manifestam; com ela, ganhamos pontos de decisão entre o impulso e a ação.',
      },
      {
        title: '3. Foco no outro: a tríade da empatia',
        body: "Goleman distingue três formas de empatia: cognitiva, que lê o ponto de vista alheio; emocional, que ressoa com os sentimentos do outro; e a preocupação empática, que mobiliza para ajudar. Casos como o de Katrina, a 'sensível social', e o trabalho de Justine Cassell com gestos mostram que ler sinais sutis é uma habilidade poderosa, mas arriscada sem controle. A empatia foi moldada para o contato face a face e, por isso, o trabalho online a desafia. Ela é também a base das competências de liderança, como escuta e influência.",
      },
      {
        title: '4. Foco externo, sistemas e liderança',
        body: "A última parte trata do olhar para o todo. Pelos olhos do navegador Mau Piailug e das análises de big data, Goleman mostra que os sistemas são invisíveis a olho nu, mas decisivos, e que sofremos de 'cegueira sistêmica': tomamos soluções de curto prazo que pioram o problema, como construir mais estradas e gerar mais trânsito. Ele define o líder bem focado pela capacidade de equilibrar os três focos — interno, no outro e externo — escolhendo o certo no momento certo, e argumenta que essa tríade é o verdadeiro motor oculto da excelência.",
      },
    ],
    quotes: [
      {
        text: 'Seu foco é a sua realidade.',
        chapterPosition: 1,
      },
      {
        text: 'A atenção funciona como um músculo: usada mal, definha; trabalhada bem, cresce.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'principios',
    title: 'Princípios',
    author: 'Ray Dalio',
    category: 'lideranca-negocios',
    color: '#262e42',
    tagline:
      'Princípios que transformam dor e verdade radical em decisões melhores e evolução contínua.',
    description:
      'Ray Dalio, fundador da Bridgewater Associates, reúne os princípios de vida e de trabalho que aprendeu ao longo de décadas de erros e reflexão. O livro mostra como encarar a realidade, usar a dor como sinal para evoluir e construir uma meritocracia de ideias baseada em verdade radical, transparência radical e decisões ponderadas por credibilidade.',
    insights: [
      {
        title: 'Dor + reflexão = progresso',
        body: 'A dor é um sinal de que algo precisa ser resolvido; em vez de evitá-la, reflita sobre ela para aprender rápido. Enfrentar as realidades dolorosas causadas por problemas, erros e fraquezas é o caminho para evoluir.',
      },
      {
        title: 'Verdade radical e transparência radical',
        body: 'Uma cultura em que as pessoas podem dizer o que realmente pensam e trazer problemas à tona abertamente gera trabalho e relações significativas. Erros são aceitáveis; não aprender com eles, não.',
      },
      {
        title: 'Decisões ponderadas por credibilidade',
        body: 'Nem autocracia nem democracia simples: as melhores decisões vêm de uma meritocracia de ideias que pesa mais a opinião de quem tem histórico comprovado e sabe explicar logicamente as relações de causa e efeito.',
      },
      {
        title: 'A organização é uma máquina de cultura e pessoas',
        body: 'Olhe de cima para a sua máquina, compare os resultados com as metas e ajuste pessoas e projetos. Diagnosticar causas-raiz e usar o processo de cinco passos converte problemas em progresso contínuo.',
      },
    ],
    chapters: [
      {
        title: '1. Encare a realidade e evolua com a dor',
        body: 'Para Dalio, a realidade foi feita para otimizar o todo, não a você, e compreender isso ajuda a lidar melhor com o que parece ruim. A dor tem propósito: ela alerta e orienta. Se você desenvolver a reação reflexa de refletir sobre a dor em vez de evitá-la, aprende e evolui rapidamente. Não falhar significa não estar empurrando seus limites. A evolução, e não as recompensas em si, é a maior realização e a maior recompensa da vida. O importante é falhar, aprender e melhorar depressa.',
      },
      {
        title: '2. Os princípios de vida e o processo de cinco passos',
        body: 'O processo de cinco passos é: ter metas claras; identificar e não tolerar os problemas que impedem alcançá-las; diagnosticar com precisão as causas-raiz; desenhar planos para contorná-las; e executar até obter resultados. Ninguém domina todas as etapas, então humildade e mente radicalmente aberta são essenciais. Em vez de se apegar a opiniões fechadas, a pessoa eficaz olha para si mesma de um nível mais alto, encara a verdade sem rodeios e busca ajuda de quem enxerga o que ela não vê.',
      },
      {
        title: '3. Cultura de verdade radical e transparência radical',
        body: 'No trabalho, Dalio construiu na Bridgewater uma meritocracia de ideias que busca trabalho significativo e relações significativas por meio da verdade radical e da transparência radical. Grandes culturas trazem problemas e discordâncias à superfície e os resolvem bem. É aceitável errar, mas inaceitável não aprender com o erro. O amor duro combina cuidado genuíno com padrões elevados: quanto mais as pessoas se importam, mais duras podem ser umas com as outras, e melhor o desempenho coletivo. Assim, os pontos baixos ficam menos baixos e os altos mais altos.',
      },
      {
        title: '4. Decidir por credibilidade e operar a máquina',
        body: 'As decisões devem ser ponderadas por credibilidade: as opiniões mais confiáveis vêm de quem repetidamente realizou aquilo com sucesso e sabe explicar logicamente suas conclusões. A organização é uma máquina com duas partes, cultura e pessoas, e o gestor deve olhar de cima, comparar resultados com metas e ajustar projetos e pessoas. O processo de cinco passos transforma problemas em progresso, mas exige governança, equilíbrios e ninguém mais poderoso que o sistema. Sistemas de decisão baseados em princípios podem ser sistematizados e embutidos em ferramentas.',
      },
    ],
    quotes: [
      {
        text: 'A dor mais a reflexão é igual a progresso.',
        chapterPosition: 2,
      },
      {
        text: 'Trabalho significativo e relações significativas por meio da verdade radical e da transparência radical.',
        chapterPosition: 3,
      },
    ],
  },
  {
    slug: 'os-7-habitos',
    title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
    author: 'Stephen R. Covey',
    category: 'lideranca-negocios',
    color: '#0b513d',
    tagline:
      'Um clássico sobre caráter, proatividade e interdependência que transforma hábitos em princípios.',
    description:
      'Stephen R. Covey apresenta sete hábitos que conduzem da dependência à independência e, depois, à interdependência efetiva. O livro defende que a mudança verdadeira vem de dentro para fora, do caráter e dos princípios, e não de técnicas de personalidade. Da proatividade à sinergia e à renovação, cada hábito prepara o seguinte numa espiral de crescimento contínuo.',
    insights: [
      {
        title: 'Paradigmas antes de técnicas',
        body: 'Mudanças superficiais de comportamento não resolvem problemas profundos; é preciso examinar os mapas mentais que os originam. A eficácia verdadeira nasce do caráter e de princípios, não da imagem ou da técnica.',
      },
      {
        title: 'Entre o estímulo e a resposta',
        body: 'Ser proativo é assumir que escolhemos nossa resposta às circunstâncias. Concentrar esforço no Círculo de Influência, e não no de Preocupação, amplia aos poucos o poder de mudar o que importa.',
      },
      {
        title: 'Confiança se deposita',
        body: 'A Conta Bancária Emocional mede a confiança de cada relação. Compreender o outro, cumprir promessas e cuidar dos pequenos gestos são depósitos que sustentam o ganha-ganha e a sinergia.',
      },
      {
        title: 'Eficácia é equilíbrio P/CP',
        body: 'Produzir resultados (P) sem preservar a capacidade de produzi-los (CP) destrói a própria fonte dos resultados. O princípio vale para a saúde, os relacionamentos e as organizações.',
      },
    ],
    chapters: [
      {
        title: '1. Paradigmas, princípios e ser proativo',
        body: 'O livro parte de uma mudança de paradigma: em vez de técnicas de personalidade, a eficácia nasce do caráter e de princípios. Paradigmas são mapas mentais que orientam atitudes e comportamentos, e mudar de dentro para fora é a base de qualquer transformação duradoura. O primeiro hábito, ser proativo, sustenta que entre o estímulo e a resposta existe um espaço, e nele reside a liberdade de escolher. Pessoas proativas concentram energia no Círculo de Influência, ampliando-o, em vez de reagir ao Círculo de Preocupação. Assumem a responsabilidade pela própria vida e distinguem problemas de controle direto, indireto e sem controle.',
      },
      {
        title: '2. Começar com o fim em mente e pôr primeiro o mais importante',
        body: 'O segundo hábito, começar com o fim em mente, baseia-se na ideia de que tudo é criado duas vezes: primeiro mentalmente, depois fisicamente. Ele exige liderança pessoal, clareza de destino e uma declaração de missão que oriente as decisões. Liderança é fazer as coisas certas; gestão é fazê-las bem. O terceiro hábito, pôr primeiro o mais importante, é a gestão pessoal que executa essa visão: organizar e agir segundo prioridades, subordinando o urgente ao importante. Covey usa a matriz do tempo para mostrar que as atividades do Quadrante II — importantes e não urgentes — constroem planejamento, relacionamentos e renovação, a verdadeira produtividade de longo prazo.',
      },
      {
        title: '3. A vitória pública: ganha-ganha, compreender e sinergizar',
        body: 'A vitória pública exige interdependência e começa pela confiança depositada na Conta Bancária Emocional: compreensão, compromissos cumpridos e pequenos gestos constroem reservas relacionais. O quarto hábito, pensar ganha-ganha, busca benefício mútuo e apoia-se na mentalidade de abundância, na integridade e no equilíbrio entre coragem e consideração; quando não há acordo possível, existe a opção de não fazer negócio. O quinto hábito, buscar primeiro compreender e depois ser compreendido, valoriza a escuta empática antes de prescrever. O sexto hábito, sinergizar, valoriza as diferenças e busca a Terceira Alternativa: a cooperação criativa em que o todo supera a soma das partes.',
      },
      {
        title: '4. Renovação: afinar a serra',
        body: 'O sétimo hábito, afinar a serra, é a renovação equilibrada das quatro dimensões da natureza humana: física, espiritual, mental e socioemocional. Exercício, reflexão, estudo e relações saudáveis mantêm afiada a ferramenta que produz todos os resultados. Covey recomenda a Vitória Privada Diária — ao menos uma hora por dia cuidando de corpo, mente e espírito — como base da segurança interior e dos hábitos anteriores. Essa renovação constante cria uma espiral ascendente de crescimento: aprender, comprometer-se e agir em planos cada vez mais elevados. O princípio do Equilíbrio P/CP lembra que eficácia real é produzir resultados preservando a capacidade de produzi-los.',
      },
    ],
    quotes: [
      {
        text: 'Entre o estímulo e a resposta há um espaço; nossa liberdade e crescimento dependem de como o usamos.',
        chapterPosition: 1,
      },
      {
        text: 'Todas as coisas são criadas duas vezes: existe uma criação mental e uma criação física.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'good-to-great',
    title: 'Good to Great',
    author: 'Jim Collins',
    category: 'lideranca-negocios',
    color: '#904d00',
    tagline:
      'Como empresas boas se tornam grandes — e por que poucas dão o salto de forma duradoura.',
    description:
      'Baseado em cinco anos de pesquisa que compararam onze empresas que fizeram a travessia de bons a grandes resultados com outras que não conseguiram, Good to Great, de Jim Collins, identifica os princípios que distinguem a transformação duradoura. O livro mostra que a grandeza não é função das circunstâncias, mas de escolha consciente: liderança Nível 5, as pessoas certas antes da estratégia, o confronto dos fatos brutais, o Conceito Ouriço e a disciplina do volante.',
    insights: [
      {
        title: 'Liderança Nível 5',
        body: 'Os líderes de todas as empresas que fizeram a travessia combinam humildade pessoal com vontade profissional feroz. Olham pela janela para dar crédito pelos êxitos e no espelho para assumir a responsabilidade pelos fracassos.',
      },
      {
        title: 'Primeiro quem, depois o quê',
        body: 'Antes de definir visão e estratégia, coloque as pessoas certas no ônibus, tire as erradas e acomode as certas nos assentos certos. Não são as pessoas o ativo mais importante, mas sim as pessoas certas.',
      },
      {
        title: 'Paradoxo de Stockdale',
        body: 'É preciso manter fé inabalável de que se vai prevalecer no fim e, ao mesmo tempo, ter a disciplina de encarar os fatos mais brutais da realidade presente.',
      },
      {
        title: 'Conceito Ouriço e o volante',
        body: 'A grandeza nasce da intersecção de três círculos — ser o melhor do mundo, motor econômico e paixão — e do esforço constante que gira o volante, não de um golpe único ou de revoluções dramáticas.',
      },
    ],
    chapters: [
      {
        title: '1. Liderança Nível 5',
        body: 'O primeiro achado do estudo foi também o mais surpreendente: todas as empresas que fizeram a travessia tinham, no comando, líderes de Nível 5. São pessoas discretas, reservadas e até tímidas, que reúnem humildade pessoal e uma vontade profissional feroz. Não buscam fama nem aplausos; sua ambição é primeiro para a instituição, não para si mesmas. Quando as coisas dão certo, olham pela janela e atribuem o mérito a outros e à sorte; quando dão errado, olham no espelho e assumem a responsabilidade. Preparam sucessores para que a empresa se torne ainda maior na geração seguinte.',
      },
      {
        title: '2. Primeiro quem, depois o quê',
        body: 'A expectativa inicial era que os líderes começassem definindo visão e estratégia. O estudo mostrou o contrário: eles primeiro colocaram as pessoas certas no ônibus, tiraram as erradas e acomodaram as certas nos assentos certos — só então decidiram para onde dirigir. Pessoas não são o ativo mais importante; as pessoas certas são. Com os profissionais adequados, motivação, alinhamento e comprometimento praticamente deixam de ser problema, e a remuneração perde importância como motor de desempenho. A disciplina nas decisões sobre gente, sobretudo no topo, vem antes de qualquer decisão sobre o que fazer.',
      },
      {
        title: '3. Confrontar os fatos brutais: o Paradoxo de Stockdale',
        body: 'Grandes empresas encaram a realidade sem perder a fé. Collins chama isso de Paradoxo de Stockdale, inspirado no almirante James Stockdale, prisioneiro de guerra no Vietnã. Os otimistas que esperavam sair a cada Natal morreram de coração partido; Stockdale sobreviveu porque mantinha fé inabalável de que venceria no fim e, ao mesmo tempo, disciplina para confrontar os fatos mais brutais do presente. As empresas que deram o salto criaram um clima em que a verdade é ouvida e usaram mecanismos que transformam informação em ação, sem nunca confundir fé no futuro com negação da realidade atual.',
      },
      {
        title: '4. O Conceito Ouriço e o volante',
        body: 'O Conceito Ouriço nasce da intersecção de três círculos: aquilo em que você pode ser o melhor do mundo, o que alimenta seu motor econômico e o que desperta sua paixão. É simples, e não uma meta nem bravata, mas compreensão profunda. A travessia tampouco é um golpe único: é empurrar sem parar um pesado volante, volta após volta, acumulando momento até o ponto de ruptura. Quem busca revoluções, reestruturações dramáticas e crescimento a qualquer preço cai no Ciclo da Ruína — resultados decepcionantes, reação, novo programa e recomeço. Disciplina, tecnologia como acelerador e consistência fanática sustentam o volante.',
      },
    ],
    quotes: [
      {
        text: 'Os líderes Nível 5 são um estudo em dualidade: modestos e determinados, humildes e destemidos.',
        chapterPosition: 1,
      },
      {
        text: 'Nunca confunda a fé de que vai prevalecer no fim com a disciplina de confrontar os fatos brutais da realidade.',
        chapterPosition: 3,
      },
    ],
  },
  {
    slug: 'rapido-e-devagar',
    title: 'Rápido e Devagar',
    author: 'Daniel Kahneman',
    category: 'psicologia-mente',
    color: '#3c4459',
    tagline:
      'Duas formas de pensar: a intuição rápida e a razão lenta, e os vieses que guiam nossas escolhas.',
    description:
      'Daniel Kahneman, Nobel de Economia, mostra como a mente opera por dois sistemas: um intuitivo e veloz, outro deliberado e lento. A partir de décadas de pesquisa com Amos Tversky, ele revela as heurísticas e os vieses — ancoragem, disponibilidade, aversão à perda — que distorcem nossos julgamentos. O livro é um guia para reconhecer os erros previsíveis do pensamento.',
    insights: [
      {
        title: 'Dois sistemas, uma mente',
        body: 'O Sistema 1 é rápido, automático e intuitivo; o Sistema 2 é lento, deliberado e preguiçoso. Boa parte do que julgamos e decidimos nasce da intuição e só depois é racionalizada.',
      },
      {
        title: 'Respondemos à pergunta errada',
        body: 'Diante de um problema difícil, o Sistema 1 o substitui por uma versão fácil: julgamos pela semelhança, pela lembrança disponível e pelo que está diante dos olhos (WYSIATI), gerando vieses previsíveis.',
      },
      {
        title: 'Âncoras distorcem números',
        body: 'Qualquer número presente, mesmo aleatório, puxa estimativas e negociações. O ajuste a partir dele é insuficiente e ocorre sem que percebamos a influência, tornando a ancoragem um dos efeitos mais robustos da psicologia.',
      },
      {
        title: 'Perdas doem o dobro',
        body: 'Na teoria da perspectiva, avaliamos ganhos e perdas em relação a um ponto de referência, e a aversão à perda faz o prejuízo pesar cerca de duas vezes mais que o ganho. Isso explica o efeito dotação e escolhas de risco invertidas.',
      },
    ],
    chapters: [
      {
        title: '1. Os dois sistemas',
        body: 'Kahneman propõe dois sistemas que operam em paralelo. O Sistema 1 é rápido, automático, intuitivo e sempre ativo: gera impressões, sentimentos e respostas prontas com pouco ou nenhum esforço, como reconhecer um rosto ou completar uma frase familiar. O Sistema 2 é lento, deliberado e esforçado; assume o controle quando algo surpreende ou exige cálculo, mas é preguiçoso e costuma endossar as sugestões do Sistema 1 sem checá-las. Grande parte dos vieses surge dessa divisão: o Sistema 1 constrói histórias coerentes com a informação disponível, e o Sistema 2 raramente as questiona.',
      },
      {
        title: '2. Heurísticas e vieses',
        body: 'Diante de perguntas difíceis, o Sistema 1 responde uma pergunta mais fácil — a substituição heurística. Julgamos probabilidades pela representatividade, a semelhança com um estereótipo, como no caso de Steve, o bibliotecário, e frequências pela disponibilidade, a facilidade com que exemplos vêm à mente. Duas regras explicam muitos erros: WYSIATI, que só conta o que está diante de nós, e a lei dos pequenos números, que trata amostras pequenas como se fossem confiáveis. Assim, estatística, causalidade e intuição entram em conflito, e o acaso é lido como sinal.',
      },
      {
        title: '3. Ancoragem e excesso de confiança',
        body: 'Um número qualquer, mesmo aleatório, ancora nossas estimativas, porque o ajuste a partir dele é insuficiente. Kahneman distingue duas causas: o ajuste deliberado do Sistema 2 e a sugestão automática do Sistema 1. Juízes influenciados por um dado e corretores por um preço de lista mostram que âncoras funcionam mesmo quando as conhecemos. A isso somam-se o excesso de confiança, a ilusão de validade e o viés de retrospectiva: construímos narrativas coerentes com o pouco que sabemos, acreditamos entendê-las e subestimamos o papel do acaso. Previsões de especialistas raramente superam fórmulas simples.',
      },
      {
        title: '4. Escolhas e os dois eus',
        body: 'Contra a teoria da utilidade, a teoria da perspectiva descreve como escolhemos: avaliamos ganhos e perdas em relação a um ponto de referência, e a aversão à perda faz uma perda pesar cerca de duas vezes mais que um ganho equivalente. O valor é uma curva em S, côncava para ganhos e convexa para perdas. Daí o efeito dotação e o padrão quádruplo entre risco e certeza. Por fim, Kahneman separa dois eus: o experiencial, que vive o presente, e o memorizador, que conta histórias, ignora a duração e decide — ditando o que escolhemos repetir.',
      },
    ],
    quotes: [
      {
        text: 'A intuição não é nada mais nem nada menos que reconhecimento.',
        chapterPosition: 1,
      },
      {
        text: 'Nada na vida é tão importante quanto você pensa que é enquanto está pensando nisso.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'inteligencia-emocional',
    title: 'Inteligência Emocional',
    author: 'Daniel Goleman',
    category: 'psicologia-mente',
    color: '#0b513d',
    tagline:
      'Por que a inteligência emocional pode importar mais que o QI — e como desenvolvê-la.',
    description:
      'Daniel Goleman mostra que o sucesso na vida não depende apenas do QI, mas de um conjunto de capacidades emocionais que podem ser aprendidas. A partir da neurociência da amígdala, ele explica o sequestro emocional e descreve cinco domínios: autoconhecimento, autorregulação, motivação, empatia e habilidades sociais. O livro defende que a alfabetização emocional seja ensinada em casa e na escola.',
    insights: [
      {
        title: 'O sequestro emocional',
        body: 'Diante de uma ameaça, a amígdala dispara reações por uma via neural que contorna o neocórtex, tomando o controle antes que a razão avalie a situação. Esse mecanismo herdado da evolução foi vital à sobrevivência, mas hoje produz explosões desproporcionais.',
      },
      {
        title: 'QE e QI são independentes',
        body: 'Inteligência racional e inteligência emocional são competências separadas: pessoas de QI alto podem fracassar na vida, enquanto outras de QI modesto prosperam. Goleman chama a inteligência emocional de meta-abilidade, pois determina quão bem usamos todo o resto do nosso potencial.',
      },
      {
        title: 'Os cinco domínios',
        body: 'A inteligência emocional se organiza em conhecer as próprias emoções, administrá-las, motivar-se, reconhecer sentimentos nos outros e lidar com relacionamentos. O autoconhecimento é a base: sem perceber o que sentimos, ficamos à mercê dos impulsos.',
      },
      {
        title: 'Temperamento não é destino',
        body: 'Herdamos limiares emocionais, mas o cérebro é plástico e a experiência esculpe seus circuitos ao longo da infância. Competências como autocontrole, empatia e otimismo podem ser ensinadas, tornando a alfabetização emocional uma forma de prevenção.',
      },
    ],
    chapters: [
      {
        title: '1. O cérebro emocional e o sequestro emocional',
        body: 'Goleman parte da arquitetura do cérebro para explicar o sequestro emocional: diante de uma ameaça, sinais sensoriais chegam à amígdala por uma via rápida que contorna o neocórtex, disparando reações antes que a razão as avalie. Esse sistema herdado da evolução foi útil à sobrevivência, mas hoje produz explosões desproporcionais. O autor contrasta duas mentes — a racional e a emocional — e mostra que o QI, sozinho, não prevê o sucesso na vida. Pessoas de QI alto podem fracassar, enquanto outras, de QI modesto, prosperam graças a autoconhecimento, autocontrole e persistência.',
      },
      {
        title: '2. A natureza da inteligência emocional',
        body: 'Goleman apresenta a inteligência emocional como um conjunto de cinco domínios: conhecer as próprias emoções, administrá-las, motivar-se, reconhecer emoções nos outros e lidar com relacionamentos. O autoconhecimento é a base de tudo; sem perceber o que sente, a pessoa fica à mercê dos impulsos. A autorregulação permite acalmar-se e adiar gratificações; a empatia nasce da abertura aos próprios sentimentos e sustenta a compaixão e o altruísmo. As habilidades sociais — expressar, influenciar e resolver conflitos — coroam essas competências. Diferente do QI, essas capacidades são relativamente independentes e podem ser aprendidas.',
      },
      {
        title: '3. Aplicações, temperamento e janelas de oportunidade',
        body: 'O autor mostra onde a inteligência emocional faz diferença: nos relacionamentos íntimos, no trabalho e na saúde. Emoções tóxicas adoecem tanto quanto o cigarro, enquanto o equilíbrio emocional protege o corpo. Goleman também aborda o temperamento: herdamos limiares emocionais, mas o cérebro é plástico e a experiência esculpe seus circuitos. Crianças tímidas podem tornar-se mais confiantes com o apoio adequado, e até traumas podem ser reaprendidos pela psicoterapia. Assim, a infância e a adolescência são janelas decisivas para formar hábitos emocionais duradouros.',
      },
      {
        title: '4. Alfabetização emocional',
        body: 'A parte final trata do custo da analfabetização emocional — depressão, violência, transtornos alimentares e abuso de drogas — e da resposta possível: ensinar emoções na escola. Goleman descreve programas que trabalham autopercepção, controle de impulsos, empatia e resolução de conflitos, integrados ao currículo comum e estendidos à família e à comunidade. Lições como o "semáforo" (pare, pense, aja) ajudam a criança a lidar com a raiva antes que ela exploda. O autor defende que preparar os jovens para a vida exige unir mente e coração na educação.',
      },
    ],
    quotes: [
      {
        text: 'O sistema emocional pode agir independentemente do neocórtex; reações e memórias emocionais podem se formar sem qualquer participação consciente.',
        chapterPosition: 1,
      },
      {
        text: 'O problema não está na emocionalidade, mas na adequação da emoção e de sua expressão.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'psicologia-financeira',
    title: 'Psicologia Financeira',
    author: 'Morgan Housel',
    category: 'financas-riqueza',
    color: '#0b513d',
    tagline:
      'Fazer bem com dinheiro depende menos de inteligência e mais de comportamento.',
    description:
      'Morgan Housel argumenta que o sucesso financeiro tem pouco a ver com conhecimento técnico e muito com comportamento. A partir de histórias como o zelador Ronald Read e o executivo falido Richard Fuscone, ele mostra como sorte, risco, paciência e controle das emoções explicam por que pessoas igualmente inteligentes terminam em lugares opostos. No fim, o dinheiro é uma aula de psicologia.',
    insights: [
      {
        title: 'Ninguém é louco',
        body: 'Decisões financeiras que parecem absurdas fazem sentido à luz da vida que cada um viveu. Nossa experiência pessoal é uma fração mínima do que acontece no mundo, mas domina como acreditamos que ele funciona; por isso pessoas igualmente inteligentes discordam sobre risco, poupança e investimento.',
      },
      {
        title: 'Sorte e risco são sósias',
        body: 'Todo resultado mistura esforço e forças fora do controle, e quase nunca é tão bom ou tão ruim quanto parece. Julgar casos extremos ensina pouco: é mais útil observar padrões amplos de sucesso e fracasso, e ser generoso ao avaliar os outros e a si mesmo.',
      },
      {
        title: 'O juro composto exige tempo',
        body: 'O cérebro pensa de forma linear e subestima o crescimento exponencial. Buffett começou a investir aos dez anos e boa parte de sua fortuna veio depois dos 65, o que mostra por que sobreviver sem interromper o processo importa mais que acertar em cheio.',
      },
      {
        title: 'Liberdade é o maior dividendo',
        body: 'O maior valor do dinheiro é controlar o próprio tempo, poder recusar um emprego ruim ou parar quando quiser. Para proteger essa liberdade, Housel recomenda margem de segurança: assuma retornos menores, mantenha reservas e tolere uma ampla gama de resultados.',
      },
    ],
    chapters: [
      {
        title: '1. Ninguém é louco, e a sorte embaralha tudo',
        body: 'Pessoas tomam decisões financeiras que parecem absurdas, mas fazem sentido dentro da vida que viveram. Quem cresceu na pobreza, na inflação alta ou na Grande Depressão enxerga risco e recompensa de forma diferente. Nossa experiência pessoal é uma fração mínima do que acontece no mundo, mas domina como achamos que ele funciona. Housel chama isso de ninguém é louco. Ao julgar os outros, porém, esquecemos o outro lado: sorte e risco. Todo resultado mistura esforço e forças fora do controle, e a linha entre ousado e imprudente é milimétrica. Estude padrões amplos, não bilionários extremos.',
      },
      {
        title: '2. Nunca é o suficiente, e riqueza é o que não se vê',
        body: 'Joseph Heller disse que tinha algo que um financista jamais teria: o suficiente. Essa palavra é decisiva, porque sem um teto a busca por mais dinheiro vira uma corrida infinita. Rajat Gupta e Bernie Madoff já tinham milhões e arriscaram tudo por mais, perdendo reputação e liberdade. A lição não é criminal, é cotidiana: o teto da comparação social é alto demais para se vencer. Housel mostra ainda que riqueza é o que não se vê. Carros e casas revelam gastos, não patrimônio. Ser rico é renda; ser rico de verdade é dinheiro não gasto, que compra opções e liberdade no futuro.',
      },
      {
        title: '3. Os juros compostos e a arte de sobreviver',
        body: 'O juro composto é a força mais poderosa e menos intuitiva das finanças. Nosso cérebro pensa de forma linear, então subestimamos como pequenas quantias crescem por décadas. Warren Buffett não é só um grande investidor: começou aos dez anos e nunca parou. A maior parte de sua fortuna veio depois dos 65. Isso explica por que ficar rico e permanecer rico são habilidades diferentes. Enriquecer exige risco e otimismo; manter exige humildade, frugalidade e sobrevivência. No mercado, alguns poucos acertos extraordinários carregam o resultado de todo o resto. Por isso nunca interromper o processo é mais importante que acertar em cheio.',
      },
      {
        title: '4. Liberdade, margem de segurança e o comportamento',
        body: 'O maior dividendo que o dinheiro paga é a liberdade: a capacidade de fazer o que se quer, quando se quer, com quem se quer. Um pequeno patrimônio já permite recusar um emprego ruim, atravessar uma doença ou escolher quando parar de trabalhar. Isso importa mais que qualquer bem de luxo, porque controlar o próprio tempo é uma das maiores fontes de felicidade. Para sustentar essa liberdade, Housel recomenda margem de segurança: assuma retornos menores, mantenha reservas e tolere uma ampla gama de resultados. Sobreviver é a prioridade. O dinheiro também muda o comportamento, na multidão e em cada um, e reconhecer isso é o começo da sabedoria financeira.',
      },
    ],
    quotes: [
      {
        text: 'Nada é tão bom nem tão ruim quanto parece.',
        chapterPosition: 1,
      },
      {
        text: 'Sim, mas tenho algo que ele nunca terá: o suficiente.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'pai-rico-pai-pobre',
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert T. Kiyosaki',
    category: 'financas-riqueza',
    color: '#904d00',
    tagline:
      'Não importa quanto você ganha, mas quanto guarda: faça seu dinheiro trabalhar e compre ativos.',
    description:
      'Robert Kiyosaki contrasta os conselhos de seus dois pais, um pobre e altamente instruído e outro rico e sem diploma, para mostrar por que trabalhar duro por dinheiro mantém a maioria presa na chamada corrida dos ratos. O livro ensina a ler números e separar ativos de passivos, construir uma coluna de ativos que gera renda e desenvolver inteligência financeira para que o dinheiro trabalhe pelo dono. Get rich rápido não é o ponto: é saber guardar, investir e transformar conhecimento em liberdade.',
    insights: [
      {
        title: 'Ativos colocam dinheiro no seu bolso',
        body: 'Regra número um: saber a diferença entre ativo e passivo. Ativo gera dinheiro para você; passivo consome. Pobres e classe média acumulam passivos pensando que são ativos, começando pela própria casa, e por isso vivem apertados.',
      },
      {
        title: 'Faça o dinheiro trabalhar para você',
        body: 'A vida de muitos é ditada por duas emoções, medo e desejo: levantam, trabalham, pagam contas e repetem, presos na corrida dos ratos. O rico constrói ativos que rendem mesmo quando ele não está trabalhando, em vez de trocar o tempo por um salário.',
      },
      {
        title: 'Educação financeira é o alicerce',
        body: 'Não importa quanto você ganha, e sim quanto mantém e por quantas gerações. A escola não ensina sobre dinheiro; quem aprende a ler demonstrativos financeiros identifica oportunidades e riscos que a maioria não enxerga, e o dinheiro sem inteligência financeira logo desaparece.',
      },
      {
        title: 'Mente, riscos e os quatro quadrantes',
        body: 'Pobres, classe média e ricos diferem sobretudo na forma de pensar e assumir riscos calculados, não pela renda. Na prática, pessoas se dividem nos quadrantes E (empregado), S (autônomo), B (dono de negócio) e I (investidor); migrar para o lado B/I exige aprender a vender, liderar e investir.',
      },
    ],
    chapters: [
      {
        title: '1. Os dois pais: os ricos não trabalham por dinheiro',
        body: 'Kiyosaki apresenta seus dois pais: o biológico, professor com doutorado e sempre endividado, e o pai de seu amigo Mike, que abandonou a oitava série e virou um dos homens mais ricos do Havaí. Compara os conselhos opostos sobre dinheiro e mostra como o medo e o desejo mantêm as pessoas na corrida dos ratos. A lição central, vivida quando ele trabalhava de graça na loja do pai rico, é parar de trabalhar por dinheiro e aprender a fazer o dinheiro trabalhar, como fizeram ao abrir uma biblioteca de gibis que rendia mesmo sem a presença deles.',
      },
      {
        title: '2. Educação financeira: ativos e passivos',
        body: 'A segunda lição é a mais importante: ativo é o que coloca dinheiro no seu bolso; passivo é o que tira. Kiyosaki mostra que pobres e classe média compram passivos acreditando serem ativos, e que a casa própria, tratada como maior investimento, costuma sugar recursos em vez de gerar renda. Ele apresenta os diagramas de fluxo de caixa, a diferença entre demonstrativo de resultados e balanço, e sua definição de riqueza como o fluxo vindo dos ativos comparado às despesas. Quem domina essa distinção compra ativos pelo resto da vida.',
      },
      {
        title: '3. Cuide do seu próprio negócio, impostos e corporações',
        body: 'Manter o emprego, mas construir a própria coluna de ativos é o conselho central da terceira lição. O rico foca nos ativos, enquanto todos os outros focam no contracheque. Kiyosaki explica por que compra luxos por último, deixando que a renda dos ativos pague por carros e conforto. Também aborda a história dos impostos e o poder das corporações: enquanto o empregado ganha, é tributado e gasta o que sobra, o dono de negócio ganha, gasta e só então é tributado, usando estruturas legais para proteger patrimônio e investir mais. Conhecimento contábil e jurídico vira vantagem.',
      },
      {
        title: '4. A mente cria dinheiro e os quatro quadrantes',
        body: 'A lição final mostra que o maior ativo é a mente treinada: dinheiro é, em grande parte, acordo e informação, e a inteligência financeira nada mais é do que ter mais opções diante de cada oportunidade. Kiyosaki conta negócios que criou comprando imóveis baratos na crise e revendendo, e defende que risco cai conforme o conhecimento sobe. O livro encerra com os obstáculos do caminho, o poder da disciplina de pagar-se primeiro e o convite a aprender a vender, liderar e investir, começando pequeno. No material complementar, ele apresenta os quadrantes E, S, B e I.',
      },
    ],
    quotes: [
      {
        text: 'O pobre e a classe média trabalham por dinheiro. Os ricos fazem dinheiro.',
        chapterPosition: 1,
      },
      {
        text: 'Um ativo coloca dinheiro no meu bolso. Um passivo tira dinheiro do meu bolso.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'o-homem-mais-rico-da-babilonia',
    title: 'O Homem Mais Rico da Babilônia',
    author: 'George S. Clason',
    category: 'financas-riqueza',
    color: '#064e3b',
    tagline:
      'As parábolas da Babilônia que ensinam a ganhar, guardar e multiplicar o dinheiro.',
    description:
      'Clássico atemporal da educação financeira, este livro reúne parábolas ambientadas na antiga Babilônia para revelar princípios simples e universais sobre o dinheiro. Por meio de Arkad, o homem mais rico da cidade, o leitor aprende a guardar um décimo dos ganhos, controlar as despesas, investir com segurança e pagar as dívidas. Uma obra curta e prática sobre disciplina financeira, escrita por George S. Clason.',
    insights: [
      {
        title: 'Pague-se primeiro',
        body: 'De cada dez moedas que ganhar, guarde ao menos uma antes de qualquer gasto. Essa reserva sistemática é o ponto de partida de toda fortuna e protege você e sua família no futuro.',
      },
      {
        title: 'Controle os gastos',
        body: 'Necessidades e desejos não são a mesma coisa: os desejos crescem sempre que lhes damos espaço. Faça um orçamento das despesas essenciais e viva com nove décimos dos seus ganhos.',
      },
      {
        title: 'Faça o ouro multiplicar',
        body: 'Dinheiro parado apenas agrada a alma avarenta; o que constrói riqueza é colocá-lo para trabalhar. Os rendimentos reinvestidos, ano após ano, acabam valendo mais do que o próprio trabalho que os gerou.',
      },
      {
        title: 'Proteja o principal e amplie sua capacidade',
        body: 'Invista apenas onde o capital esteja seguro e busque conselhos de quem entende do assunto, fugindo de lucros rápidos e milagrosos. Ao mesmo tempo, estude e aperfeiçoe seu ofício, pois ganhar mais vale tanto quanto poupar melhor.',
      },
    ],
    chapters: [
      {
        title: '1. O homem que desejava ouro',
        body: 'Bansir, o fabricante de carruagens, e Kobbi, o músico, vivem na mais rica cidade do mundo, mas não têm um único siclo. Ao comparar sua pobreza com a opulência da Babilônia, Bansir percebe que passou a vida trabalhando e gastando tudo o que ganhava, sem jamais buscar ouro de propósito. Os dois decidem procurar Arkad, o homem mais rico da cidade, seu amigo de infância, para aprender como construir uma renda. A lição inicial é dura: sorte não sustenta ninguém — é preciso aprender e seguir as leis que governam a acumulação de riqueza.',
      },
      {
        title: '2. As sete soluções para a falta de dinheiro',
        body: 'Arkad ensina aos discípulos as sete soluções para a falta de dinheiro. A primeira manda guardar ao menos um décimo de tudo o que se ganha; a segunda, controlar os gastos com um orçamento, distinguindo necessidades de desejos. Depois vêm fazer o ouro multiplicar-se, proteger o capital investindo com segurança, ter o próprio lar, assegurar uma renda para a velhice e a família e, por fim, aumentar a própria capacidade de ganhar. A mensagem central é que a riqueza cresce de dentro para fora, pela disciplina constante e não por golpes de sorte.',
      },
      {
        title: '3. As cinco leis de ouro',
        body: 'Nomasir, filho de Arkad, recebe nove moedas de ouro, uma tabuinha com as cinco leis e a ordem de provar seu valor longe de casa. Herança sem sabedoria se perde: o jovem é enganado e fica sem nada, tornando-se escravo. Ao lembrar-se das leis gravadas, recupera a liberdade, prospera e volta rico. As leis ensinam que o ouro flui para quem poupa um décimo, multiplica-se para quem o investe, busca proteção de quem ouve conselhos experientes, foge de quem se arrisca no desconhecido e escapa de quem persegue lucros impossíveis.',
      },
      {
        title: '4. O plano de Dabasir',
        body: 'Dabasir, ex-escravo tornado negociante de camelos, grava seu plano em tabuinhas de argila. Ele decide viver com setenta por cento dos ganhos, destinar vinte por cento para pagar os credores e guardar dez por cento para si mesmo. Negocia com cada credor, vende camelos e cumpre os pagamentos com disciplina durante doze luas, até quitar toda a dívida. Anos depois, o professor Shrewsbury encontra as tabuinhas e aplica o mesmo método para escapar de dívidas impagáveis. A lição atravessa os séculos: é mais fácil e menos doloroso acertar as dívidas do que evitá-las, e o plano funciona para qualquer um que o siga.',
      },
    ],
    quotes: [
      {
        text: 'Nós nunca encontramos nenhuma quantidade de ouro. Nós nunca o procuramos.',
        chapterPosition: 1,
      },
      {
        text: 'Em cada dez moedas conseguidas, não gastem mais do que nove.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'o-investidor-inteligente',
    title: 'O Investidor Inteligente',
    author: 'Benjamin Graham',
    category: 'financas-riqueza',
    color: '#262e42',
    tagline:
      'Segurança antes do lucro: o método atemporal de Graham para investir com disciplina.',
    description:
      'O clássico de Benjamin Graham que separa investimento de especulação e ensina a pensar como dono de empresas, não como apostador. Baseado em análise minuciosa, margem de segurança e disciplina emocional, mostra como o investidor comum pode proteger seu capital e obter resultados sólidos sem prever o mercado.',
    insights: [
      {
        title: 'Margem de segurança',
        body: 'Compre sempre a um preço suficientemente abaixo do valor indicado, para que erros de cálculo ou azar não causem prejuízo. É o conceito central que torna desnecessária uma previsão precisa do futuro.',
      },
      {
        title: 'O Sr. Mercado é seu servo, não seu mestre',
        body: 'Trate o mercado como um sócio maníaco-depressivo que oferece preços ora ridiculamente altos, ora baixos. Você decide se negocia com ele; não é obrigado a aceitar seus humores.',
      },
      {
        title: 'Defensivo ou empreendedor',
        body: 'O investidor defensivo evita erros e busca simplicidade; o empreendedor dedica tempo e estudo a escolhas melhores que a média. Ambos são válidos, desde que você conheça seu próprio perfil e mantenha a disciplina.',
      },
      {
        title: 'Preço não é valor',
        body: 'Uma ação é participação em um negócio real, cujo valor não depende da cotação do dia. As maiores perdas vêm de comprar títulos de baixa qualidade em tempos favoráveis, quando a prosperidade passa por segurança.',
      },
    ],
    chapters: [
      {
        title: '1. Investir não é especular',
        body: 'Graham define investimento como uma operação que, após análise minuciosa, promete segurança do principal e um retorno adequado; tudo que não atende a esses requisitos é especulação. Ele distingue dois perfis: o investidor defensivo (ou passivo), que prioriza evitar erros graves e a liberdade de não tomar decisões frequentes, e o investidor empreendedor (ativo), disposto a dedicar tempo e estudo à seleção de títulos sólidos e mais atraentes que a média. O livro adverte que a inteligência exigida é mais uma questão de caráter do que de cérebro, e que o maior inimigo do investidor costuma ser ele mesmo.',
      },
      {
        title: '2. O Sr. Mercado e as flutuações',
        body: 'Graham propõe imaginar o mercado como um sócio imaginário chamado Sr. Mercado, que todos os dias oferece comprar ou vender sua participação a preços que oscilam entre o otimismo e o pânico. O investidor inteligente não é obrigado a agir: pode vender quando o preço é absurdamente alto e comprar quando é irracionalmente baixo. Preço e valor intrínseco são coisas distintas; o valor de uma ação decorre da empresa real, não da cotação momentânea. Em vez de tentar prever o mercado (timing), o investidor deve se concentrar em comprar quando o preço está claramente abaixo do valor justo.',
      },
      {
        title: '3. A estratégia do investidor defensivo',
        body: 'O investidor defensivo deve dividir os recursos entre títulos de alta qualidade e ações líderes, mantendo entre 25% e 75% em cada classe e, de preferência, a proporção 50-50, reajustada quando as oscilações desequilibram a carteira. Graham sugere regras: diversificação adequada (10 a 30 papéis), empresas grandes, proeminentes e conservadoramente financiadas, longo histórico de dividendos e preço moderado em relação ao lucro médio. Para quem não quer selecionar ações, recomenda fundos de índice e dollar-cost averaging — investir valores fixos em intervalos regulares, o que reduz o risco e impõe disciplina.',
      },
      {
        title: '4. A margem de segurança',
        body: 'O conceito central do livro é a margem de segurança: comprar a um preço suficientemente abaixo do valor indicado, de modo que erros de cálculo ou azar não causem prejuízo. Assim como um engenheiro projeta estruturas com folga, o investidor deve exigir um colchão entre preço pago e valor intrínseco. Essa margem torna desnecessária uma previsão precisa do futuro e se combina com a diversificação: cada título pode dar errado, mas, em um grupo amplo, os ganhos tendem a superar as perdas. É o critério que separa investimento de especulação e protege contra as perdas de compras ruins em tempos favoráveis.',
      },
    ],
    quotes: [
      {
        text: 'O investidor inteligente é um realista que vende aos otimistas e compra dos pessimistas.',
        chapterPosition: 2,
      },
      {
        text: 'A margem de segurança é sempre dependente do preço pago.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'comunicacao-nao-violenta',
    title: 'Comunicação Não-Violenta',
    author: 'Marshall B. Rosenberg',
    category: 'comunicacao',
    color: '#0b513d',
    tagline:
      'Um método em quatro passos para falar e ouvir com honestidade e empatia, sem julgamentos.',
    description:
      'Marshall B. Rosenberg apresenta a Comunicação Não-Violenta (CNV), uma abordagem que substitui julgamentos e exigências por observação, sentimento, necessidade e pedido. A partir de situações reais, o livro ensina a expressar-se com honestidade e a receber o outro com empatia, transformando conflitos em conexão. A ideia central é reconectar nossa linguagem às necessidades que estão na raiz de tudo o que sentimos.',
    insights: [
      {
        title: 'Observar sem avaliar',
        body: 'Para o outro não ouvir crítica, é preciso separar o que de fato vemos e ouvimos das avaliações que fazemos. A CNV não proíbe julgar, mas exige manter observação e avaliação distintas, ancoradas em tempo e contexto concretos.',
      },
      {
        title: 'Sentimentos apontam para necessidades',
        body: 'Emoções como mágoa, medo ou irritação nascem de necessidades atendidas ou não. Em vez de culpar, é mais direto nomear o sentimento e a necessidade, pois julgamentos e diagnósticos sobre o outro são expressões alienadas das nossas próprias necessidades.',
      },
      {
        title: 'Pedido não é exigência',
        body: "Um pedido claro usa linguagem de ação positiva, concreta e específica, e admite um 'não' sem punição. Exigir obtém obediência por medo, culpa ou vergonha; pedir preserva a relação e cria espaço para que todos tenham suas necessidades atendidas.",
      },
      {
        title: 'Empatia é presença',
        body: "Receber com empatia é esvaziar-se de ideias preconcebidas e ouvir a partir dos sentimentos e necessidades do outro, em vez de aconselhar ou tranquilizar. É a linguagem do coração (a 'língua girafa') no lugar da linguagem que julga e domina (a 'chacal').",
      },
    ],
    chapters: [
      {
        title: '1. Dando do coração e os quatro componentes',
        body: "Rosenberg explica como a linguagem cotidiana nos afasta da compaixão: julgamentos moralistas, comparações, negação da responsabilidade ('eu tive que') e exigências bloqueiam o dar espontâneo. A CNV propõe quatro componentes — observação, sentimento, necessidade e pedido — usados tanto para expressar com honestidade quanto para receber o outro. Ela nos guia a observar com cuidado, nomear o que sentimos, identificar a necessidade ligada a esse sentimento e formular um pedido concreto. O objetivo não é mudar as pessoas para conseguir o que queremos, mas construir relações baseadas em honestidade e empatia, nas quais a compaixão floresce naturalmente.",
      },
      {
        title: '2. Observação sem avaliação e os sentimentos',
        body: "O primeiro componente separa observação de avaliação: em vez de 'ele tem uma boca grande', descrever o que a pessoa disse ou fez. Misturar observação com julgamento faz o outro ouvir crítica e resistir. O segundo componente é expressar sentimentos reais, distinguindo-os de pensamentos mascarados de sentimento — 'me sinto inadequado', 'me sinto ignorado' ou 'me sinto um muro' descrevem avaliações, não emoções. Rosenberg alerta que muitos de nós fomos educados a nos desconectar do que sentimos, e por isso propõe um vocabulário de sentimentos. Nomear com precisão o que se sente é o que permite ao outro se conectar conosco.",
      },
      {
        title: '3. Necessidades na raiz e pedidos claros',
        body: "Toda emoção aponta para uma necessidade atendida ou não, e julgamentos como 'você nunca me entende' revelam, na verdade, uma necessidade de ser compreendido. Assumir nossos sentimentos e necessidades liberta-nos da culpa e da acusação. Para que o outro possa responder, o quarto componente é o pedido: uma ação específica, positiva e concreta, não uma vaga abstração como 'quero que você me respeite'. Rosenberg diferencia pedido de exigência: se a recusa traz punição ou culpa, é exigência. A CNV convida a formular pedidos e acolher o 'não' como expressão de outra necessidade, mantendo o diálogo vivo.",
      },
      {
        title: '4. Empatia, autoconexão e resolução de conflitos',
        body: "Rosenberg aprofunda o outro lado da CNV: receber com empatia, que é esvaziar a mente e ouvir com todo o ser, focando os sentimentos e necessidades do outro em vez de aconselhar. A empatia cura, previne a violência e permite ouvir o 'não' e até o silêncio. O livro mostra ainda como aplicar esse olhar a nós mesmos, traduzindo autocríticas e 'tenho que' em escolhas conscientes, e como expressar a raiva conectando-a às necessidades não atendidas em vez de culpar. Por fim, apresenta a CNV na mediação de conflitos, o uso protetor (não punitivo) da força e a expressão sincera de apreciação.",
      },
    ],
    quotes: [
      {
        text: 'Quando combinamos observação com avaliação, as pessoas tendem a ouvir crítica.',
        chapterPosition: 2,
      },
      {
        text: 'Julgamentos sobre os outros são expressões alienadas das nossas próprias necessidades não atendidas.',
        chapterPosition: 3,
      },
    ],
  },
  {
    slug: 'como-fazer-amigos',
    title: 'Como Fazer Amigos e Influenciar Pessoas',
    author: 'Dale Carnegie',
    category: 'comunicacao',
    color: '#904d00',
    tagline:
      'Dale Carnegie mostra como transformar o maior problema que você enfrenta — lidar com pessoas — em relações de confiança.',
    description:
      'Dale Carnegie ensina princípios atemporais de relacionamento: não criticar, despertar interesse genuíno nos outros e fazê-los sentir-se importantes. Nesta edição adaptada à era digital, as mesmas lições são aplicadas a e-mails, redes sociais e conversas online. O livro sustenta que toda interação deixa a outra pessoa um pouco melhor ou pior — e que a influência duradoura nasce de empatia, escuta e reconhecimento sincero.',
    insights: [
      {
        title: 'A crítica volta como boomerang',
        body: 'Criticar, condenar ou se queixar só coloca o outro na defensiva e fecha a porta do diálogo. O livro propõe trocar a censura por compreensão, porque ninguém muda de verdade sob ataque.',
      },
      {
        title: 'O desejo de se sentir importante',
        body: 'Todo ser humano anseia por apreço e reconhecimento sincero. Elogiar o que há de bom e afirmar o valor do outro desperta lealdade e boa vontade mais do que qualquer recompensa material.',
      },
      {
        title: 'Interesse genuíno, não teatro',
        body: 'Você conquista mais amigos em dois meses interessando-se de verdade pelas pessoas do que em dois anos tentando impressioná-las. A atenção sincera aos interesses e necessidades alheias é a chave das relações duradouras.',
      },
      {
        title: 'Ouvir e evitar discussões',
        body: 'Ouvir com paciência e deixar o outro falar satisfaz seu desejo de ser compreendido. Evitar discussões e nunca dizer de frente que alguém está errado preservam a confiança e abrem espaço para influenciar sem ressentimento.',
      },
    ],
    chapters: [
      {
        title: '1. Fundamentos do engajamento',
        body: 'Carnegie parte de uma regra central: não criticar, não condenar e não se queixar, pois a crítica coloca a outra pessoa na defensiva e volta como um boomerang. Em vez disso, é preciso afirmar o que há de bom e oferecer apreço honesto, porque todos desejam sentir-se importantes. O terceiro princípio é conectar-se aos desejos profundos: falar do que a outra pessoa quer e mostrar como ela pode obtê-lo. O autor lembra que toda interação deixa o outro um pouco melhor ou um pouco pior, e que a influência verdadeira nasce de empatia, não de manipulação.',
      },
      {
        title: '2. Seis modos de causar uma impressão duradoura',
        body: 'Para se tornar alguém de quem os outros gostam, Carnegie reúne seis práticas simples. Interesse-se sinceramente pelos interesses alheios antes de tentar atrair atenção para si. Sorria — mesmo por escrito ou ao telefone, porque o tom acompanha o gesto. Lembre e use o nome da pessoa, que é, para ela, o som mais importante do idioma. Ouça com paciência e deixe o outro falar sobre si. Discuta o que realmente importa para ele, não apenas o seu tema. Por fim, deixe cada pessoa um pouco melhor do que a encontrou: amizade e influência se constroem nesses pequenos gestos.',
      },
      {
        title: '3. Como merecer e manter a confiança',
        body: 'A confiança é a base da influência, e o livro mostra como conquistá-la. Evite discussões, pois nelas ninguém convence ninguém; nunca diga de frente que o outro está errado. Se estiver errado, admita a falha rápida e enfaticamente. Comece sempre de maneira amistosa e busque afinidade e interesses comuns. Ceda o crédito e não dispute os louros. Engaje-se com empatia, apelando a motivos nobres e compartilhando sua própria jornada. Por fim, proponha desafios que mobilizem o desejo de superação, em vez de apenas dar ordens.',
      },
      {
        title: '4. Liderar mudanças sem resistência nem ressentimento',
        body: 'Mudar o comportamento dos outros sem gerar mágoa exige tato. Comece sempre num tom positivo e reconheça, com honestidade, as circunstâncias e o seu próprio envolvimento. Aponte erros em voz baixa, em particular, preservando a dignidade da pessoa. Em vez de ordens diretas, faça perguntas que a levem a concluir por si mesma — assim ela sente a ideia como sua. Reduza o custo do erro e valorize cada melhora, por menor que seja. Dê às pessoas uma boa reputação para honrar, deixe que salvem as aparências e mantenha o vínculo no terreno comum.',
      },
    ],
    quotes: [
      {
        text: 'Você faz mais amigos em dois meses interessando-se pelos outros do que em dois anos tentando atrair o interesse deles.',
        chapterPosition: 1,
      },
      {
        text: 'O nome de uma pessoa é, para ela, o som mais doce e mais importante em qualquer idioma.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'a-startup-enxuta',
    title: 'A Startup Enxuta',
    author: 'Eric Ries',
    category: 'inovacao-tech',
    color: '#064e3b',
    tagline:
      'Empreender é uma forma de gestão: aprenda rápido, com clientes reais, o que realmente funciona.',
    description:
      'Eric Ries propõe tratar a startup como uma instituição que aprende em meio à incerteza extrema, e não como um plano executado às cegas. A partir da experiência na IMVU, ele apresenta o ciclo Construir-Medir-Aprender, o produto mínimo viável, a contabilidade da inovação e o pivô como ferramentas para reduzir desperdício. É um manual de gestão para transformar boas intenções em negócios sustentáveis.',
    insights: [
      {
        title: 'Aprendizado validado como medida de progresso',
        body: 'Startups não existem apenas para fazer produtos ou dinheiro, mas para aprender a construir um negócio sustentável. Esse aprendizado só conta quando comprovado por experimentos e dados de clientes reais, não por boas histórias.',
      },
      {
        title: 'O ciclo Construir-Medir-Aprender',
        body: 'A atividade fundamental de uma startup é transformar ideias em produtos, medir a reação dos clientes e decidir se pivota ou persevera. Todo o esforço deve acelerar esse ciclo de feedback.',
      },
      {
        title: 'O produto mínimo viável',
        body: 'O MVP é a versão mais simples capaz de completar uma volta do ciclo e gerar aprendizado, mesmo cheia de falhas. Qualquer trabalho além do necessário para começar a aprender é desperdício.',
      },
      {
        title: 'Contabilidade da inovação e o pivô',
        body: 'Medir progresso exige baselines, marcos de aprendizado e métricas acionáveis, evitando métricas de vaidade. Quando os experimentos perdem eficácia, é hora de uma correção de curso estruturada: o pivô.',
      },
    ],
    chapters: [
      {
        title: '1. Visão: repensar o que é uma startup',
        body: 'Ries define startup como uma instituição humana criada para oferecer novos produtos e serviços sob incerteza extrema. Por isso, empreender é uma forma de gestão, não um ato heroico guiado por sorte ou genialidade. Ele apresenta cinco princípios: empreendedores existem em toda parte, empreendedorismo é gestão, aprendizado validado, ciclo Construir-Medir-Aprender e contabilidade da inovação. A promessa central é substituir o velho plano rígido por experimentação contínua, capaz de revelar, com dados concretos, se a visão está de fato virando um negócio viável e sustentável.',
      },
      {
        title: '2. Direção: hipóteses, MVP e o ciclo de feedback',
        body: 'O autor mostra como transformar a visão em hipóteses testáveis, especialmente as premissas de salto de fé sobre valor e crescimento. A primeira providência é entrar rapidamente na fase de Construir com um produto mínimo viável, que permite medir o comportamento real dos clientes em vez de apenas perguntar o que eles querem. Técnicas como o concierge, o teste do mago de Oz e o smoke test reduzem custo e tempo até o aprendizado. O capítulo insiste que o planejamento funciona ao contrário: define-se o que aprender, depois o que medir e só então o que construir.',
      },
      {
        title: '3. Medir e decidir: contabilidade da inovação e o pivô',
        body: 'Para saber se há progresso real, Ries propõe a contabilidade da inovação, realizada em três passos: estabelecer uma baseline com o MVP, ajustar o motor rumo ao ideal e decidir se pivota ou persevera. O capítulo contrasta métricas de vaidade, que só crescem e iludem, com métricas acionáveis que orientam decisões. Quando as melhorias deixam de mover os indicadores do negócio, é sinal de que a estratégia precisa mudar. O pivô é uma correção estruturada que preserva a visão, mas troca hipóteses sobre produto, público ou modelo, exigindo reuniões periódicas e coragem.',
      },
      {
        title: '4. Acelerar e adaptar: lotes, motores e os cinco porquês',
        body: 'Com o feedback funcionando, a startup precisa acelerar. Ries defende trabalhar em lotes pequenos e implantação contínua para encurtar o ciclo e evitar a espiral da morte dos grandes lotes. Ele descreve os motores de crescimento que sustentam a escala — o motor viral, o motor pegajoso e o motor pago — e como escolher métricas adequadas a cada um. Para aprender com os erros, apresenta os cinco porquês, método de análise de causa-raiz que gera investimentos proporcionais e fortalece a equipe. O objetivo é construir uma organização adaptativa, capaz de inovar sem perder disciplina.',
      },
    ],
    quotes: [
      {
        text: 'Uma startup é uma instituição humana projetada para criar novos produtos e serviços sob condições de extrema incerteza.',
        chapterPosition: 1,
      },
      {
        text: 'O MVP é a versão do produto que permite completar uma volta do ciclo Construir-Medir-Aprender com o mínimo esforço.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'do-zero-ao-um',
    title: 'Do Zero ao Um',
    author: 'Peter Thiel',
    category: 'inovacao-tech',
    color: '#262e42',
    tagline:
      'Criar algo novo de verdade é ir do zero ao um — e escapar da competição construindo um monopólio.',
    description:
      'Peter Thiel argumenta que o progresso vertical, criar o que nunca existiu, importa mais que copiar o que já funciona. A partir de sua experiência na PayPal, Palantir e como investidor, ele mostra por que a competição destrói lucros, por que os monopólios impulsionam a inovação e como segredos, distribuição e planejamento definem empresas duradouras.',
    insights: [
      {
        title: 'Zero a um contra um a n',
        body: 'Copiar o que já funciona é progresso horizontal, de um a n; criar algo inédito é progresso vertical, de zero a um. A tecnologia, não a globalização, é o que muda o mundo de forma sustentável.',
      },
      {
        title: 'Monopólio, não competição',
        body: 'Capitalismo e competição são opostos: a competição elimina lucros, enquanto o monopólio é a condição de todo negócio bem-sucedido. Empresas felizes são diferentes umas das outras, pois cada uma resolve um problema único.',
      },
      {
        title: 'Segredos ainda existem',
        body: 'Toda grande empresa nasce de um segredo: algo importante, desconhecido e difícil, mas factível. O melhor lugar para procurá-lo é onde ninguém está olhando, em campos relevantes e pouco institucionalizados.',
      },
      {
        title: 'O poder da distribuição',
        body: 'Um produto superior não se vende sozinho. A distribuição segue uma lei de potência, com um único canal dominante por negócio, e o custo de adquirir cliente precisa ser menor que o valor gerado por ele.',
      },
    ],
    chapters: [
      {
        title: '1. O desafio do futuro',
        body: 'O progresso tem duas formas: horizontal, copiar o que já funciona (de um a n), e vertical, criar algo inédito (de zero a um). Thiel responde à pergunta contrária — que verdade importante poucos concordam com você? — afirmando que a tecnologia importa mais que a globalização. Sem inovação, espalhar os modos antigos de riqueza pelo mundo leva à devastação, não à prosperidade. Novas tecnologias nascem de startups, grupos pequenos unidos por uma missão, capazes de questionar ideias recebidas e repensar os negócios do zero. O primeiro passo é pensar por si mesmo.',
      },
      {
        title: '2. Monopólio contra competição',
        body: 'A pergunta contrária aplicada aos negócios é: que empresa valiosa ninguém está construindo? Criar valor não basta; é preciso capturá-lo. A competição perfeita destrói lucros, enquanto o monopólio — uma empresa tão boa que ninguém oferece substituto próximo — é a condição de todo negócio bem-sucedido. Thiel sustenta que capitalismo e competição são opostos. Monopolistas disfarçam seu domínio; concorrentes exageram sua singularidade. Para durar, busque tecnologia proprietária, efeitos de rede, economias de escala e marca. Melhor ser o último a fazer a grande jogada e dominar um nicho pequeno antes de escalar.',
      },
      {
        title: '3. Segredos',
        body: 'Todo grande negócio se baseia num segredo: algo importante e desconhecido, difícil mas factível. A crença de que não restam segredos leva ao incrementalismo, à aversão ao risco, à complacência e à fé em mercados eficientes. Há segredos da natureza e segredos sobre as pessoas — coisas que elas escondem ou não sabem sobre si mesmas. O melhor lugar para procurar é onde ninguém está olhando, em campos importantes mas pouco institucionalizados, como a nutrição. Ao encontrar um segredo, você escolhe a quem contá-lo; na prática, a resposta é uma empresa: um grupo de conspiradores reunidos para mudar o mundo.',
      },
      {
        title: '4. As sete perguntas e a distribuição',
        body: 'Todo plano sólido precisa responder a sete perguntas: engenharia (tecnologia 10x melhor), timing, monopólio (grande fatia de um mercado pequeno), equipe, distribuição, durabilidade e segredo. A distribuição costuma ser subestimada: um produto superior não vende sozinho, e a venda funciona melhor quando escondida. O valor gerado por cliente precisa superar o custo de adquiri-lo, e cada negócio tende a ter um único canal dominante. Empresas de cleantech fracassaram por ignorar essas questões, enquanto a Tesla acertou todas. Dominar as sete é dominar a sorte; errar uma pode condenar o negócio.',
      },
    ],
    quotes: [
      {
        text: 'O ato mais contrário de todos não é opor-se à multidão, mas pensar por si mesmo.',
        chapterPosition: 1,
      },
      {
        text: 'Todas as empresas de sucesso são diferentes: cada uma conquista um monopólio resolvendo um problema único.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'inteligencia-artificial',
    title: 'Inteligência Artificial',
    author: 'Kai-Fu Lee',
    category: 'inovacao-tech',
    color: '#904d00',
    tagline:
      'A corrida da IA entre China e EUA e o que ela significa para o trabalho, a economia e o propósito humano.',
    description:
      'Kai-Fu Lee, pesquisador, executivo e investidor atuante nos EUA e na China, analisa a disputa pela liderança em inteligência artificial. Ele mostra como a China deixou de ser copiadora para virar superpotência de dados e descreve as quatro ondas da IA. Por fim, alerta para a verdadeira crise: o desemprego tecnológico e a perda de propósito, propondo caminhos sociais para uma coexistência humana.',
    insights: [
      {
        title: 'Da cópia à superpotência',
        body: 'A China trocou o estigma de copiadora por liderança real em IA, combinando apoio estatal, empreendedorismo de massa e um mercado gigantesco. O episódio AlphaGo contra Ke Jie marcou simbolicamente o despertar da ambição tecnológica chinesa.',
      },
      {
        title: 'Quatro ondas de automação',
        body: 'Internet, negócios, percepção e autonomia: cada onda da IA atinge setores e tipos de dados diferentes, e a vantagem entre EUA e China muda a cada etapa. Os EUA ainda lideram a IA de negócios; a China co-lidera internet e percepção.',
      },
      {
        title: 'Dados como nova matéria-prima',
        body: 'Como o aprendizado profundo melhora com mais exemplos, a abundância de dados do cotidiano chinês — compras, refeições, transporte e pagamentos móveis — dá à China vantagem estrutural sobre o Vale do Silício.',
      },
      {
        title: 'Empregos e propósito',
        body: 'A ameaça central da IA é a concentração de riqueza e a perda de propósito num mundo que confunde trabalho com valor humano. Lee defende renda básica, empregos humanos de cuidado e uma cultura que valorize amor e compaixão.',
      },
    ],
    chapters: [
      {
        title: '1. O momento Sputnik da China',
        body: 'Kai-Fu Lee mostra como a China deixou de ser vista como terra de copiadoras para se tornar a única rival real dos EUA em inteligência artificial. O duelo entre AlphaGo e Ke Jie simboliza o despertar: pela primeira vez, a China se encarou como potência tecnológica. O governo abraçou abertamente a IA, empreendedores como Jack Ma viraram heróis populares e um mercado imenso acelerou a inovação. A obra argumenta que a transição da era da expertise para a era dos dados favorece a China, dona do maior volume de dados digitais do planeta.',
      },
      {
        title: '2. As quatro ondas da IA',
        body: 'Lee divide a revolução da IA em quatro ondas que se espalham em sequência: a IA de internet, que treina algoritmos de recomendação com nossos cliques; a IA de negócios, que otimiza dados corporativos e ainda é liderada pelos EUA; a IA de percepção, que digitaliza o mundo físico ao reconhecer rostos, vozes e imagens; e a IA autônoma, que trará carros, drones e robôs. Cada onda depende de um tipo diferente de dado e abre oportunidades distintas. A China lidera ou co-lidera as duas primeiras e corre atrás na quarta, tornando a disputa global.',
      },
      {
        title: '3. A vantagem dos dados e a nova ordem mundial',
        body: 'Porque o aprendizado profundo depende de volume e qualidade de dados, a China se torna a Arábia Saudita dos dados. Seus usuários de internet, mais numerosos que os dos EUA e da Europa somados, geram informação sobre compras, refeições e pagamentos móveis — dados do mundo real, mais úteis que o comportamento puramente online captado no Vale do Silício. Lee também descreve estratégias opostas de expansão: enquanto empresas americanas tentam impor seus produtos, as chinesas investem em startups locais nos mercados em desenvolvimento, disputando bilhões de novos usuários e redesenhando a economia global.',
      },
      {
        title: '4. A crise real: empregos, propósito e coexistência',
        body: 'Lee estima que, em quinze anos, 40% a 50% dos empregos americanos poderão ser tecnicamente automatizados. A verdadeira crise, porém, não é só o desemprego, mas a perda de propósito numa cultura que equipara trabalho a valor humano. Ele propõe respostas ousadas: renda básica universal, tributação dos vencedores da IA, criação de empregos de serviço e cuidado humano, e uma nova cultura que valorize compaixão e vínculos. Sua experiência com câncer o levou à conclusão de que amar e ser amado é o que nenhuma máquina pode fazer — e o que dá sentido à vida.',
      },
    ],
    quotes: [
      {
        text: 'Na aprendizagem profunda, não há nada como mais dados.',
        chapterPosition: 1,
      },
      {
        text: 'Amar e ser amado é o que torna nossa vida digna de ser vivida.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'outlive',
    title: 'Outlive',
    author: 'Peter Attia',
    category: 'saude-longevidade',
    color: '#064e3b',
    tagline:
      'Ciência e prática para viver mais e melhor: prevenção, exercício, sono e emoções.',
    description:
      'Peter Attia propõe a Medicine 3.0, uma abordagem preventiva e individualizada para adiar as doenças que mais matam: cardiovasculares, câncer, neurodegeneração e metabólicas. Unindo ciência e experiência clínica, ele mostra por que exercício, sono, nutrição e saúde emocional são as ferramentas mais poderosas para viver mais e, sobretudo, melhor.',
    insights: [
      {
        title: 'Longevidade é vida longa com qualidade',
        body: 'Não basta somar aniversários: importa a healthspan, o tempo vivido com função física e mental preservada. O objetivo é adiar as doenças crônicas e encurtar o período de fragilidade no fim da vida.',
      },
      {
        title: 'Prevenir é melhor que remediar',
        body: 'A Medicine 3.0 age antes de a doença se instalar, quando ainda há chance de evitá-la ou revertê-la. Attia relembra que Noé construiu a arca muito antes de começar a chover.',
      },
      {
        title: 'Saúde metabólica é a raiz comum',
        body: 'A resistência à insulina e a disfunção metabólica alimentam simultaneamente doenças cardiovasculares, câncer, demência e diabetes tipo 2. Por isso, arrumar a casa metabólica é o primeiro passo contra os quatro cavaleiros.',
      },
      {
        title: 'Exercício, sono e emoções são remédios',
        body: 'Treinar força, estabilidade e VO2 máx, dormir bem e cuidar da saúde emocional fazem mais pela longevidade do que qualquer pílula ou suplemento.',
      },
    ],
    chapters: [
      {
        title: '1. A vida longa e a Medicine 3.0',
        body: 'A longevidade tem duas partes: quanto tempo vivemos e quão bem vivemos. Peter Attia argumenta que a medicina reativa (Medicine 2.0) tarda demais, intervindo quando a doença já se instalou. Propõe a Medicine 3.0: prevenção, visão do paciente como indivíduo único, aceitação honesta do risco e foco na healthspan, a qualidade de vida. Em vez de apenas tirar gente do rio, é preciso subir a correnteza e impedir a queda. A meta é adiar as doenças crônicas e encurtar o período de fragilidade no fim da vida.',
      },
      {
        title: '2. Os quatro cavaleiros e a raiz metabólica',
        body: 'Quatro doenças crônicas respondem pela maioria das mortes lentas: doenças cardiovasculares, câncer, neurodegeneração e diabetes tipo 2 com disfunção metabólica. Attia mostra que todas começam muito antes do diagnóstico e compartilham raízes, sobretudo a resistência à insulina. No coração, o alvo causal é o apoB, das partículas LDL; no câncer, a disfunção metabólica alimenta o crescimento tumoral; na demência, o metabolismo da glicose e o gene APOE e4 pesam. Cuidar cedo da saúde metabólica reduz o risco de todos ao mesmo tempo.',
      },
      {
        title: '3. Exercício: a droga mais potente',
        body: 'Attia considera o exercício a intervenção mais poderosa para longevidade e healthspan, superando qualquer medicamento. Ele o decompõe em quatro pilares: eficiência aeróbica em zona 2, capacidade aeróbica máxima (VO2 máx, forte preditor de mortalidade), força e estabilidade. Treinar estabilidade previne lesões e sustenta todos os movimentos. Para organizar metas, propõe o Decatlo do Centenário: as dez tarefas físicas que você quer realizar nas últimas décadas. Treinar mirando os cem anos melhora cada década intermediária. Pare de apenas se exercitar e comece a treinar.',
      },
      {
        title: '4. Sono, nutrição e saúde emocional',
        body: 'Sono, nutrição e saúde emocional completam a estratégia. O sono é quando o cérebro se limpa; sua falta gera resistência à insulina, declínio cognitivo e adoecimento mental. Attia critica o parâmetro normal dos exames e defende a bioquímica nutricional individualizada, com atenção especial à proteína conforme envelhecemos. Por fim, adverte que buscar saúde física ignorando a saúde emocional é inútil: o sofrimento emocional corrói o corpo e os relacionamentos. O livro une ciência e experiência pessoal para propor uma vida mais longa e, acima de tudo, melhor.',
      },
    ],
    quotes: [
      {
        text: 'Quando Noé construiu a arca? Muito antes de começar a chover.',
        chapterPosition: 1,
      },
      {
        text: 'O exercício é, de longe, a droga de longevidade mais potente.',
        chapterPosition: 3,
      },
    ],
  },
  {
    slug: 'respire',
    title: 'Respire',
    author: 'James Nestor',
    category: 'saude-longevidade',
    color: '#262e42',
    tagline:
      'A arte esquecida de respirar: pelo nariz, devagar, menos e com expirações completas.',
    description:
      'James Nestor parte de uma crise respiratória pessoal para investigar por que os humanos modernos se tornaram a espécie mais entupida do planeta. Entre experimentos em Stanford, textos antigos, freedivers e cientistas, ele descobre que nariz, ritmo e expiração mudam sono, pressão, ansiedade e desempenho. O resultado é um guia sóbrio sobre uma função vital que quase todos executam mal.',
    insights: [
      {
        title: 'O nariz não é acessório',
        body: 'Aquecer, filtrar e umidificar o ar são só o começo: a respiração nasal libera óxido nítrico, melhora a captação de oxigênio e ativa o diafragma. A boca, usada como via principal, resseca tecidos, inflama a garganta e agrava ronco e apneia.',
      },
      {
        title: 'Expirar por completo antes de inspirar',
        body: 'A maioria usa só uma fração da capacidade pulmonar e deixa ar velho parado. Expirações longas e completas movem o diafragma, renovam o ar e são a base de técnicas que recuperaram enfisemáticos, cantores e atletas olímpicos.',
      },
      {
        title: 'Menos ar, mais energia',
        body: 'Respirar em excesso elimina gás carbônico demais e reduz o fluxo sanguíneo no cérebro. Tolerar mais CO2 — respirando devagar e menos — melhora a entrega de oxigênio aos tecidos, a resistência física e o controle da ansiedade e das crises de pânico.',
      },
      {
        title: 'Técnicas antigas, efeitos atuais',
        body: 'Pranayama, Tummo e a respiração alternada das narinas atravessaram milênios e hoje são testados em laboratório. Eles aquecem o corpo, alteram o sistema nervoso autônomo e mostram que ritmo e retenção podem ser treinados para regular sono, humor e saúde.',
      },
    ],
    chapters: [
      {
        title: '1. O pior respirador do reino animal',
        body: 'Cozinhar e processar alimentos livrou nossos ancestrais da mastigação pesada, e os ossos do rosto encolheram. O palato ficou estreito e arqueado, reduzindo cavidades nasais e espaço na boca, o que produziu dentes tortos, maxilares retraídos e vias aéreas obstruídas. Hoje, cerca de 40% das pessoas sofrem de obstrução nasal crônica e metade respira pela boca. Ao examinar o próprio crânio em Stanford, Nestor descobre que é um caso exemplar desse processo e decide investigar por que perdemos, ao longo da história, a capacidade natural de respirar bem.',
      },
      {
        title: '2. Boca fechada: o experimento de Stanford',
        body: 'Nestor e o sueco Anders Olsson passam vinte dias com o nariz tapado por plugs de silicone, respirando só pela boca, e depois revertem para a respiração nasal. Os números são dramáticos: ronco aumenta quase 5.000%, surgem dezenas de apneias por noite, a pressão sobe e o CO2 despenca. Ao voltarem a respirar pelo nariz, ronco e apneia desaparecem em poucas noites e a pressão cai. O experimento mostra, em dias, o que séculos de bocarra fizeram com a saúde e o sono humanos.',
      },
      {
        title: '3. O nariz, a expiração e o ritmo lento',
        body: 'O nariz aquece, filtra e umidifica o ar, libera óxido nítrico e amplia a absorção de oxigênio em cerca de 18%. Técnicas como a respiração alternada das narinas equilibram o sistema nervoso. O fonoaudiólogo Carl Stough mostrou que expirar por completo — esvaziar de verdade os pulmões antes de inspirar — recuperava enfisemáticos e treinava atletas. Dessa soma nasce o ritmo lento: cerca de 5,5 segundos para inspirar e 5,5 para expirar, o que equivale ao que várias tradições chamaram de respiração restauradora.',
      },
      {
        title: '4. Respirar menos e, às vezes, mais',
        body: 'O gás carbônico não é só resíduo: ele solta o oxigênio da hemoglobina, dilata vasos e regula a respiração. Konstantin Buteyko tratou asma ensinando pacientes a respirar menos, e a ciência confirma quedas de crises e de medicação. Pranayama, Tummo e a retenção controlada estressam o corpo de propósito para treinar quimiorreceptores, aquecer extremidades e regular ansiedade. A síntese prática do livro dispensa aparelhos: nariz, expiração completa, volume menor e ritmo lento de cerca de 5,5 respirações por minuto, poucos minutos por dia.',
      },
    ],
    quotes: [
      {
        text: 'A vida do iogue não é medida pelo número de dias, mas pelo número de respirações.',
        chapterPosition: 3,
      },
      {
        text: 'A respiração perfeita: inspire por cerca de 5,5 segundos e expire por 5,5 segundos.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'a-dieta-da-mente',
    title: 'A Dieta da Mente',
    author: 'David Perlmutter',
    category: 'saude-longevidade',
    color: '#0b513d',
    tagline:
      'Um plano de vida para proteger o cérebro reduzindo inflamação, glúten, carboidratos e açúcar.',
    description:
      'O neurologista David Perlmutter transforma a ciência de Grain Brain e Brain Maker em um programa prático para preservar o cérebro e a saúde geral. A proposta é encarar o alimento como informação: menos carboidratos e açúcar, mais gorduras saudáveis e fibras, somados a intestino equilibrado, exercício, sono e gestão do estresse. É um caminho sustentável, não uma dieta passageira.',
    insights: [
      {
        title: 'A inflamação crônica está no centro',
        body: 'A inflamação sistêmica de baixo grau é apresentada como denominador comum de obesidade, diabetes, depressão e demência. A dieta ocidental, rica em açúcar e carboidratos refinados, mantém esse processo sempre ligado.',
      },
      {
        title: 'Glúten, carboidratos e açúcar no sangue',
        body: 'O gliadina aumenta a permeabilidade do intestino e do cérebro, e a glicemia alta crônica leva à resistência à insulina. Perlmutter liga esse quadro a quase metade dos casos de Alzheimer.',
      },
      {
        title: 'Gordura como combustível preferido',
        body: 'Em vez de depender de glicose, o corpo pode queimar gordura e produzir cetonas, combustível mais eficiente para o cérebro. Daí a defesa de azeite, abacate, coco, ovos e peixes, com carboidratos mínimos.',
      },
      {
        title: 'Intestino, exercício e sono',
        body: 'Fibras prebióticas alimentam bactérias que reduzem inflamação, enquanto exercício regular e sono de qualidade protegem o cérebro e equilibram apetite e hormônios. O plano vai muito além do prato.',
      },
    ],
    chapters: [
      {
        title: '1. Por que a mente depende da dieta',
        body: 'O neurologista David Perlmutter parte de uma constatação incômoda: doenças cerebrais e crônicas cresceram nas últimas décadas sem cura à vista. A explicação, diz ele, está fora do cérebro — na alimentação, no intestino e nos hábitos diários. A inflamação crônica de baixo grau é apresentada como denominador comum de depressão, obesidade, diabetes e demência. A dieta ocidental, rica em carboidratos refinados e açúcar, mantém esse processo aceso. O livro propõe encarar o alimento como informação capaz de influenciar a expressão dos genes, e não apenas como combustível para sobreviver.',
      },
      {
        title: '2. As regras do prato: sem glúten, menos carboidrato',
        body: 'O glúten é retirado mesmo de quem não tem diagnóstico, pois o gliadina aumenta a permeabilidade intestinal. O açúcar — sob mais de sessenta nomes — deve ser abandonado. A base passa a ser pobre em carboidratos e rica em gorduras saudáveis, como azeite, abacate, coco, ovos e peixes, além de fibras prebióticas. Assim o corpo entra em cetose leve, queimando gordura e produzindo cetonas. Proteína em excesso também é desaconselhada. A meta é estabilizar glicemia e insulina, reduzindo a resistência que se associa a quase metade dos casos de Alzheimer.',
      },
      {
        title: '3. Além do prato: intestino, exercício e sono',
        body: 'O plano trata o microbioma como um órgão. Fibras prebióticas alimentam bactérias que produzem ácidos graxos de cadeia curta, fortalecem a barreira intestinal e reduzem inflamação; probióticos e fermentados entram no cardápio. Fora do prato, exercício aeróbico regular pode aumentar o volume cerebral e cortar pela metade o risco de Alzheimer, melhorando também a sensibilidade à insulina e à leptina. Sono de qualidade repara o cérebro, regula o apetite e reduz inflamação, com horários fixos e ambiente sem telas. Estresse, relações e autocuidado também pesam.',
      },
      {
        title: '4. Colocando o plano em prática',
        body: 'A execução segue três passos: editar a dieta e os remédios; somar estratégias de apoio, como movimento, sono, autocuidado e ambiente; e planejar o dia com previsibilidade. O livro orienta uma autoavaliação de riscos e exames como insulina de jejum, glicemia, hemoglobina glicada e PCR. Inclui suplementos, jejum ocasional e um cardápio de catorze dias com receitas. A regra 90-10 admite a vida real: seguir o protocolo noventa por cento do tempo. A promessa é uma transformação sustentável, não uma dieta passageira.',
      },
    ],
    quotes: [
      {
        text: 'A inflamação crônica sistêmica é a causa fundamental de praticamente toda condição crônica que você possa imaginar.',
        chapterPosition: 1,
      },
      {
        text: 'O cérebro funciona cerca de 25% mais eficientemente com cetonas do que com açúcar no sangue.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'meditacoes',
    title: 'Meditações',
    author: 'Marco Aurélio',
    category: 'filosofia-estoica',
    color: '#262e42',
    tagline:
      'Diário estoico de um imperador sobre autocontrole, dever e viver conforme a razão.',
    description:
      'Escritas em grego pelo imperador romano Marco Aurélio como notas para si mesmo, as Meditações são um exercício diário de filosofia estoica. O texto reúne aforismos sobre autocontrole, dever, aceitação do destino e a busca da virtude como único bem. Mais que um tratado, é um espelho de disciplina moral e serenidade diante da impermanência.',
    insights: [
      {
        title: 'A dicotomia do controle',
        body: 'Só o juízo, o desejo e a ação dependem de nós; corpo, reputação e acontecimentos não. Concentrar-se no que está em nosso poder é a chave da serenidade.',
      },
      {
        title: 'A virtude é o único bem',
        body: 'Saúde, riqueza e fama são indiferentes; o único bem verdadeiro é agir com justiça, temperança, coragem e veracidade.',
      },
      {
        title: 'Viver conforme a natureza e a razão',
        body: 'Seguir a razão que ordena o universo e agir em favor da comunidade, pois o ser humano é racional e social por natureza.',
      },
      {
        title: 'Impermanência, morte e dever',
        body: 'Tudo passa como um rio; lembrar a morte liberta do apego e impõe viver o presente com retidão e serviço aos outros.',
      },
    ],
    chapters: [
      {
        title: '1. Dívidas e exemplos: o Livro I',
        body: 'O Livro I abre as Meditações como um exercício de gratidão: Marco Aurélio passa em revista avós, pais, mestres, irmãos e amigos, registrando o que aprendeu com cada um — a mansidão, o domínio da ira, a modéstia, a simplicidade de vida, a firmeza e a justiça. Mais do que memória biográfica, o capítulo funciona como um espelho moral: ao nomear virtudes alheias, o imperador define o caráter que deseja cultivar. Ele agradece aos deuses a sorte de bons exemplos e reconhece com humildade suas próprias falhas e a demora em abraçar a vida conforme a natureza.',
      },
      {
        title: '2. O poder da opinião e o que nos pertence',
        body: 'Aqui está o núcleo prático do estoicismo de Marco Aurélio: só nos pertencem o juízo, o desejo e a ação; tudo o mais — corpo, reputação, riqueza, acontecimentos — é indiferente ou está fora do nosso poder. Por isso insiste que todo distúrbio nasce da opinião, e que basta retirar o juízo para recuperar a calma. Recorda que ninguém pode ser impedido por outro, que o melhor modo de enfrentar a ofensa é não imitar o ofensor e que a alma pode recolher-se em si mesma como uma fortaleza inexpugnável.',
      },
      {
        title: '3. Razão, dever e a comunidade humana',
        body: 'Viver conforme a natureza significa, para o imperador, seguir a razão que governa o universo e agir com justiça e benevolência. O homem é animal racional e social: suas ações devem visar o bem comum, e não a glória ou o aplauso. Marco Aurélio repete que somos feitos para a cooperação, como as mãos, os pés e as pálpebras, e que o dever de cada um é executar bem a sua parte, sem temer censura nem cortejar popularidade. A virtude — prudência, justiça, coragem e temperança — é o único bem verdadeiro.',
      },
      {
        title: '4. Impermanência, morte e aceitação do todo',
        body: 'Os últimos livros aprofundam a meditação sobre a impermanência. Tudo flui: corpos, impérios, nomes e lembranças se dissipam como fumaça, e a vida é curta diante da imensidão do tempo. Diante disso, o filósofo não cai no desespero, mas na serenidade: a morte é apenas um processo natural e não um mal. Resta viver o presente, aceitar com ânimo o que a natureza comum traz, participar com simplicidade da grande cidade do mundo e manter, até o fim, a retidão da alma.',
      },
    ],
    quotes: [
      {
        text: 'A melhor vingança é não te tornares semelhante ao que te injuriou.',
        chapterPosition: 2,
      },
      {
        text: 'Presentemente serás cinzas e ossos secos, e um nome; talvez nem um nome.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'o-obstaculo-e-o-caminho',
    title: 'O Obstáculo é o Caminho',
    author: 'Ryan Holiday',
    category: 'filosofia-estoica',
    color: '#904d00',
    tagline:
      'O que está no caminho torna-se o caminho: a arte estoica de transformar provações em triunfo.',
    description:
      "Ryan Holiday parte de uma ideia de Marco Aurélio — 'o que impede a ação impulsiona a ação' — para mostrar que os obstáculos não são apenas barreiras, mas matéria-prima de progresso. O livro organiza o estoicismo prático em três disciplinas: percepção, ação e vontade. Com exemplos históricos, ensina a ver os problemas com clareza, agir com perseverança e aceitar o que está fora do nosso controle.",
    insights: [
      {
        title: 'O obstáculo vira caminho',
        body: 'O que bloqueia a ação pode ser convertido em combustível para agir. A mente adapta e transforma em propósito aquilo que se opõe a ela.',
      },
      {
        title: 'Percepção precede a ação',
        body: 'Não controlamos o obstáculo, mas controlamos como o enxergamos. Uma perspectiva correta reduz o problema ao tamanho real e libera a resposta certa.',
      },
      {
        title: 'Separe o que está sob seu controle',
        body: 'Como ensinava Epicteto, foque no que é seu — emoções, julgamentos, atitude, decisões — e pare de gastar energia com o que não depende de você.',
      },
      {
        title: 'Aceitação ativa, não passividade',
        body: 'Amor fati é amar o que acontece e seguir em frente com bom humor. Edison viu sua fábrica em chamas e recomeçou no dia seguinte.',
      },
    ],
    chapters: [
      {
        title: '1. Percepção: ver o obstáculo com clareza',
        body: "A primeira disciplina é a percepção. Holiday mostra que medo, pânico e emoção distorcem nossa leitura dos fatos e fazem problemas pequenos parecerem intransponíveis. A solução é o que os estoicos chamam de objetividade: separar a situação real do julgamento que fazemos dela. O exemplo de Péricles diante de um eclipse, acalmando a tripulação em pânico, ilustra que a perspectiva é tudo. Também aprendemos a perguntar 'isso depende de mim?' e a viver no momento presente, treinando a mente para reconhecer que temos poder sobre nossas escolhas, não sobre os acontecimentos externos.",
      },
      {
        title: '2. Ação: agir com perseverança e processo',
        body: "A segunda disciplina é a ação. Não basta ver com clareza: é preciso agir, e agir com persistência. Holiday defende começar já, mesmo sem garantias, e confiar no processo em vez de esperar o plano perfeito. Frente a um problema, não se exige força sobre-humana, mas pequenos passos deliberados que desmontam a dificuldade peça por peça. O pragmatismo de Samuel Zemurray, que resolveu um impasse comprando a terra dos dois supostos donos, mostra que o que funciona vale mais que o método 'correto'. A mensagem central é fazer o próprio trabalho com esmero, adaptar-se e persistir.",
      },
      {
        title: '3. Vontade: aceitar o que não controla',
        body: "A terceira disciplina é a vontade. Holiday ensina a construir uma 'cidadela interior' inatingível pelas circunstâncias externas. A chave é antecipar dificuldades, praticar a aceitação e cultivar o amor fati — amar tudo o que acontece, inclusive o indesejado. A perseverança de Odisseu e a serenidade de figuras como George Washington, que entregou o resultado da guerra à providência, ilustram a postura estoica. A morte, o azar e o imprevisto estão fora do nosso alcance; resta escolher como responder a eles com dignidade e bom ânimo.",
      },
      {
        title: '4. O obstáculo se torna o caminho',
        body: 'Na conclusão, Holiday costura as três disciplinas numa fórmula única: percepção para ver com clareza, ação para avançar com perseverança e vontade para aceitar o que não se controla. O obstáculo não é um desvio do caminho — ele é o caminho. Ao longo do livro, exemplos de imperadores, atletas, presidentes e empreendedores mostram que o estoicismo é uma filosofia prática, aplicável no campo de batalha e na sala de reuniões. O convite final é encarar cada adversidade como uma oportunidade de praticar virtudes como coragem, humildade, razão e criatividade, transformando provações em triunfo.',
      },
    ],
    quotes: [
      {
        text: 'O que impede a ação impulsiona a ação. O que está no caminho torna-se o caminho.',
        chapterPosition: 1,
      },
      {
        text: 'Não escolhemos o que nos acontece, mas podemos sempre escolher como nos sentimos a respeito.',
        chapterPosition: 3,
      },
    ],
  },
  {
    slug: 'sobre-a-brevidade-da-vida',
    title: 'Sobre a Brevidade da Vida',
    author: 'Sêneca',
    category: 'filosofia-estoica',
    color: '#3c4459',
    tagline:
      'A vida não é curta: nós a tornamos curta ao desperdiçar o tempo com ocupações vazias.',
    description:
      'Um ensaio curto em forma de carta a Paulino, no qual Sêneca refuta a queixa de que a vida é breve. O problema não está na quantidade de tempo recebida, mas em como a desperdiçamos: adiando o essencial, entregando-nos a ambições e obrigações alheias e vivendo como se fôssemos imortais. A resposta estoica é administrar o tempo com rigor, cultivar o ócio produtivo da filosofia e aprender, ao mesmo tempo, a viver e a morrer.',
    insights: [
      {
        title: 'A vida é longa se soubermos usá-la',
        body: 'Não recebemos uma vida curta; nós a encurtamos. Como uma fortuna bem ou mal administrada, o tempo se amplia quando é bem investido e se dissipa quando é esbanjado sem propósito.',
      },
      {
        title: 'O ocupado adia o viver',
        body: 'Quem se perde em ganância, ambição e negócios alheios promete viver aos cinquenta ou sessenta anos e guarda para si apenas as sobras da própria vida. Ocupação constante não é sinal de vida plena.',
      },
      {
        title: 'Ócio não é preguiça',
        body: 'Só quem se dedica à filosofia e ao exame de si está verdadeiramente em ócio e realmente vivo. Há quem esteja ocupado até no descanso, sem saber dispor de si mesmo.',
      },
      {
        title: 'Viver o presente, aprender a morrer',
        body: 'O maior obstáculo para viver é a expectativa que se agarra ao amanhã e perde o hoje. Quem organiza cada dia como se fosse o último encara o fim sem temor, pois aprendeu a viver e a morrer.',
      },
    ],
    chapters: [
      {
        title: '1. A queixa contra a natureza',
        body: 'Sêneca abre a obra respondendo a uma queixa comum: a de que a natureza nos deu uma vida breve. Para ele, o diagnóstico está errado. A vida, se bem administrada, é longa o bastante. O problema não é a quantidade de tempo recebida, mas o modo como a desperdiçamos em luxo irrefletido e atividades inúteis. Compara a vida a uma fortuna: nas mãos de um mau administrador, dissipa-se; entregue a um bom guardião, cresce com o uso. Assim, não nos falta tempo; nós o esbanjamos até que a morte nos obrigue a perceber que ele passou sem que notássemos.',
      },
      {
        title: '2. Os ocupados que adiam o viver',
        body: 'Sêneca descreve os ocupados: os que se entregam à ganância, à ambição política, aos negócios alheios e às obrigações sociais, sempre adiando o viver. Cita os que dizem: aos cinquenta me retirarei, aos sessenta abandonarei os deveres públicos. Para o autor, é insensato guardar para si apenas as sobras da vida. Augusto e Cícero, apesar do poder, ansiavam por descanso e se lamentavam. Ocupado não é só quem corre no fórum: há quem esteja ocupado até no ócio, sem saber dispor de si mesmo. O maior obstáculo para viver é a expectativa que promete o futuro e perde o presente.',
      },
      {
        title: '3. Passado, presente e a filosofia',
        body: 'Sêneca divide o tempo em passado, presente e futuro. O presente é breve, o futuro incerto, mas o passado é certo e está fora do poder da Fortuna. Os ocupados não ousam olhar para trás, pois temem a própria memória. Já o sábio pode revisitar toda a sua vida. Só quem se dedica à filosofia está verdadeiramente em ócio e realmente vive: dialoga com Sócrates, Epicuro e os estoicos e soma a esses os anos de todos os séculos. Enquanto monumentos e honras se desfazem com o tempo, as obras da filosofia permanecem. Reunir todos os tempos numa só vida é o que a torna longa.',
      },
      {
        title: '4. O ócio produtivo e a arte de viver',
        body: 'Sêneca exorta Paulino a retirar-se do tumulto para um porto tranquilo, não para a preguiça vã, mas para estudos mais altos e para o cuidado de si. Quem vive longe dos negócios tem tempo suficiente e bem investido; por isso o sábio encara o último dia sem hesitar. Aprendemos a viver e a morrer a vida inteira. O medo da morte nasce de não se ter vivido de verdade. A vida é curta e ansiosa para quem esquece o passado, negligencia o presente e teme o futuro; para o sábio, ao contrário, cada dia basta.',
      },
    ],
    quotes: [
      {
        text: 'Não é que temos pouco tempo de vida, mas que desperdiçamos muito dele.',
        chapterPosition: 1,
      },
      {
        text: 'O maior obstáculo para viver é a expectativa, que se agarra ao amanhã e perde o hoje.',
        chapterPosition: 2,
      },
    ],
  },
  {
    slug: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'historia-humanidade',
    color: '#262e42',
    tagline:
      'Como um animal insignificante criou mitos, dinheiro e impérios até sonhar em se tornar deus.',
    description:
      'Yuval Noah Harari narra a história da humanidade a partir de três revoluções: a Cognitiva, que criou as ficções coletivas; a Agrícola, que multiplicou a população ao custo do sofrimento individual; e a Científica, que uniu ciência, capitalismo e poder imperial. O livro mostra como dinheiro, impérios e religiões são ordens imaginadas que permitiram cooperar em larga escala, e questiona se todo esse poder nos tornou mais felizes.',
    insights: [
      {
        title: 'Ficções coletivas sustentam a cooperação',
        body: 'Sapiens domina o mundo não por força ou inteligência individual, mas por conseguir que milhões de estranhos acreditem nos mesmos mitos, como deuses, nações e empresas.',
      },
      {
        title: 'A Revolução Agrícola foi a maior fraude',
        body: 'Ela ampliou a comida disponível, mas piorou a vida da maioria: mais trabalho, pior dieta e enorme sofrimento dos animais domesticados. O sucesso evolutivo da espécie não se converteu em bem-estar individual.',
      },
      {
        title: 'Dinheiro, impérios e religiões são ordens imaginadas',
        body: 'Nenhuma delas existe na natureza; funcionam porque todos acreditamos nelas. O dinheiro é o sistema de confiança mais universal já inventado, capaz de unir pessoas que não compartilham mais nada.',
      },
      {
        title: 'Poder sem sabedoria a caminho do divino',
        body: 'A Revolução Científica e o capitalismo deram ao sapiens poder sem precedentes, mas não necessariamente felicidade. A engenharia genética e a busca pela imortalidade podem substituir a seleção natural pelo design inteligente.',
      },
    ],
    chapters: [
      {
        title: '1. A Revolução Cognitiva e as ficções coletivas',
        body: 'Há cerca de 70 mil anos, mutações acidentais no cérebro dos sapiens possibilitaram uma nova linguagem, capaz não só de avisar sobre perigos, mas de falar sobre coisas que não existem. Essa Revolução Cognitiva permitiu criar ficções coletivas: deuses, nações, dinheiro e empresas. Enquanto formigas cooperam de modo rígido e chimpanzés apenas em pequenos grupos conhecidos, os sapiens passaram a cooperar com milhares de estranhos que compartilham os mesmos mitos. Foi essa imaginação comum, e não a inteligência individual, que tornou o sapiens o dono do planeta, capaz de adaptar-se rapidamente sem esperar mudanças genéticas.',
      },
      {
        title: '2. A Revolução Agrícola, a maior fraude da história',
        body: 'Cerca de 12 mil anos atrás, os sapiens começaram a domesticar plantas e animais, e a revolução agrícola ampliou a oferta total de comida. Harari argumenta, porém, que ela foi a maior fraude da história: o alimento extra não trouxe melhor dieta nem mais lazer, e sim explosões populacionais e elites privilegiadas. O agricultor médio trabalhava mais e comia pior que o forrageiro. Do ponto de vista do trigo, da galinha ou do boi, a domesticação foi um sucesso evolutivo; do ponto de vista do indivíduo, sobretudo dos animais criados em confinamento, foi uma catástrofe de sofrimento. O humano não escolheu a armadilha, caiu nela aos poucos.',
      },
      {
        title: '3. A unificação: dinheiro, impérios e religiões',
        body: 'Após a revolução agrícola, mitos cada vez mais fortes permitiram unir milhões de estranhos. Harari mostra que dinheiro, impérios e religiões são ordens imaginadas: o dinheiro é o sistema de confiança mais universal já inventado, pois faz pessoas que não compartilham nada acreditarem na mesma moeda. Impérios impõem uma cultura comum e dissolvem identidades locais, enquanto religiões universais, do budismo ao monoteísmo, oferecem verdades válidas para todos. Essas três forças empurraram a humanidade para um único mundo, tornando inevitável a convergência de povos que antes viviam separados.',
      },
      {
        title: '4. A Revolução Científica e o sapiens como deus',
        body: 'Há cerca de 500 anos, a humanidade admitiu sua ignorância e passou a investir em pesquisa, dando início à Revolução Científica. Ciência, império e capitalismo formaram um círculo de reforço mútuo: o crédito financia exploração e tecnologia, que geram lucro e novo conhecimento. A crença no progresso transformou a economia e produziu poder sem precedentes. No entanto, Harari adverte que mais poder não significa mais felicidade, e que a busca pela imortalidade e pela criação de super-humanos pode substituir a seleção natural pelo design inteligente. O sapiens, que começou insignificante, caminha para tornar-se um deus, sem saber ao certo o que deseja.',
      },
    ],
    quotes: [
      {
        text: 'Sapiens pode cooperar de modo extremamente flexível com incontáveis estranhos. Por isso domina o mundo.',
        chapterPosition: 1,
      },
      {
        text: 'Somos mais poderosos do que nunca, mas temos pouquíssima ideia do que fazer com todo esse poder.',
        chapterPosition: 4,
      },
    ],
  },
  {
    slug: 'homo-deus',
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    category: 'historia-humanidade',
    color: '#3c4459',
    tagline:
      'Como a humanidade venceu fome, peste e guerra e agora busca imortalidade, felicidade e divindade.',
    description:
      'Em Homo Deus, Yuval Noah Harari dá continuidade a Sapiens e investiga o que a humanidade fará depois de controlar fome, peste e guerra. O autor argumenta que as próximas metas serão a imortalidade, a felicidade e a divindade, e examina como a biotecnologia e os algoritmos podem destronar o humanismo. Um alerta sóbrio sobre o possível fim do Homo sapiens e a ascensão do dataísmo.',
    insights: [
      {
        title: 'A vitória sobre os velhos inimigos',
        body: 'Fome, peste e guerra, por milênios forças naturais incontroláveis, tornaram-se desafios administráveis. Hoje morre-se mais por excesso de comida do que por falta, e a violência responde por uma fração mínima das mortes.',
      },
      {
        title: 'As novas metas humanas',
        body: 'Libertos da luta pela sobrevivência, os humanos passam a perseguir imortalidade, felicidade e divindade. O sucesso gera ambição: o objetivo é transformar o Homo sapiens em Homo deus.',
      },
      {
        title: 'Livre-arbítrio e o eu como mitos liberais',
        body: "As ciências da vida indicam que decisões resultam de processos determinísticos ou aleatórios, nunca livres. O 'eu' único e autêntico do liberalismo também é posto em dúvida por experimentos sobre a mente.",
      },
      {
        title: 'O dataísmo como nova religião',
        body: 'Para o dataísmo, o universo é feito de fluxos de dados e o valor de tudo depende de sua contribuição ao processamento de informação. Nessa visão, humanos são apenas chips de um sistema maior.',
      },
    ],
    chapters: [
      {
        title: '1. A nova agenda humana',
        body: 'Por milênios, fome, peste e guerra lideraram as preocupações humanas, tratadas como forças naturais incontroláveis. Harari mostra que, nas últimas décadas, elas se tornaram desafios administráveis, resultado de avanços tecnológicos, econômicos e políticos. A fome deixa de matar mais que a obesidade; epidemias são contidas; e a guerra entre potências torna-se impensável graças às armas nucleares e à economia do conhecimento. Vencidos os antigos inimigos, a humanidade volta o olhar para novas metas: imortalidade, felicidade e divindade. O objetivo passa a ser transformar o Homo sapiens em Homo deus, ampliando seus poderes com biotecnologia e informação.',
      },
      {
        title: '2. Homo sapiens dá sentido ao mundo',
        body: 'Vencida a luta pela sobrevivência, a humanidade busca sentido. Harari descreve o humanismo como a religião moderna que coloca a experiência humana como fonte suprema de autoridade e significado. Ele se divide em três ramos: o liberal, que valoriza o indivíduo e sua voz interior; o socialista, que prioriza a experiência coletiva e a justiça social; e o evolucionista, que aposta na seleção natural e na superioridade de alguns sobre outros. Todos partilham a crença de que os sentimentos humanos são a bússola da vida, mas divergem sobre como resolver conflitos entre experiências individuais distintas.',
      },
      {
        title: '3. Homo sapiens perde o controle',
        body: 'Harari argumenta que o Homo sapiens está prestes a perder o controle. A ciência revela que organismos são algoritmos e que a inteligência se desacopla da consciência: máquinas podem realizar tarefas complexas sem qualquer experiência subjetiva. O livre-arbítrio e o eu único, pilares do liberalismo, são questionados pelas neurociências — decisões resultam de processos determinísticos ou aleatórios, nunca livres. Como a inteligência não consciente é mais eficiente, algoritmos podem substituir motoristas, médicos, advogados e traders, tornando muitos humanos economicamente inúteis e abalando a democracia, o mercado e os direitos individuais.',
      },
      {
        title: '4. A religião de dados',
        body: "Surge então o dataísmo, a religião emergente que venera a informação. Para ela, o universo consiste em fluxos de dados e o valor de qualquer entidade depende de sua contribuição ao processamento de informações. Nascido da convergência entre biologia e ciência da computação, o dataísmo enxerga humanos como chips de um sistema maior, o 'Internet de Todas as Coisas'. Seus mandamentos pregam maximizar o fluxo de dados e conectar tudo — inclusive quem não quer. Ao afirmar que os algoritmos conhecem nossos sentimentos melhor que nós, ele ameaça destronar o humanismo e reduzir o Homo sapiens a uma ondulação no fluxo cósmico de dados.",
      },
    ],
    quotes: [
      {
        text: 'as próximas metas da humanidade provavelmente serão a imortalidade, a felicidade e a divindade',
        chapterPosition: 1,
      },
      {
        text: 'Escute os algoritmos! Eles sabem como você se sente.',
        chapterPosition: 4,
      },
    ],
  },
]

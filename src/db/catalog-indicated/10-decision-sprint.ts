import type { CatalogBook } from '#/db/catalog-data'

export const book: CatalogBook = {
  slug: 'decision-sprint',
  title: 'Decision Sprint',
  author: 'Atif Rafiq',
  category: 'lideranca-negocios',
  color: '#c2410c',
  tagline:
    'Como transformar estratégia em ação, mapear o desconhecido e decidir com velocidade e qualidade.',
  description:
    "Decision Sprint apresenta um método para levar estratégia à ação quando o território é desconhecido. Atif Rafiq, primeiro chief digital officer da Fortune 500, no McDonald's, e depois executivo na Volvo e na MGM Resorts, mostra que quase todo projeto relevante começa com mais perguntas do que respostas e que o erro é correr para o planejamento. O livro organiza o trabalho a montante em três componentes, exploração, alinhamento e decisão, e detalha treze workflows que transformam desconhecidos em clareza, FAQs, conclusões e ações específicas. Com casos da Amazon, do McDonald's, da Volvo, da Hyatt e da H&R Block, ensina a construir frases-problema, a coletar e votar conclusões, a criar um mapa de calor de alinhamento e a instalar a prática no dia a dia, até chegar a ferramentas digitais, IA e ao papel do CEO a montante.",
  forWho:
    'Para líderes, gestores, product managers, especialistas de inovação e times multifuncionais que precisam transformar uma estratégia ambiciosa em ação sem sacrificar velocidade nem qualidade. Útil para empresas grandes que tentam escapar da burocracia e da paralisia diante do novo, e para negócios em crescimento que querem manter o ritmo sem virar caos. Também serve a quem trava em reuniões de alinhamento, enfrenta decisões cercadas de incerteza ou conduz iniciativas que envolvem várias áreas e precisam de um jeito repetível de mapear o problema, convergir e decidir.',
  insights: [
    {
      title: 'Upstream e downstream',
      body: 'Upstream é a parte de um projeto em que há mais perguntas do que respostas; downstream é a execução. Para decidir com velocidade e qualidade, é preciso investir no trabalho a montante, porque o resultado do downstream apenas reflete a qualidade dos insumos. Sem um método para lidar com os desconhecidos, resta escolher entre burocracia e caos.',
    },
    {
      title: 'Reunião de insumo ou de resultado',
      body: "Reunião de resultado prova a salsicha e tenta adivinhar o porquê; reunião de insumo mostra como ela será feita, permitindo pilotar antes de a linha de montagem começar. Rafiq percebeu no McDonald's que precisava entender e moldar os insumos, não apenas aprovar o prato pronto. A sequência correta muda o tom de todo o projeto.",
    },
    {
      title: 'Sistema 2 em time',
      body: 'Inspirado em Kahneman, o autor observa que empresas são boas em decisões rápidas baseadas em padrões, o Sistema 1, e frágeis diante de situações novas, que pedem o Sistema 2. Decision Sprint é a forma de ativar o raciocínio lento no time: ensina a pensar devagar e, ainda assim, fazê-lo rápido.',
    },
    {
      title: 'Desconhecidos merecem espaço',
      body: 'Ideias novas carregam uma massa crítica de incertezas. Tratá-las como incômodo leva a suposições e pontos cegos, e o líder só percebe as lacunas tarde demais. Acolher os desconhecidos no início, antes de qualquer decisão, produz a clareza necessária para aprovar, segurar ou descartar uma ideia.',
    },
    {
      title: 'A frase-problema não presume escolhas',
      body: 'A boa frase-problema captura a ambiguidade da bifurcação sem fixar as opções. Se o conjunto de escolhas é definido cedo demais, o time se ancora no que já conhece e perde alternativas criativas que só apareceriam durante a exploração. Mapear o problema vem antes de listar saídas.',
    },
    {
      title: 'Amplitude e profundidade',
      body: 'Exploração se constrói em dois movimentos: amplitude, com os temas que pesam na escolha, e profundidade, com perguntas esclarecedoras para cada tema. Coletados individualmente e só depois compartilhados, eles evitam pensamento de grupo e revelam onde falta expertise. Juntos, formam o canvas do problema.',
    },
    {
      title: 'Alinhamento como mapa de calor',
      body: 'Conclusões são coletadas e votadas de forma independente, por importância e grau de concordância. O resultado é um mapa de calor que mostra onde há consenso e onde há divergência, permitindo focar o debate só onde ele importa e tirando o peso das personalidades. É alinhamento guiado por dados, não por percepção.',
    },
    {
      title: 'Calibração em vez de controle',
      body: 'Calibrar é moldar ativamente os insumos e as conclusões de um time, sem esperar o plano pronto e sem tirar sua autonomia. Quem calibra bem dá evidência para conceder espaço, e o time avança com mais profundidade. O controle, ao contrário, gera microgestão e encolhe a tolerância à ambiguidade.',
    },
  ],
  chapters: [
    {
      title: '1. O problema do desconhecido',
      body: "Toda iniciativa relevante começa com mais perguntas do que respostas. Rafiq chama de upstream a parte de um projeto em que os desconhecidos dominam, e de downstream a execução, onde vivem planos, prazos e KPIs. O erro comum é tratar os desconhecidos como estorvo e correr para o planejamento com uma cultura de execução, em um problema que ainda não foi compreendido. Ele sentiu isso na primeira reunião como chief digital officer do McDonald's, em 2013, quando cerca de 30 pessoas apresentaram um projeto já pronto e ele percebeu que precisava entender os insumos, não só aprovar o resultado. A pergunta decisiva era simples: aquela era uma reunião de insumos ou de resultados? Reunião de resultado é provar a salsicha; reunião de insumo mostra como ela será feita. Empresas reagem aos desconhecidos de duas formas ruins: ignoram-nos e se apressam a planejar, ou exploram em isolamento, em silos, repetindo trabalho. Em ambos os casos faltam insumos e o projeto avança aos solavancos, com picos de entusiasmo que não se sustentam. A mensagem central é contraintuitiva: para decidir com velocidade e qualidade, é preciso começar mais a montante. Quando o trabalho que antecede a decisão é tratado com obsessão, a decisão deixa de ser tão difícil. O ponto de partida é dar espaço aos desconhecidos, acolhendo-os no início, antes de considerar qualquer escolha. Olhar para o que ainda não se sabe é o que produz clareza suficiente para aprovar, segurar ou descartar uma ideia com confiança.",
    },
    {
      title: '2. Upstream e as pessoas certas',
      body: 'Decision-making é o superpoder de uma empresa, mas ele depende de um método para lidar com o que ainda não se sabe. Qualquer ideia nova carrega uma massa crítica de desconhecidos, e eles devem ser protagonistas, não figurantes de última hora. Sem espaço para a ambiguidade, times fazem suposições, acumulam pontos cegos e, quando o líder percebe as lacunas tarde, surge o ímpeto de controlar e microgerenciar. Rafiq conecta isso à distinção de Daniel Kahneman entre dois sistemas: o Sistema 1 decide rápido por padrões conhecidos, e o Sistema 2 desacelera para raciocinar sobre situações novas. Empresas são boas no primeiro e frágeis no segundo. Decision Sprint é a forma de ativar o Sistema 2 em time: pensar devagar e, ainda assim, rápido. Para isso, as pessoas certas importam. Em vez de reunir um exército ou garantir que ninguém se sinta excluído, a empresa identifica as competências relevantes para a frase-problema e agrupa quem as domina. Esse time de trabalho é multifuncional e enxuto, no espírito do time das duas pizzas, da Amazon. Um integrante não representa sua função de origem: representa a empresa diante do problema, o que libera a inteligência coletiva. Hakan Samuelsson, então CEO da Volvo, resumia o espírito em uma frase pendurada na porta da sede: agrupe pessoas em torno de desafios. Liderar deixa de ser dar ordens e passa a ser calibrar o pensamento do time.',
    },
    {
      title: '3. Mapear o problema',
      body: 'Exploração não começa com opções, e sim com uma frase-problema. A tentação de listar escolhas cedo é perigosa, porque assume que as opções já são conhecidas e ancora o time, sufocando alternativas criativas. A boa frase-problema captura a ambiguidade da bifurcação no caminho sem presumir a saída. Na Volvo, ao investigar couro vegano como parte da virada para a sustentabilidade, a pergunta poderia ser: o couro vegano é consistente com a direção da marca? Ou, para um recorte específico: determine a viabilidade dessa ideia na cadeia de suprimentos. Construir a exploração tem três passos. Primeiro, redigir a frase-problema. Segundo, buscar amplitude, levantando os temas relevantes, como capacidade de fornecedores, padrões do que conta como vegano, custo incremental e rastreabilidade. Terceiro, buscar profundidade, escrevendo perguntas esclarecedoras para cada tema, do tipo quando, onde, por que e como. Os temas e as perguntas são coletados individualmente, e só depois compartilhados, para evitar pensamento de grupo e viés. Perguntas não confirmam opiniões: elas aceleram o entendimento. Depois de depurada, a lista vira um canvas, um mapa do problema que ainda não tem respostas nem recomendações. Compartilhar esse canvas com patrocinadores é um marco: executivos costumam agradecer pela estrutura e ganham confiança no projeto. É um alinhamento prévio, feito antes de qualquer conclusão. A regra prática é a do 80/20: um canvas razoavelmente completo já basta para orientar o trabalho seguinte.',
    },
    {
      title: '4. Explorar',
      body: 'Com o canvas pronto, o time passa a responder às perguntas e produzir FAQs, pares de pergunta e resposta organizados por tema. Boas respostas nascem da combinação de um responsável e poucos revisores. O responsável é quem pensa naquele assunto o dia inteiro; os revisores vêm de mundos ligeiramente diferentes e servem para esticar o raciocínio. Como um elástico, a resposta pode voltar à forma original, mas você confirma que ela é robusta. A resposta ideal parte do que se sabe, explicita suposições razoáveis e mostra o impacto delas, sintetizando uma posição por meio do raciocínio. Nenhum gestor espera uma bola de cristal: o melhor que se pode fazer é reunir fatos e raciocinar sobre o resto. Quando falta conhecimento, convidam-se guests, colegas de fora do time, para contribuir de forma pontual, sem entrar em todas as etapas do projeto. A exploração também precisa ser contínua. Um backlog de explorações funciona como uma lista do que vem a seguir, alimentada por qualquer integrante e revisada periodicamente, para que o time não seja pego de surpresa. O caso da Amazon é emblemático. Em 2011, Rafiq liderava o Kindle Direct Publishing e conduziu a exploração do KDP Select, um programa de exclusividade para autores. O time mapeou temas como monitoramento, aplicação das regras e cobertura, e respondeu a perguntas como a resposta a violações e o custo de monitorar milhares ou milhões de livros. A exploração estruturada sustentou decisões claras e um lançamento que superou as expectativas.',
    },
    {
      title: '5. Convergir',
      body: 'Exploração de qualidade existe para facilitar a convergência. O time alcança alinhamento quando parte do mesmo contexto para tirar conclusões comuns, num encontro de mentes sem forçar a barra. Alinhamento antes da exploração é uma armadilha; alinhamento depois dela é construtivo. O processo tem quatro passos. No primeiro, coleta-se conclusões de forma independente, pedindo ao time que reflita sobre as FAQs e proponha várias conclusões, porque a direção estratégica costuma ter camadas. Conclusões não se resumem a aprovar ou rejeitar: podem ser que sim, que é viável, mas com uma condição. No segundo passo, vota-se de forma assíncrona: cada pessoa hierarquiza as conclusões por importância e indica o quanto concorda com cada uma. O resultado é um mapa de calor que mostra onde há consenso e onde há divergência. Onde todos concordam, não é preciso discutir; onde há rachas, o debate fica focado e produtivo, e os dados tiram o fator personalidade da conversa. Quando falta evidência, testes rápidos com o mercado podem gerar os dados que destravam a convergência. O terceiro passo é preparar conteúdo enxuto, com descrição, FAQs e conclusões classificadas em acordadas, abertas e removidas. O quarto é socializar em rodadas, começando pelos patrocinadores, às vezes com conversas individuais antes de um comitê, para que eles se tornem defensores da iniciativa. O resultado é entendimento compartilhado, apoio e compromisso.',
    },
    {
      title: '6. Decisão e Decision Sprint',
      body: 'Na fase mais ousada do Decision Sprint, o time transforma conclusões em ação. Decisão é um compromisso com ações específicas. Por isso, a preparação lista como a exploração foi construída, que respostas foram produzidas e que conclusões foram tiradas, referenciando as FAQs. Depois, o time propõe ações concretas, com responsável e prazo, e convida os patrocinadores a apontar o que faltou ou que dependências existem. Nem tudo é aprovado de uma vez: parte pode ser ajustada, adiada ou reenviada a uma exploração futura. Decidir também inclui a coragem de segurar ou descartar ideias, como foi feito na Amazon com o KDP Select e, anos antes, com uma rede social para escritores que não decolou e foi retomada mais tarde por outro time com outro resultado. Existem dependências de ordem maior, como financiamento, capacidade de atenção da organização e fatores externos, que influenciam mais o quando do que o se. Um pipeline de oportunidades já exploradas mantém as ideias aquecidas e evita que a empresa seja pega de surpresa. Após decidir, o melhor é já mostrar o próximo lote de explorações: a exploração contínua vira ritual. E as decisões precisam cascatear: em uma reunião de próximos passos, vale gastar trinta minutos repassando toda a jornada, da exploração às conclusões, para que quem executará entenda o contexto. No caso da Apple Pay, em 2015, a velocidade veio de uma decisão rápida sustentada por clareza construída antes.',
    },
    {
      title: '7. Alinhamento e execução: os 13 workflows',
      body: 'Instalar o Decision Sprint é mudar o dia a dia do trabalho, não criar um processo paralelo. Rafiq promete não exigir começar do zero: basta ajustar o que já existe. O conceito central é o workflow, definido como um passo de uma sequência, com propósito claro, conjunto de colaboradores e entradas e saídas precisas. Formato é o quinto elemento: um passo pode acontecer sem reunião, de forma assíncrona. Pensar em workflow é melhor do que pensar em reuniões, porque reuniões frequentemente carecem de propósito, e os passos se encadeiam, criando um efeito de bola de neve. O livro detalha treze workflows, da iniciação da exploração até a condução da reunião de decisão. Eles organizam a coleta de temas e perguntas, a calibração da exploração, o compartilhamento do canvas, a resposta e a revisão de perguntas, a extração de conclusões e a preparação e condução do alinhamento e da decisão. Reuniões comuns, como kickoffs, brainstormings, planejamento, deep dives, atualizações de projeto e comitês de direção, podem ser reposicionadas dentro desses passos, ou migradas para o trabalho assíncrono. A promessa é ter menos reuniões e mais efetivas, com menos drama e mais clareza. Cultura, aqui, não se constrói com slogans, e sim com a forma como o trabalho e a colaboração acontecem. Frases curtas, as taglines, reforçam o comportamento desejado, como exploração antes do alinhamento, obsessão por insumos e calibração em vez de controle. O efeito é uma cultura que se move de baixo para cima, um workflow de cada vez.',
    },
    {
      title: '8. Do sprint à empresa: cultura, dados e o CEO a montante',
      body: 'Com os workflows rodando, o Decision Sprint se espalha para papéis, ferramentas e para o topo da empresa. Cada persona, de inovadores a céticos, tem um papel diante dos desconhecidos. Há patrocinadores, líderes de projeto, o time de trabalho e coaches, e a adoção segue a lógica de aterrissar primeiro em uma iniciativa e depois expandir. Ferramentas digitais ajudam em quatro frentes: conveniência para quem participa, migração de mais trabalho para o modo assíncrono e menos reuniões, colaboração em times remotos e geração de dados. Esses dados alimentam análises e inteligência artificial. No livro, a IA aparece como mission control, um radar que mostra a velocidade com que capital intelectual novo é produzido, se isso basta para indicar sucesso e onde um workflow está falhando. O capítulo final trata do CEO a montante, que troca a obsessão por resultados pela obsessão por insumos. Em vez de revisar números e relatórios, ele cultiva clareza de pensamento e passa a maior parte do tempo calibrando as iniciativas mais importantes, mantendo flexibilidade na agenda para estar disponível em tempo real. A ambição é ligar o trabalho a montante à avaliação da empresa, mostrando que ideias bem exploradas já criam valor antes de entrarem na execução. Managers que gastam tempo entendendo como os times pensam sobre o que ainda é incerto decidem com muito mais segurança. O futuro da gestão, para Rafiq, é uma parceria entre conhecimento humano e IA, na qual navegar o desconhecido deixa de ser sobrevivência e vira vantagem competitiva.',
    },
  ],
  quotes: [
    {
      text: 'Para ter velocidade e qualidade nas decisões, as organizações precisam começar mais a montante.',
      chapterPosition: 1,
    },
    {
      text: 'Fazer a coisa certa é ainda mais importante do que fazer as coisas direito.',
      chapterPosition: 2,
    },
    {
      text: 'Alinhamento antes da exploração é uma armadilha séria.',
      chapterPosition: 5,
    },
    {
      text: 'Uma decisão nada mais é do que um compromisso com as ações necessárias.',
      chapterPosition: 6,
    },
  ],
  takeaways: [
    'Comece cada projeto por uma frase-problema que exponha a ambiguidade da bifurcação, sem presumir as opções.',
    'Levante temas (amplitude) e perguntas esclarecedoras (profundidade) de forma independente antes de discutir respostas, e transforme a lista em um canvas.',
    'Colete e vote conclusões de forma assíncrona por importância e grau de concordância, usando o mapa de calor para debater apenas as divergências.',
    'Converta conclusões em ações específicas com responsável e prazo, e trate a decisão como compromisso com essas ações, inclusive quando a escolha for segurar ou descartar.',
    'Mantenha um backlog de explorações contínuas e encaixe as reuniões que já existem nos treze workflows, em vez de criar um processo do zero.',
  ],
}

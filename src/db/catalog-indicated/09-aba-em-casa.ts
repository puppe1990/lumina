import type { CatalogBook } from '#/db/catalog-data'

export const book: CatalogBook = {
  slug: 'aba-em-casa',
  title: 'ABA em Casa',
  author: 'Janaina Leonel Xavier',
  category: 'psicologia-mente',
  color: '#15803d',
  tagline:
    'Guia introdutório de Análise do Comportamento Aplicada para pais, cuidadores e educadores aplicarem os princípios da ABA em casa, com apoio profissional.',
  description:
    'ABA em Casa é um guia introdutório de Análise do Comportamento Aplicada escrito para pais, cuidadores e educadores que querem compreender o autismo e aplicar os princípios da ABA no dia a dia, sem depender apenas de serviços caros. Janaina Leonel Xavier, psicóloga comportamental e supervisora ABA, explica com linguagem simples o que é o Transtorno do Espectro Autista, como o comportamento funciona, quais funções ele pode ter e o papel do reforço. A partir daí, mostra como ensinar habilidades básicas em pequenos passos, estruturar rotinas em casa, estimular a comunicação, registrar dados e acompanhar o progresso, sempre com orientação e supervisão profissional. O foco final é autonomia e qualidade de vida.',
  forWho:
    'Para pais, familiares, cuidadores e educadores de crianças com autismo que querem entender o que é ABA e como usá-la em casa, com apoio profissional. Ideal para quem recebeu o diagnóstico recentemente, se sente desamparado diante dos custos e da falta de profissionais e busca uma linguagem acessível, sem termos técnicos. Também serve a quem já iniciou uma terapia e quer colaborar de forma consistente com a equipe, registrar progressos e estimular comunicação, autonomia e rotinas no cotidiano.',
  insights: [
    {
      title: 'ABA é ciência, não método fechado',
      body: 'A Análise do Comportamento Aplicada não se limita ao autismo: é a aplicação dos princípios de uma ciência que estuda as variáveis que afetam o comportamento, usada também na clínica, na educação, na economia e no esporte. Por isso, a forma de aplicar seus princípios varia conforme o perfil da criança, os objetivos e a análise do profissional.',
    },
    {
      title: 'O contexto explica o comportamento',
      body: 'Duas crianças podem chorar fazendo a mesma coisa por motivos diferentes. Por isso, não basta olhar o que a criança faz: é preciso considerar o contexto em que a resposta acontece. É essa leitura que permite descobrir a função do comportamento e intervir de forma mais adequada.',
    },
    {
      title: 'Toda resposta tem uma função',
      body: 'Os comportamentos costumam existir para obter atenção, escapar ou evitar uma demanda, conseguir um objeto tangível ou produzir prazer automático. Identificar qual dessas funções mantém a resposta orienta o planejamento, em vez de reagir apenas à aparência do comportamento, e ajuda a ensinar alternativas mais adequadas.',
    },
    {
      title: 'Sem reforço, nada se mantém',
      body: 'O comportamento só existe porque é reforçado. O reforço é a consequência que aumenta a chance de uma resposta se repetir, e precisa ser imediato para que a criança associe o que fez a algo bom. Sem essa associação, a aprendizagem demora mais ou não acontece.',
    },
    {
      title: 'Reforço e punição não são bom e ruim',
      body: 'Na Análise do Comportamento, positivo é acrescentar um estímulo e negativo é retirá-lo, sem julgamento de valor. O que reforça uma pessoa pode não reforçar outra, e o que motiva hoje pode deixar de motivar amanhã. Observar a criança é indispensável.',
    },
    {
      title: 'Extinção exige consistência',
      body: 'Para diminuir um comportamento inadequado, retira-se o reforçador que o mantinha. O início pode parecer pior, com mais birras e respostas emocionais, o que desanima muitos adultos. Os resultados são lentos, porém duradouros, e só aparecem quando todos mantêm a mesma conduta.',
    },
    {
      title: 'Ensine em pequenos passos',
      body: 'Habilidades básicas, como atenção, imitação, coordenação e linguagem, são requisitos para aprendizagens complexas. Apresentar uma instrução clara, esperar a resposta e dar a consequência imediata, repetindo a oportunidade, torna o ensino previsível e ajuda a consolidar cada etapa antes de avançar.',
    },
    {
      title: 'Pais capacitados multiplicam a terapia',
      body: 'Como faltam profissionais e o custo de muitas horas semanais é alto, pais, cuidadores e educadores treinados, sob supervisão de terapeutas capacitados, ampliam a intervenção. Com orientação, a família aplica os mesmos princípios em casa, ganha consistência e ajuda a garantir generalização e autonomia.',
    },
  ],
  chapters: [
    {
      title: '1. O que é ABA e o que é o autismo',
      body: 'ABA é a sigla de Análise do Comportamento Aplicada, a aplicação dos princípios de uma ciência que estuda as variáveis que afetam os comportamentos. Não é um método restrito ao autismo: seus princípios servem à clínica psicológica, à educação, à economia e ao desempenho esportivo, entre outras áreas. Os primeiros estudos são da década de 1960, e o trabalho de Lovaas, na década de 1980, tornou-se um dos mais importantes da história do autismo. Como toda ciência, a ABA está em constante transformação, e a forma de aplicar seus princípios depende do perfil da criança, dos objetivos traçados e da análise do profissional. A intervenção deve ser elaborada e supervisionada por um Analista do Comportamento. O Transtorno do Espectro Autista, descrito por Leo Kanner em 1943, é caracterizado por prejuízos na comunicação e na interação social, além de interesses restritos e comportamentos repetitivos. Por ser um espectro, cada pessoa apresenta as características de modo individual e em graus diferentes. Não há cura, mas os tratamentos que demonstraram melhores efeitos são fundamentados na Análise do Comportamento, de forma sistemática e intensiva. A intervenção precoce, o ensino simultâneo de várias habilidades, a participação da família e a generalização do que foi aprendido são pontos essenciais para ampliar a autonomia e a qualidade de vida.',
    },
    {
      title: '2. Comportamento, antecedentes e consequências',
      body: 'Comportamento é tudo aquilo que as pessoas fazem em um determinado contexto. Olhar apenas para o que a criança faz não basta: é fundamental considerar o contexto em que a resposta acontece. Duas crianças podem chorar fazendo a mesma coisa, mas por motivos diferentes. Em uma situação, o choro pode ocorrer porque a criança quer a chupeta; em outra, porque está com sono e se irrita com facilidade. A Análise do Comportamento organiza essa leitura na tríplice contingente: o estímulo antecedente, a resposta e a consequência. No exemplo do bebê que vê a chupeta em cima da mesa, o antecedente é a visão do objeto, a resposta é o choro e a consequência é receber a chupeta. O modelo ABC, do inglês antecedente, comportamento e consequência, ajuda a registrar o que acontece antes e depois do comportamento-alvo e a descobrir sua função. As funções mais comuns são atenção, fuga ou esquiva de uma demanda, obtenção de um objeto tangível e reforçamento automático, quando a criança obtém prazer consigo mesma. Compreender a função permite ensinar novos comportamentos, mais adequados. Também é importante saber que comportamentos inadequados são aprendidos. Quando já se conhece a criança e se sabe que suas respostas costumam ser as mesmas, é possível planejar o antecedente e agir antes que o comportamento inadequado apareça.',
    },
    {
      title: '3. Reforço, punição e extinção',
      body: 'Reforço é toda consequência que aumenta a probabilidade de uma resposta ocorrer novamente; punição é a consequência que diminui essa probabilidade. Os estímulos antecedentes não causam automaticamente as respostas: eles aumentam ou diminuem a chance de a resposta ocorrer de acordo com a consequência. Por isso, o comportamento só existe porque é reforçado. Na Análise do Comportamento, positivo e negativo não significam bom ou ruim: positivo é o acréscimo de um estímulo ao ambiente e negativo é a retirada de um estímulo. Existem formas variadas de reforçamento. A avaliação de preferência identifica qual é o reforçador mais poderoso para a criança. O reforço contínuo premia todas as respostas corretas, enquanto o intermitente premia a cada certo número de acertos. A economia de fichas ajuda a trabalhar a espera, mostrando visualmente quando o reforçador será ganho. O reforço precisa ser imediato para que a criança associe o que fez a algo bom e aprenda mais rápido, e o que reforça uma pessoa pode não reforçar outra. Um mesmo item pode motivar a criança por um período e depois se tornar indiferente ou aversivo. Quando se quer diminuir um comportamento, retira-se o reforçador que o mantinha, no procedimento de extinção. O efeito inicial pode ser o aumento da frequência e das respostas emocionais, por isso a consistência é indispensável; os resultados são lentos, porém duradouros.',
    },
    {
      title: '4. Ensino por tentativas e habilidades básicas',
      body: 'O ensino estruturado da ABA organiza a aprendizagem em pequenos passos, com instruções claras e repetição. Em cada tentativa, o adulto apresenta um antecedente simples, como uma instrução ou um material, espera a resposta da criança e oferece imediatamente a consequência: reforça o acerto e não reage ao erro, para depois repetir a oportunidade. Esse formato previsível facilita o aprendizado de habilidades básicas, que são comportamentos simples e iniciais, requisitos para aprendizagens mais complexas. Entre elas estão atenção, imitação, coordenação, linguagem e pré-acadêmicas. O contato visual, por exemplo, é uma habilidade básica necessária para comportamentos elaborados, como falar e interagir socialmente. A modelagem comportamental complementa o ensino: o adulto demonstra o comportamento desejado para que a criança possa imitá-lo, o que é especialmente útil para quem aprende com dificuldade por meio de instruções apenas verbais. O ensino deve ser gradual: começar pelas habilidades mais simples e avançar para as mais complexas, aumentando a dificuldade aos poucos. Nas primeiras etapas, o reforço contínuo ajuda a criança a entender o que se espera; depois, o reforço intermitente fortalece a manutenção do que foi aprendido. Quebrar tarefas em etapas menores e gerenciáveis, praticar em contextos variados e manter paciência e consistência são condições para que a aprendizagem se consolide e apareça em situações do dia a dia.',
    },
    {
      title: '5. Rotinas previsíveis em casa',
      body: 'Rotinas estruturadas e previsíveis ajudam a criança com autismo a se sentir segura e confortável, e também a lidar melhor com mudanças e transições. Uma boa estratégia é estabelecer horários diários claros, com momentos definidos para alimentação, brincadeiras, atividades escolares e para dormir e acordar. Como muitas crianças são mais visuais, um cronograma com fotos ou desenhos ajuda a antecipar o que vai acontecer em cada parte do dia, tornando as mudanças menos assustadoras. O reforço positivo incentiva a adesão à rotina: elogios e pequenas recompensas mostram à criança que seguir a sequência combina com algo bom. A consistência é fundamental, e todos os cuidadores, como babás e professores, devem conhecer e seguir a mesma rotina, para que a criança se sinta segura em ambientes diferentes. Ainda assim, é preciso estar preparado para imprevistos, ajustando a rotina quando necessário e explicando a mudança com palavras simples e um cronograma atualizado. O ambiente de casa deve ser organizado e consistente, com um espaço de trabalho definido e atividades planejadas. Em muitos casos, vale planejar o antecedente: se o adulto já sabe que a criança tende a levar a massinha à boca para chamar atenção, pode conduzir a mão dela para o que se espera e reforçar o comportamento correto, evitando que o comportamento inadequado apareça. Integrar os princípios da ABA às atividades diárias, como brincar, comer e se vestir, ajuda o aprendizado a fazer parte da vida real.',
    },
    {
      title: '6. Comunicação e autonomia',
      body: 'Estimular a comunicação começa por observar como a criança já se comunica hoje. Algumas usam gestos e sons, outras têm dificuldade em expressar necessidades e desejos. Ao identificar essas formas atuais, o adulto escolhe as estratégias mais adequadas. O uso de imagens e gestos é uma forma comum de comunicação alternativa: a criança aprende a associar uma figura simples a um objeto ou atividade, como a imagem de um copo para pedir água, e o gesto de apontar ou acenar também comunica. Palavras e frases simples podem ser ensinadas por repetição, com modelagem de linguagem, em que o adulto fala de forma clara para que a criança entenda e aprenda. As situações do dia a dia são ótimas oportunidades de prática: uma ida ao supermercado pode virar exercício para pedir algo ou identificar um objeto. O reforço positivo, com elogios, abraços ou pequenas recompensas, incentiva a criança a usar a comunicação com mais frequência e a ganhar confiança. O objetivo é a autonomia e a qualidade de vida. Ensinar habilidades sociais, como manter contato visual, esperar a vez e compartilhar brinquedos, caminha junto com a comunicação, sempre do mais simples ao mais complexo. Como cada criança é única, o adulto deve observar seu comportamento e adaptar as técnicas. O progresso costuma ser lento e gradual: exigem-se paciência, prática frequente e consistência.',
    },
    {
      title: '7. Dados, objetivos e progresso',
      body: 'Para saber se a intervenção está funcionando, é preciso observar e registrar. A observação direta acompanha o comportamento da criança em situações naturais, como em casa ou na escola, e mostra se as habilidades aprendidas estão sendo aplicadas em contextos diferentes. O registro de dados mantém um histórico dos comportamentos-alvo e dos não desejados, permitindo notar padrões ao longo do tempo e avaliar comunicação, independência e habilidades acadêmicas. As avaliações formais, realizadas por profissionais como psicólogos e terapeutas ocupacionais, medem áreas específicas e indicam o que precisa de mais atenção. Antes de começar, é essencial definir objetivos claros e mensuráveis com o terapeuta. Em vez de um alvo vago como melhorar a linguagem, define-se algo verificável, como a criança usar frases de três palavras em uma conversa. Também se estabelecem critérios para considerar que houve sucesso e um plano de ação com habilidades, cronograma e forma de monitoramento. As avaliações de desenvolvimento, como as que produzem uma fotografia das áreas atrasadas e das esperadas para a idade, orientam o planejamento da intervenção, evitando ensinar o que a criança já domina e priorizando o que é necessário. Monitorar o progresso de forma regular e dar feedback ao terapeuta permite ajustar o plano. O progresso pode levar tempo, e a consistência é o que sustenta os ganhos.',
    },
    {
      title: '8. O papel dos pais junto da equipe',
      body: 'Os pais não são espectadores do tratamento: são parte essencial da equipe. A intervenção comportamental deve ser planejada e supervisionada por um Analista do Comportamento, mas afirmar isso não significa que só esse profissional executa tudo. Ele precisa de parcerias, e o resultado depende da equipe terapêutica. Como o número de crianças com autismo é maior do que o de profissionais capacitados e o custo de muitas horas semanais de terapia é alto para grande parte das famílias, uma solução acessível tem sido empregar pais, cuidadores, educadores e estagiários na intervenção, com orientação e supervisão de terapeutas comportamentais capacitados. O trabalho é multidisciplinar: psicólogo, fonoaudiólogo, terapeuta ocupacional e psicopedagogo, somados aos relatos da família e da escola, porque uma única área não atende a todas as demandas do autismo. Após o diagnóstico, muitas famílias se sentem desamparadas, e a parceria com profissionais capacitados ajuda a encontrar recursos e direitos. Aos pais cabe colaborar com o terapeuta, implementar o tratamento em casa, aprender técnicas e reforçar comportamentos desejados, acompanhar o progresso e defender os direitos do filho. Também é importante manter comunicação aberta, participar de treinamentos e grupos de apoio e cuidar do bem-estar emocional da família, incluindo os outros filhos. Seguir a orientação profissional, sem tentar substituí-la, é o que garante consistência e segurança.',
    },
  ],
  quotes: [
    {
      text: 'O comportamento só existe porque é reforçado.',
      chapterPosition: 3,
    },
    {
      text: 'Não é suficiente olhar para o que a pessoa faz; é preciso considerar o contexto em que a resposta acontece.',
      chapterPosition: 2,
    },
    {
      text: 'Cada criança é única: observe o comportamento e adapte as técnicas de ensino.',
      chapterPosition: 6,
    },
    {
      text: 'O importante é começar e ser consistente, para proporcionar autonomia e qualidade de vida.',
      chapterPosition: 8,
    },
  ],
  takeaways: [
    'Observe o que acontece antes e depois de cada comportamento para descobrir qual função ele cumpre.',
    'Defina objetivos específicos e mensuráveis, com critérios de sucesso, antes de iniciar o ensino.',
    'Use reforço imediato e descubra o que realmente motiva a criança, revisando isso com frequência.',
    'Monte uma rotina previsível, com apoio visual, e garanta que todos os cuidadores sigam a mesma sequência.',
    'Trabalhe em parceria com a equipe, registre o progresso e busque supervisão profissional.',
  ],
}

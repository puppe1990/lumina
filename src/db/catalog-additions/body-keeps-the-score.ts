import type { CatalogBook } from '#/db/catalog-data'

export const book: CatalogBook = {
  slug: 'the-body-keeps-the-score',
  title: 'The Body Keeps the Score',
  author: 'Bessel van der Kolk',
  category: 'psicologia-mente',
  color: '#831843',
  tagline:
    'Como o trauma se grava no corpo, no cérebro e nas relações — e os caminhos que levam da sobrevivência à reconexão com o presente.',
  description:
    'Em The Body Keeps the Score, o psiquiatra Bessel van der Kolk reúne quatro décadas de clínica e pesquisa para mostrar que o trauma não é apenas uma lembrança ruim, mas uma marca gravada no corpo, no cérebro e nas relações. A partir do trabalho com veteranos de guerra e com sobreviventes de abuso, ele explica como o alarme cerebral fica preso no ligado, como a memória se fragmenta em sensações e como o apego da infância molda a capacidade de nos sentirmos seguros. O livro percorre a neurociência do TEPT, o custo da dissociação e o estudo ACE sobre abuso infantil, até chegar aos caminhos de recuperação: EMDR, ioga, neurofeedback, terapia dos sistemas internos, teatro e ritmos coletivos. É uma obra que une ciência e compaixão e oferece ferramentas concretas para reencontrar o presente.',
  forWho:
    'Para quem vive com as sequelas de traumas, abuso, negligência ou violência, e para quem convive ou trabalha com essas pessoas — terapeutas, educadores, profissionais de saúde e assistência social. Também interessa a leitores que querem entender por que reações intensas, entorpecimento, ansiedade ou autossabotagem persistem apesar da razão, e a profissionais que buscam abordagens além da medicação e da fala. A obra ajuda a reconhecer que o trauma é uma adaptação de sobrevivência, não uma falha de caráter, e apresenta caminhos de tratamento que envolvem o corpo. É útil a quem deseja uma visão ampla, científica e humana da recuperação.',
  insights: [
    {
      title: 'O trauma gravado no corpo',
      body: 'Trauma não é só uma lembrança ruim. Ele se imprime nas sensações, nos hormônios e nas vísceras, e o corpo segue reagindo como se o perigo continuasse muito depois de ter passado. É essa a ideia que dá nome ao livro: o corpo registra o placar.',
    },
    {
      title: 'A estrada baixa do alarme',
      body: 'A amígdala funciona como detector de fumaça e dispara antes do córtex pré-frontal, a torre de vigia. Sob forte ameaça, a via rápida assume e o corpo age antes do pensamento. No TEPT, esse alarme fica preso no ligado e a razão perde o controle.',
    },
    {
      title: 'Segurança social, luta e congelamento',
      body: 'Stephen Porges descreveu três respostas à ameaça: buscar segurança em rostos e vozes, lutar ou fugir, e, quando não há saída, congelar. A imobilização está na raiz de grande parte dos traumas e produz entorpecimento, colapso e desconexão. Reconhecer em que estado o corpo está é o primeiro passo para sair dele.',
    },
    {
      title: 'A base segura do apego',
      body: 'O cuidado sintonizado na infância ensina a regular emoções. Sem uma base segura, a criança aprende a se defender com distância, ansiedade ou desorganização, e leva esse mapa para as relações adultas. A segurança do apego influencia até como se lida com a dor.',
    },
    {
      title: 'Dissociação: saber sem saber',
      body: 'Para sobreviver, o cérebro separa a experiência do terror. As áreas ligadas à sensação de si se desligam, e o resultado é entorpecimento, sensação de irrealidade e sintomas que reaparecem sem explicação, como autolesão, explosões ou vazio. A recuperação passa por reconectar essas partes ao corpo e à história.',
    },
    {
      title: 'Sintomas que eram soluções',
      body: 'Cortar-se, beber, comer demais ou se isolar costumam ser estratégias criadas para suportar uma dor sem saída. Tratá-las apenas como problemas a eliminar, sem olhar o trauma por trás, costuma levar a tratamentos que falham ou que pioram o quadro.',
    },
    {
      title: 'Integrar, não apenas dessensibilizar',
      body: 'EMDR, ioga, neurofeedback e teatro não só reduzem a reação ao trauma: ajudam a reinseri-lo numa narrativa, devolvem a sensação de agência e reconectam o paciente ao corpo, aos outros e ao presente, em vez de apenas anestesiar a dor.',
    },
    {
      title: 'A virada para a segurança',
      body: 'A neuroplasticidade permite reensinar o cérebro. Experiências físicas de proteção, ritmo, toque, movimento e vínculo podem contradizer a impotência e o colapso gravados pelo trauma, abrindo caminho para uma recuperação real e duradoura. O corpo pode aprender, aos poucos, que o perigo ficou no passado.',
    },
  ],
  chapters: [
    {
      title: '1. O trauma e a memória',
      body: 'O livro começa com Tom, um veterano do Vietnã atendido pelo autor no hospital de veteranos de Boston em 1978. Ele tinha pesadelos, flashbacks, explosões de raiva e a sensação de estar morto por dentro; recusava os remédios para não abandonar os companheiros mortos. Van der Kolk percebeu que o trauma não é apenas uma lembrança ruim: ele interrompe a narrativa da vida e mantém a pessoa presa ao passado. O psiquiatra Abram Kardiner, que estudou veteranos da Primeira Guerra, já falava em fisio-neurose e numa vigilância crônica ao perigo. Em 1980, após pressão de veteranos, a psiquiatria criou o diagnóstico de transtorno de estresse pós-traumático, o TEPT. Diferente da memória comum, que se modifica e vira história, a memória traumática fica fragmentada como imagens, sons e sensações, sem começo, meio e fim. Pierre Janet descreveu ainda no século XIX a dissociação e a reencenação: quem não consegue lembrar em palavras acaba repetindo a dor em atos. Estudos com veteranos mostraram que poder agir durante o perigo protegia, enquanto a imobilização deixava marcas profundas. Antes desse diagnóstico, a psiquiatria tratava esses veteranos com rótulos equivocados, como alcoolismo ou esquizofrenia, e os tratamentos disponíveis ajudavam muito pouco. O autor aprendeu que contar a história, embora importante, raramente basta para o corpo aprender que o perigo passou e voltar a viver o presente.',
    },
    {
      title: '2. O corpo que registra',
      body: 'Van der Kolk parte de Darwin, que em 1872 mostrou que as emoções movem o corpo e se expressam nos músculos, no rosto, no coração e nas vísceras. Emoções presas no corpo, como o aperto no peito e o nó no estômago, nos fazem buscar alívio, às vezes com álcool, comida ou cortes. O sistema nervoso autônomo regula essa excitação em dois ramos: o simpático, acelerador da luta ou fuga, e o parassimpático, freio que promove digestão e descanso. A variabilidade da frequência cardíaca mede o equilíbrio entre eles, e pessoas com TEPT costumam ter esse ritmo baixo e desregulado. Stephen Porges propôs a teoria polivagal: diante de uma ameaça reagimos em três níveis. Primeiro buscamos segurança social, no rosto e na voz de quem nos acalma; se isso falha, entra a luta ou fuga; se nada funciona e ficamos imobilizados, o corpo entra em congelamento e colapso, com coração lento, respiração rasa e entorpecimento. A imobilização está na raiz da maioria dos traumas. Porges mostrou também que precisamos desligar a vigilância para sentir intimidade e prazer, algo difícil para quem vive em alerta. O apoio social é a proteção mais poderosa contra o trauma, desde que haja reciprocidade: sentir-se visto e acolhido. O corpo registra o placar é a metáfora central do livro.',
    },
    {
      title: '3. O cérebro traumatizado',
      body: 'O cérebro se constrói de baixo para cima. Na base está o cérebro reptiliano, que cuida das funções vitais; acima, o sistema límbico, sede das emoções e do alarme; no topo, o neocórtex, responsável pelo raciocínio, pela linguagem e pelo planejamento. Paul MacLean comparou a relação entre razão e emoção à de um cavaleiro e seu cavalo: diante do perigo, o cavalo dispara e a razão perde as rédeas. O tálamo funciona como um cozinheiro, misturando as sensações num todo coerente; a amígdala é o detector de fumaça, que decide depressa se algo é ameaça; o córtex pré-frontal medial é a torre de vigia, que avalia com calma. Joseph LeDoux chamou de estrada baixa a via rápida até a amígdala e de estrada alta a via mais lenta e consciente. Sob forte ameaça, a estrada baixa assume e o corpo reage antes de pensarmos. Nos exames de Stan e Ute, sobreviventes de um engavetamento, o autor viu o que ocorre no TEPT: ao recordar o acidente, Stan revivia tudo, com amígdala acesa e tálamo e córtex desligados; Ute, ao contrário, apagava o cérebro inteiro e não sentia nada. A neuroplasticidade explica que circuitos que disparam juntos se fortalecem: um cérebro moldado pelo medo passa a interpretar o mundo como perigo. Felizmente, essa mesma plasticidade permite reensinar o cérebro a se sentir seguro. No tratamento, isso significa ativar a torre de vigia para que o paciente reconheça que a lembrança pertence ao passado, e não ao agora.',
    },
    {
      title: '4. Apego e relacionamentos',
      body: 'Somos seres profundamente sociais, e a forma como fomos cuidados na infância molda nossa capacidade de regular emoções e de confiar nos outros. John Bowlby mostrou que a criança precisa de uma base segura: alguém que a receba quando ela volta, para que possa explorar o mundo. A sintonia emocional entre cuidador e bebê é corporal, feita de olhares, ritmos e toques. Ed Tronick filmou sequências de ruptura e reparo em menos de doze segundos entre mãe e bebê, mostrando que conexões quebradas podem ser consertadas. Mary Ainsworth descreveu estilos de apego: seguro, evitativo, ansioso e desorganizado. Cerca de 15 por cento das crianças estudadas tinham apego desorganizado, quando o cuidador é ao mesmo tempo fonte de medo e de sobrevivência: é o medo sem solução. A pesquisa de Karlen Lyons-Ruth mostrou que o distanciamento emocional materno, mais que a hostilidade, previa problemas graves anos depois, inclusive dissociação. Estudos com filhos de sobreviventes do Holocausto, com crianças queimadas e com crianças que presenciaram o 11 de Setembro revelaram o mesmo padrão: a segurança do apego prevê como a pessoa vai lidar com o trauma. Não receber espelhamento e cuidado deixa marcas profundas: sem se sentir seguro, fica difícil distinguir proteção de perigo e mais fácil se tornar vítima de novas violências.',
    },
    {
      title: '5. O custo da dissociação',
      body: 'Muitos sobreviventes perdem a sensação do próprio corpo. Sherry, que se machucava para sentir algo, não sentia o corpo inteiro e não reconhecia objetos colocados em suas mãos; na maca, perdeu a noção de onde estava a massagista. Essa desconexão se chama alexitimia: a dificuldade de identificar o que se sente. Ruth Lanius escaneou o cérebro de pessoas com histórico de abuso crônico quando estavam em repouso e descobriu que as áreas que formam o senso de si, como o córtex pré-frontal medial, a ínsula e o cíngulo, quase não se ativavam. Para parar de sentir o terror, esses pacientes desligaram justamente o sistema que dá a sensação de estar vivo. O preço é grande: sem acesso às sensações internas, ninguém sabe o que quer, tem dificuldade de decidir e se sente vazio ou irreal. A dissociação é saber e não saber ao mesmo tempo: uma parte da experiência fica separada da consciência e reaparece como sintomas, autolesão, explosões ou entorpecimento. Estudos como o ACE mostraram o tamanho do problema: abuso e negligência na infância são muito comuns e se acumulam, elevando o risco de depressão, alcoolismo, suicídio e doenças. O autor insiste que sintomas como cortar-se, compulsões ou obesidade muitas vezes são soluções de curto prazo para uma dor insuportável, e não falhas morais.',
    },
    {
      title: '6. Caminhos de recuperação: EMDR e ioga',
      body: 'Recuperar-se do trauma não é apagar o passado, e sim devolver ao corpo e à mente o comando de si. O autor propõe três caminhos que se combinam: de cima para baixo, com fala, conexão e compreensão; pela medicação, que abafa o alarme; e de baixo para cima, com experiências físicas que contradizem a impotência e o colapso. A terapia do sistema límbico atua restaurando a calma e a consciência dos estados internos. Duas abordagens recebem destaque. O EMDR, criado por Francine Shapiro em 1987, usa movimentos oculares bilaterais enquanto o paciente mantém a lembrança em mente, permitindo observar o trauma sem ser engolido por ele. Em estudo comparativo, após oito sessões um em cada quatro pacientes ficou curado, e após oito meses 60 por cento estavam sem sintomas, contra recaídas de quem usou só o antidepressivo. O EMDR ajuda mais os traumas da vida adulta do que os abusos crônicos da infância. A ioga, estudada com David Emerson, ensina a habitar o corpo pelo sopro, pelas posturas e pela atenção às sensações. Em dez semanas reduziu sintomas de TEPT em pacientes que não tinham respondido a nada, melhorou a variabilidade da frequência cardíaca e aumentou a ativação da ínsula e do córtex pré-frontal medial. O trabalho corporal, o toque seguro e a ação física também ajudam a completar movimentos que ficaram interrompidos no momento do trauma.',
    },
    {
      title: '7. Neurofeedback e teatro',
      body: 'Quando a fala e a compreensão não bastam, há ferramentas que retreinam o cérebro e o corpo. O neurofeedback usa eletrodos para mostrar ao cérebro, em tempo real, o seu próprio padrão de ondas e recompensar frequências mais equilibradas. Sebern Fisher tratava pacientes graves com essa técnica; o autor viu desenhos de um menino de dez anos que, em vinte sessões, saltaram do nível de uma criança de três para o de seis anos de desenvolvimento. A ideia é estabilizar os circuitos que sustentam medo, vergonha e raiva, tornando o cérebro mais resiliente. Já o teatro oferece uma via coletiva e corporal. O filho do autor, doente e isolado, recuperou energia ao interpretar personagens confiantes e admirados. O Theater of War leva a tragédia grega Ajax a veteranos e abre conversas sobre suicídio, culpa e alienação. Programas como Urban Improv, Trauma Drama, o Possibility Project e o Shakespeare in the Courts ensinam adolescentes e crianças acolhidas a espelhar movimentos, sustentar o olhar, escrever suas próprias peças e lutar com espadas de cena, aprendendo a confiar e a se expressar. Rituais de ritmo e canto também unem: no Truth and Reconciliation sul-africano e na Revolução Cantada da Estônia, multidões transformaram dor e medo em voz e coragem compartilhadas. Cantar, marchar e dançar juntos instala esperança e a sensação de pertencer.',
    },
    {
      title: '8. Reconexão e integração',
      body: 'A última parte do livro trata de juntar as peças. Richard Schwartz, criador da terapia dos sistemas familiares internos, o IFS, propõe que a mente é formada de partes: gerentes que controlam, bombeiros que apagam incêndios com impulsos e exilados que guardam a dor e o terror do abuso. A cura não é eliminar essas partes, mas reconhecer que todas tentam proteger o eu e devolver a liderança a um Self calmo e curioso. Com essa liderança interna, o paciente passa a dizer uma parte de mim em vez de eu sou, recuperando escolha. Albert Pesso, com a terapia psicomotora, cria estruturas: o paciente projeta sua família em pessoas ou objetos no espaço, recebe o testemunho empático de um observador e pode convidar figuras de pais ideais que oferecem o que faltou. Essas cenas tridimensionais não apagam o passado, mas criam memórias reparadoras de proteção e cuidado. O livro termina ampliando o olhar: trauma é um problema de saúde pública, ligado à pobreza, à violência e à desigualdade, e a prevenção exige comunidade e reconexão. O princípio africano Ubuntu, minha humanidade está ligada à sua, resume a mensagem. Curar-se é reconciliar-se com o corpo, contar a verdade, reconectar-se aos outros e voltar a sentir-se vivo no presente. A recuperação não é um retorno ao que se era antes, mas a construção de uma vida em que o presente volte a ter mais peso que a dor antiga.',
    },
  ],
  quotes: [
    {
      text: 'O trauma não é apenas um evento que aconteceu no passado; é a marca que ele deixa na mente, no cérebro e no corpo.',
      chapterPosition: 1,
    },
    {
      text: 'É preciso que o corpo aprenda que o perigo passou e passe a viver a realidade do presente.',
      chapterPosition: 3,
    },
    {
      text: 'O desafio não é tanto aceitar o que aconteceu de terrível, mas aprender a dominar as próprias sensações e emoções internas.',
      chapterPosition: 5,
    },
    {
      text: 'Minha humanidade está inextricavelmente ligada à sua.',
      chapterPosition: 8,
    },
  ],
  takeaways: [
    'Praticar a respiração lenta, com atenção especial à expiração, para ativar o freio parassimpático e voltar à janela de tolerância quando o alarme disparar.',
    'Treinar a interocepção algumas vezes ao dia: parar, respirar e nomear as sensações do corpo sem julgar, notando como elas mudam e passam.',
    'Adotar uma prática corporal regular, como ioga, caminhada, dança, artes marciais ou massagem, para reaprender a habitar o corpo com segurança.',
    'Ao buscar terapia, escolher um profissional aberto a diferentes abordagens, como EMDR, IFS e terapia psicomotora, e com quem se sinta visto e seguro.',
    'Cultivar ritmos e vínculos coletivos, como coral, música, teatro, esporte em grupo ou grupos de apoio, para sair do isolamento e restaurar a conexão.',
  ],
}

import type { CatalogBook } from '#/db/catalog-data'

export const book: CatalogBook = {
  slug: 'the-organized-mind',
  title: 'The Organized Mind',
  author: 'Daniel J. Levitin',
  category: 'produtividade-foco',
  color: '#334155',
  tagline:
    'Como a neurociência explica a sobrecarga de informação e ensina a organizar a mente com sistemas externos, atenção e decisões melhores.',
  description:
    'Daniel J. Levitin, neurocientista e autor de A Música no Seu Cérebro, mostra por que a mente moderna se sente sobrecarregada e como organizá-la sem lutar contra a própria biologia. O livro parte da história da sobrecarga de informação, da invenção da escrita, acusada de arruinar a memória, ao dilúvio digital de hoje, e explica os quatro componentes da atenção, as limitações da memória e o papel do sono na consolidação do que aprendemos. Levitin revisita o satisficing de Herbert Simon, o hipocampo e a memória de lugar, a memória transativa dos relacionamentos, o custo metabólico do multitarefa e o raciocínio probabilístico para decisões difíceis. O fio condutor é prático: transferir a organização do cérebro para sistemas externos, como listas, calendários, affordances e categorias, para pensar com mais clareza e viver com menos ruído.',
  forWho:
    'Para quem se sente afogado em e-mails, mensagens, tarefas e decisões, e suspeita que o problema não é falta de disciplina. O livro interessa a profissionais, estudantes, gestores e qualquer pessoa que perde objetos, esquece compromissos ou termina o dia exausta sem saber por quê. Também agrada a leitores curiosos sobre neurociência aplicada, que querem entender atenção, memória e sono com base em pesquisa, e não em fórmulas motivacionais. Não é um manual de produtividade com atalhos, mas um guia para desenhar sistemas externos que funcionem a seu favor.',
  insights: [
    {
      title: 'Pare de otimizar o que não importa',
      body: 'Para decisões que não pesam de verdade, não busque a melhor opção: escolha uma suficientemente boa e siga em frente. Herbert Simon chamou isso de satisficing. A busca da excelência fica reservada para o que é prioridade. O tempo economizado com o trivial é o que sobra para o que realmente importa.',
    },
    {
      title: 'Decidir cansa',
      body: 'A rede de decisão do cérebro não prioriza automaticamente. Uma sequência de escolhas triviais, como qual caneta usar, piora o autocontrole e a qualidade das decisões seguintes, mesmo as importantes. Por isso vale agrupar e automatizar o que é rotineiro, protegendo energia mental para as escolhas que pesam.',
    },
    {
      title: 'A atenção é de soma zero',
      body: 'O sistema atencional tem quatro peças: filtro, modo devaneio, executivo central e interruptor na ínsula. O filtro deixa passar mudança e importância; o executivo sustenta de quatro a cinco itens por vez. Focar numa coisa é, necessariamente, ignorar outras. É a origem de boa parte dos objetos perdidos.',
    },
    {
      title: 'Memória é reconstrução, não arquivo',
      body: 'Lembrar não é reproduzir um registro, é reativar e reescrever redes neurais. O gargalo está na recuperação, não no armazenamento. Memórias ficam vulneráveis a cada acesso e podem incorporar informações falsas; a confiança não garante exatidão. Externalizar o que importa reduz a dependência dessa máquina imperfeita e confiante demais.',
    },
    {
      title: 'A regra do lugar designado',
      body: 'O hipocampo é excelente para o que não se move e ruim para objetos nômades. Por isso guardamos mal chaves, óculos e carteira. A saída é dar a cada coisa um lugar fixo e não abrir exceções: um gancho, tigela ou bandeja perto da porta. Duplicatas para itens que circulam entre cômodos complementam a regra.',
    },
    {
      title: 'Memória transativa',
      body: 'Parte do que sabemos está guardado em outras pessoas, e relacionamentos funcionam como bancos de dados compartilhados. Casais dividem implicitamente áreas de expertise. Registrar contatos com contexto, anotando onde conheceu, quem apresentou e o que conversaram, e criar lembretes periódicos mantém vivos vínculos que a rotina apagaria.',
    },
    {
      title: 'Multitarefa custa caro',
      body: 'Cada troca de atenção tem custo neuroquímico, e o multitarefa fragmenta o pensamento sustentado de que dependem a solução de problemas e a criatividade. O cérebro tem viés de novidade e se deixa capturar pelo estímulo novo. Trabalhar em blocos longos e focados cansa menos e rende mais do que alternar entre tarefas.',
    },
    {
      title: 'Decida com taxas-base',
      body: 'Ignoramos taxas-base e nos deixamos levar por estereótipos, o chamado heurístico da representatividade. Diante de um teste raro, um resultado positivo pode ser majoritariamente falso positivo. Combine a frequência de fundo com a nova evidência, usando tabelas de contingência, e prefira risco absoluto a risco relativo.',
    },
  ],
  chapters: [
    {
      title: '1. Informação demais, decisões demais',
      body: 'O livro abre com Ioana, aluna brilhante criada na Romênia comunista, paralisada diante de uma prateleira com mais de cinquenta tipos de canetas. A abundância que deveria libertar virou exaustão. Levitin mostra que o cérebro evoluiu num mundo com muito menos informação e decisões do que o atual. Herbert Simon cunhou o termo satisficing: não buscar a melhor opção, mas uma suficientemente boa, reservando a busca da excelência para o que realmente importa. O supermercado ilustra a escalada: em 1976 havia cerca de 9.000 produtos, número que chegou a 40.000, embora 80% a 85% das necessidades caibam em 150 itens. Decidir cansa: experimentos mostram que uma sequência de decisões triviais piora o autocontrole e a qualidade das escolhas seguintes, porque a rede de decisão do cérebro não prioriza automaticamente. A capacidade da mente consciente é estimada em 120 bits por segundo, e entender uma pessoa falando consome cerca de 60 bits, o que explica por que mal acompanhamos duas conversas ao mesmo tempo. A história se repete. A escrita nasceu por volta de 3.000 a.C. para registrar transações comerciais e já foi acusada de arruinar a memória. Platão, Sêneca, Erasmo, Leibniz e Descartes reclamaram da multiplicação de livros. O trabalho também mudou: reservas, check-in, caixas de supermercado e contas bancárias migraram para o consumidor, o chamado trabalho-sombra. Para Levitin, não se trata de consumir menos informação, mas de criar sistemas externos que a organizem.',
    },
    {
      title: '2. Atenção e memória: o que realmente guardamos',
      body: 'Para Levitin, vivemos sob a ilusão de que percebemos tudo. O experimento do vídeo do gorila, de Simons e Chabris, mostra o contrário: quem conta os passes da equipe de branco simplesmente não vê o gorila atravessar a cena. O sistema atencional tem quatro componentes. O modo devaneio, ou rede de modo padrão descoberta por Marcus Raichle, é o estado de repouso em que a mente vagueia e associa livremente. O executivo central mantém o foco numa tarefa e sustenta no máximo quatro ou cinco itens por vez. O filtro atencional seleciona o que chega à consciência segundo dois princípios: mudança e importância, e por isso notamos um ruído novo e não o zumbido constante. O interruptor atencional, localizado na ínsula, alterna entre os modos; Levitin o mapeou com Vinod Menon. A atenção é recurso limitado e de soma zero: prestar atenção a algo significa deixar de prestar a outra coisa. Sobre a memória, o gargalo não é o armazenamento, e sim a recuperação. Lembrar é reativar redes neurais do evento original, e o resultado é uma cópia degradada. Memórias são reescritas ao serem acessadas e podem incorporar informações falsas: no experimento de Elizabeth Loftus, a palavra esmagaram fez pessoas recordarem vidro quebrado que não existia. Oitenta por cento dos americanos lembram ter visto ao vivo o primeiro avião atingir as Torres Gêmeas, imagem que só foi exibida no dia seguinte. O que fica melhor gravado são eventos distintos ou emocionalmente marcantes.',
    },
    {
      title: '3. Organizar a casa: objetos, lugares e affordances',
      body: 'Os ancestrais tinham pouquíssimos objetos; hoje possuímos cerca de mil vezes mais. Um estudo encontrou mais de 2.260 objetos visíveis apenas na sala e em dois quartos de uma casa. Três em cada quatro americanos não conseguem guardar o carro na garagem. O cortisol sobe diante da bagunça, e o estresse crônico prejudica a cognição e a imunidade. A solução começa entendendo a memória de lugar. O hipocampo evoluiu para rastrear o que não se move: árvores, poços, perigos. Por isso lembramos onde está a escova de dentes, mas perdemos chaves, óculos e carteira, objetos nômades sem lugar fixo. Taxistas de Londres que memorizam milhares de rotas têm hipocampo maior que a média, e o método de loci grego explora exatamente esse sistema. A regra central é dar um lugar designado a cada coisa e ser rígido: um gancho ou tigela para as chaves perto da porta, uma bandeja para o celular, e um sistema dos quatro que confere chaves, carteira, telefone e óculos ao sair. Comprar duplicatas de itens usados em vários cômodos também ajuda. Joni Mitchell instalou dezenas de gavetas específicas na cozinha para não gastar energia procurando. Levitin propõe três regras: um item ou local mal rotulado é pior que um sem rótulo; se existe um padrão, siga-o; e não guarde o que não pode usar. A gaveta de tralhas é legítima, pois categorias frouxas funcionam como válvula de escape.',
    },
    {
      title: '4. Organizar o mundo social',
      body: 'Durante a maior parte da história, vivíamos em grupos pequenos e encontrávamos sempre as mesmas pessoas. Hoje é impossível manter tudo na cabeça, e a resposta é externalizar. O crowdsourcing estende o cérebro coletivo: em 2009, a DARPA escondeu dez balões vermelhos pelos Estados Unidos e ofereceu 40 mil dólares; 53 equipes e 4.300 voluntários participaram, e o time do MIT venceu em menos de nove horas construindo uma rede de indicações em pirâmide. No mesmo espírito, alertas Amber recuperam crianças e o reCAPTCHA transforma segundos de trabalho humano em digitalização de livros. Mas a multidão não é infalível: avaliações on-line podem ser falsas e consenso não substitui expertise. Para organizar relações, o livro sugere contatos com contexto. O advogado Robert Shapiro anota onde conheceu cada pessoa, quem apresentou e o que conversaram; o executivo Craig Kallman mantém 14 mil contatos pesquisáveis. Um tickler no calendário lembra de reencontrar amigos a cada dois meses. Existe ainda a memória transativa: parte do que sabemos está guardado em outras pessoas, e casais dividem implicitamente as áreas de expertise um do outro. Por isso a perda de um parceiro desorganiza tanto a vida prática. A solidão tem custos físicos, e a qualidade dos vínculos íntimos é um dos maiores preditores de felicidade e saúde. Redes sociais ampliam o alcance, mas o contato on-line é complemento e não substitui a presença.',
    },
    {
      title: '5. Organizar o tempo e o sono',
      body: 'O córtex pré-frontal comanda o planejamento e o autocontrole, e lesões nele produzem a síndrome disexecutiva. Levitin apresenta Ruth, Ernie e Peter: depois de danos frontais, perderam a capacidade de ordenar etapas e priorizar tarefas. Nossas divisões de tempo são convenções: os egípcios chegaram às 24 horas e Eratóstenes dividiu o círculo em 60 partes. O cérebro, com 2% do peso, consome 20% da energia, e o multitarefa é caro, pois cada troca de atenção tem custo metabólico. Não priorizamos bem por natureza, e o viés de novidade torna o executivo central vulnerável a distrações. A pesquisadora Gloria Mark observa que dez minutos e meio num projeto não bastam para pensar a fundo; foco e devaneio precisam se alternar. Para projetos grandes, divida em blocos com começo e fim, como a construção de uma casa. Planejar e executar ocupam papéis distintos, patrão, trabalhador e trabalhador de detalhe, e alternar entre eles custa energia. Depois vem o sono, que não é tempo perdido. Walker e Stickgold descrevem três processos: unitização, assimilação e abstração, em que regras ocultas são extraídas. O ciclo dura de 90 a 100 minutos, com REM e NREM, e a consolidação ocorre principalmente no início e no fim da noite. O estudo de Thomas Wehr mostrou que, em ambientes sem luz artificial, as pessoas voltam ao sono bimodal. A privação de sono foi declarada epidemia de saúde pública pelo CDC em 2013 e esteve ligada a acidentes graves. Atletas de basquete que dormiram dez horas melhoraram 9% nos arremessos.',
    },
    {
      title: '6. Decidir quando a vida está em jogo',
      body: 'Quando a solução é óbvia, ela nem chega ao topo: presidentes e CEOs só recebem escolhas entre duas perdas. Levitin propõe uma triagem das decisões: as óbvias, as delegáveis, as que precisam de tempo e as que exigem mais informação, sempre com prazos. O obstáculo é que não pensamos probabilisticamente por instinto. Ele distingue a probabilidade objetiva, calculável ou contável e repetível, da subjetiva, que expressa apenas confiança. A regra da multiplicação só vale para eventos independentes, e quem acha que algo já aconteceu e por isso não acontecerá de novo comete a falácia do apostador. Também ignoramos a taxa-base: no exemplo dos engenheiros, mesmo sabendo que apenas 10% dos alunos são engenheiros, as pessoas superestimam a chance por causa de um estereótipo, o heurístico da representatividade. Quando não há informação, a resposta correta é a taxa-base, e não cinquenta e cinquenta. Levitin ensina a combinar essa taxa com novas evidências por meio do raciocínio bayesiano e de tabelas de contingência. No exemplo de uma doença rara com incidência de 1 em 10.000 e um teste sensível, um resultado positivo ainda não significa que você tem a doença, pois é preciso considerar os falsos positivos. Esse é o tipo de cálculo que ajuda a decidir se vale aceitar um tratamento com 5% de efeitos colaterais graves. Números de risco relativo impressionam, mas o que importa é o risco absoluto.',
    },
    {
      title: '7. Organizar o mundo dos negócios',
      body: 'Empresas são como cérebros ampliados, e a divisão do trabalho, celebrada por Adam Smith em A Riqueza das Nações, multiplicou a produtividade. Levitin conta que, após uma série de colisões ferroviárias na década de 1840, as companhias passaram a padronizar procedimentos, criar cargos definidos e registrar tudo por escrito: a memória saiu da cabeça dos trabalhadores para os manuais. Daniel McCallum criou o primeiro organograma em 1854, e Jacob Moreno introduziu os diagramas de rede nos anos 1930 para revelar quem realmente fala com quem, algo que o organograma esconde. Empresas podem ser planas ou verticais. Estruturas planas estimulam iniciativa e colaboração, mas sobrecarregam quem decide; verticais dão clareza e responsabilidade, porém favorecem silos. O número de níveis cresce de forma logarítmica com o tamanho, e o princípio da cadeia mínima de comando recomenda o menor número de níveis possível. Ninguém sabe tudo: a empresa é um sistema de memória transativa, e parte de se tornar eficaz é aprender quem detém qual conhecimento. Os consultores da Booz Allen descobriram três analistas equivalentes trabalhando em ramos separados, sem saber uns dos outros. Decisões éticas e econômicas usam circuitos distintos, e delegar não é fraqueza: superiores custam mais caro e estão longe dos fatos. Steve Wynn conta que, diante de duas opções ruins, não decide pelo subordinado, e ajuda-o a encontrar a verdade essencial do negócio e a ver o problema de 5.000 pés de altura.',
    },
    {
      title: '8. Categorias, crianças e o resto',
      body: 'A fábula do avião comunitário, construído por amadores que ignoram um engenheiro aeronáutico, é uma crítica ao modelo da Wikipédia: qualquer um edita, e a expertise perde peso. O cofundador Lawrence Sanger reconhece que isso gera falta de respeito pelo conhecimento especializado. Em contrapartida, saber filtrar virou a habilidade central. Levitin propõe a sigla AVE: autenticar, validar e avaliar. Pergunte se a página está atualizada, quem a mantém, quais interesses representa e se cita fontes revisadas por pares. Ele alerta para vieses de amostragem, como pesquisas de salário de formandos que só recebem resposta de quem se saiu bem, e para o efeito de mídia hostil, em que partidários de lados opostos enxergam o mesmo texto como tendencioso contra si. O que ensinar às crianças, então? Não a acumular fatos, que hoje levam segundos para serem encontrados, mas a pensar criticamente, reconhecer especialistas sem venerá-los e organizar o próprio mundo. Sortear objetos por cor, altura e nome é um exercício cognitivo. Ser organizado e consciencioso prediz longevidade, saúde e desempenho profissional décadas depois. Contra a procrastinação, Jake Eberts ensinava a comer o sapo, fazendo primeiro a tarefa desagradável. O capítulo final celebra a gaveta de tralhas e as categorias frouxas, e mostra que sistemas externos podem ensinar até a lembrar nomes. A grande ideia permanece: transfira a organização do cérebro para o mundo. E reserve espaço para devaneio e serendipidade, porque nem toda descoberta vem de busca direta.',
    },
  ],
  quotes: [
    {
      text: 'A memória é ficção. Ela se apresenta como fato, mas é altamente suscetível a distorção.',
      chapterPosition: 2,
    },
    {
      text: 'O sono está entre os fatores mais críticos para desempenho máximo, memória, produtividade, imunidade e regulação do humor.',
      chapterPosition: 5,
    },
    {
      text: 'Quando ouvir cascos, pense em cavalos, não em zebras.',
      chapterPosition: 6,
    },
    {
      text: 'O princípio mais fundamental da organização é transferir o ônus de organizar do cérebro para o mundo externo.',
      chapterPosition: 8,
    },
  ],
  takeaways: [
    'Dê um lugar fixo para chaves, carteira, celular e óculos, e nunca abra exceção: ao entrar em casa, guarde-os antes de qualquer outra coisa.',
    'Faça uma triagem das decisões em quatro pilhas: resolva agora, delegue, amadureça com prazo ou busque mais informação.',
    'Proteja blocos de foco sem interrupção e trate o sono como investimento, com horários regulares, quarto escuro e sonecas curtas em vez de mais cafeína.',
    'Externalize o que importa em listas, calendários e contatos com contexto, e use taxas-base antes de aceitar um risco relativo impressionante.',
    'Reserve tempo para o devaneio e para categorias frouxas, inclusive uma gaveta de tralhas, porque é nelas que cabem o imprevisto e a criatividade.',
  ],
}

const activeBtn = document.getElementById('active');
const waitBtn = document.getElementById('wait');
const stressDisplay = document.getElementById('stress');
const timeDisplay = document.getElementById('time');
const titleDisplay = document.getElementById('card-title');
const storyDisplay = document.getElementById('card-story');
const avatarDisplay = document.getElementById('avatar');
const message = document.getElementById('message')

const cards = [
    {
        id: '1',
        title: 'Em análise',
        story: 'Você está cansado, mas esperançoso. Pensa que logo vai estar aposentado e poderá trabalhar menos, talvez tenha tempo e dinheiro para fazer uma viagem para Cachoeiro do Itapemirim. Você faz o login no site do INSS, mas não tem nenhuma mudança no seu requerimento.',
        notify: false,
        stress: 0
    },
    {
        id: '2',
        title: 'Em exigência',
        story: 'Seu requerimento foi atualizado, e aguarda cumprimento de eigência. Precisam do seu CPF, comprovante de endereço e das carteiras de trabalho para atualizar seus dados,  ou o seu benefício poderá ser negado. Então você acorda cedo, tira cópias autenticadas de tudo e leva na agência. Depois de 4 horas perdidas, a atendente orienta a aguardar a análise em casa.',
        notify: true,
        stress: 10
    },
    {
        id: '3',
        title: 'Sistema fora do ar',
        story: 'Alguma coisa deu errado. Você quer saber a situação do seu requerimento mas o site  está fora do ar, e você fica sem saber se há atualizações.',
        notify: false,
        stress: 10
    },
    {
        id: '4',
        title: 'Notícia ruim',
        story: 'Você acessa o site do INSS, mas não tem nenhuma mudança no seu requerimento por enquanto. Enquanto isso, no jornal só há notícias ruins. Você teme pelo seu futuro.',
        notify: false,
        stress: 5
    },
    {
        id: '5',
        title: 'Acho que eu consigo...',
        story: 'Seu requerimento está em análise. Você resolve se informar e acessa um link sobre a reforma da previdência. São cinco regras de transição, então você calcula seu tempo de contribuição em 1998, depois em 2019, multiplica pelo pedágio... Depois de 3 horas você continua sem entender nada!',
        notify: false,
        stress: 10
    },
    {
        id: '6',
        title: 'Notícia boa',
        story: 'O seu benefício foi concedido. O valor não chega a ser o mesmo do seu salário, mas é melhor do que nada.',
        notify: true,
        stress: 0
    }

]

let stress = 0;
let time = 0;
let deck = [1,5,4,3,4,4,4,4,4,4,4,4,2,4,4,4,4,3,4,4,4,4,4,4,6]

const drawCard = () => {
  time++;
  return deck.shift();
}

const stressUp = (card) => stress += card.stress

const gameover = () => {
  activeBtn.style.display = "none";
  waitBtn.style.display = "none";
}

const win = () => {
  avatarDisplay.src="images/end-guy.png";
  message.textContent = 'Você conseguiu'
}
const die = () => {
  avatarDisplay.src="images/dead.png";
  message.textContent = 'Você perdeu';
  message.classList.add('fail')
}

const displayRender = (card) => {
  stressDisplay.value = stress
  timeDisplay.textContent = time
  titleDisplay.textContent = card.title
  storyDisplay.textContent = card.story
  if(card.id == 6) {
    gameover();
    win();
  } else if (stress >= 100){
    gameover();
    die();
  }
}

const drawActive = () =>  {
  let drawnCardId = drawCard();
  let drawnCard = cards.find(x => x.id == drawnCardId);
  stressUp(drawnCard);
  displayRender(drawnCard)
}

const drawPassive = () => {
  do {
    let drawnCardId = drawCard();
    var drawnCard = cards.find(x => x.id == drawnCardId);
  } 
  while (!drawnCard.notify);
  stressUp(drawnCard);
  displayRender(drawnCard);
}

activeBtn.addEventListener('click', drawActive);
waitBtn.addEventListener('click', drawPassive);


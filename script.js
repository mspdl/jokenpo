var nomeJogador;
var escolhaJogador;
var escolhaComputador;
var pontosJogador = 0;
var pontosComputador = 0;
let timeoutID;

do {
    nomeJogador = prompt('Qual é o seu nome?');
} while (!nomeJogador);

definirNomeJogador(nomeJogador);
atualizarMensagem(`Bem vindo ${nomeJogador}, está preparado? Escolha uma opção acima...`);
document.getElementById('jogador-pontos').innerHTML = pontosJogador;
document.getElementById('computador-pontos').innerHTML = pontosJogador;
document.getElementById('jogador').classList.add('esperando');

function atualizarMensagem(mensagem) {
    document.getElementById('mensagem').innerHTML = mensagem;
}

function definirNomeJogador(novoNome) {
    document.getElementById('jogador-nome').innerHTML = novoNome;
}

function somarPontosJogador() {
    pontosJogador++;
    document.getElementById('jogador-pontos').innerHTML = pontosJogador;
}

function somarPontosComputador() {
    pontosComputador++;
    document.getElementById('computador-pontos').innerHTML = pontosComputador;
}

function mostrarEscolha(quem, escolha) {
    document.getElementById(quem + '-escolha-' + escolha).classList.add('selecionado');
    document.getElementById('jogador').classList.remove('esperando');

    document.getElementById('jogador').classList.add('jogando');
    document.getElementById('computador').classList.add('jogando');
}

function ocultarEscolha() {
    document.getElementById('jogador-escolha-1').classList.remove('selecionado');
    document.getElementById('jogador-escolha-2').classList.remove('selecionado');
    document.getElementById('jogador-escolha-3').classList.remove('selecionado');
    document.getElementById('computador-escolha-1').classList.remove('selecionado');
    document.getElementById('computador-escolha-2').classList.remove('selecionado');
    document.getElementById('computador-escolha-3').classList.remove('selecionado');

    document.getElementById('jogador').classList.add('esperando');
    document.getElementById('jogador').classList.remove('jogando');
    document.getElementById('computador').classList.remove('jogando');
}

document.getElementById('jogador-escolha-1').onclick = function () { jogar(1) };
document.getElementById('jogador-escolha-2').onclick = function () { jogar(2) };
document.getElementById('jogador-escolha-3').onclick = function () { jogar(3) };

function resetarJogada(){
    ocultarEscolha();
    atualizarMensagem(`${nomeJogador} escolha uma opção...`);
}


function jogar(escolha) {
    // 1 = pedra
    // 2 = papel
    // 3 = tesoura
    if(timeoutID){
        resetarJogada();
        clearTimeout(timeoutID);
    }

    escolhaJogador = escolha;
    mostrarEscolha('jogador', escolhaJogador);

    escolhaComputador = sortear(1, 3);
    mostrarEscolha('computador', escolhaComputador);

    var ganhador = calcularEscolha(escolhaJogador, escolhaComputador);
    if (ganhador === 0) {
        atualizarMensagem("Empatou!");
    } else if (ganhador === 1) {
        atualizarMensagem(`Ponto para ${nomeJogador}.`);
        somarPontosJogador();
    } else {
        atualizarMensagem("Ponto para Computador.");
        somarPontosComputador();
    }

    timeoutID = setTimeout(resetarJogada, 2000);
    
}

function sortear(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularEscolha(escolhaJogador, escolhaComputador) {
    // 0 = empate
    // 1 = jogador
    // 2 = computador
    if (escolhaJogador === escolhaComputador) {
        return 0;
    }
    if (escolhaJogador === 1) { // Jogador joga Pedra
        if (escolhaComputador === 2) { // Computador joga Papel
            return 2; // Pedra perde para Papel (Computador vence)
        }
        else { // Computador joga Tesoura
            return 1; // Pedra vence de Tesoura (Jogador vence)
        }
    }
    else if (escolhaJogador === 2) { // Jogador joga Papel
        if (escolhaComputador === 3) { // Computador joga Tesoura
            return 2; // Papel perde para Tesoura (Computador vence)
        }
        else { // Computador joga Pedra
            return 1; // Papel vence de Pedra (Jogador vence)
        }
    }
    else { // Jogador joga Tesoura
        if (escolhaComputador === 1) { // Computador joga Pedra
            return 2; // Tesoura perde para Pedra (Computador vence)
        }
        else { // Computador joga Papel
            return 1; // Tesoura vence de Papel (Jogador vence)
        }
    }
}
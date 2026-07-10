let nivel = "";
let perguntas = [];
let indice = 0;
let acertos = 0;


function escolherNivel(n){

    nivel = n;

    document.getElementById("lobby").style.display = "none";

    document.getElementById("quiz").style.display = "block";


    indice = 0;
    acertos = 0;


    perguntas = bancoPerguntas[nivel];


    mostrarPergunta();

}



function mostrarPergunta(){


    if(indice >= perguntas.length){

        finalizar();
        return;

    }


    let p = perguntas[indice];


    document.getElementById("contador").innerHTML =
    "Pergunta " + (indice + 1) + " de " + perguntas.length;



    let progresso = ((indice + 1) / perguntas.length) * 100;


    document.getElementById("barra").style.width =
    progresso + "%";



    document.getElementById("pergunta").innerHTML =
    p.pergunta;



    let html = "";


    p.alternativas.forEach((alt,i)=>{


        html += `
        <button onclick="responder(${i})">
        ${alt}
        </button>
        `;


    });


    document.getElementById("alternativas").innerHTML = html;


}




function responder(opcao){


    let botoes = document.querySelectorAll("#alternativas button");


    botoes.forEach(botao=>{

        botao.disabled = true;

    });



    if(opcao == perguntas[indice].correta){


        acertos++;


        botoes[opcao].classList.add("acertou");



    }else{


        botoes[opcao].classList.add("errou");


        botoes[perguntas[indice].correta]
        .classList.add("acertou");


    }



    setTimeout(()=>{


        indice++;


        mostrarPergunta();


    },1000);



}




function finalizar(){


    document.getElementById("quiz").style.display = "none";


    document.getElementById("resultado").style.display = "block";



    let texto = "";

    let medalha = "";



    if(acertos <= 10){


        texto = "😕 Resultado: Ruim";

        medalha = "🥉";


    }else if(acertos <= 15){


        texto = "🙂 Resultado: Médio";

        medalha = "🥈";


    }else if(acertos <= 20){


        texto = "😃 Resultado: Bom";

        medalha = "🥇";


    }else{


        texto = "🏆 Resultado: Ótimo!";

        medalha = "🏆";


    }




    document.getElementById("medalha").innerHTML = medalha;



    let maiorPontuacao =
    localStorage.getItem("maiorPontuacao") || 0;



    if(acertos > maiorPontuacao){


        localStorage.setItem("maiorPontuacao", acertos);


        maiorPontuacao = acertos;


    }



    document.getElementById("pontuacao").innerHTML =

    "Você acertou " + acertos +
    " de " + perguntas.length +
    " perguntas.<br>" +

    texto +

    "<br>🏅 Maior pontuação: " +
    maiorPontuacao;


}




// Tela de carregamento

window.onload = function(){


    setTimeout(()=>{


        document.getElementById("splash").style.display="none";


    },2000);


}
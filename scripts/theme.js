window.addEventListener("DOMContentLoaded",()=>{

    if(

        localStorage.getItem("nightMode")

        === "true"

    ){

        document.body.classList.add("night-mode");

    }

    atualizarIcone();

});

function alternarModoNoturno(){

    document.body.classList.toggle("night-mode");

    localStorage.setItem(

        "nightMode",

        document.body.classList.contains("night-mode")

    );

    atualizarIcone();

}

function atualizarIcone(){

    const icone =
        document.getElementById("iconeTema");

    if(!icone) return;

    icone.style.transform = "rotate(180deg)";
    icone.style.opacity = "0";

    setTimeout(()=>{

        if(document.body.classList.contains("night-mode")){

            icone.src =
                "../assets/imagens/sun.png";

            icone.alt =
                "Modo Claro";

        }

        else{

            icone.src =
                "../assets/imagens/moon.png";

            icone.alt =
                "Modo Escuro";

        }

        icone.style.opacity = "1";
        icone.style.transform = "rotate(360deg)";

    },150);

}
// ==========================
// CONTADOR DE ACESSOS
// ==========================

let acessos =
    Number(
        localStorage.getItem("acessosResilia")
    ) || 0;

acessos++;

localStorage.setItem(
    "acessosResilia",
    acessos
);

// ==========================
// VERIFICA AVALIAÇÃO
// ==========================

verificarAvaliacao();

function verificarAvaliacao(){

    const avaliacaoRespondida =
        localStorage.getItem(
            "avaliacaoRespondida"
        );

    const avaliacaoAdiada =
        Number(
            localStorage.getItem(
                "avaliacaoAdiada"
            )
        ) || 0;

    if(

        !avaliacaoRespondida &&

        acessos >= 5 &&

        acessos >= avaliacaoAdiada

    ){

        setTimeout(()=>{

            abrirModalAvaliacao();

        },1500);

    }

}

// ==========================
// MODAL
// ==========================

function abrirModalAvaliacao(){

    const modal =
        document.getElementById(
            "modalAvaliacao"
        );

    if(modal){

        modal.classList.remove("hidden");

    }

}

function lembrarDepois(){

    localStorage.setItem(

        "avaliacaoAdiada",

        acessos + 5

    );

    document
        .getElementById(
            "modalAvaliacao"
        )
        ?.classList
        .add("hidden");

}

function responderAvaliacao(){

    localStorage.setItem(

        "avaliacaoRespondida",

        true

    );

    document
        .getElementById(
            "modalAvaliacao"
        )
        ?.classList
        .add("hidden");

    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSc9_rVIgEVw_Vi1IbSI8rOZKTzotnDtUeFQ06w-VHtq1UCYPg/viewform?embedded=true",
        "_blank"
    );

}

// ===========================
// TERMO DE USO
// ===========================

verificarTermo();

function verificarTermo(){

    const aceitou =
        localStorage.getItem(
            "termoAceito"
        );

    if(!aceitou){

        const modal =
            document.getElementById(
                "modalTermo"
            );

        if(modal){

            modal.classList.remove(
                "hidden"
            );

        }

    }

}
const checkbox =
    document.getElementById(
        "aceiteTermo"
    );

if(checkbox){

    checkbox.addEventListener(
        "change",
        ()=>{

            document
                .getElementById(
                    "btnEntrar"
                )
                .disabled =
                !checkbox.checked;

        }
    );

}
function fecharTermo(){

    localStorage.setItem(

        "termoAceito",

        true

    );

    document
        .getElementById(
            "modalTermo"
        )
        .classList
        .add("hidden");

}
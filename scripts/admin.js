async function loadEmotionTimeline() {

    // =========================
    // BUSCA LOGS
    // =========================

    const { data, error } =
        await supabaseClient
            .from('page_access_logs')
            .select('*')
            .order('created_at', { ascending: false });
        
    if (error) {

        console.error(error);
        return;
    }

// =========================
// TENDENCIA EMOCIONAL
// =========================
    const levels = {

    baixo: 0,
    leve: 0,
    moderado: 0,
    elevado: 0,
    crítico: 0

};

data.forEach(log => {

    const level =
        log.stress_level
            .toLowerCase();

    if (
        levels[level] !==
        undefined
    ) {

        levels[level]++;
    }
});

let tendencia =
    "Baixo";

let maior = 0;

Object.entries(levels)
    .forEach(([nivel, valor]) => {

        if (valor > maior) {

            maior = valor;
            tendencia = nivel;
        }
    });

document.getElementById(
    "topPage"
).textContent =
    tendencia;
// =========================
// TOTAL DE ACESSOS
// =========================

document.getElementById(
    "totalViews"
).textContent = data.length;





    // =========================
    // CONTAINER
    // =========================

    const container =
        document.getElementById('analyticsCharts');

    container.innerHTML = '';

    // =========================
    // AGRUPAR POR DATA
    // =========================

    const groupedByDate = {};

    data.forEach(log => {

        const date =
            new Date(log.created_at + 'Z');

        const formattedDate =
            date.toLocaleDateString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            });

        const formattedHour =
            date.toLocaleTimeString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit'
            });

        if (!groupedByDate[formattedDate]) {

            groupedByDate[formattedDate] = {

                logs: [],
                lastHour: formattedHour

            };
        }

        groupedByDate[formattedDate]
            .logs
            .push(log);
    });

    // =========================
    // LOOP DOS DIAS
    // =========================

    Object.entries(groupedByDate)
        .forEach(([date, info], index) => {

        const logs = info.logs;

        // =========================
        // CONTAGEM EMOCIONAL
        // =========================

        const levels = {

            baixo: 0,
            leve: 0,
            moderado: 0,
            elevado: 0,
            crítico: 0

        };

        logs.forEach(log => {

            const level =
                log.stress_level.toLowerCase();

            if (levels[level] !== undefined) {

                levels[level]++;

            }
        });

        // =========================
        // TOTAL
        // =========================

        const total =
            Object.values(levels)
                .reduce((a, b) => a + b, 0);

        // =========================
        // NIVEL PREDOMINANTE
        // =========================

        let dominant = 'baixo';
        let highest = 0;

        Object.entries(levels)
            .forEach(([level, value]) => {

            if (value > highest) {

                highest = value;
                dominant = level;

            }
        });

        // =========================
        // COR PRINCIPAL
        // =========================

        const dominantColors = {

            baixo: 'bg-blue-500',
            leve: 'bg-green-500',
            moderado: 'bg-yellow-400',
            elevado: 'bg-orange-500',
            crítico: 'bg-red-500'

        };

        // =========================
        // BARRA TOTAL
        // =========================

        const barWidth =
            Math.min(total * 12, 100);

        // =========================
        // HTML
        // =========================

        const timelineHTML = logs.map(log => {

    const logDate =
                new Date(log.created_at + 'Z');

            const hour =
                logDate.toLocaleTimeString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour: '2-digit',
                    minute: '2-digit'
                });

            const stress =
                log.stress_level;

            const stressColors = {

                baixo: 'bg-blue-500',
                leve: 'bg-green-500',
                moderado: 'bg-yellow-400',
                elevado: 'bg-orange-500',
                crítico: 'bg-red-500'

            };

            return `

                <div class="flex items-center justify-between bg-surface-container-high rounded-xl px-4 py-3">

                    <div class="flex items-center gap-3">

                        <div class="w-3 h-3 rounded-full ${stressColors[stress.toLowerCase()]}"></div>

                        <span class="text-body-sm text-on-surface">

                            ${hour}

                        </span>

                    </div>

                    <span class="text-body-sm font-semibold capitalize text-primary">

                        ${stress}

                    </span>

                </div>

            `;

        }).join('');
        container.innerHTML += `

            <div class="bg-surface-container rounded-3xl p-5">

                <!-- HEADER -->
                <div
                    class="flex items-center justify-between mb-4 cursor-pointer"
                    onclick="toggleStress(${index})">

                    <div>

                        <h3 class="font-headline-sm text-on-surface">

                            ${date}

                        </h3>

                        <p class="text-body-sm text-on-surface-variant">

                            Último acesso às ${info.lastHour}

                        </p>

                    </div>

                    <span
                        id="arrow-${index}"
                        class="material-symbols-outlined text-primary transition-all duration-300">

                        expand_more

                    </span>

                </div>

                <!-- BARRA -->
                <div
                    class="w-full h-5 rounded-full overflow-hidden bg-surface-container-high mb-3">

                    <div
                        class="h-full rounded-full ${dominantColors[dominant]} transition-all duration-700"
                        style="width:${barWidth}%">

                    </div>

                </div>

                <!-- TEXTO -->
                <div class="mb-4">

                    <p class="text-body-sm text-on-surface-variant">

                        Predominância emocional:

                        <span class="font-semibold text-primary capitalize">

                            ${dominant}

                        </span>

                    </p>

                </div>

                <!-- DETALHES -->
                <div
                    id="stress-${index}"
                    class="hidden flex flex-col gap-4 pt-2">
                    
                    ${renderStressBar(
                        "Baixo",
                        levels.baixo,
                        "bg-blue-500"
                    )}

                    ${renderStressBar(
                        "Leve",
                        levels.leve,
                        "bg-green-500"
                    )}

                    ${renderStressBar(
                        "Moderado",
                        levels.moderado,
                        "bg-yellow-400"
                    )}

                    ${renderStressBar(
                        "Elevado",
                        levels.elevado,
                        "bg-orange-500"
                    )}

                    ${renderStressBar(
                        "Crítico",
                        levels.crítico,
                        "bg-red-500"
                    )}
                    <div class="pt-4 border-t border-outline-variant">

                    <p class="text-body-sm font-semibold text-on-surface mb-3">

                        Linha do tempo emocional

                    </p>

                    <div class="flex flex-col gap-2">

                        ${timelineHTML}

                    </div>

                </div>
                </div>
                    
            </div>
            

        `;
    });
}

// =========================
// BARRAS
// =========================

function renderStressBar(title, value, color) {

    const width =
        Math.min(value * 18, 100);

    return `

        <div>

            <div class="flex justify-between mb-1">

                <span class="text-body-sm text-on-surface">

                    ${title}

                </span>

                <span class="text-body-sm font-semibold text-primary">

                    ${value}

                </span>

            </div>

            <div class="w-full h-3 rounded-full bg-surface-container-high overflow-hidden">

                <div
                    class="${color} h-full rounded-full transition-all duration-500"
                    style="width:${width}%">

                </div>

            </div>

        </div>

    `;
}

// =========================
// EXPANDIR / FECHAR
// =========================

function toggleStress(index) {

    const content =
        document.getElementById(`stress-${index}`);

    const arrow =
        document.getElementById(`arrow-${index}`);

    content.classList.toggle('hidden');

    arrow.classList.toggle('rotate-180');
}

// =========================
// INICIAR
// =========================

window.addEventListener('DOMContentLoaded', () => {

    loadEmotionTimeline();

});
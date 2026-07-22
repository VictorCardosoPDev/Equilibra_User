const supabaseUrl = 'https://xashpazesqmnqsmxtedk.supabase.co';
const supabaseKey = 'sb_publishable_5SfyNFm-5N7uSwBxcfe7gw_nfnvIFfk';

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function registerAccess(stressLevel) {

    const { error } = await supabaseClient
        .from("page_access_logs")
        .insert({

            path: window.location.pathname,

            stress_level: stressLevel

        });

    if (error) {

        console.error(
            "Erro ao registrar acesso:",
            error
        );

    } else {

        console.log(
            "Acesso registrado!"
        );
    }
}
function saveStressAccess() {

    if (currentStressLevel === 0) {

        return;

    }

    registerAccess(
        stressLevels[currentStressLevel].title
    );
}
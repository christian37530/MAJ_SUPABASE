// keep-alive.js
// Fait une requête légère à l'API REST de Supabase pour signaler de l'activité
// et éviter que le projet gratuit soit suspendu pour inactivité.
// N'utilise aucune dépendance externe : fonctionne avec le fetch natif de Node.js 18+.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Erreur : SUPABASE_URL ou SUPABASE_ANON_KEY manquant(s).');
  process.exit(1);
}

// Remplacez 'ma_table' par le nom d'une vraie table de votre projet.
const TABLE = 'deco';

async function ping() {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE}?select=id&limit=1`;

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Ping échoué : ${response.status} ${response.statusText} — ${body}`);
    process.exit(1);
  }

  console.log(`Ping Supabase réussi le ${new Date().toISOString()}`);
}

ping().catch((err) => {
  console.error('Ping échoué :', err.message);
  process.exit(1);
});

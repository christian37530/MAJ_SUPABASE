// keep-alive.js
// Fait une requête légère à Supabase pour signaler de l'activité
// et éviter que le projet gratuit soit suspendu pour inactivité.

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Erreur : SUPABASE_URL ou SUPABASE_ANON_KEY manquant(s).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function ping() {
  // Remplacez 'ma_table' par le nom d'une vraie table de votre projet.
  // On limite à 1 ligne pour que ce soit le plus léger possible.
  const { error } = await supabase
    .from('deco')    .select('id')
    .limit(1);

  if (error) {
    console.error('Ping échoué :', error.message);
    process.exit(1);
  }

  console.log(`Ping Supabase réussi le ${new Date().toISOString()}`);
}

ping();

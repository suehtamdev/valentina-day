import { createClient } from '@supabase/supabase-js';

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { photos, covers, thumbs, tracks, msgText, msgFrom, albumCover } = req.body;

    const data = {
      id: 'valentina-data',
      photos: photos || [],
      covers: covers || [],
      thumbs: thumbs || [],
      tracks: tracks || [],
      msgText: msgText || '',
      msgFrom: msgFrom || '',
      albumCover: albumCover || '',
      updatedAt: new Date().toISOString()
    };

    // Inserir ou atualizar dados
    const { error } = await supabase
      .from('galeria_data')
      .upsert(data, { onConflict: 'id' });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

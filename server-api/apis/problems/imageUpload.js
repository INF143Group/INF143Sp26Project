import {supabase} from '../../../utils/supabase.js';

export async function uploadProblemImage(file) {
  const filename = `${Date.now()}-${file.originalname}`;
  const {data, error} = await supabase.storage
    .from('problem-images')
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });
  if (error) throw error;
  const {data: {publicUrl}} = supabase.storage
    .from('problem-images')
    .getPublicUrl(filename);
  return publicUrl;
}
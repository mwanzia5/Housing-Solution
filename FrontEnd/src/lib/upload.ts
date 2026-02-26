/**
 * Upload a housing image to Supabase Storage.
 * Bucket: housing-images. Path: {providerId}/{uuid}.
 * Returns public URL or throws on failure.
 */
import { supabase } from './supabase';

const BUCKET = 'housing-images';

export async function uploadHousingImage(
  file: File,
  providerId: string
): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${providerId}/${crypto.randomUUID()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return urlData.publicUrl;
}

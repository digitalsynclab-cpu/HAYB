import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Json } from '@/types/supabase';

export async function writeAuditLog(
  supabase: SupabaseClient<Database>,
  params: { actorId: string | null; action: string; entityType: string; entityId?: string | null; oldData?: Json; newData?: Json },
) {
  await supabase.from('audit_logs').insert({
    actor_id: params.actorId,
    action: params.action,
    entity_type: params.entityType,
    entity_id: params.entityId ?? null,
    old_data: params.oldData ?? null,
    new_data: params.newData ?? null,
  });
}

export async function notify(
  supabase: SupabaseClient<Database>,
  params: { profileId: string; title: string; body?: string; type: string; metadata?: Json },
) {
  await supabase.from('notifications').insert({
    profile_id: params.profileId,
    title: params.title,
    body: params.body,
    type: params.type,
    metadata: params.metadata ?? {},
  });
}

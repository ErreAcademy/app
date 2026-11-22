-- ERRE Academy — esquema v1 (Supabase / Postgres)
-- Fase 1: Complete primero. Cada cliente solo ve lo suyo; el coach ve a sus clientes.

create extension if not exists "pgcrypto";

-- ---------- Perfiles ----------
create type plan_t as enum ('basic','complete','elite');
create type role_t as enum ('client','coach');
create type goal_t as enum ('bajar','complete','aumentar','salud');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role role_t not null default 'client',
  coach_id uuid references profiles(id),          -- a qué coach pertenece el cliente
  full_name text,
  sex text,
  birth_date date,
  height_cm numeric,
  start_weight_kg numeric,
  plan plan_t not null default 'basic',
  goal goal_t not null default 'complete',         -- prioridad principal
  level text default 'Principiante',
  block int default 1,                             -- bloque (Basic)
  train_days int[] default '{0,1,3,4}',            -- 0=lunes ... 6=domingo
  injuries text,
  step_goal int default 8000,
  fc_max int,
  avatar_path text,
  consent_at timestamptz,                          -- consentimiento de datos de salud y fotos
  created_at timestamptz default now()
);

-- ---------- Biblioteca de ejercicios ----------
create table exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  pattern text,                                    -- patrón de movimiento (para el swap)
  muscle text,
  equipment text,
  level text,
  youtube_id text,
  description text,
  active boolean default true
);

-- ---------- Programas (mesociclos) ----------
create table programs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  kind text not null check (kind in ('basic','complete')),
  mesocycle int not null default 1,
  start_date date not null,
  weeks int not null,                              -- 6 Complete, 5 Basic
  status text default 'active',
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);
create table program_days (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs(id) on delete cascade,
  weekday int not null,                            -- 0..6
  title text
);
create table program_items (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references program_days(id) on delete cascade,
  block text not null,                             -- calentamiento | central | basicos | accesorios | estiramientos | cardio
  position int not null,
  exercise_id uuid references exercises(id),
  sets int, reps_min int, reps_max int,
  rir int, rest_s int, tempo text,
  ref_kg numeric,                                  -- peso de referencia (solo Complete)
  note text
);

-- ---------- Registros del cliente ----------
create table session_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  log_date date not null,
  program_item_id uuid references program_items(id),
  exercise_id uuid references exercises(id),       -- ejercicio realmente hecho (captura el swap)
  swapped boolean default false,
  extra boolean default false
);
create table set_logs (
  id uuid primary key default gen_random_uuid(),
  session_log_id uuid not null references session_logs(id) on delete cascade,
  set_no int not null,
  kg numeric, reps int, rpe numeric,
  dropset boolean default false,
  done boolean default true
);
create table cardio_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  log_date date not null,
  modality text, minutes int, avg_hr int,
  zone int, by_feel int, note text, extra boolean default false
);
create table session_feedback (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  log_date date not null,
  grp text not null check (grp in ('fuerza','cardio','calma')),
  intensity int check (intensity between 1 and 10),
  feel text check (feel in ('energia','bien','cansado','molestia')),
  note text,
  unique (client_id, log_date, grp)
);
create table weights (
  client_id uuid references profiles(id) on delete cascade,
  log_date date, kg numeric not null,
  primary key (client_id, log_date)
);
create table steps (
  client_id uuid references profiles(id) on delete cascade,
  log_date date, steps int not null,
  primary key (client_id, log_date)
);
create table daily_tasks (                         -- checks de respiración, hábitos, alimentación
  client_id uuid references profiles(id) on delete cascade,
  log_date date, task_key text, done boolean default true,
  primary key (client_id, log_date, task_key)
);
create table progress_photos (                     -- los archivos viven en Storage privado
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  month text not null,                             -- 'YYYY-MM'
  angle text not null check (angle in ('front','side','back')),
  storage_path text not null,
  taken_at date default current_date,
  unique (client_id, month, angle)
);

-- ---------- Coach ↔ cliente ----------
create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  kind text default 'msg' check (kind in ('msg','session','call')),
  body text,
  ref_feedback_id uuid references session_feedback(id),
  created_at timestamptz default now(),
  read_at timestamptz
);
create table calls (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  starts_at timestamptz not null,
  duration_min int default 45,
  created_by uuid references profiles(id)
);
create table weekly_reports (                      -- reporte del sábado
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles(id) on delete cascade,
  week_start date not null,
  completed text, pain text, load text,
  nutrition int, energy int, sleep int, stress int,
  comment text, created_at timestamptz default now(),
  unique (client_id, week_start)
);


-- ---------- Funciones de apoyo ----------
create or replace function public.is_coach_of(c uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from profiles p where p.id = c and p.coach_id = auth.uid());
$$;
create or replace function public.is_coach() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'coach');
$$;
create or replace function public.my_coach() returns uuid
language sql security definer stable set search_path = public as $$
  select coach_id from profiles where id = auth.uid();
$$;
revoke execute on function public.is_coach_of(uuid), public.is_coach(), public.my_coach() from public, anon;
grant execute on function public.is_coach_of(uuid), public.is_coach(), public.my_coach() to authenticated;

-- Perfil automático al registrarse; el cliente queda asignado al primer coach.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, coach_id)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''),
          (select id from public.profiles where role='coach' order by created_at limit 1));
  return new;
end $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- El cliente no puede cambiar su rol, plan ni coach; solo el coach (o el servidor).
create or replace function public.protect_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_coach_of(new.id) then
    new.role := old.role; new.plan := old.plan; new.coach_id := old.coach_id;
  end if;
  return new;
end $$;
revoke execute on function public.protect_profile() from public, anon, authenticated;
create trigger protect_profile_cols before update on profiles
  for each row execute function public.protect_profile();

-- ---------- Row Level Security ----------
do $$
declare t text;
begin
  foreach t in array array['profiles','programs','program_days','program_items','exercises',
    'session_logs','set_logs','cardio_logs','session_feedback','weights','steps','daily_tasks',
    'progress_photos','chat_messages','calls','weekly_reports']
  loop execute format('alter table public.%I enable row level security', t); end loop;
end $$;

-- Perfiles
create policy "ver perfil propio, de mi cliente o de mi coach" on profiles for select to authenticated
  using (id = (select auth.uid()) or coach_id = (select auth.uid()) or id = public.my_coach());
create policy "editar mi perfil" on profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "coach edita a su cliente" on profiles for update to authenticated
  using (coach_id = (select auth.uid())) with check (coach_id = (select auth.uid()));

-- Registros del cliente: él lee/escribe lo suyo; su coach lee.
do $$
declare t text;
begin
  foreach t in array array['session_logs','cardio_logs','session_feedback','weights','steps',
    'daily_tasks','progress_photos','weekly_reports']
  loop
    execute format('create policy "cliente: lo suyo" on public.%I for all to authenticated using (client_id = (select auth.uid())) with check (client_id = (select auth.uid()))', t);
    execute format('create policy "coach: lee a sus clientes" on public.%I for select to authenticated using (public.is_coach_of(client_id))', t);
  end loop;
end $$;

create policy "series: cliente" on set_logs for all to authenticated
  using (exists (select 1 from session_logs s where s.id = session_log_id and s.client_id = (select auth.uid())))
  with check (exists (select 1 from session_logs s where s.id = session_log_id and s.client_id = (select auth.uid())));
create policy "series: coach lee" on set_logs for select to authenticated
  using (exists (select 1 from session_logs s where s.id = session_log_id and public.is_coach_of(s.client_id)));

-- Programas: el cliente lee el suyo; el coach arma los de sus clientes.
create policy "programa: ver" on programs for select to authenticated
  using (client_id = (select auth.uid()) or public.is_coach_of(client_id));
create policy "programa: coach escribe" on programs for all to authenticated
  using (public.is_coach_of(client_id)) with check (public.is_coach_of(client_id));
create policy "dias: ver" on program_days for select to authenticated using (
  exists (select 1 from programs p where p.id = program_id and (p.client_id = (select auth.uid()) or public.is_coach_of(p.client_id))));
create policy "dias: coach escribe" on program_days for all to authenticated
  using (exists (select 1 from programs p where p.id = program_id and public.is_coach_of(p.client_id)))
  with check (exists (select 1 from programs p where p.id = program_id and public.is_coach_of(p.client_id)));
create policy "items: ver" on program_items for select to authenticated using (
  exists (select 1 from program_days d join programs p on p.id = d.program_id
          where d.id = day_id and (p.client_id = (select auth.uid()) or public.is_coach_of(p.client_id))));
create policy "items: coach escribe" on program_items for all to authenticated
  using (exists (select 1 from program_days d join programs p on p.id = d.program_id where d.id = day_id and public.is_coach_of(p.client_id)))
  with check (exists (select 1 from program_days d join programs p on p.id = d.program_id where d.id = day_id and public.is_coach_of(p.client_id)));

-- Biblioteca: todos los usuarios la leen; solo coaches la editan.
create policy "biblioteca: ver" on exercises for select to authenticated using (true);
create policy "biblioteca: coach escribe" on exercises for all to authenticated
  using (public.is_coach()) with check (public.is_coach());

-- Chat y llamadas
create policy "chat: ver" on chat_messages for select to authenticated
  using (client_id = (select auth.uid()) or public.is_coach_of(client_id));
create policy "chat: escribir como yo" on chat_messages for insert to authenticated
  with check (sender_id = (select auth.uid()) and (client_id = (select auth.uid()) or public.is_coach_of(client_id)));
create policy "chat: marcar leido" on chat_messages for update to authenticated
  using (client_id = (select auth.uid()) or public.is_coach_of(client_id));
create policy "llamada: ver" on calls for select to authenticated
  using (client_id = (select auth.uid()) or public.is_coach_of(client_id));
create policy "llamada: coach agenda" on calls for all to authenticated
  using (public.is_coach_of(client_id)) with check (public.is_coach_of(client_id));

-- ---------- Almacenamiento privado de fotos (carpeta = id del cliente) ----------
insert into storage.buckets (id, name, public) values ('photos','photos', false) on conflict do nothing;
create policy "fotos: cliente sube y ve las suyas" on storage.objects for all to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "fotos: coach ve las de sus clientes" on storage.objects for select to authenticated
  using (bucket_id = 'photos' and public.is_coach_of(((storage.foldername(name))[1])::uuid));

-- Índices para las consultas más comunes
create index on session_logs (client_id, log_date);
create index on cardio_logs (client_id, log_date);
create index on session_feedback (client_id, log_date);
create index on chat_messages (client_id, created_at);
create index on programs (client_id, status);
create index on program_days (program_id);
create index on program_items (day_id);
create index on set_logs (session_log_id);
create index on profiles (coach_id);

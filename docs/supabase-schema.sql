create table if not exists financial_centers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  kind text not null check (kind in ('expense', 'income', 'both')),
  color text,
  created_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  financial_center_id uuid references financial_centers(id),
  category_id uuid references categories(id),
  type text not null check (type in ('expense', 'income')),
  transaction_date date not null,
  amount numeric(12, 2) not null check (amount >= 0),
  merchant text,
  description text,
  payment_method text,
  source text not null default 'manual',
  attachment_url text,
  raw_payload jsonb,
  confidence numeric(4, 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists monthly_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category_id uuid references categories(id),
  financial_center_id uuid references financial_centers(id),
  month date not null,
  limit_amount numeric(12, 2) not null check (limit_amount >= 0),
  created_at timestamptz not null default now()
);

create table if not exists assistant_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  key text not null,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists transactions_user_date_idx on transactions (user_id, transaction_date desc);
create index if not exists transactions_user_type_idx on transactions (user_id, type);
create index if not exists transactions_raw_payload_idx on transactions using gin (raw_payload);

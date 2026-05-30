-- ============================================================
--  Migration: Events
--  supabase/migrations/20260508000002_events_schema.sql
-- ============================================================


-- ============================================================
--  TABLE: events
-- ============================================================
create table public.events (
  event_id        serial          primary key,
  interviewee_id  uuid            not null
                                  references public.users (user_id)
                                  on delete cascade,
  interviewer_id  uuid            not null
                                  references public.users (user_id)
                                  on delete cascade,
  event_at        timestamptz     not null,
  notes           text            check (char_length(notes) <= 300),
  created_at      timestamptz     not null default now(),

  constraint events_interviewer_ne_interviewee
    check (interviewer_id <> interviewee_id)
);

comment on table  public.events                is 'Scheduled interview events between one interviewer and one interviewee.';
comment on column public.events.event_at       is 'Combined date and time of the interview (timezone-aware).';
comment on column public.events.notes          is 'Optional notes about the event, max 300 characters.';
comment on column public.events.created_at     is 'Timestamp of when the event was scheduled.';

create index idx_events_interviewee_id on public.events (interviewee_id);
create index idx_events_interviewer_id on public.events (interviewer_id);
create index idx_events_event_at       on public.events (event_at);

-- ============================================================
--  Row Level Security
-- ============================================================
alter table public.events enable row level security;

-- Both participants can view the event
create policy "events: select participants"
  on public.events for select
  using (
    auth.uid() = interviewee_id
    or auth.uid() = interviewer_id
  );

-- Only the interviewer can schedule (insert) an event
create policy "events: insert as interviewer"
  on public.events for insert
  with check (auth.uid() = interviewer_id);

-- Only the interviewer can update an event
create policy "events: update as interviewer"
  on public.events for update
  using (auth.uid() = interviewer_id);

-- Only the interviewer can cancel (delete) an event
create policy "events: delete as interviewer"
  on public.events for delete
  using (auth.uid() = interviewer_id);

CREATE TABLE problems (
    problem_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(10) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    tags TEXT[],
    image_url VARCHAR(512),
    is_approved BOOLEAN DEFAULT FALSE,
    submitted_by UUID REFERENCES users(user_id),
    reviewed_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE problems ADD COLUMN status VARCHAR(20)
    DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected'));
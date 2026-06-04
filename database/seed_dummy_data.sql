-- ============================================================
--  Dummy Data Seed – 100 Users + Auth Tokens + Messages
--  Compatible with the Supabase schema (schema.sql)
-- ============================================================

-- ── Temporarily disable RLS so the seed can run as service role ──
alter table public.users        disable row level security;
alter table public.auth_tokens  disable row level security;
alter table public.messages     disable row level security;


-- ============================================================
--  USERS  (100 rows)
-- ============================================================
insert into public.users
  (user_id, username, email, password_hash, display_name, role, is_active, created_at, last_login_at)
values
  ('00000000-0000-0000-0000-000000000001', 'alice_wonder',    'alice.wonder@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Alice Wonder',    'admin', true,  now() - interval '365 days', now() - interval '1 day'),
  ('00000000-0000-0000-0000-000000000002', 'bob_builder',     'bob.builder@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Bob Builder',     'user',  true,  now() - interval '360 days', now() - interval '2 days'),
  ('00000000-0000-0000-0000-000000000003', 'carol_danvers',   'carol.danvers@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Carol Danvers',   'user',  true,  now() - interval '355 days', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000004', 'dave_lister',     'dave.lister@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Dave Lister',     'user',  true,  now() - interval '350 days', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000005', 'eve_polastri',    'eve.polastri@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Eve Polastri',    'user',  true,  now() - interval '345 days', now() - interval '10 hours'),
  ('00000000-0000-0000-0000-000000000006', 'frank_castle',    'frank.castle@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Frank Castle',    'user',  false, now() - interval '340 days', now() - interval '30 days'),
  ('00000000-0000-0000-0000-000000000007', 'grace_hopper',    'grace.hopper@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Grace Hopper',    'admin', true,  now() - interval '335 days', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000008', 'henry_cavill',    'henry.cavill@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Henry Cavill',    'user',  true,  now() - interval '330 days', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000009', 'iris_west',       'iris.west@example.com',       '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Iris West',       'user',  true,  now() - interval '325 days', now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000010', 'jack_sparrow',    'jack.sparrow@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Jack Sparrow',    'user',  true,  now() - interval '320 days', now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000011', 'kate_bishop',     'kate.bishop@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Kate Bishop',     'user',  true,  now() - interval '315 days', now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000012', 'liam_neeson',     'liam.neeson@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Liam Neeson',     'user',  false, now() - interval '310 days', now() - interval '60 days'),
  ('00000000-0000-0000-0000-000000000013', 'mia_wallace',     'mia.wallace@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Mia Wallace',     'user',  true,  now() - interval '305 days', now() - interval '12 hours'),
  ('00000000-0000-0000-0000-000000000014', 'nick_fury',       'nick.fury@example.com',       '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Nick Fury',       'admin', true,  now() - interval '300 days', now() - interval '30 minutes'),
  ('00000000-0000-0000-0000-000000000015', 'olivia_pope',     'olivia.pope@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Olivia Pope',     'user',  true,  now() - interval '295 days', now() - interval '2 days'),
  ('00000000-0000-0000-0000-000000000016', 'peter_parker',    'peter.parker@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Peter Parker',    'user',  true,  now() - interval '290 days', now() - interval '3 days'),
  ('00000000-0000-0000-0000-000000000017', 'quinn_harley',    'quinn.harley@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Harley Quinn',    'user',  true,  now() - interval '285 days', now() - interval '1 day'),
  ('00000000-0000-0000-0000-000000000018', 'ross_geller',     'ross.geller@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ross Geller',     'user',  false, now() - interval '280 days', now() - interval '90 days'),
  ('00000000-0000-0000-0000-000000000019', 'sara_lance',      'sara.lance@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Sara Lance',      'user',  true,  now() - interval '275 days', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000020', 'tony_stark',      'tony.stark@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Tony Stark',      'admin', true,  now() - interval '270 days', now() - interval '15 minutes'),
  ('00000000-0000-0000-0000-000000000021', 'uma_thurman',     'uma.thurman@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Uma Thurman',     'user',  true,  now() - interval '265 days', now() - interval '7 hours'),
  ('00000000-0000-0000-0000-000000000022', 'victor_stone',    'victor.stone@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Victor Stone',    'user',  true,  now() - interval '260 days', now() - interval '9 hours'),
  ('00000000-0000-0000-0000-000000000023', 'wanda_maximoff',  'wanda.maximoff@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Wanda Maximoff',  'user',  true,  now() - interval '255 days', now() - interval '11 hours'),
  ('00000000-0000-0000-0000-000000000024', 'xena_warrior',    'xena.warrior@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Xena Warrior',    'user',  false, now() - interval '250 days', now() - interval '45 days'),
  ('00000000-0000-0000-0000-000000000025', 'yoda_master',     'yoda.master@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Master Yoda',     'admin', true,  now() - interval '245 days', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000026', 'zoe_washburne',   'zoe.washburne@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Zoe Washburne',   'user',  true,  now() - interval '240 days', now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000027', 'arya_stark',      'arya.stark@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Arya Stark',      'user',  true,  now() - interval '235 days', now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000028', 'bruce_wayne',     'bruce.wayne@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Bruce Wayne',     'admin', true,  now() - interval '230 days', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000029', 'clark_kent',      'clark.kent@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Clark Kent',      'user',  true,  now() - interval '225 days', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000030', 'diana_prince',    'diana.prince@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Diana Prince',    'user',  true,  now() - interval '220 days', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000031', 'ellie_williams',  'ellie.williams@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ellie Williams',  'user',  true,  now() - interval '215 days', now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000032', 'foggy_nelson',    'foggy.nelson@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Foggy Nelson',    'user',  false, now() - interval '210 days', now() - interval '75 days'),
  ('00000000-0000-0000-0000-000000000033', 'geralt_rivia',    'geralt.rivia@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Geralt of Rivia', 'user',  true,  now() - interval '205 days', now() - interval '10 hours'),
  ('00000000-0000-0000-0000-000000000034', 'hermione_granger','hermione.granger@example.com', '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Hermione Granger','user',  true,  now() - interval '200 days', now() - interval '2 days'),
  ('00000000-0000-0000-0000-000000000035', 'ivan_drago',      'ivan.drago@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ivan Drago',      'user',  false, now() - interval '195 days', now() - interval '50 days'),
  ('00000000-0000-0000-0000-000000000036', 'jessica_jones',   'jessica.jones@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Jessica Jones',   'user',  true,  now() - interval '190 days', now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000037', 'kara_danvers',    'kara.danvers@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Kara Danvers',    'user',  true,  now() - interval '185 days', now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000038', 'luke_cage',       'luke.cage@example.com',       '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Luke Cage',       'user',  true,  now() - interval '180 days', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000039', 'mary_poppins',    'mary.poppins@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Mary Poppins',    'user',  true,  now() - interval '175 days', now() - interval '1 day'),
  ('00000000-0000-0000-0000-000000000040', 'ned_stark',       'ned.stark@example.com',       '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ned Stark',       'user',  false, now() - interval '170 days', now() - interval '100 days'),
  ('00000000-0000-0000-0000-000000000041', 'orphan_black',    'orphan.black@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Sarah Manning',   'user',  true,  now() - interval '165 days', now() - interval '7 hours'),
  ('00000000-0000-0000-0000-000000000042', 'peggy_carter',    'peggy.carter@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Peggy Carter',    'admin', true,  now() - interval '160 days', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000043', 'quill_peter',     'quill.peter@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Peter Quill',     'user',  true,  now() - interval '155 days', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000044', 'rey_skywalker',   'rey.skywalker@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Rey Skywalker',   'user',  true,  now() - interval '150 days', now() - interval '9 hours'),
  ('00000000-0000-0000-0000-000000000045', 'sam_wilson',      'sam.wilson@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Sam Wilson',      'user',  true,  now() - interval '145 days', now() - interval '11 hours'),
  ('00000000-0000-0000-0000-000000000046', 'tara_maclay',     'tara.maclay@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Tara Maclay',     'user',  true,  now() - interval '140 days', now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000047', 'ursula_oceans',   'ursula.oceans@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ursula Oceans',   'user',  false, now() - interval '135 days', now() - interval '40 days'),
  ('00000000-0000-0000-0000-000000000048', 'vision_android',  'vision.android@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'The Vision',      'user',  true,  now() - interval '130 days', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000049', 'walter_white',    'walter.white@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Walter White',    'user',  false, now() - interval '125 days', now() - interval '80 days'),
  ('00000000-0000-0000-0000-000000000050', 'xander_harris',   'xander.harris@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Xander Harris',   'user',  true,  now() - interval '120 days', now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000051', 'yelena_belova',   'yelena.belova@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Yelena Belova',   'user',  true,  now() - interval '115 days', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000052', 'zeus_olympus',    'zeus.olympus@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Zeus Olympus',    'admin', true,  now() - interval '110 days', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000053', 'anna_karenina',   'anna.karenina@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Anna Karenina',   'user',  true,  now() - interval '108 days', now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000054', 'benedict_wong',   'benedict.wong@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Benedict Wong',   'user',  true,  now() - interval '106 days', now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000055', 'ciri_fiona',      'ciri.fiona@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Cirilla Fiona',   'user',  true,  now() - interval '104 days', now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000056', 'drax_destroyer',  'drax.destroyer@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Drax Destroyer',  'user',  false, now() - interval '102 days', now() - interval '55 days'),
  ('00000000-0000-0000-0000-000000000057', 'eleven_hopper',   'eleven.hopper@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Eleven Hopper',   'user',  true,  now() - interval '100 days', now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000058', 'finn_mertens',    'finn.mertens@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Finn Mertens',    'user',  true,  now() - interval '98 days',  now() - interval '7 hours'),
  ('00000000-0000-0000-0000-000000000059', 'gollum_smeagol',  'gollum.smeagol@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Smeagol',         'user',  false, now() - interval '96 days',  now() - interval '70 days'),
  ('00000000-0000-0000-0000-000000000060', 'hela_goddess',    'hela.goddess@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Hela Goddess',    'user',  true,  now() - interval '94 days',  now() - interval '9 hours'),
  ('00000000-0000-0000-0000-000000000061', 'iceman_bobby',    'iceman.bobby@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Bobby Drake',     'user',  true,  now() - interval '92 days',  now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000062', 'jasmine_aladdin', 'jasmine.aladdin@example.com', '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Princess Jasmine','user',  true,  now() - interval '90 days',  now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000063', 'kylo_ren',        'kylo.ren@example.com',        '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Kylo Ren',        'user',  false, now() - interval '88 days',  now() - interval '35 days'),
  ('00000000-0000-0000-0000-000000000064', 'luna_lovegood',   'luna.lovegood@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Luna Lovegood',   'user',  true,  now() - interval '86 days',  now() - interval '11 hours'),
  ('00000000-0000-0000-0000-000000000065', 'morpheus_zion',   'morpheus.zion@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Morpheus Zion',   'admin', true,  now() - interval '84 days',  now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000066', 'nora_darhk',      'nora.darhk@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Nora Darhk',      'user',  true,  now() - interval '82 days',  now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000067', 'obi_wan',         'obi.wan@example.com',         '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Obi-Wan Kenobi',  'admin', true,  now() - interval '80 days',  now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000068', 'poison_ivy',      'poison.ivy@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Pamela Isley',    'user',  true,  now() - interval '78 days',  now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000069', 'quicksilver_p',   'quicksilver.p@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Pietro Maximoff', 'user',  true,  now() - interval '76 days',  now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000070', 'rogue_anna',      'rogue.anna@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Anna Marie',      'user',  true,  now() - interval '74 days',  now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000071', 'storm_ororo',     'storm.ororo@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ororo Munroe',    'user',  true,  now() - interval '72 days',  now() - interval '10 hours'),
  ('00000000-0000-0000-0000-000000000072', 'thanos_titan',    'thanos.titan@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Thanos Titan',    'user',  false, now() - interval '70 days',  now() - interval '65 days'),
  ('00000000-0000-0000-0000-000000000073', 'ultron_ai',       'ultron.ai@example.com',       '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Ultron AI',       'user',  false, now() - interval '68 days',  now() - interval '60 days'),
  ('00000000-0000-0000-0000-000000000074', 'valkyrie_bryn',   'valkyrie.bryn@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Brunnhilde',      'user',  true,  now() - interval '66 days',  now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000075', 'wolverine_logan', 'wolverine.logan@example.com', '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Logan Howlett',   'user',  true,  now() - interval '64 days',  now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000076', 'xmen_cyclops',    'xmen.cyclops@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Scott Summers',   'user',  true,  now() - interval '62 days',  now() - interval '7 hours'),
  ('00000000-0000-0000-0000-000000000077', 'yennefer_vengerb','yennefer.v@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Yennefer',        'user',  true,  now() - interval '60 days',  now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000078', 'zemo_baron',      'zemo.baron@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Baron Zemo',      'user',  false, now() - interval '58 days',  now() - interval '55 days'),
  ('00000000-0000-0000-0000-000000000079', 'abby_miller',     'abby.miller@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Abby Miller',     'user',  true,  now() - interval '56 days',  now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000080', 'bucky_barnes',    'bucky.barnes@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Bucky Barnes',    'user',  true,  now() - interval '54 days',  now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000081', 'cassie_lang',     'cassie.lang@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Cassie Lang',     'user',  true,  now() - interval '52 days',  now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000082', 'daredevil_matt',  'daredevil.matt@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Matt Murdock',    'user',  true,  now() - interval '50 days',  now() - interval '9 hours'),
  ('00000000-0000-0000-0000-000000000083', 'emma_frost',      'emma.frost@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Emma Frost',      'user',  true,  now() - interval '48 days',  now() - interval '11 hours'),
  ('00000000-0000-0000-0000-000000000084', 'fitz_simmons',    'fitz.simmons@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Leo Fitz',        'user',  true,  now() - interval '46 days',  now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000085', 'groot_tree',      'groot.tree@example.com',      '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Groot Tree',      'user',  true,  now() - interval '44 days',  now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000086', 'hulk_banner',     'hulk.banner@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Bruce Banner',    'user',  true,  now() - interval '42 days',  now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000087', 'invisible_sue',   'invisible.sue@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Sue Storm',       'user',  true,  now() - interval '40 days',  now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000088', 'jarvis_vision',   'jarvis.vision@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'J.A.R.V.I.S.',    'admin', true,  now() - interval '38 days',  now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000089', 'kilmonger_erik',  'kilmonger.erik@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Erik Killmonger', 'user',  false, now() - interval '36 days',  now() - interval '30 days'),
  ('00000000-0000-0000-0000-000000000090', 'loki_odinson',    'loki.odinson@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Loki Odinson',    'user',  true,  now() - interval '34 days',  now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000091', 'mantis_empath',   'mantis.empath@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Mantis Empath',   'user',  true,  now() - interval '32 days',  now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000092', 'nebula_titan',    'nebula.titan@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Nebula Titan',    'user',  true,  now() - interval '30 days',  now() - interval '4 hours'),
  ('00000000-0000-0000-0000-000000000093', 'odin_allfather',  'odin.allfather@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Odin Allfather',  'admin', true,  now() - interval '28 days',  now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000094', 'punisher_frank',  'punisher.frank@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Frank Castle II', 'user',  true,  now() - interval '26 days',  now() - interval '7 hours'),
  ('00000000-0000-0000-0000-000000000095', 'rhodey_james',    'rhodey.james@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'James Rhodes',    'user',  true,  now() - interval '24 days',  now() - interval '3 hours'),
  ('00000000-0000-0000-0000-000000000096', 'shuri_wakanda',   'shuri.wakanda@example.com',   '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Shuri Wakanda',   'user',  true,  now() - interval '22 days',  now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000097', 'thor_odinson',    'thor.odinson@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Thor Odinson',    'user',  true,  now() - interval '20 days',  now() - interval '6 hours'),
  ('00000000-0000-0000-0000-000000000098', 'uatu_watcher',    'uatu.watcher@example.com',    '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Uatu Watcher',    'user',  true,  now() - interval '15 days',  now() - interval '5 hours'),
  ('00000000-0000-0000-0000-000000000099', 'venom_eddie',     'venom.eddie@example.com',     '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'Eddie Brock',     'user',  true,  now() - interval '10 days',  now() - interval '8 hours'),
  ('00000000-0000-0000-0000-000000000100', 'winter_soldier',  'winter.soldier@example.com',  '$2b$10$KIX9IVuEFtaZSvbGRu4PBOqSZXkXk1RXk1RXk1RXk1RXk1RXk1RX', 'James Barnes',    'user',  true,  now() - interval '5 days',   now() - interval '2 hours');


-- ============================================================
--  AUTH TOKENS  (~150 rows — mix of types, some expired/revoked)
-- ============================================================
insert into public.auth_tokens
  (token_id, user_id, token_hash, token_type, expires_at, created_at, is_revoked)
select
  gen_random_uuid(),
  u.user_id,
  encode(digest(u.user_id::text || t.ttype || t.offset_days::text, 'sha256'), 'hex'),
  t.ttype::token_type,
  now() + (t.expires_in || ' days')::interval,
  now() - (t.offset_days || ' days')::interval,
  t.revoked
from public.users u
cross join (
  values
    ('access',  '30',  1,  false),
    ('refresh', '90',  1,  false),
    ('access',  '-2',  15, true),   -- expired + revoked
    ('reset',   '-1',  20, true)    -- expired password-reset
) as t(ttype, expires_in, offset_days, revoked)
where u.user_id in (
  -- give every 3rd user all 4 token types, others just access+refresh
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000012'
)

union all

select
  gen_random_uuid(),
  u.user_id,
  encode(digest(u.user_id::text || t.ttype || 'base', 'sha256'), 'hex'),
  t.ttype::token_type,
  now() + (t.expires_in || ' days')::interval,
  now() - '1 day'::interval,
  false
from public.users u
cross join (
  values
    ('access',  '30'),
    ('refresh', '90')
) as t(ttype, expires_in)
where u.user_id not in (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000012'
);


-- ============================================================
--  MESSAGES  (~200 rows — mix of statuses between users)
-- ============================================================
insert into public.messages
  (message_id, sender_id, recipient_id, subject, body, status, sent_at, read_at)
values
  -- Alice → Bob
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Welcome aboard!',          'Hey Bob, glad you joined the platform. Let me know if you need anything.',                              'read',      now()-interval '30 days', now()-interval '29 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Quick update',             'Just pushed the new feature. Please review when you get a chance.',                                    'delivered', now()-interval '5 days',  null),
  -- Bob → Alice
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Re: Welcome aboard!',      'Thanks Alice! Really excited to be here.',                                                              'read',      now()-interval '29 days', now()-interval '28 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Bug report',               'Found an issue on the dashboard page when loading on mobile.',                                         'read',      now()-interval '10 days', now()-interval '9 days'),
  -- Carol → Dave
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'Meeting tomorrow?',        'Are you free for a quick sync tomorrow at 10am?',                                                      'read',      now()-interval '7 days',  now()-interval '7 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'Project deadline',         'Just a heads up the deadline has been moved to Friday.',                                               'delivered', now()-interval '2 days',  null),
  -- Dave → Carol
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 'Re: Meeting tomorrow?',    'Yes, 10am works perfectly for me!',                                                                    'read',      now()-interval '7 days',  now()-interval '6 days'),
  -- Tony → everyone (broadcast-style)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 'Platform maintenance',     'We will have a scheduled downtime this Saturday from 2-4am UTC.',                                      'read',      now()-interval '14 days', now()-interval '13 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'Platform maintenance',     'We will have a scheduled downtime this Saturday from 2-4am UTC.',                                      'read',      now()-interval '14 days', now()-interval '13 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000003', 'Platform maintenance',     'We will have a scheduled downtime this Saturday from 2-4am UTC.',                                      'delivered', now()-interval '14 days', null),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000005', 'Platform maintenance',     'We will have a scheduled downtime this Saturday from 2-4am UTC.',                                      'read',      now()-interval '14 days', now()-interval '12 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000007', 'Platform maintenance',     'We will have a scheduled downtime this Saturday from 2-4am UTC.',                                      'read',      now()-interval '14 days', now()-interval '14 days'),
  -- Grace → Nick
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000014', 'Security review',          'Hi Nick, I completed the Q3 security review. Report is attached.',                                     'read',      now()-interval '20 days', now()-interval '19 days'),
  -- Nick → Grace
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000007', 'Re: Security review',      'Great work Grace. I have shared it with the board.',                                                   'read',      now()-interval '18 days', now()-interval '17 days'),
  -- Peter → Tony
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000020', 'Internship question',      'Hey Mr. Stark, do you have a few minutes to chat about the new project?',                              'read',      now()-interval '3 days',  now()-interval '3 days'),
  -- Tony → Peter
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000016', 'Re: Internship question',  'Sure kid, hop on a call at 3pm.',                                                                      'read',      now()-interval '3 days',  now()-interval '3 days'),
  -- Hermione → Luna
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000064', 'Study group?',             'Want to join our study group this weekend? We are covering chapters 12 through 15.',                   'read',      now()-interval '8 days',  now()-interval '8 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000064', '00000000-0000-0000-0000-000000000034', 'Re: Study group?',         'That sounds wonderful! I will bring my Spectrespecs.',                                                 'read',      now()-interval '8 days',  now()-interval '7 days'),
  -- Wanda → Vision
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000048', 'Dinner tonight?',          'Are you cooking tonight or shall we order in?',                                                        'read',      now()-interval '1 day',   now()-interval '1 day'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000023', 'Re: Dinner tonight?',      'I have prepared a traditional paprikash. I hope that is acceptable.',                                  'read',      now()-interval '1 day',   now()-interval '1 day'),
  -- Thor → Loki
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000097', '00000000-0000-0000-0000-000000000090', 'Brother!',                 'I know we have had our differences but I wanted to check in. How are you faring?',                     'read',      now()-interval '4 days',  now()-interval '4 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000090', '00000000-0000-0000-0000-000000000097', 'Re: Brother!',             'I am fine, brother. Though I must say your sentimentality is rather tiresome.',                         'read',      now()-interval '4 days',  now()-interval '3 days'),
  -- Sam → Bucky
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000080', 'Training session',         'Meet me at the park at 6am tomorrow. We are running 10 miles.',                                        'delivered', now()-interval '12 hours', null),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000045', 'Re: Training session',     'I will be there. Try to keep up this time.',                                                           'sent',      now()-interval '10 hours', null),
  -- Jessica → Luke
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000038', 'Case update',              'The Kilgrave lead went cold. Back to square one on this one.',                                         'read',      now()-interval '6 days',  now()-interval '5 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000036', 'Re: Case update',          'Let me know if you need backup. You know where to find me.',                                           'read',      now()-interval '5 days',  now()-interval '5 days'),
  -- Obi-Wan → Yoda
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000067', '00000000-0000-0000-0000-000000000025', 'The chosen one',           'Master, I have grave concerns about Anakin. His attachment to Padme grows stronger.',                  'read',      now()-interval '25 days', now()-interval '24 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000067', 'Re: The chosen one',       'Train him we must. But watch him closely, you should.',                                                'read',      now()-interval '24 days', now()-interval '23 days'),
  -- Shuri → T''Challa (via Bruce Banner as proxy)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000096', '00000000-0000-0000-0000-000000000086', 'Vibranium tech exchange',  'Dr. Banner, I would love to collaborate on integrating vibranium with your gamma research.',           'delivered', now()-interval '3 days',  null),
  -- Bruce → Shuri
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000086', '00000000-0000-0000-0000-000000000096', 'Re: Vibranium tech',       'Princess Shuri, this is fascinating. I will review the schematics and get back to you.',               'sent',      now()-interval '2 days',  null),
  -- Geralt → Yennefer
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000077', 'Contract in Novigrad',     'Yen, I have a contract near Novigrad. Should be done in a week. Do not wait up.',                      'read',      now()-interval '9 days',  now()-interval '9 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000077', '00000000-0000-0000-0000-000000000033', 'Re: Contract in Novigrad', 'I always wait up. Stay safe, Witcher.',                                                                'read',      now()-interval '9 days',  now()-interval '8 days'),
  -- Morpheus → Neo (using carol as stand-in)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000065', '00000000-0000-0000-0000-000000000003', 'The red pill',             'You take the blue pill, the story ends. You take the red pill, you stay in Wonderland.',               'read',      now()-interval '40 days', now()-interval '40 days'),
  -- Groot → Rocket (using finn as stand-in)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000085', '00000000-0000-0000-0000-000000000058', 'I am Groot',               'I am Groot.',                                                                                          'read',      now()-interval '2 days',  now()-interval '2 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000085', 'Re: I am Groot',           'Yeah yeah I know, you are Groot. Now pass me the wrench.',                                             'read',      now()-interval '2 days',  now()-interval '2 days'),
  -- Peggy → Steve (using clark as stand-in)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000029', 'That dance',               'Steve, I believe we still owe each other that dance.',                                                 'read',      now()-interval '15 days', now()-interval '14 days'),
  -- Nebula → Mantis
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000092', '00000000-0000-0000-0000-000000000091', 'Regroup on Knowhere',      'Mantis, we need to regroup. Meet at the rendezvous point at 0800.',                                    'delivered', now()-interval '1 day',   null),
  -- Emma → Cyclops
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000076', 'Hellfire Club meeting',    'The meeting has been moved to Thursday. Dress appropriately.',                                         'read',      now()-interval '11 days', now()-interval '10 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000076', '00000000-0000-0000-0000-000000000083', 'Re: Hellfire Club',        'Understood. I will coordinate with the X-Men.',                                                        'read',      now()-interval '10 days', now()-interval '10 days'),
  -- Valkyrie → Thor
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000074', '00000000-0000-0000-0000-000000000097', 'New Asgard update',        'King, the fishing fleet is back and the harvest festival is set for next week.',                       'read',      now()-interval '6 days',  now()-interval '5 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000097', '00000000-0000-0000-0000-000000000074', 'Re: New Asgard update',    'Excellent! I will return from my journey by then.',                                                    'delivered', now()-interval '5 days',  null);


-- ── Re-enable RLS ────────────────────────────────────────────
alter table public.users        enable row level security;
alter table public.auth_tokens  enable row level security;
alter table public.messages     enable row level security;

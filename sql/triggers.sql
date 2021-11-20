\c electoral_db

create or replace function inc_last_id()
returns trigger language plpgsql as 
$$
BEGIN
    update lastid set last_id = (x.regexp_matches[1]) || '_' || lpad((x.regexp_matches[2]::int + 1)::varchar, LENGTH(x.regexp_matches[2]),'0')
    from (
        SELECT regexp_matches(last_id, '(.+)_(.+)') from lastid 
        where table_name=TG_ARGV[0]
    ) as x
    where table_name=TG_ARGV[0];
RETURN NEW;
END;
$$;

create trigger "inc_last_id_party"
after
insert on Party
for each row
execute procedure inc_last_id("party");

create trigger "inc_last_id_cand"
after
insert on Candidate
for each row
execute procedure inc_last_id("candidate");

create trigger "inc_last_id_kar"
after
insert on Voter_kar_01
for each row
execute procedure inc_last_id("voter_kar_01");

create trigger "inc_last_id_ker"
after
insert on Voter_ker_01
for each row
execute procedure inc_last_id("voter_ker_01");

create trigger "inc_last_id_tam"
after
insert on Voter_tam_01
for each row
execute procedure inc_last_id("voter_tam_01");

create trigger "inc_last_id_mah"
after
insert on Voter_mah_01
for each row
execute procedure inc_last_id("voter_mah_01");

create trigger "inc_last_id_ls"
after
insert on Voter_ls_01
for each row
execute procedure inc_last_id("voter_ls_01");

create trigger "inc_last_id_coal"
after
insert on Coalition
for each row
execute procedure inc_last_id("coalition");

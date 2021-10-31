-- Values Used

-- Election IDs:
-- LS: ls_09
-- State: st_12ka

-- CONSTITUENCY
-- ls: ls_09
-- state: st_001ka, st_002ka 

-- VOTERS: 
-- state: 0-12 for 
-- ls: 13-24







-- ==================================
-- SIMPLE QUERIES
-- -----------------------------------


-- Get voter list overall
select * from voter_ls_01;

-- Get voters list per constituency
select voter_id, fname from voter_kar_01 where state_constituency_id='const_019kar';

-- Cast vote
update voter_kar_01 set candidate_id='cand_00001' where voter_id='vot_0000000001';
update voter_ls_01 set candidate_id='cand_00002' where voter_id='vot_0000000006';

-- Get Candidate list 
select * from candidate where election_id='ls_01';
select * from candidate where election_id='kar_01';

-- Get Candidate list for constituency
select * from candidate where election_id='ls_01' and constituency_id='const_005mah';
select * from candidate where election_id='kar_01' and constituency_id='const_019kar';

-- List of all parties in election
select party_id, p.name from party p, coalition c
where election_id='ls_01' and p.coalition_id=c.coalition_id;

select party_id, p.name from party p, coalition c
where election_id='kar_01' and p.coalition_id=c.coalition_id;

-- Get candidates belonging to a party
select * from candidate where party_id='par_001';

-- Get parties by coalition
select * from party where coalition_id='coal_04';

-- Get candidates by coalition
select candidate_id, c.name, c.party_id, p.name, p.coalition_id  from candidate c, party p
where c.party_id = p.party_id and p.coalition_id='coal_03';

-- Get coalitions
select * from coalition where election_id='ls_01';



-- =========================================================
-- COMPLEX QUERIES
-- ---------------------------------------------------------

-- Get votes by constituency
select candidate.candidate_id, voter_id
from voter_kar_01 as voter
inner join candidate
on voter.candidate_id = candidate.candidate_id
where candidate.constituency_id='const_019kar'

-- Get votes by candidate per constituency
select votes.candidate_id, count(votes.voter_id) as num_votes from 
(
    select candidate.candidate_id, voter_id
    from voter_kar_01 as voter
    full outer join candidate
    on voter.candidate_id = candidate.candidate_id
    where candidate.constituency_id='const_019kar'
) as votes
group by votes.candidate_id

-- Find winning candidate for given constituency
select votes.candidate_id, count(votes.voter_id) as num_votes from 
(
    select candidate.candidate_id, voter_id
    from voter_kar_01 as voter
    full outer join candidate
    on voter.candidate_id = candidate.candidate_id
    where candidate.constituency_id='const_019kar'
) as votes
group by votes.candidate_id
order by num_votes DESC
limit 1;

-- Get voter turnout
select (count_cand*100.0) / (count_voter) as turnout_percentage
from (
    select count(candidate_id) as count_cand, count(voter_id) as count_voter 
    from voter_kar_01
) as counts;

-- Voter turnout per LS constituency
 select state_constituency_id, (count_cand*100.0) / (count_voter) as turnout_percentage
from (
     select state_constituency_id, count(candidate_id) as count_cand, count(voter_id) as count_voter
     from voter_kar_01
     group by state_constituency_id
) as counts;

-- Find winning party for given state
-- select votes.candidate_id, count(votes.voter_id) as num_votes from 
-- (
--     select candidate.candidate_id, voter_id, voter.state_constituency_id
--     from voter_kar_01 as voter
--     full outer join candidate
--     on voter.candidate_id = candidate.candidate_id
--     where candidate.constituency_id in (
--         select constituency_id from constituency where state='kar'
--     )
-- ) as votes
-- group by candidate.constituency_id
-- group by votes.candidate_id
-- order by num_votes DESC
-- limit 1;

-- Find winning coalition in the state
-- Find winning coalition in the lok sabha election

-- USER PRIVILEGES

Users:
    Election Commission:
        CRUD election
        See statistics (R all)
        CRUD constituency

    Booth:
        U voter 
        R list of candidates for their const

    Booth Officer:
        R voter list
        R voter turnout
        R candidate list

    Electoral Registration Officer:
        CRUD voter
        CRUD candidate
        CRUD party
        CRUD coalition


create user ec with password 'ec';
create user booth with password 'booth';
create user bo with password 'bo';
create user ero with password 'ero';

grant insert, select, update, delete on election to ec;
grant select on all tables in schema public to ec;
grant insert, select, update, delete on constituency to ec;

grant select, update on voter to booth;
grant select on candidate to booth;

grant select on voter, candidate to bo;

grant insert, select, update, delete on voter to ero;
grant insert, select, update, delete on candidate to ero;
grant insert, select, update, delete on party to ero;
grant insert, select, update, delete on coalition to ero;


-- CONCURRENCY CONTROL

-- Read committed 

-- Transaction 1

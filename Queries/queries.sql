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
select * from voter_ls_09;

-- Cast vote
update voter_ls_09 set candidate_id='cand_001' where voter_id='vot_001';
update voter_st_12ka set candidate_id='cand_001' where voter_id='vot_013';

-- Get Candidate list 
select * from candidate where election_id='el_ls_09';
select * from candidate where election_id='el_st_12ka';

-- Get Candidate list for constituency
select * from candidate where election_id='el_ls_09' and constituency_id='con_ls_009';
select * from candidate where election_id='el_st_12ka' and constituency_id='con_st_001ka';
select * from candidate where election_id='el_st_12ka' and constituency_id='con_st_002ka';

-- List of all parties in election
select * from party where election_id='el_ls_09';
select * from party where election_id='el_st_12ka';

-- Get candidates belonging to a party
select * from candidate where party_id='par_001';

-- Get parties by coalition
select * from parties where coalition_id='coal_04_19';

-- Get candidates by coalition
select * from candidate c, party p
where c.party_id = p.party_id and p.coalition_id='coal_03_19';

-- Get coalitions
select * from coalition_id where election_id='el_ls_09';



-- =========================================================
-- COMPLEX QUERIES
-- ---------------------------------------------------------

-- Get votes by constituency
select candidate.candidate_id, voter_id
from voter
inner join candidate
on voter.candidate_id = candidate.candidate_id
where candidate.constituency_id='con_ls_001'

-- Get votes by candidate per constituency
select votes.candidate_id, count(votes.voter_id) as num_votes from 
(
    select candidate.candidate_id, voter_id
    from voter
    full outer join candidate
    on voter.candidate_id = candidate.candidate_id
    where candidate.constituency_id='con_ls_001'
) as votes
group by votes.candidate_id

-- Find winning candidate for given constituency
select votes.candidate_id, count(votes.voter_id) as num_votes from 
(
    select candidate.candidate_id, voter_id
    from voter
    full outer join candidate
    on voter.candidate_id = candidate.candidate_id
    where candidate.constituency_id='con_ls_001'
) as votes
group by votes.candidate_id
order by num_votes DESC
limit 1;

-- Get voters list per constituency
select * from voter
where constituency_id in 
    (
        select constituency_id from constituency
        where name='Mysore' and type='legislative'
    );


-- Get voter turnout
select (count_cand*100.0) / (count_voter) as turnout
from (
    select count(candidate_id) as count_cand, count(voter_id) as count_voter 
    from voter
    ) as counts;

-- Voter turnout per LS constituency
select (count_cand*100.0) / (count_voter) as turnout
from (
    select count(candidate_id) as count_cand, count(voter_id) as count_voter 
    from voter
    group by constituency_id
    ) as counts
;
-- Find winning party for given state
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

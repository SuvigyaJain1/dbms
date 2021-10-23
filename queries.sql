-- Simple Queries

-- Get voters list per constituency
select * from voter
where constituency_id in 
    (
        select constituency_id from constituency
        where name='Mysore' and type='legislative'
    );

-- Get voter list overall
select * from voter;

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



-- Cast vote
update voter set candidate_id='cand_001' where voter_id='vot_001';


-- Get Candidate list 


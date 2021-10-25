
-- Get voters list per constituency
select * from voter
where constituency_id in 
    (
        select constituency_id from constituency
        where name='Mysore' and type='legislative'
    );

-- Get voter list overall
select * from voter ;

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
-- Cast vote
update voter set candidate_id='cand_001' where voter_id='vot_001';

-- Get Candidate list 
select * from candidate where election_id='el_ls_01';

-- Get Candidate list for constituency
select * from candidate where election_id='el_ls_01' and constituency_id='con_ls_001';

-- List of all parties in election
select * from party where election_id='el_ls_01';

-- Get candidates belonging to a party
select * from candidate where party_id='par_001';

-- Get parties by coalition
select * from parties where coalition_id='coal_04_19';

-- Get candidates by coalition
select * from candidate c, party p
where c.party_id = p.party_id and p.coalition_id='coal_03_19';

-- Get coalitions
select * from coalition_id where election_id='el_ls_01';

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
select distinct on (counts.num_votes) candidate_id, num_votes
from
(
    select votes.candidate_id, count(votes.voter_id) as num_votes from 
    (
        select candidate.candidate_id, voter_id
        from voter
        full outer join candidate
        on voter.candidate_id = candidate.candidate_id
        where candidate.constituency_id='con_ls_001'
    ) as votes
    group by votes.candidate_id
) as counts
order by counts.num_votes DESC;
-- Find winning party for given state
-- Find winning coalition in the state
-- Find winning coalition in the lok sabha election

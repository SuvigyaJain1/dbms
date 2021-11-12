function voter(){
    fetch('http://localhost:5000/voter/getlist/voter_ls_01')
    .then(res => res.json()).then(res => console.log(res))
}

function getLsTurnout() {
    fetch('http://localhost:5000/turnout/all/voter_ls_01')
    .then(res => res.json()).then(res => console.log(res))
}

function getStateTurnout() {
    fetch('http://localhost:5000/turnout/constituency/voter_kar_01')
    .then(res => res.json()).then(res => console.log(res))
}

function getElectionDetails() {
    // Get Election latest election details
}

function getSeatsPerParty() {
    const e_id = 'kar_01'
    fetch(`http://localhost:5000/constituency/${e_id}`)
    .then(res => res.json())
    .then(data => {
        let candidates = [];
        data.map(constituency => {
            const_id = constituency.constituency_id;
            fetch(`http://localhost:5000/winnerConstituency/voter_${e_id}/${const_id}`)
            .then(res => res.json())
            .then(winner => {
                // console.log(winner);
                const c_id = winner[0].candidate_id;
                const num_votes = winner[0].num_votes;
                candidates.push(c_id);
            })
        })
        console.log(candidates)
        return candidates
    })
    .then((candidates) => {
        let tally = {}; 
        const payload = {}
        payload.candidates = candidates

        console.log(candidates)
        fetch("http://localhost:5000/get_candidates_party", 
        {
            method:'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(parties => {
            console.log(parties, typeof(parties))
            parties.map(party => {
                pid = party.party_id;
                if(tally.hasOwnProperty(pid)) tally[pid] += 1;
                else tally[pid] = 1
            })

            console.log(tally)
        })
    })
}
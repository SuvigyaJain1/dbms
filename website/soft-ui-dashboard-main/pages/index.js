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
    tally = {}
    fetch(`http://localhost:5000/constituency/${e_id}`)
    .then(res => res.json())
    .then(data => {
        data.map(constituency => {
            const_id = constituency.constituency_id;
            fetch(`http://localhost:5000/winnerConstituency/voter_${e_id}/${const_id}`)
            .then(res => res.json())
            .then(winner => {
                return winner[0].candidate_id;
            })
            .then((cids) => {
                axios.post('http://localhost:5000/get_candidates_party', {candidates:[cids]})
                .then(res => {
                    const pid = res.data[0].party_id
                    console.log(pid)
                    if(tally.hasOwnProperty(pid)) tally[pid] += 1
                    else tally[pid] = 1
                })
            })
        })
        console.log(tally)
    })
    console.log(tally)
}
getSeatsPerParty()
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
    let tally = {}; 
    fetch("http://localhost:5000/constituency/kar_01")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // data.map(constituency => {
        //     const_id = constituency.constituency_id;
        //     fetch(`http://localhost:5000/winnerConstituency/voter_kar_01/${const_id}`)
        //     .then(res => res.json())
        //     .then(winner => {
        //         console.log(winner);
                // const c_id = winner[0].candidate_id;
                // const num_votes = winner[0].num_votes;
                // console.log(candidate_id, num_votes);
    //         })
    //     })
    })
}
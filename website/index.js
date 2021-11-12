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


function voter(){
    fetch('http://localhost:5000/voter/getlist/voter_ls_01')
    .then(res => res.json()).then(res => console.log(res))
}

// alert('JS Working')

function getLsTurnout() {
    fetch('http://localhost:5000/turnout/all/voter_ls_01')
    .then(res => res.json()).then(res => console.log(res))
}

function getStateTurnout() {
    fetch('http://localhost:5000/turnout/constituency/voter_kar_01')
    .then(res => res.json()).then(res => console.log(res))
}


function getElectionDetails() {
    fetch('http://localhost:5000/elections')
    .then(res=>res.json()).then(res=> {
        let name = ""
        let id = res[0].election_id.split("_")[0]
        if(id == "ls") {
            name = "Lok Sabha"
        } else {
            name = `State Election: ${id.toUpperCase()}`
        }
        document.getElementById("e_name").innerHTML = name
        document.getElementById("e_start").innerHTML = res[0].start_date.split("T")[0]
        document.getElementById("e_end").innerHTML = res[0].end_date.split("T")[0]
    })
}

function getSeatsPerParty() {
    const e_id = 'kar_01'
    
    fetch(`http://localhost:5000/constituency/${e_id}`)
    .then(res => res.json())
    .then(data => {
        return new Promise((resolve, reject)=>{
            tally = {}
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
                        const pid = res.data[0].name
                        if(tally.hasOwnProperty(pid)) tally[pid] += 1
                        else tally[pid] = 1
                    })
                })
            })
            resolve(tally)
        })
    }).then(tally=>{
        console.log(tally)
        temp = Object.keys(tally)
        temp.sort((a, b)=>{
            return tally[b]-tally[a]
        })
        document.getElementById("p1").innerHTML = `${temp[0]}: ${tally[temp[0]]}`
        document.getElementById("p2").innerHTML = `${temp[1]}: ${tally[temp[1]]}`
        document.getElementById("p3").innerHTML = `${temp[2]}: ${tally[temp[2]]}`
    })
}



window.onload = () => {
    wrapper()
};


function wrapper() {
    getElectionDetails()
    getSeatsPerParty()
}
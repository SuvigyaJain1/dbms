function voter(){
    fetch('http://localhost:5000/voter/getlist/voter_ls_01')
    .then(res => res.json()).then(res => console.log(res))
}

// alert('JS Working')

function getLsTurnout(e_id) {
    fetch(`http://localhost:5000/turnout/all/voter_${e_id}`)
    .then(res => res.json()).then(res => {
        let turnout = 0;
        count = res.length
        res.forEach(consti => {
            turnout += consti.turnout_percentage
        })
        document.getElementById('t_turnout').innerHTML = `${turnout/count * 100}`
    })
}

function getStateTurnout(e_id) {
    fetch(`http://localhost:5000/turnout/constituency/voter_${e_id}`)
    .then(res => res.json()).then(res => {
        let turnout = 0;
        count = res.length
        res.forEach(consti => {
            turnout += consti.turnout_percentage
        })
        document.getElementById('t_turnout').innerHTML = `${turnout/count}`
    })
}


async function getElectionDetails() {
    const data = await fetch('http://localhost:5000/elections')
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
        return res[0].election_id
    })
    return data 
}

async function getSeatsPerParty(e_id) {
    let response = await fetch(`http://localhost:5000/constituency/${e_id}`)
    let constituencies = await response.json()
    let cids = constituencies.map(c=>c.constituency_id)
    let winners = await Promise.all(cids.map(async (cid) =>{
        const res = await fetch(`http://localhost:5000/winnerConstituency/voter_${e_id}/${cid}`)
        const winner = await res.json()
        return winner[0]
    }))
    let winner_ids = winners.map(winner=>{
        if(winner == undefined) return "n/a"
        return winner.candidate_id
    })
    response = await axios.post('http://localhost:5000/get_candidates_party', {candidates:winner_ids})
    parties = response.data
    tally = {}
    
    parties.forEach(e=>{
        if(e.name in tally) {
            tally[e.name] += 1
        } else {
            tally[e.name] = 1;
        }
    })
    
    countSortedKeys = Object.keys(tally).sort((a, b)=>{
        return tally[b] - tally[a]
    })
    
    let top = []
    for(var i = 0; i<countSortedKeys.length; i++) {
        pname = countSortedKeys[i]
        seats = tally[pname]
        top.push([pname, seats])
    }

    return top
}


function getSeatsPerCoalition(parties) {
    parties = parties.map(party=>party[0])
    axios.post('http:localhost:5000/get_parties_coalition', {parties:parties})
    .then(res => {
        res = res.data
        tally = {}
        res = res.map(obj => obj.coalition_name)
        res.forEach(coalition => {
            if(tally.hasOwnProperty(coalition)) tally[coalition] += 1
            else tally[coalition] = 1
        })

        countSortedKeys = Object.keys(tally).sort((a, b)=>{
            return tally[b] - tally[a]
        })

        let top = []
        for(var i = 0; i<countSortedKeys.length; i++) {
            cname = countSortedKeys[i]
            seats = tally[cname]
            top.push([cname, seats])
        }

        total = top[0][1] + top [1][1] + top [2][1];
        document.getElementsByClassName("bar-chart-coal")[0].style.width = `${top[0][1]/total * 100}%`
        document.getElementsByClassName("bar-chart-coal")[1].style.width = `${top[1][1]/total * 100}%`
        document.getElementsByClassName("bar-chart-coal")[2].style.width = `${top[2][1]/total * 100}%`
        document.getElementById("c1").innerHTML = `${top[0][0]}: ${top[0][1]}`
        document.getElementById("c2").innerHTML = `${top[1][0]}: ${top[1][1]}`
        document.getElementById("c3").innerHTML = `${top[2][0]}: ${top[2][1]}`
    })
}

window.onload = ()=>{
    getElectionDetails()
    .then(eid => {
    
        getSeatsPerParty(eid)
        .then(top=>{
            total = top[0][1] + top [1][1] + top [2][1];
            document.getElementsByClassName("bar-chart")[0].style.width = `${top[0][1]/total * 100}%`
            document.getElementsByClassName("bar-chart")[1].style.width = `${top[1][1]/total * 100}%`
            document.getElementsByClassName("bar-chart")[2].style.width = `${top[2][1]/total * 100}%`
            document.getElementById("p1").innerHTML = `${top[0][0]}: ${top[0][1]}`
            document.getElementById("p2").innerHTML = `${top[1][0]}: ${top[1][1]}`
            document.getElementById("p3").innerHTML = `${top[2][0]}: ${top[2][1]}`
            
            return top
        })
        .then(top => {
            getSeatsPerCoalition(top)
        })

        return eid;
    })
    .then(eid => {
        console.log("here")
        if(eid.split('_')[0] == "ls") getLsTurnout(eid)
        else getStateTurnout(eid)
    })
}
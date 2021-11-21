async function getElectionDetails() {
    const data = await fetch('http://localhost:5000/elections')
    .then(res=>res.json()).then(res=> {
        localStorage.setItem('eid',res[0].election_id)
        return res[0].election_id
    })
    return data 
}

async function getConstVoter(eid, vid) {
    const data = await fetch(`http://localhost:5000/getConst/voter_${eid}/${vid}`)
    .then(res=>res.json())
    .then(data=>data)

    return data
}

async function printCandidate(candidate) {
    let {candidate_id, name, party_id} = candidate
    let res = await fetch(`http://localhost:5000/getparty/${party_id}`)
    res = await res.json()
    party = res[0].name
    return `<td>
    <div class="d-flex px-2 py-1">
        <div>
        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">
        </div>
        <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">${name}</h6>
        </div>
    </div>
    </td>
    <td>
    <p class="text-xs font-weight-bold mb-0">${candidate_id}</p>
    </td>
    <td class="align-middle text-center">
    <span class="text-secondary text-xs font-weight-bold">${party}</span>
    </td>
    <td class="align-middle text-center text-sm">
    <button type='radio' class="badge badge-sm bg-gradient-success" onclick="selectCandidate(this)" value="${candidate_id}">Vote</button>
    </td>`
} 


selectCandidate = (btn) => {
    const yes = confirm("Click okay to confirm vote. Your vote cannot be changed once cast")
    if (yes) {
        const eid = localStorage.getItem('eid');
        const cid = btn.value
        const payload = {
            'id':localStorage.getItem('vid'),
            'cid':cid
        }
        console.log(eid, cid)
        axios.post(`http://localhost:5000/voter/cast/voter_${eid}`, payload)
        .then(res => res.data)
        .then(data => {
            console.log(data)
        })
        console.log("Vote cast!", btn)
    }
    else console.log("Vote cancelled")
}


window.onload = ()=>{
    getElectionDetails()
    .then(eid=>{
        getConstVoter(eid, localStorage.getItem("vid"))
        .then(cid=>{
            localStorage.setItem('const_id', cid)
            fetch(`http://localhost:5000/candidate/getList/${eid}/${cid[0].constituency_id}`)
            .then(res=>res.json())
            .then(candidates=>{
                let parent = document.getElementById("cand-table")
                candidates.forEach(candidate=>{
                    printCandidate(candidate)
                    .then(str=>{
                        child = document.createElement("tr")
                        child.innerHTML = str
                        parent.appendChild(child)
                    })
                })
            })
        })
    })
}
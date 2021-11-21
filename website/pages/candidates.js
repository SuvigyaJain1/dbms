submit = (ev) => {
    const name = document.getElementById('c_name').value
    const age = document.getElementById('c_age').value
    const eid = document.getElementById('c_eid').value
    const cid = document.getElementById('c_cid').value
    const pid = document.getElementById('c_pid').value
    const payload = {
        name, age, eid, cid, pid
    }
    axios.post('http://localhost:5000/candidate/create', payload)
    .then(res => res.data)
    .then(res => {
        console.log(res)
        alert(`Registered new candidate with id - ${res.id}`)
    })
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
    </td>`
} 

// Function called on clicking the "get candidates list" button
onGetCandList = ()=>{
    const eid = document.getElementById('eid').value ;
    const cid = encodeURIComponent(document.getElementById('cid').value || "%");

    fetch(`http://localhost:5000/candidate/getList/${eid}/${cid}`)
    .then(res=>res.json())
    .then(candidates=>{
        let parent = document.getElementById("cand-table")
        parent.innerHTML = ""
        candidates.forEach(candidate=>{
            printCandidate(candidate)
            .then(str=>{
                child = document.createElement("tr")
                child.innerHTML = str
                parent.appendChild(child)
            })
        })
    })
} 
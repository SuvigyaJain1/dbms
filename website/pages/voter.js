// const { dob } = req.body;
// const { state } = req.body;
// const { fname } = req.body;
// const { lname } = req.body;
// const { address } = req.body;
// const { cid } = req.body;
// const { conid } = req.body;
// const { sconid } = req.body;
// const { eid } = req.params;
// app.post("/voter/create/:eid")

function submit() {
    dob = document.getElementById('dob').value
    state = document.getElementById('state').value
    fname = document.getElementById('f_name').value
    lname = document.getElementById('l_name').value
    address = document.getElementById('addr').value
    eid = document.getElementById('eid').value
    con = document.getElementById('const').value

    payload = {
        dob, 
        state, 
        fname, 
        lname, 
        address, 
        cid: null, 
        conid: eid.substring(0, 2) == "ls" ? con : null,
        sconid: eid.substring(0, 2) == "ls" ? null : con,
    }

    axios.post(`http://localhost:5000/voter/create/${eid}`, payload)
    .then(res=>res.data)
    .then(data=>{
        alert('Candidate added with ID '+data.id)
    })
    
}


async function printVoter(voter) {
    let {fname, lname, constituency_id, state_consituency_id, voter_id} = voter
    let con = constituency_id == null? state_consituency_id: constituency_id
    let res = await fetch(`http://localhost:5000/getconst/${con}`)
    res = await res.json()
    con = res[0].name
    return `<td>
    <div class="d-flex px-2 py-1">
        <div>
        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">
        </div>
        <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">${fname+" "+lname}</h6>
        </div>
    </div>
    </td>
    <td>
    <p class="text-xs font-weight-bold mb-0">${voter_id}</p>
    </td>
    <td class="align-middle text-center">
    <span class="text-secondary text-xs font-weight-bold">${con}</span>
    </td>`
} 

// Function called on clicking the "get candidates list" button
onGetVoterList = ()=>{
    const eid = document.getElementById('el').value ;
    const cid = encodeURIComponent(document.getElementById('cid').value || "%");
    console.log(eid, cid)
    fetch(`http://localhost:5000/voter/getList/voter_${eid}/${cid}`)
    .then(res=>res.json())
    .then(voters=>{
        console.log(voters)
        let parent = document.getElementById("vot-table")
        parent.innerHTML = ""
        voters.forEach(voter=>{
            printVoter(voter)
            .then(str=>{
                child = document.createElement("tr")
                child.innerHTML = str
                parent.appendChild(child)
            })
        })
    })
} 
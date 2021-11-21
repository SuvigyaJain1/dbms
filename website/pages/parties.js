/*
const { symbol } = req.body;
const { name } = req.body;
const { cid } = req.body;
*/

function submit() {
    let symbol = document.getElementById("symbol").value || null
    let name = document.getElementById("name").value
    let cid = document.getElementById("cid").value || null
    let eid = document.getElementById("eid").value
    payload = {
        symbol, cid, name, eid
    }

    axios.post(`http://localhost:5000/party/create`, payload)
    .then(res=>res.data)
    .then(data=>{
        alert('Party added with ID '+data.id)
    })
    
}


async function printParty(party) {
    let {name, party_id, coalition_id} = party
    res = await fetch('http://localhost:5000/coalition/'+coalition_id);
    data = await res.json()
    cname = data[0].name.trim()
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
    <p class="text-xs font-weight-bold mb-0">${party_id}</p>
    </td>
    <td>
    <p class="text-xs font-weight-bold mb-0">${cname}</p>
    </td>`
} 

// Function called on clicking the "get candidates list" button
onGetVoterList = ()=>{
    const eid = document.getElementById('el').value;
    fetch(`http://localhost:5000/party/getList/${eid}`)
    .then(res=>res.json())
    .then(parties=>{
        let parent = document.getElementById("par-table")
        parent.innerHTML = ""
        parties.forEach(party=>{
            printParty(party)
            .then(str=>{
                child = document.createElement("tr")
                child.innerHTML = str
                parent.appendChild(child)
            })
        })
    })
} 
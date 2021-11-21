submit = () =>{
    const id = document.getElementById('eid').value
    const sdate = document.getElementById('sdate').value
    const edate = document.getElementById('edate').value
    const type = document.querySelector('input[name="type"]:checked').id.split('_')[0];

    const payload = {
        id, sdate, edate, type
    }
    axios.post('http://localhost:5000/election/create', payload)
    .then(res => res.data)
    .then(data => {
        alert(`Created Election with id ${data.id}`)
    })
}
async function printElection(election) {
    let {election_id, type, start_date, end_date} = election
    return (
        `<td>
            <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">${election_id}</h6>
                </div>
            </div>
            </td>
        <td>
            <p class="text-xs font-weight-bold mb-0">${start_date.split('T')[0]}</p>
        </td>
        <td>
            <p class="text-xs font-weight-bold mb-0">${end_date.split('T')[0]}</p>
        </td>
        <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">${type}</span>
        </td>`
    )
} 


onGetElecList = () => {
    axios.get('http://localhost:5000/election')
    .then(res => res.data)
    .then(data => {
        let parent = document.getElementById("cand-table")
        parent.innerHTML = ""
        data.forEach(election=>{
            printElection(election)
            .then(str=>{
                child = document.createElement("tr")
                child.innerHTML = str
                parent.appendChild(child)
            })
        })
    })
}
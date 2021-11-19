submit = (ev) => {
    const name = document.getElementById('c_name').value
    const age = document.getElementById('c_age').value
    const eid = document.getElementById('c_eid').value
    const cid = document.getElementById('c_cid').value
    const party = document.getElementById('c_pid').value
    const payload = {
        name, age, eid, cid, party
    }
    axios.post('http://localhost:5000/candidate/create', payload)
    .then(res => res.data)
    .then(res => {
        console.log(res)
        alert(`Registered new candidate with id - ${res.id}`)
    })
}
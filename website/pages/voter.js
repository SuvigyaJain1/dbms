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

    res = axios.post(`http://localhost:5000/voter/create/${eid}`, payload)
    .then(res=>{
        console.log(res.data)
    })
    
}

function onGetVoterList() {
    alert('called')
}
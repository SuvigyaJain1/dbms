async function getElectionDetails() {
    const data = await fetch('http://localhost:5000/elections')
    .then(res=>res.json()).then(res=> {
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


window.onload = ()=>{
    getElectionDetails()
    .then(eid=>{
        getConstVoter(eid, localStorage.getItem("vid"))
        .then(cid=>{
            console.log(cid)
            console.log(cid[0].constituency_id)
            fetch(`http://localhost:5000/candidate/getList/${eid}/${cid[0].constituency_id}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
        })
    })
} 
//backend port: 5000

async function getVoters() {
    data = await fetch("http://localhost:5000/voter/getList/voter_ls_01", {credentials: 'omit'});
    j = await data.json();
    return j
}
getVoters().then(data=>data.json()).then(res=>console.log(res))
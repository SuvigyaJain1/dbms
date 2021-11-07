const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000,()=>{
    console.log("running");
});

//create a new election
app.post("/election/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { edate } = req.body;
      const { type } = req.body;
      const { sdate } = req.body;
      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const election = await pool.query(
        "insert into Election (election_id ,end_date ,type ,start_date) values ( $1,$2,$3,$4) RETURNING *",
        [id,edate,type,sdate]
      
      );
  
      res.json(election.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Create booths
  app.post("/booth/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { num } = req.body;
      const { cid } = req.body;
      const { oid } = req.body;
      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const booth = await pool.query(
        "insert into Booth (booth_id, num_voters , constituency_id, officer_id) values ( $1,$2,$3,$4) RETURNING *",
        [id,num,cid,oid]
      
      );
  
      res.json(booth.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  //insert into Booth values ( 'booth_00002', 0, 'const_053ker', 'officer_00030');

  //create officers
  app.post("/officer/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { name } = req.body;
      const { pw } = req.body;
      const { des } = req.body;
      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const officer = await pool.query(
        "insert into Officer (officer_id , name , passcode , designation) values ( $1,$2,$3,$4) RETURNING *",
        [id,name,pw,des]
      
      );
  
      res.json(officer.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

//create constituency
app.post("/constituency/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { type } = req.body;
      const { name } = req.body;
      const { state } = req.body;
      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const cons = await pool.query(
        "insert into Constituency (constituency_id , type , name , state) values ( $1,$2,$3,$4) RETURNING *",
        [id,type,name,state]
      
      );
  
      res.json(cons.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //create coalition
  app.post("/coalition/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { name } = req.body;
      const { eid } = req.body;

      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const cons = await pool.query(
        "insert into Coalition (coalition_id , name , election_id) values ( $1,$2,$3) RETURNING *",
        [id,name,eid]
      
      );
  
      res.json(cons.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //insert candidates
  app.post("/candidate/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { age } = req.body;
      const { name } = req.body;
      const { eid } = req.body;
      const { pid } = req.body;
      const { cid } = req.body;

      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const cand = await pool.query(
        "insert into Candidate (candidate_id, age ,name ,election_id ,party_id,constituency_id) values ( $1,$2,$3,$4,$5,$6) RETURNING *",
        [id,age,name,eid,pid,cid]
      
      );
  
      res.json(cand.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


  //party leader insert
  app.post("/partyLeader/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { cid } = req.body;

      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const p_leader = await pool.query(
        "insert into PartyLeader (candidate_id, party_id) values ( $1,$2) RETURNING *",
        [id,cid]
      
      );
  
      res.json(p_leader.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //insert party
  app.post("/party/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { symbol } = req.body;
      const { name } = req.body;
      const { cid } = req.body;
      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const party = await pool.query(
        "insert into Party (party_id , symbol , name, coalition_id) values ( $1,$2,$3,$4) RETURNING *",
        [id,symbol,name,cid]
      
      );
  
      res.json(party.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //insert ls voters
  app.post("/lsVoter/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { dob } = req.body;
      const { state } = req.body;
      const { fname } = req.body;
      const { lname } = req.body;
      const { address } = req.body;
      const { cid } = req.body;
      const { conid } = req.body;
      const { sconid } = req.body;


      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const lsvoter = await pool.query(
        "insert into Voter_ls_01 (voter_id, dob , state, fname, lname, address, candidate_id, constituency_id, state_constituency_id) values ( $1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [id,dob,state,fname,lname,address,cid,conid,sconid]
      
      );
  
      res.json(lsvoter.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //insert state voters 
  app.post("/stVoter/create", async (req, res) => {
    try {
      const { id } = req.body;
      const { dob } = req.body;
      const { state } = req.body;
      const { fname } = req.body;
      const { lname } = req.body;
      const { address } = req.body;
      const { cid } = req.body;
      const { conid } = req.body;
      const { sconid } = req.body;


      //console.log(id);console.log(edate);console.log(type);console.log(sdate);
      const lsvoter = await pool.query(
        "insert into Voter_kar_01 (voter_id, dob , state, fname, lname, address, candidate_id, constituency_id, state_constituency_id) values ( $1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [id,dob,state,fname,lname,address,cid,conid,sconid]
      
      );
  
      res.json(lsvoter.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


  

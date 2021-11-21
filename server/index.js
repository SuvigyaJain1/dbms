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
      const election = await pool.query(
        "insert into Election (election_id ,end_date ,type ,start_date) values ( $1,$2,$3,$4)",
        [id,edate,type,sdate]
      
      );
      const voterlist = await pool.query(
        "create table Voter_"+id+"(voter_id varchar(20) primary key, dob date, state char(30), fname char(20), lname char(20), address varchar(45), candidate_id varchar(20), constituency_id varchar(20) not null, state_constituency_id varchar(20))",
      );
      const c1 = await pool.query(
        "alter table Voter_"+id+" add constraint voterfk1 foreign key(candidate_id) references Candidate(candidate_id)"
      );
      const c2 = await pool.query(
        "alter table Voter_"+id+" add constraint voterfk2 foreign key(constituency_id) references Constituency(constituency_id)"
      );
      const c3 = await pool.query(
        "alter table Voter_"+id+" add constraint voterfk3 foreign key(state_constituency_id) references Constituency(constituency_id)",
      );
  
      const tableentry = await pool.query(
        `insert into Lastid values ('voter_${id}', 'vot_0000000000')`,
      );
      res.json({id:id});
    } catch (err) {
      console.error(err.message);
    }

  });

  app.get('/election', async (req, res) => {
    try{
      const elections = await pool.query('select * from election')
      res.json(elections.rows)
    }
    catch (err) {
      console.log(err.message)
      res.json(err)
    }
  })
  //Create booths
  app.post("/booth/create", async (req, res) => {
    try {
      const lid= await pool.query(
        "select last_id from Lastid where table_name = 'Booth'"
      );
      let nu=Number((lid.rows[0]['last_id']).substring(7,11));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(5-nu.length);
      const id = 'booth_'+zeros+nu;
      const { num } = req.body;
      const { cid } = req.body;
      const { oid } = req.body;
      let lid2= await pool.query(
        "update Lastid set last_id= $1 where table_name = 'Booth'",[id]
      );
      console.log("done");
      const booth = await pool.query(
        "insert into Booth (booth_id, num_voters , constituency_id, officer_id) values ( $1,$2,$3,$4)",
        [id,num,cid,oid]
      
      );
  
      res.json("Booth created successfully");
    } catch (err) {
      console.error(err.message);
    }
  });

  //create officers
  app.post("/officer/create", async (req, res) => {
    try {
      const lid= await pool.query(
        "select last_id from Lastid where table_name = 'Officer'"
      );
      let nu=Number((lid.rows[0]['last_id']).substring(9,13));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(5-nu.length);
      const id = 'officer_'+zeros+nu;
      const { name } = req.body;
      const { pw } = req.body;
      const { des } = req.body;
      const lid2= await pool.query(
        "update Lastid set last_id= $1 where table_name = 'Officer'",[id]
      );
      const officer = await pool.query(
        "insert into Officer (officer_id , name , passcode , designation) values ( $1,$2,$3,$4)",
        [id,name,pw,des]
      
      );
  
      res.json("New officer added successfully");
    } catch (err) {
      console.error(err.message);
    }
  });

//create constituency
app.post("/constituency/create", async (req, res) => {
    try {
      const lid= await pool.query(
        "select last_id from Lastid where table_name = 'Constituency'"
      );
      let nu=Number((lid.rows[0]['last_id']).substring(7,9));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(3-nu.length);
      const { type } = req.body;
      const { name } = req.body;
      const { state } = req.body;
      const id = 'const_'+zeros+nu+state;
      const lid2= await pool.query(
        "update Lastid set last_id= $1 where table_name = 'Constituency'",[id]
      );
      const cons = await pool.query(
        "insert into Constituency (constituency_id , type , name , state) values ( $1,$2,$3,$4)",
        [id,type,name,state]
      
      );
  
      res.json("New constituency made successfully");
    } catch (err) {
      console.error(err.message);
    }
  });

  //create coalition
  app.post("/coalition/create", async (req, res) => {
    try {
      const lid= await pool.query(
        "select last_id from Lastid where table_name = 'coalition'"
      );
      let nu=Number((lid.rows[0]['last_id']).substring(6,7));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(2-nu.length);
      const id = 'coal_'+zeros+nu;
      const { name } = req.body;
      const { eid } = req.body;
      // const lid2= await pool.query(
      //   "update Lastid set last_id= $1 where table_name = 'Coalition'",[id]
      // );
      const cons = await pool.query(
        "insert into Coalition (coalition_id , name , election_id) values ( $1,$2,$3)",
        [id,name,eid]
      
      );
  
      res.json("New coalititon made successfully");
    } catch (err) {
      console.error(err.message);
    }
  });

  //insert candidates
  app.post("/candidate/create", async (req, res) => {
    try {
      const lid= await pool.query(
        "select last_id from Lastid where table_name = 'candidate'"
      );
      let nu=Number((lid.rows[0]['last_id']).substring(6,10));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(5-nu.length);
      const id = 'cand_'+zeros+nu;
      const { age } = req.body;
      const { name } = req.body;
      const { eid } = req.body;
      const { pid } = req.body;
      const { cid } = req.body;
      // const lid2= await pool.query(
      //   "update Lastid set last_id= $1 where table_name = 'candidate'",[id]
      // );
      const cand = await pool.query(
        "insert into Candidate (candidate_id, age ,name ,election_id ,party_id,constituency_id) values ( $1,$2,$3,$4,$5,$6)",
        [id,age,name,eid,pid,cid]
      );
      res.json({id:id});
    } catch (err) {
      console.error(err.message);
    }
  });


  //party leader insert
  app.post("/partyLeader/create", async (req, res) => {
    try {
      
      const { cid } = req.body;
      const { pid } = req.body;
      const p_leader = await pool.query(
        "insert into PartyLeader (candidate_id, party_id) values ( $1,$2)",
        [cid,pid]
      );
      res.json("New party leader added successfully");
    } catch (err) {
      console.error(err.message);
    }
  });

  //insert party
  app.post("/party/create", async (req, res) => {
    try {
      const lid= await pool.query(
        "select last_id from Lastid where table_name = 'party'"
      );
      let nu=Number((lid.rows[0]['last_id']).substring(5,7));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(3-nu.length);
      const id = 'par_'+zeros+nu;
      const { symbol } = req.body;
      const { name } = req.body;
      const { cid } = req.body;
      // const lid2= await pool.query(
      //   "update Lastid set last_id= $1 where table_name = 'Party'",[id]
      // );
      const party = await pool.query(
        "insert into Party (party_id , symbol , name, coalition_id) values ( $1,$2,$3,$4)",
        [id,symbol,name,cid]
      
      );
  
      res.json("New party created successfully");
    } catch (err) {
      console.error(err.message);
    }
  });

  


  //REMEMBER TO MAKE PROVISION TO ADD NEW ELECTION TABLES FOR FUTURE ELECTIONS AND MAKE COMMON ROUTE FOR ALL THE VOTER INSERTS
  //done!

  //insert ls voters
  app.post("/voter/create/:eid", async (req, res) => {
    try {
      const { eid } = req.params;
      console.log(req.body)
      console.log("select last_id from Lastid where table_name='voter_"+eid+"'")
      const lid= await pool.query(
        "select last_id from Lastid where table_name='voter_"+eid+"'"
      );
      console.log(lid)
      let nu=Number((lid.rows[0]['last_id']).substring(5,14));
      nu=nu+1;
      nu=String(nu);
      let zeros= "0".repeat(10-nu.length);
      const id = 'vot_'+zeros+nu;
      const { dob } = req.body;
      const { state } = req.body;
      const { fname } = req.body;
      const { lname } = req.body;
      const { address } = req.body;
      const { cid } = req.body;
      const { conid } = req.body;
      const { sconid } = req.body;
      const lsvoter = await pool.query(
        "insert into Voter_"+eid+" (voter_id, dob , state, fname, lname, address, candidate_id, constituency_id, state_constituency_id) values ( $1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [id,dob,state,fname,lname,address,cid,conid,sconid]
      
      );
  
      res.json({id:id});
    } catch (err) {
      console.error(err.message);
    }
  });

  /* REDUNDANT NOW
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


      const lsvoter = await pool.query(
        "insert into Voter_kar_01 (voter_id, dob , state, fname, lname, address, candidate_id, constituency_id, state_constituency_id) values ( $1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [id,dob,state,fname,lname,address,cid,conid,sconid]
      
      );
  
      res.json(lsvoter.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
*/




/*------------- QUERIES SIMPLE----------------------------------------*/

//Get voter list overall for election
//assumed insertion is done right
app.get("/voter/getList/:vlist", async (req, res) => {
  try {
    const { vlist } = req.params;
    const voters = await pool.query("SELECT * FROM "+vlist);
    res.json(voters.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getconst/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const voters = await pool.query(`select name from constituency where constituency_id='${cid}'`);
    res.json(voters.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//-- Get voters list per constituency of ls or state

app.get("/voter/getList/:vlist/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { vlist } = req.params;
    const todo = await pool.query("select * from "+vlist+" where state_constituency_id= $1 or constituency_id=$2", [cid,cid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//-- Cast vote
app.post("/voter/cast/:vlist", async (req, res) => {
  try {
    const { id } = req.body;
    const { vlist } = req.params;
    const { cid } = req.body;
    const update = await pool.query(
      "update "+ vlist +" set candidate_id = $1 WHERE voter_id = $2\
       and candidate_id is null and\
       (state_constituency_id=(select constituency_id from candidate where candidate_id=$3) or\
       constituency_id=(select constituency_id from candidate where candidate_id=$4))",
      [cid, id,cid,cid]
    );
    if (update.rowCount)
    res.json("Vote was casted!");
    else res.json("Sorry, you have either already voted or picked a candidate not contesting in your constituency.");
  } catch (err) {
    console.error(err.message);
  }
});

//get candidate list
app.get("/candidate/getList/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const todo = await pool.query(" select * from candidate where election_id=$1", [eid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get Candidate list for constituency
app.get("/candidate/getList/:eid/:cid", async (req, res) => {
  try {
    const { eid } = req.params;
    const { cid } = req.params;
    console.log(eid, cid)
    const todo = await pool.query(" select * from candidate where election_id= $1 and constituency_id LIKE $2", [eid,cid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//List of all parties in election
app.get("/party/getList/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const todo = await pool.query(" select party_id, p.name from party p, coalition c where election_id=$1 and p.coalition_id=c.coalition_id", [eid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get candidates belonging to a party
app.get("/candidate/inParty/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const todo = await pool.query(" select * from candidate where party_id=$1", [pid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get parties by coalition
app.get("/coalition/getParty/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const todo = await pool.query(" select * from party where coalition_id=$1", [cid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get coalitions
app.get("/Coalition/getList/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const todo = await pool.query(" select * from coalition where election_id=$1", [eid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//----------------COMPLEX QUERIES ------------------------------

//Get votes by constituency
app.get("/votes/constituency/:vlist/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const{ vlist } = req.params;
    const todo = await pool.query(" select candidate.candidate_id, voter_id from "+ vlist +" as voter inner join candidate on voter.candidate_id = candidate.candidate_id where candidate.constituency_id=$1", [cid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get votes by candidate per constituency
app.get("/votes/candidate/:vlist/:cid", async (req, res) => {
  try {
    const { vlist } = req.params;
    const{ cid } = req.params;
    const todo = await pool.query(" select votes.candidate_id, count(votes.voter_id) as num_votes from (select candidate.candidate_id, voter_id from "+ vlist +" as voter full outer join candidate on voter.candidate_id = candidate.candidate_id where candidate.constituency_id=$1) as votes group by votes.candidate_id", [cid]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Find winning candidate for given constituency
app.get("/winnerConstituency/:vlist/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { vlist } = req.params;
    const todo = await pool.query(" select votes.candidate_id, count(votes.voter_id) as num_votes from\
   (\
        select candidate.candidate_id, voter_id\
        from "+vlist+" as voter\
        full outer join candidate\
        on voter.candidate_id = candidate.candidate_id\
        where candidate.constituency_id=$1\
    ) as votes\
    group by votes.candidate_id\
    order by num_votes DESC\
    limit 1;", [cid]);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/getparty/:pid', async (req, res)=>{
  try {
    const { pid } = req.params;
    const todo = await pool.query(`select name from party where party_id='${pid}'`);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//Get voter turnout
app.get("/turnout/all/:vlist", async (req, res) => {
  try {
    const { vlist } = req.params;
    const todo = await pool.query(" select (count_cand*100.0) / (count_voter) as turnout_percentage\
    from (\
        select count(candidate_id) as count_cand, count(voter_id) as count_voter\
        from "+vlist+" ) as counts");
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Voter turnout per State constituency
app.get("/turnout/constituency/:vlist", async (req, res) => {
  try {
    const { vlist } = req.params;
    const todo = await pool.query(" select state_constituency_id, (count_cand*100.0) / (count_voter) as turnout_percentage\
    from (\
         select state_constituency_id, count(candidate_id) as count_cand, count(voter_id) as count_voter\
         from "+vlist+" group by state_constituency_id\
    ) as counts;");

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getConst/:vlist/:vid", async (req, res) => {
  try {
    const {vlist, vid} = req.params
    const todo = await pool.query(`select constituency_id from ${vlist} where voter_id = '${vid}'`)
    res.json(todo.rows)
  } catch (err) {
    console.log(err)
  }
})

app.get("/constituency/:eid", async (req, res)=>{
  const {eid} = req.params
  try {
    let type = eid.split("_")[0]
    if(type == "ls") {
      const todo = await pool.query("select constituency_id from constituency where type='ls';")
      res.json(todo.rows)
    } else {
      const todo = await pool.query(`select constituency_id from constituency where type='st' and state='${type}';`)
      res.json(todo.rows)
    }
  } catch(err){
    console.error(err.message)
    res.json({"Err": "Failed"})
  }
})

app.post("/get_candidates_party", async (req, res) => {
  try {
    let {candidates} = req.body
    const todo = await pool.query(`select c.candidate_id, p.party_id, p.name from candidate c, party p where candidate_id in ('${candidates.join("','")}') and c.party_id = p.party_id`)
    res.json(todo.rows)
  }
  catch (err) {
    res.json({"Err":err.message})
  }
})


app.get("/elections", async (req, res) => {
  try {
    const todo = await pool.query(`select * from election order by end_date desc`)
    res.json(todo.rows)
  }
  catch (err) {
    res.json({"Err":err.message})
  }
})

app.post("/get_parties_coalition", async (req, res) => {
  try{
    let {parties} = req.body
    const todo = await pool.query(`select c.coalition_id, p.party_id, c.name as coalition_name
    from party p, coalition c where c.coalition_id = p.coalition_id 
    and p.name in ('${parties.join("','")}')`)
    res.json(todo.rows)
  }
  catch (err) {
    res.json({
      Err: err.message
    })
  }
})
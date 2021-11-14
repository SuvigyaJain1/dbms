from os import curdir
import numpy
import random

'''

create database electoral_db;
\c electoral_db
create table Officer(officer_id varchar(20) primary key, name char(30), passcode varchar(30), designation varchar(30));
create table Booth(booth_id varchar(20) primary key, num_voters bigint, constituency_id varchar(20) not null, officer_id varchar(20) not null);
create table Election(election_id varchar(20), end_date date, type varchar(30), start_date date, primary key (election_id));
create table Constituency(constituency_id varchar(20) primary key, type char(20), name varchar(30), state char(30));
create table Coalition(coalition_id varchar(20) primary key, name char(30), election_id varchar(20) not null);
create table Party(party_id varchar(20) primary key, symbol varchar(200), name varchar(30), coalition_id varchar(20));
create table PartyLeader(candidate_id varchar(20) primary key, party_id varchar(20) not null);
create table Candidate(candidate_id varchar(20) primary key, age int, name varchar(30) not null, election_id varchar(20) not null, party_id varchar(20), constituency_id varchar(20) not null);

create table Voter_ls_09(voter_id varchar(20) primary key, dob date, state char(30), fname char(20), lname char(20), address varchar(45), candidate_id varchar(20), constituency_id varchar(20) not null, state_constituency_id varchar(20) not null);

create table Voter_st_12ka(voter_id varchar(20) primary key, dob date, state char(30), fname char(20), lname char(20), address varchar(45), candidate_id varchar(20), constituency_id varchar(20) not null, state_constituency_id varchar(20) not null);

'''

class Generator:    
    def __init__(self):
        self.const_files = ['karnataka.txt',  'kerala.txt',  'maharashtra.txt', 'tamil_nadu.txt']
        self.name_file = 'names.txt'
        self.e_ids = ['ls_01', 'kar_01', 'mah_01', 'ker_01', 'tam_01']
        self.coalitions = ['coal_001', 'coal_002', 'coal_003', 'coal_004', 'coal_005', None]
        self.parties = ['par_001','par_002','par_003','par_004','par_005','par_006','par_007','par_008','par_009','par_010','par_011','par_012','par_013','par_014','par_015','par_016','par_017','par_018','par_019','par_020']
        self.name_states = {}
        
        for file in self.const_files:
            fx = open(file, 'r')
            self.name_states[file[:3]] = fx.read().split('\n')

        with open(self.name_file, 'r') as f:
            self.names = f.read().split('\n')

    def generateOfficers(self, n, pk, start_id):
        cur_id = start_id
        self.officer_ids = []

        with open('officer.sql', 'w') as f:
            print("\c electoral_db", file=f)
            for _ in range(n):
                cur_id += 1
                name = random.choice(self.names)
                officer_id = f"{pk}{cur_id:05d}"
                print(f"insert into Officer values ('{officer_id}','{name}','{name}','presiding officer');", file=f)        
                self.officer_ids.append(officer_id)

    def generateBooth(self, n, pk, start_id):
        cur_id = start_id
        self.booth_ids = []

        officer_ids = random.sample(self.officer_ids, n)
        with open('booths.sql', 'w') as f:
            print("\c electoral_db", file=f)
            for i in range(n):
                cur_id += 1
                const = random.choice(random.choice(list(self.constituency_ids.values())))
                o_id = officer_ids[i]
                booth_id=f"{pk}{cur_id:05d}"
                print(f"insert into Booth values ( '{booth_id}', {0}, '{const}', '{o_id}');", file=f)
                self.booth_ids.append(booth_id)
                cur_id += 1

    def generateConstituency(self, n, pk, start_id ):
        cur_id = start_id
        self.constituency_ids = {'ls':[], 'kar':[], 'tam':[], 'ker':[], 'mah':[]}

        name_states = []
        for key in self.name_states:
            name_states += [(val, key) for val in self.name_states[key]]

        name_states = random.sample(name_states, n)

        with open('const.sql', 'w') as f:
            print("\c electoral_db", file=f)
            for i in range(n):
                name, state = name_states[i][0].strip(), name_states[i][1].strip()
                # print("name: ", name, "state:", state)
                state = state.split('.')[0]
                c_id = f"{pk}{cur_id:03d}{state[:3]}"
                type = random.choice(['ls', 'st'])
                print(f"insert into Constituency values ('{c_id}','{type}','{name}','{state}');", file=f)

                if type=='ls':
                    self.constituency_ids['ls'].append(c_id)
                else:
                    self.constituency_ids[state[:3]].append(c_id)
                cur_id += 1

    def generateCandidate(self, n, pk, start_id):
        cur_id = start_id
        seen = {}
        self.candidates=[]
        parties = random.choices(self.parties, k=n)
        
        # print(self.constituency_ids)
        with open('candidates.sql', 'w') as f:
            print("\c electoral_db", file=f)

            for i in range(n):
                cand_id=f"{pk}{cur_id:05d}"
                age=random.randint(25, 100)
                name=' '.join(random.sample(self.names, 2))
                e_id=random.choice(self.e_ids)
                par_id=random.choice(self.parties)

                if e_id[:2]=='ls':
                    const_id=random.choice(self.constituency_ids['ls'])
                else:                   
                    const_id=random.choice(self.constituency_ids[e_id[:3]])

                while True:
                    if (par_id not in seen.get(const_id, [])):
                        break
                    par_id=random.choice(self.parties)
                    if e_id[:2]=='ls':
                        const_id=random.choice(self.constituency_ids[e_id[:2]])
                    else:
                        const_id=random.choice(self.constituency_ids[e_id[:3]])
                
                seen[const_id] = seen.get(const_id, [])
                seen[const_id].append(par_id)

                print(f"insert into Candidate values ('{cand_id}',{age},'{name}','{e_id}','{par_id}','{const_id}');", file=f)
                cur_id += 1
                self.candidates.append(cand_id)

    def generateVoter(self, n, pk, start_id):
        cur_id = start_id
        
        with open('voter.sql', 'w') as f:
            print("\c electoral_db", file=f)
            for _ in range(n):
                voter_id=f"{pk}{cur_id:010d}"
                name =random.sample(self.names, 2)
                e_id = random.choice(self.e_ids)
                dob = f"{random.randint(1950,2000)}-{random.randint(1,12)}-{random.randint(1,28)}" 

                const_id = random.choice(self.constituency_ids[e_id.split('_')[0]])
                state = const_id[-3:]

                if e_id[:2]!='ls':
                    print(f"insert into Voter_{e_id} values ('{voter_id}','{dob}','{state}','{name[0]}','{name[1]}', NULL, NULL, NULL,'{const_id}');", file=f) 
                else:
                    print(f"insert into Voter_{e_id} values ('{voter_id}','{dob}','{state}','{name[0]}','{name[1]}', NULL, NULL, '{const_id}', NULL);", file=f) 
                cur_id += 1

g = Generator()

g.generateOfficers(40, "officer_", 1)
g.generateConstituency(60, 'const_', 1)
g.generateBooth(40, 'booth_', 1)
g.generateCandidate(100, "cand_", 1)
g.generateVoter(500, "vot_", 1)
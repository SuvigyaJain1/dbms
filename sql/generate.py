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
        self.e_ids = ['ls_01', 'kar_01']
        self.coalitions = ['coal_001', 'coal_002', 'coal_003', 'coal_004', 'coal_005', None]
        self.parties = ['par_001','par_002','par_003','par_004','par_005','par_006','par_007','par_008']
        self.name_states = []
        for file in self.const_files:
            fx = open(file, 'r')
            self.name_states += list(map(lambda x: (x, file), fx.read().split('\n')))

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
                const = random.choice(self.constituency_ids)
                o_id = officer_ids[i]
                booth_id=f"{pk}{cur_id:05d}"
                print(f"insert into Booth values ( '{booth_id}', {0}, '{const}', '{o_id}');", file=f)
                self.booth_ids.append(booth_id)
                cur_id += 1

    def generateConstituency(self, n, pk, start_id ):
        cur_id = start_id
        self.constituency_ids = []

        name_states = random.sample(self.name_states, n)

        with open('const.sql', 'w') as f:
            print("\c electoral_db", file=f)
            for i in range(n):
                name, state = name_states[i]
                state = state.split('.')[0]
                c_id = f"{pk}{cur_id:03d}{state[:3]}"
                type = random.choice(['ls', 'st'])
                print(f"insert into Constituency values ('{c_id}','{type}','{name}','{state}');", file=f)
                self.constituency_ids.append(c_id)
                cur_id += 1

    def generateCandidate(self, n, pk, start_id):
        cur_id = start_id
        seen = {}
        self.candidates=[]

        with open('candidates.sql', 'w') as f:
            print("\c electoral_db", file=f)

            for i in range(n):
                cand_id=f"{pk}{cur_id:05d}"
                age=random.randint(25, 100)
                name=' '.join(random.sample(self.names, 2))
                e_id=random.choice(self.e_ids)
                par_id=random.choice(self.parties)
                const_id=random.choice(self.constituency_ids)
                
                while par_id in seen.get(const_id, []):
                    par_id=random.choice(self.parties)
                    const_id=random.choice(self.constituency_ids)

                print(f"insert into Candidate values ('{cand_id}',{age},'{name}','{e_id}','{par_id}','{const_id}');", file=f)
                cur_id += 1
                self.candidates.append(cand_id)

    def generateVoter(self, n, pk, start_id):
        cur_id = start_id
        
        with open('voter.sql', 'w') as f:
            print("\c electoral_db", file=f)
            for _ in range(n):
                voter_id=f"{pk}{cur_id:010d}"
                age=random.randint(18, 100)
                name =random.sample(self.names, 2)
                e_id = random.choice(self.e_ids)
                dob = f"{random.randint(1950,2000)}-{random.randint(1,12)}-{random.randint(1,28)}" 

                const_id = random.choice(self.constituency_ids)
                state = const_id[-3:]

                if e_id[:2]!='ls':
                    print(f"insert into Voter_{e_id} values ('{voter_id}','{dob}','{state}','{name[0]}','{name[1]}', NULL, NULL, NULL,'{const_id}');", file=f) 
                else:
                    print(f"insert into Voter_{e_id} values ('{voter_id}','{dob}','{state}','{name[0]}','{name[1]}', NULL, NULL, '{const_id}', NULL);", file=f) 
                cur_id += 1

g = Generator()

g.generateOfficers(100, "officer_", 1)
g.generateConstituency(100, 'const_', 1)
g.generateBooth(100, 'booth_', 1)
g.generateCandidate(100, "cand_", 1)
g.generateVoter(500, "vot_", 1)
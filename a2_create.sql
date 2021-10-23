create database electoral_db;
\c electoral_db
create table Officer(officer_id varchar(20) primary key, name char(30), passcode varchar(30), designation varchar(30));
create table Booth(booth_id varchar(20) primary key, num_voters bigint, constituency_id varchar(20) not null, officer_id varchar(20) not null);
create table Election(election_id varchar(20), end_date date, type varchar(30), start_date date, primary key (election_id));
create table Coalition(coalition_id varchar(20) primary key, name char(30), election_id varchar(20) not null);
create table Candidate(candidate_id varchar(20) primary key, age int, name varchar(30) not null, election_id varchar(20) not null, party_id varchar(20), constituency_id varchar(20) not null);
create table Constituency(constituency_id varchar(20) primary key, type char(20), name varchar(30), state char(30));
create table PartyLeader(candidate_id varchar(20) primary key, party_id varchar(20) not null);
create table Party(party_id varchar(20) primary key, symbol varchar(200), name varchar(30), coalition_id varchar(20));
create table Voter(voter_id varchar(20) primary key, dob date, state char(30), fname char(20), lname char(20), address varchar(45), candidate_id varchar(20), constituency_id varchar(20) not null, state_constituency_id varchar(20) not null);

alter table Booth add constraint boothfk1 foreign key(constituency_id) references Constituency(constituency_id);
alter table Booth add constraint boothfk2 foreign key(officer_id) references Officer(officer_id);
alter table Coalition add constraint coalfk1 foreign key(election_id) references Election(election_id);
alter table Candidate add constraint candfk1 foreign key(election_id) references Election(election_id);
alter table Candidate add constraint candfk2 foreign key(party_id) references Party(party_id);
alter table Candidate add constraint candfk3 foreign key(constituency_id) references Constituency(constituency_id);
alter table PartyLeader add constraint partylfk1 foreign key(party_id) references Party(party_id);
alter table PartyLeader add constraint partylfk2 foreign key(candidate_id) references Candidate(candidate_id);
alter table Party add constraint partyfk1 foreign key(coalition_id) references Coalition(coalition_id);
alter table Voter add constraint voterfk1 foreign key(candidate_id) references Candidate(candidate_id);
alter table Voter add constraint voterfk2 foreign key(constituency_id) references Constituency(constituency_id);
alter table Voter add constraint voterfk3 foreign key(state_constituency_id) references Constituency(constituency_id);
alter table Candidate add constraint check_cand_age check(age >= 25);


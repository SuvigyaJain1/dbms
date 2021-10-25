\c electoral_db

insert into Officer values ('officer_001','Mr.Nagesh Prasad','b387c2','presiding officer');
insert into Officer values ('officer_002','Mr.Guru Suresh','b437c8','presiding officer');
insert into Officer values ('officer_003','Mr.Ramesh Bhat','b521c4','presiding officer');
insert into Officer values ('officer_004','Mr.Venkat Kumar','b290c2','presiding officer');
insert into Officer values ('officer_005','Mrs. Meena Kumari','b459c9','presiding officer');
insert into Officer values ('officer_006','Mr. Rajesh Prasad','b921c2','presiding officer');
insert into Officer values ('officer_007','Mr. Joel John','b231c7','presiding officer');
insert into Officer values ('officer_008','Mrs. Chitra Ganesh','b071c3','presiding officer');
insert into Officer values ('officer_009','Mr. Nihal Balaji','b371c6','presiding officer');
insert into Officer values ('officer_010','Mrs. Harika Sachdev ','b033c1','presiding officer');


insert into Constituency values ('con_st_001ka','legislative','Bidar','Karnataka');
insert into Constituency values ('con_st_002ka','legislative','Raichur','Karnataka');
insert into Constituency values ('con_ls_001','Lok Sabha','Bangalore South','Karnataka');
insert into Constituency values ('con_ls_002','Lok Sabha','Bangalore North','Karnataka');
insert into Constituency values ('con_ls_003','Lok Sabha','Mysore','Karnataka');



insert into Election values ( 'el_ls_09','2009-05-25','Lok Sabha' ,'2009-05-20');
insert into Election values ( 'el_st_12ka','2012-04-10','Karnataka- State Election','2012-04-13');


insert into Coalition values ('coal_02_19','United Front','el_ls_09');
insert into Coalition values ('coal_03_19','NDA' ,'el_ls_09');
insert into Coalition values ('coal_01_12ka','CPI','el_st_12ka');
insert into Coalition values ('coal_02_12ka','BJP','el_st_12ka');



insert into Party values ( 'par_001', 'null', 'BJP' , 'coal_03_19' );
insert into Party values ( 'par_002', 'null', 'INC' , 'coal_02_12ka' );
insert into Party values ( 'par_003', 'null', 'Janta Dal' , 'coal_02_12ka' );
insert into Party values ( 'par_004', 'null', 'CPI' , 'coal_01_12ka' );
insert into Party values ( 'par_005', 'null', 'INC' , 'coal_02_19' );



insert into Booth values ( 'bo_001_ka',1839, 'con_st_001ka', 'officer_001');
insert into Booth values ( 'bo_002_ka',3782, 'con_st_001ka', 'officer_002');
insert into Booth values ( 'bo_003_ka',4451, 'con_st_002ka', 'officer_003');
insert into Booth values ('bo_004_ka',2121, 'con_st_002ka', 'officer_004');
insert into Booth values ( 'bo_005_ka',4561, 'con_ls_002', 'officer_005');
insert into Booth values ( 'bo_006_ka',1020, 'con_ls_002', 'officer_006');
insert into Booth values ( 'bo_007_ka',2322, 'con_ls_001', 'officer_007');
insert into Booth values ( 'bo_008_ka',3459, 'con_ls_001', 'officer_008');
insert into Booth values ( 'bo_009_ka',2938, 'con_ls_003', 'officer_009');
insert into Booth values ( 'bo_010_ka',2397, 'con_ls_003', 'officer_010');



insert into Candidate values ('cand_001',47,'Surya Prasad','el_ls_09','par_001','con_ls_001');
insert into Candidate values ('cand_002',58,'Mukesh Bhat','el_ls_09','par_005','con_ls_001');
insert into Candidate values ('cand_003',45,'Linga Gowda','el_ls_09','par_001','con_ls_002');
insert into Candidate values ('cand_004',61,'Somnath Pillai','el_ls_09','par_005','con_ls_002');
insert into Candidate values ('cand_005',50,'Kiran Reddy','el_ls_09','par_001','con_ls_003');
insert into Candidate values ('cand_006',49,'Kasturi Suresh','el_ls_09','par_005','con_ls_003');

insert into Candidate values ('cand_007',56,'Rajesh Gowda','el_st_12ka','par_002','con_st_001ka');
insert into Candidate values ('cand_008',44,'Pramukh Kumar','el_st_12ka','par_004','con_st_001ka');
insert into Candidate values ('cand_009',63,'Sita Sethupathy','el_st_12ka','par_003','con_st_002ka');
insert into Candidate values ('cand_010',56,'Mahesh Reddy','el_st_12ka','par_004','con_st_002ka');


insert into voter values ('vot_001','2001-03-15','Karnataka','Rahul','Kumar','2nd cross,indiranagar',NULL,'con_ls_001','con_st_001ka');
insert into voter values ('vot_002','2000-04-25','Karnataka','Rakesh','Singh','3nd cross,Kormanagala',NULL,'con_ls_002','con_st_002ka');
insert into voter values ('vot_003','1983-01-10','Karnataka','Abdul','Rahman','2nd cross,MG Road',NULL,'con_ls_003','con_st_001ka');
insert into voter values ('vot_004','2980-03-17','Karnataka','Veena','Kumari','17nd cross,Banashankari',NULL,'con_ls_001','con_st_002ka');
insert into voter values ('vot_005','1976-02-27','Karnataka','Rani','Mukkerjee','12nd cross,indiranagar',NULL,'con_ls_002','con_st_001ka');
insert into voter values ('vot_006','1977-06-22','Karnataka','Selena','Joseph','4th stage,BTM Layout',NULL,'con_ls_003','con_st_002ka');
insert into voter values ('vot_007','2001-07-20','Karnataka','Rohan','George','2nd phase,JP nagar',NULL,'con_ls_001','con_st_001ka');
insert into voter values ('vot_008','1960-08-11','Karnataka','Vignesh','Kamath','3nd block,Jayangar',NULL,'con_ls_002','con_st_002ka');
insert into voter values ('vot_009','1999-09-16','Karnataka','Suresh','Kumar','5th phase,JP nagar',NULL,'con_ls_003','con_st_001ka');
insert into voter values ('vot_010','1987-01-08','Karnataka','Vijay','Sarath','9th cross,Banashankari',NULL,'con_ls_001','con_st_002ka');
insert into voter values ('vot_011','1981-02-01','Karnataka','Chitra','M','2nd cross,Bellendur',NULL,'con_ls_002','con_st_001ka');
insert into voter values ('vot_012','1971-12-11','Karnataka','Suhas','T','13th Main,Bellendur',NULL,'con_ls_003','con_st_002ka');

insert into voter values ('vot_013','2000-03-15','Karnataka','Kedar','Nath','2nd cross,indiranagar',NULL,'con_ls_001','con_st_001ka');
insert into voter values ('vot_014','1984-04-25','Karnataka','Varun','Mohan','3nd cross,Kormanagala',NULL,'con_ls_002','con_st_002ka');
insert into voter values ('vot_015','1988-01-10','Karnataka','Abdul','Raneem','2nd cross,MG Road',NULL,'con_ls_003','con_st_001ka');
insert into voter values ('vot_016','2989-03-17','Karnataka','Raeesa','Tanseen','17nd cross,Banashankari',NULL,'con_ls_001','con_st_002ka');
insert into voter values ('vot_017','1967-02-27','Karnataka','Shreya','Mukkerjee','12nd cross,indiranagar',NULL,'con_ls_002','con_st_001ka');
insert into voter values ('vot_018','1994-12-22','Karnataka','Sachin','Dsouza','4th stage,BTM Layout',NULL,'con_ls_003','con_st_002ka');
insert into voter values ('vot_019','2000-07-20','Karnataka','Shilpita','Reddy','2nd phase,JP nagar',NULL,'con_ls_001','con_st_001ka');
insert into voter values ('vot_020','1990-02-11','Karnataka','Hari','Kamath','3nd block,Jayangar',NULL,'con_ls_002','con_st_002ka');
insert into voter values ('vot_021','1993-11-16','Karnataka','Madhav','Sarath','5th phase,JP nagar',NULL,'con_ls_003','con_st_001ka');
insert into voter values ('vot_022','1989-01-08','Karnataka','Lokesh','Kumar','9th cross,Banashankari',NULL,'con_ls_001','con_st_002ka');
insert into voter values ('vot_023','1986-02-01','Karnataka','Zubeen','M','2nd cross,Bellendur',NULL,'con_ls_002','con_st_001ka');
insert into voter values ('vot_024','1970-12-11','Karnataka','Sethu','Tilak','13th Main,Bellendur',NULL,'con_ls_003','con_st_002ka');


insert into PartyLeader values('cand_001','par_001');
insert into PartyLeader values('cand_002','par_002');
insert into PartyLeader values('cand_003','par_003');
insert into PartyLeader values('cand_004','par_004');
insert into PartyLeader values('cand_005','par_005');











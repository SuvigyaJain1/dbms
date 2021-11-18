\c electoral_db

create user ec with password 'ec';
create user booth with password 'booth';
create user bo with password 'bo';
create user ero with password 'ero';

grant insert, select, update, delete on election to ec;
grant select on all tables in schema public to ec;
grant insert, select, update, delete on constituency to ec;

grant select, update on voter_ls_01 to booth;
grant select on candidate to booth;

grant select on voter_ls_01, candidate to bo;

grant insert, select, update, delete on voter_ls_01 to ero;
grant insert, select, update, delete on candidate to ero;
grant insert, select, update, delete on party to ero;
grant insert, select, update, delete on coalition to ero;
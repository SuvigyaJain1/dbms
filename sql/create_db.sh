# python3 generate.py    
sudo -u postgres psql -f ./a2_create.sql
sudo -u postgres psql -f ./officer.sql
sudo -u postgres psql -f ./const.sql
sudo -u postgres psql -f ./elections.sql
sudo -u postgres psql -f ./coalition.sql
sudo -u postgres psql -f ./parties.sql
sudo -u postgres psql -f ./booths.sql
sudo -u postgres psql -f ./candidates.sql
sudo -u postgres psql -f ./party_leader.sql
sudo -u postgres psql -f ./voter.sql
sudo -u postgres psql -f ./grant-permissions.sql
sudo -u postgres psql -f ./lastid.sql
sudo -u postgres psql -f ./triggers.sql
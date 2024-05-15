## Befehle bevor Docker gestartet werden kann

mkdir -p ./volumes/app/mattermost/{config,data,logs,plugins,client/plugins,bleve-indexes} <br>
sudo chown -R 2000:2000 ./volumes/app/mattermost

## Docker Compose Befehl
sudo docker compose -f docker-compose.yml -f docker-compose.without-nginx.yml up -d

## User in Mattermost anlegen
Testuser mit Namen user1, ..., user6 anlegen (es reicht auch einer davon) <br>
Anschließend wieder ausloggen <br>
Passwort sollte nun auf den Namen der entsprechenden Mensa geändert worden sein (30s warten) <br>
<br>
{ id: 1, name: 'Mensa Am Adenauerring' } <br>
{ id: 2, name: 'Mensa Moltkestraße' } <br>
{ id: 3, name: 'Mensa Erzbergerstraße' } <br>
{ id: 4, name: 'Mensa Schloss Gottesaue' } <br>
{ id: 5, name: 'Mensa Tiefenbronner Straße' } <br>
{ id: 6, name: 'Mensa Holzgartenstraße' }
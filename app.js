const https = require('https');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

// Database connection configuration
const pgClient = new Client({
    user: 'mmuser',
    host: 'host.docker.internal',
    database: 'mattermost',
    password: 'mmuser_password',
    port: 5432,
});

const url = 'https://intranet.hka-iwi.de/iwii/REST/canteen/names';

pgClient.connect();

async function fetchDataAndExecute() {  
    try {        
        https.get(url, (response) => {
            let data = '';
        
            response.on('data', (chunk) => {
              data += chunk;
            });
        
            response.on('end', async () => {
              if (response.statusCode === 200) {
                try {
                  const jsonData = JSON.parse(data);
      
                  for(var id in jsonData) {
                      if(jsonData.hasOwnProperty(id)) {
                        var user = jsonData[id];
                        hash = await bcrypt.hash(user.name, 10);
                        username = "user" + user.id;
                        await pgClient.query('UPDATE users SET password = $1 WHERE username = $2', [hash, username]);
                        console.log("Daten erfolgreich gespeichert:", user);
                      }
                  }
                } catch (error) {
                  console.error('Fehler beim Parsen der JSON-Daten:', error);
                }
              } else {
                console.log('Fehler beim Abrufen der Daten. Statuscode:', response.statusCode);
              }
            });
          }).on('error', (error) => {
            console.error('Fehler beim Abrufen der Daten:', error);
          });
    } catch(error) {
        console.error('Fehler bei der Datenbankverbindung:', error);
    }
    
    setTimeout(fetchDataAndExecute, 30000);
  }

fetchDataAndExecute();
## Step 1

- IL faut lancer le docker elasticsearch dans src/elasticsearch avec la commande : docker-compose up
- Elasticsearch contiendra l'index des objets dans concerts-full.json et son data est lié avec le dossier esdata
- Si vous voulez re-créer le fichier concerts-full.json, lancez node  script/generate-concerts-full.js
- Si vous voulez re-indexer les indexes de concerts, il faut vider esdata puis lancer script/index-concerts.js
- Pour lancer le server: npm start
- Pour lancer les tests : npm test
- Pour lancer eslint: npm run lint

## Step 2

- For 2 million bands, 10,000 venues, and 200 million events, we need increase the numbers of elasticsearch's node to keep elasticsearch run smoothly 

- What do you identify as possible risks in the architecture that you described in the long run, and how would you mitigate those?

    -  Possible risks in the long run are the avaibility of node server and the synchronize of data of elasticsearch's node. We need to monitor and maintain the server and make a backup of elasticsearch data    

- What are the key elements of your architecture that would need to be monitored, and what would you use to monitor those?

    - The elasticsearch and node server needs to be monitored, we can use Kibana or MetricBeats to monitor elastice server and AppMetrics to monitor node server   


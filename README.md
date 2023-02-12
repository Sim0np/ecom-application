

<h1> Cahier de charge </h1>


<p>Ce travail consiste à développer 3 microservices (inventory, customer et billing), un discovery-service et une gateway avec Spring pour le backend, et une application Angular pour le frontend. La sécurité sera assurée en utilisant Keycloak avec JWT. Les 3 microservices utiliseront Spring Web, Spring Data JPA, H2 Database, Lombok, Rest Repositories, Eureka Discovery Client et Spring Boot Actuator. Le microservice billing dépendra des deux autres microservices et nécessitera les dépendances supplémentaires OpenFeign pour la communication entre les microservices et Spring HATEOAS.</p>

<h1> Partie Backend : </h1>

<h3>
<li>Test du Microservice customer-service : </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 12.58.37.png"/>
<br><br><br>
<li> Test du Microservice inventory-service  </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.02.06.png"/>
<br><br><br>
<li> Test du Microservice billing-service   </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.05.11.png"/>
<br><br><br>

<h2> Configuration statique de la Gateway </h2>
<h3>
<li>Dans le fichier application.yml   </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.19.21.png"/>
<br><br><br>
<li>Dans la class de config    </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.45.00.png"/>
<br><br><br>
<h3> Test des Microservices via la gateway sur le port 8888  </h3>
<h3>
<li>customer-service   </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.46.46.png"/>
<br><br><br>
<li>inventory-service</li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.48.13.png"/>
<br><br><br>
<li>Les Microservices sont tous visibles via le discovery-service : </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.06.55.png"/>
<br><br><br>
<h3> Configuration dynamique de la Gateway  </h3>
<img src="Captures/Capture d’écran 2023-02-10 à 13.54.26.png"/>
<h3>Nous pouvons désormais accéder aux Microservices directement via les noms de services : </h3>
<h3>
<li>Inventory-service </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.56.31.png"/>
<br><br><br>
<li>Customer-service</li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 13.57.49.png"/>
<br><br><br>
<li>Billing-service</li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 14.02.29.png"/>
<br><br><br>
<li>	Test de la base de données H2 du Microservice Billing-service</li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 15.31.49.png"/>
<br><br><br>
<img src="Captures/Capture d’écran 2023-02-10 à 15.33.53.png"/>
<br><br><br>
<li>Test de la méthode fullBill du Microservice Billing-service : Nous avons bien récupéré la facture avec la date, customerId, et productItems </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 15.52.51.png"/>
<br><br><br>
<h3>Grace à openFeign nous avons pu gérer la communication entre les différents Microservices. </h3>

<h1> Partie Frontend Angular : </h1>
<h3>
<li>	Liste des produits : </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.21.23.png"/>
<br><br><br>
<li>	Liste des clients : </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.22.55.png"/>
<br><br><br>
<li> Liste des commandes : </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.32.51.png"/>
<br><br><br>
<li> Détail de la commande: </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.33.56.png"/>
<br><br><br>
<h2>Partie Sécurité avec Keycloak</h2>
<h3>
<li> 	Configuration du Realm et du client à sécuriser </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.50.57.png"/>
<br><br><br>
<li>Création des rôles  </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.53.08.png"/>
<br><br><br>
<li>Création des utilisateurs   </li><br>
<img src="Captures/Capture d’écran 2023-02-10 à 17.54.10.png"/>
<br><br><br>
<li>Authentification sur Keycloak avec password   </li><br>
<img src="Captures/Capture d’écran 2023-01-23 à 21.13.25.png"/>
<br><br><br>
<li>	Authentification sur Keycloak avec le refresh_token   </li><br>
<img src="Captures/Capture d’écran 2023-01-23 à 21.24.30.png"/>
<br><br><br>
<li>	Authentification sur Keycloak avec le client_secret   </li><br>
<img src="Captures/Capture d’écran 2023-02-12 à 01.37.55.png"/>
<br><br><br>
<li>	Sécurisation des services  </li><br>
<img src="Captures/Capture d’écran 2023-02-12 à 02.44.43.png"/>
<br><br><br>
<li>	Affichage de la facture uniquement avec le rôle Admin  </li><br>
<img src="Captures/Capture d’écran 2023-02-12 à 02.46.15.png"/>
<br><br><br>


<h3>Ajouter FeignInterceptor au service BILLING-SERVICE</h3>
<p>Après avoir effectué la sécurisation de chaque microservice, un problème se pose car le service BILLING-SERVICE dépend des microservices INVENTORY-SERVICE et CUSTMOMER-SERVICE. Lorsque ce microservice tente de communiquer directement avec les autres microservices, aucun jeton n'est transmis. 

Afin de résoudre cette problématique, nous avons envisagé de mettre en place un intercepteur au niveau du service BILLING-SERVICE. Cette opération permettra d'intercepter les requêtes et d'ajouter l'en-tête de sécurité contenant le jeton nécessaire à la communication avec les autres microservices.</p>
<img src="Captures/Capture d’écran 2023-02-12 à 18.56.46.png"/>


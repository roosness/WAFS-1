# Web app from scratch

### JavaScript libraries/frameworks voor en nadelen 
##### Voordelen:
- Het enige echte voordeel van een library is dat het de gebruiker makkelijk maakt bepaalde dingen te coderen. In de volgende bron (https://blog.udemy.com/jquery-vs-javascript/) geven ze een voorbeeld waarin het verschil goed te zien is. Met behulp van jQuery kan je met minder code, hetzelfde bereiken.
- Vooral bij de grote libraries en frameworks is er veel documentatie. Doordat veel mensen gebruik maken van deze libraries is er meestal ook veel over te vinden. Daarentegen is er bij veel nieuwe libraries weinig documentatie en is het over het algemeen lastig voor developers om telkens weer libraries te leren gebruiken.

##### Nadelen:
- Libraries zijn vaak veel trager dan native javascript. In de volgende bron kan je live testen welke manier van elementen selecteren het snelst is. (https://jsperf.com/jquery-vs-javascript-performance-comparison/22)
- Ze werken vaak niet in de oudere browsers. Hoewel veel javascript libraries oudere browsers wel ondersteunen, kan je meestal niet alle features van een library gebruiken voor de oude browsers. Bijvoorbeeld jQuery ondersteunt Internet Explorer 9 en onder niet terwijl native javascript alle browsers ondersteunt. Als je wil dat je code in alle browsers werkt, zal je naast je library code, native javascript moeten schrijven.
- Je bent afhankelijk van externe bestanden. Om libraries te kunnen gebruiken moeten er lokaal of online bestanden worden toegevoegd terwijl javascript gewoon altijd werkt.
- De filesize van je applicatie is groter. Dit is onnodig want in de library staan functies die je niet gebruikt.

### Single page web app voor en nadelen
##### Voordelen:
- Als de website eenmaal geladen is, is de applicatie razend snel. Doordat de hele app op één pagina staat, is alles al geladen en zijn interacties instant.
- De code blijft overzichtelijk. Alle code geldt voor één pagina, dus alle code staat bij elkaar. Hierdoor houd je overzicht.
- Met behulp van 'hashes' kan je pagina's creëeren binnen de single page web app.

##### Nadelen:
- Bij refresh een lange laad tijd. Doordat alle content in één pagina zit, duurt het laden van deze pagina langer dan het laden van een normale pagina.
- Een complexe webapp kan erg zwaar worden om in één keer te laden. Dit kan ook effect hebben op de performance van de webapp. Natuurlijk zijn er manieren om de performance zo goed mogelijk te houden. Bijvoorbeeld zo min mogelijk DOM elementen aanroepen. In de volgende bron staan nog wat manieren beschreven. (http://ozkatz.github.io/8-ways-to-make-your-single-page-web-app-faster.html)
- De navigatie moet zelf gemaakt worden. Dat doet de browser niet meer voor je.

# Hjemmeoppgave for Origo Digi, Oslo Kommune

For å kjøre koden kan du enten åpne index.html i din favorittbrowser, eller gå til [GitHub Pages-siden](https://simonvea.github.io/oslo_bysykkel_tilgjengelighet/) for dette repositoriet. 


## OPPGAVEN:
Formålet her er bare å vise at du kan enkel koding gjennom konsumering av et åpent API. Forventet tidsbruk er 1-2 timer.

Oslo Bysykkel har et åpent API som viser plasseringer og tilstand for sine sykkelstativer

https://oslobysykkel.no/apne-data/sanntid

Din oppgave er å skrive en liten applikasjon som viser en liste over de ulike stasjonene, og hvor mange tilgjengelige låser og ledige sykler som er på dem i øyeblikket.

- Du velger selv hvilke(t) språk du vil bruke
- Bruk bibliotek du foretrekker, om du ønsker det
- Hvordan du viser listen er helt opp til deg, men den må inneholde navnet på stativet, antall tilgjengelige låser og ledige sykler i øyeblikket
- Du trenger ikke skrive tester eller gjøre masse funksjonelt fancy pantsy utover å løse oppgaven ...
- ... men skriv pen og ryddig kode, med normal feilhåndtering

#### Info om bruken av oslobysykkel API

Begge endepunktene som blir brukt i main.js, stationsInfoUrl og availabilityUrl, responderer med (json)objektet: {"last_updated": 1540219230, "data": {"stations": []} }

stationsInfoUrl leverer videre data.stations som:
 [
    {
        "station_id":"627",
        "name":"Skøyen Stasjon",
        "address":"Skøyen Stasjon",
        "lat":59.9226729,
        "lon":10.6788129,
        "capacity":20
    }
]  

availabilityUrl leverer data.stations som:
 [
    {
        "is_installed": 1,
        "is_renting": 1,
        "num_bikes_available": 7,
        "num_docks_available": 5,
        "last_reported": 1540219230,
        "is_returning": 1,
        "station_id": "175"
    }
]  
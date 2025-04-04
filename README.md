# 🌱 PlantCare AI – Ionic + Angular App

**PlantCare AI** è un'applicazione mobile sviluppata con **Ionic Framework** e **Angular** che ti aiuta a monitorare lo stato delle tue piante e a ricevere consigli personalizzati grazie all'integrazione con l'intelligenza artificiale.

## 🚀 Funzionalità principali

- 📋 **Tracciamento delle piante**: aggiungi, visualizza e modifica le informazioni delle tue piante.
- 🌤️ **Condizioni meteo**: visualizza le previsioni meteo nella tua area per aiutarti a curare meglio le tue piante.
- 🧠 **Consigli AI**: ricevi suggerimenti intelligenti su come curare ogni pianta grazie a un servizio AI integrato.
- 🔐 **Autenticazione**: accedi in modo sicuro con login/logout.
- 🧭 **Navigazione semplice**: interfaccia utente intuitiva e responsive.

- ## 🛠️ Requisiti

- [Node.js](https://nodejs.org/) (consigliata versione LTS)
- [Ionic CLI](https://ionicframework.com/docs/cli) (es. `npm install -g @ionic/cli`)
- [Angular CLI](https://angular.io/cli)
- [Capacitor](https://capacitorjs.com/) per deploy mobile (opzionale)

## ▶️ Come eseguire l'app

1. **Clona il repository**

```bash
git clone https://github.com/tuo-username/plantcare-ai.git
cd plantcare-ai
touch /src/assets/enviroment.ts
// crea la tua API_KEY dal tuo profilo google e inseriscila dentro enviroment.ts:
export class Enviroment {
	readonly API_KEY="tua API_KEY";

	getApiKey() {
		return this.API_KEY;	
	}
}
npm install
ionic serve --project nome-tuo-progetto
```

🤖 Integrazione con l'AI
L'app usa un servizio ai.service.ts per comunicare con un backend AI (utilizza GEMINI) per generare consigli intelligenti su:

Quando annaffiare

Come curare piante in base alla temperatura del tua posizione geografica

L’AI non è inclusa in questo repository. Assicurati di creare la tua API_KEY nel file enviroment/enviroment.ts.

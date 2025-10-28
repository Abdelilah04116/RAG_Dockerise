# MarocTrip - Assistant Intelligent pour le Tourisme au Maroc 🌟

Une application combinant un chatbot intelligent avec un système RAG (Retrieval Augmented Generation) pour fournir des informations précises sur les voyages et services touristiques au Maroc.

##  Prérequis

- Docker Desktop
- Clé API Gemini (Google AI)
- Git
- Node.js ≥ 20.9.0 (pour le développement local)
- Python 3.10+ (pour le développement local)

##  Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Abdelilah04116/RAG_Dockerise
   cd RAG_Dockerise
   ```

2. **Configuration de l'environnement**
   ```bash
   # Copier le fichier d'environnement exemple
   cd RAG
   cp .env.exemple .env
   
   # Éditer le fichier .env et ajouter votre clé API Gemini
   # GEMINI_API_KEY=votre_clé_api_ici
   ```

3. **Lancer l'application avec Docker**
   ```bash
   cd RAG
   docker-compose up --build
   ```

##  Accès aux Services

Une fois lancé, vous pouvez accéder aux différents services :

- **Interface utilisateur** : http://localhost:3000
- **API Backend** : http://localhost:8000
- **ChromaDB** : http://localhost:8001

##  Structure du Projet

```
MarocTrip/
├── frontend/               # Interface utilisateur Next.js
│   ├── src/
│   │   └── app/           # Pages et composants
│   └── Dockerfile
│
└── RAG/                   # Système de RAG
    ├── backend/           # API FastAPI
    │   ├── main.py       # Points d'entrée API
    │   ├── rag_engine.py # Moteur RAG
    │   └── requirements.txt
    ├── data/             # Données et documents
    │   └── raw_documents/ # Documents source
    └── docker-compose.yml
```

##  Fonctionnalités

- **Chat Interface**
  - Interface utilisateur moderne et responsive
  - Support multilingue (Français/Anglais)
  - Upload de documents en temps réel

- **Système RAG**
  - Support des formats PDF, DOCX, TXT
  - Indexation automatique des documents
  - Recherche sémantique avec ChromaDB
  - Génération de réponses avec Gemini

##  API Endpoints

- `POST /ask` - Poser une question
- `POST /upload` - Uploader un document
- `POST /index` - Réindexer les documents
- `GET /history` - Historique des conversations

##  Développement Local

Pour développer localement sans Docker :

1. **Frontend (Next.js)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend (FastAPI)**
   ```bash
   cd RAG/backend
   python -m venv venv
   source venv/bin/activate  # ou venv\Scripts\activate sur Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **ChromaDB**
   ```bash
   docker run -p 8001:8000 chromadb/chroma
   ```

##  Variables d'Environnement

- `GEMINI_API_KEY` - Clé API pour Google Gemini
- `NEXT_PUBLIC_API_URL` - URL de l'API backend (par défaut: http://localhost:8000)

##  Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

##  Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de support

##  Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

##  Remerciements

- Google Gemini pour l'API
- L'équipe ChromaDB
- Tous les contributeurs

---

Développé avec ❤️ par [Abdelilah Ourti](https://github.com/abdelilah04116)

--------------------

## information sur l'Auteur 
**Abdelilah Ourti**

[![Email](https://img.shields.io/badge/Email-Contact-red)](mailto:abdelilahourti@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/abdelilah-ourti-a529412a8)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black)](https://github.com/abdelilah04116)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange)](https://abdelilah04116.github.io/)

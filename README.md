#  RAG System - Assistant Intelligent avec Gemini

Un système RAG (Retrieval Augmented Generation) réutilisable qui combine un chatbot intelligent avec une base de connaissances personnalisable. Ce système peut être adapté à n'importe quel domaine ou cas d'usage nécessitant des réponses précises basées sur vos propres documents.

##  Prérequis

- Docker Desktop
- Clé API Gemini (Google AI)
- Git
- Node.js ≥ 20.9.0 (pour le développement local)
- Python 3.10+ (pour le développement local)

##  Installation

1. **Cloner le projet**
   ```bash
   git clone <votre-repo>
   cd rag-system
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
project/
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

- **Interface moderne et réutilisable**
  - UI responsive et personnalisable
  - Support multilingue intégré
  - Upload et indexation de documents en temps réel

- **Système RAG Puissant**
  - Support multi-formats : PDF, DOCX, TXT
  - Indexation automatique des documents
  - Recherche sémantique performante avec ChromaDB
  - Génération de réponses contextuelles avec Gemini
  - Facilement adaptable à différents cas d'usage

##  API Endpoints

- `POST /ask` - Poser une question à la base de connaissances
- `POST /upload` - Uploader un nouveau document
- `POST /index` - Réindexer la base de documents
- `GET /history` - Historique des conversations

##  Personnalisation et Adaptation

Le système est conçu pour être facilement adaptable :

1. **Personnalisation du domaine**
   - Ajoutez vos propres documents dans `/RAG/data/raw_documents/`
   - Adaptez les prompts dans `rag_engine.py`
   - Personnalisez l'interface selon vos besoins

2. **Modification du modèle de langage**
   - Actuellement utilise Gemini, mais peut être adapté pour d'autres LLMs
   - Structure modulaire facilitant l'intégration d'autres modèles

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
- Docker
---

Développé avec ❤️ par [Abdelilah Ourti](https://github.com/abdelilah04116)

--------------------

## information sur l'Auteur 

**Abdelilah Ourti**

[![Email](https://img.shields.io/badge/Email-Contact-red)](mailto:abdelilahourti@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/abdelilah-ourti-a529412a8)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black)](https://github.com/abdelilah04116)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange)](https://abdelilah04116.github.io/)

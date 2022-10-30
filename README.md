# Developer Generic Project Website

A website that shows all your projects and additional information as a resume using a simple MongoDb schema

## Built with

![](https://img.shields.io/badge/Frontend-React-informational?style=flat&logo=React&logoColor=white&color=birightgreen)
![](https://img.shields.io/badge/Frontend-TypeScript-informational?style=flat&logo=typescript&logoColor=white&color=birightgreen)
![](https://img.shields.io/badge/Test-Cypress-informational?style=flat&logo=cypress&logoColor=white&color=birightgreen)
![](https://img.shields.io/badge/Style-MUI-informational?style=flat&logo=Mui&logoColor=white&color=birightgreen)
![](https://img.shields.io/badge/Map-Mapbox-informational?style=flat&logo=Mapbox&logoColor=white&color=birightgreen)
![](https://img.shields.io/badge/Backend-Python-informational?style=flat&logo=Python&logoColor=white&color=brightgreen)
![](https://img.shields.io/badge/API-Flask-informational?style=flat&logo=Flask&logoColor=white&color=brightgreen)
![](https://img.shields.io/badge/DB-Mongo-informational?style=flat&logo=mongodb&logoColor=white&color=brightgreen)

## Screenshots

![screenshot](/web-react/assets/screenShots/main-page.png)
![screenshot](/web-react/assets/screenShots/map.png)

## Setup

### setup mongo db as shown in backend/api example and set env variables

```
MONGO_URL ={your url}
MONGO_PASS={your password}
MONGO_USER={your user name}
```

### run the front end

```
cd web-react
npm install
npm start
```

### set the flask file run the app

```bash
FLASK_APP=api.py
cd backend
flask run
```

# IPA-help-page
## Deployment
### Frontend
Angular ([Vercel](https://vercel.com))
### Backend
Python ([Render](https://dashboard.render.com/)) 
### DB
PostgresSQL ([supabase](https://supabase.com/))

## Backend
Disclamer: 100% of the Backend is AI generated

### User-Endpunkte

#### GET `/users`

**Beschreibung:**
Gibt alle User aus der Datenbank zurück.

**Request:**

* Kein Body

**Response (200):**

```json
[
  {
    "id": 1,
    "username": "tim"
  }
]
```

---

#### POST `/users`

**Beschreibung:**
Erstellt einen neuen User.

**Request (JSON):**

```json
{
  "username": "tim"
}
```

**Fehler:**

* `400` – `username is required`

**Response (201):**

```json
{
  "id": 1,
  "username": "tim"
}
```

---

### Kriterien & Anforderungen

#### GET `/kriterien/{username}`

**Beschreibung:**
Liefert alle Kriterien inklusive:

* Beschreibung
* Mindestanforderungen (G1–G3)
* User-Kommentar pro Kriterium
* Alle Anforderungen mit Erfüllungsstatus pro User

**Pfad-Parameter:**

* `username` – Benutzername

**Response (200):**

```json
[
  {
    "id": "K1",
    "name": "Qualität",
    "description": "Beschreibung",
    "minG1": 2,
    "minG2": 3,
    "minG3": 4,
    "comment": "Mein Kommentar",
    "anforderungen": [
      {
        "id": 1,
        "number": 1,
        "text": "Anforderungstext",
        "isComplete": true
      }
    ]
  }
]
```

**Fehler:**

* `404` – User not found

---

### Anforderung abhaken (pro User)

#### PUT `/users/{username}/anforderungen/{anforderung_id}`

**Beschreibung:**
Setzt oder aktualisiert den Erfüllungsstatus einer Anforderung für einen User.

**Pfad-Parameter:**

* `username`
* `anforderung_id`

**Request (JSON):**

```json
{
  "isComplete": true
}
```

**Response (200):**

```json
{
  "anforderungId": 3,
  "isComplete": true
}
```

**Fehler:**

* `400` – isComplete is required
* `404` – User oder Anforderung nicht gefunden

---

### Kommentar zu Kriterium setzen (pro User)

#### PUT `/users/{username}/kriterien/{kriterium_id}/comment`

**Beschreibung:**
Speichert oder aktualisiert den Kommentar eines Users zu einem Kriterium.

**Pfad-Parameter:**

* `username`
* `kriterium_id`

**Request (JSON):**

```json
{
  "comment": "Das lief gut"
}
```

**Response (200):**

```json
{
  "kriteriumId": "K1",
  "comment": "Das lief gut"
}
```

**Fehler:**

* `400` – comment is required
* `404` – User oder Kriterium nicht gefunden


## Database
Disclamer: Modeld by human
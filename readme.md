# 👷 Workers-Project

REST API ב-**Node.js/Express** לניהול נתוני "Workers", מגובה על ידי **MongoDB Atlas**, ארוז לגמרי ב-Docker ועם **Nginx** כ-Reverse Proxy בחזית. הפרויקט כולל סביבות נפרדות ל-**פיתוח** ול-**פרודקשן**, וגם סקריפט עזר לווינדוס כדי שלא תצטרכו לשנן פקודות Docker.

`Node.js 20` · `Express` · `MongoDB Atlas` · `Nginx` · `Docker Compose` · `JWT Auth`

---

## 📚 תוכן עניינים

- [התחלה מהירה](#-התחלה-מהירה)
- [טכנולוגיות](#-טכנולוגיות)
- [איך זה עובד](#-איך-זה-עובד)
- [משתני סביבה](#-משתני-סביבה)
- [הרצת הפרויקט](#-הרצת-הפרויקט)
- [גישה לאפליקציה](#-גישה-לאפליקציה)
- [בדיקת ה-API](#-בדיקת-ה-api)
- [דברים שכדאי לדעת](#-דברים-שכדאי-לדעת)

---

## 🚀 התחלה מהירה

חדשים כאן? זו הדרך המהירה ביותר להריץ את האפליקציה.

1. **שכפול הפרויקט (Clone)**
   ```bash
   git clone <your-repo-url>
   cd Workers-Project
   ```
2. **הוספת הסודות שלכם** — מלאו את קובץ `.env` (ראו [משתני סביבה](#-משתני-סביבה)), כולל פרטי החיבור ל-MongoDB Atlas
3. **הרצה**
   - 🪟 Windows: לחיצה כפולה על `ComposeFile.bat` ← בחירה באפשרות **1**
   - 🐧 Mac/Linux: `docker compose up`
4. **פתיחה** ← [http://localhost:3000](http://localhost:3000) 🎉

זהו — Docker בונה את האפליקציה ומחבר אותה אוטומטית ל-Cluster שלכם ב-MongoDB Atlas.

---

## 🧰 טכנולוגיות

| | |
|---|---|
| **Runtime** | Node.js 20 (Alpine) |
| **Framework** | Express |
| **מסד נתונים** | MongoDB Atlas (מבוסס ענן, דרך Mongoose) |
| **Reverse Proxy** | Nginx |
| **אימות** | JWT (`JWT_SECRET`) |
| **קונטיינרים** | Docker + Docker Compose (בנייה מרובת-שלבים ל-dev/prod) |

---

## ⚙️ איך זה עובד

- **`app.js`** מעלה את אפליקציית ה-Express, מתחבר ל-MongoDB Atlas דרך **`config/db.js`**, ומחבר את ה-API של Workers בנתיב **`/api/allworkers`**.
- **`model/Workers.js`** מגדיר את סכמת ה-Mongoose עבור Worker.
- **`controllers/worker.controller.js`** מטפל בלוגיקה בפועל — יצירה, קריאה, עדכון ומחיקה.
- **`route/workersRoute.js`** מחבר את נתיבי ה-HTTP לפונקציות הקונטרולר.
- **`public/`** הוא פרונט-אנד סטטי קטן (`index.html`, `style.css`, `api.js`), מוגש ישירות דרך Express.
- **`load-workers.js`** מזין את מסד הנתונים ב-Atlas בנתוני עובדים לדוגמה, אם תרצו כמה כאלה לשחק איתם.
- **`requests.http`** מכיל בקשות מוכנות מראש לבדיקת ה-API (עובד מצוין עם תוסף VS Code REST Client).

### 🔌 נתיבים (Endpoints)

| נתיב | מה הוא עושה |
|---|---|
| `GET /` | מגיש את הפרונט-אנד |
| `GET /health` | בדיקת תקינות — סטטוס האפליקציה, חיבור למסד הנתונים, זמן ריצה, סביבה |
| `/api/allworkers/*` | ה-API של Workers (ראו `route/workersRoute.js` או `requests.http`) |

> האפליקציה גם בודקת בקשות נכנסות מול רשימת CORS מורשית, **ולא תעלה בכלל** אם `JWT_SECRET` לא מוגדר — אז אל תדלגו על הגדרת משתני הסביבה למטה!

### 🐳 מבנה ה-Docker, בפשטות

שלושה קבצי Compose עובדים יחד, תלוי איך אתם מריצים את הפרויקט:

| קובץ | מתי הוא בשימוש | מה הוא מוסיף |
|---|---|---|
| `docker-compose.yml` | תמיד | תצורת בסיס — סרוויס ה-`app` |
| `docker-compose.override.yml` | אוטומטית, בפיתוח | Hot reload, פורט פיתוח (`3000`) |
| `docker-compose.prod.yml` | רק כשמבקשים זאת במפורש | בנייה לפרודקשן, סרוויס ה-`nginx`, הפעלה מחדש אוטומטית |

**בפיתוח**, תיקיית הקוד שלכם מחוברת (mount) ישירות לקונטיינר, כך שברגע ששומרים קובץ, האפליקציה נטענת מחדש מיד — בלי צורך בבנייה מחדש. הגישה לאפליקציה היא ישירה, דרך פורט `3000`.

**בפרודקשן**, הקוד "נאפה" לתוך האימג' בזמן הבנייה (בלי mount חי), האפליקציה נגישה **רק בתוך** הרשת של Docker (לא נחשף אף פורט למחשב המארח), ו-**Nginx** יושב בחזית כ-Reverse Proxy, מאזין על פורט `80` ומעביר את התעבורה הלאה לאפליקציה. גם האפליקציה וגם Nginx יעלו מחדש אוטומטית אם הם קורסים או שהמכונה מופעלת מחדש.

מסד הנתונים כבר אינו קונטיינר מקומי באף אחת מהסביבות — גם הפיתוח וגם הפרודקשן מתחברים לאותו Cluster ב-**MongoDB Atlas**, כך שאין יותר סרוויס `mongodb` ב-Compose.

### 🔀 Nginx כ-Reverse Proxy

בפרודקשן, Nginx יושב לפני האפליקציה ומטפל בכל התעבורה הנכנסת לפני שהיא מגיעה ל-Node:

```yaml
nginx:
  image: nginx:stable-alpine
  restart: always
  ports:
    - "80:80"
  volumes:
    - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
  depends_on:
    - app
```

קובץ `nginx/nginx.conf` מעביר (proxy) בקשות אל קונטיינר האפליקציה, לפי שם ה-service שלו ב-Compose:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://app:3000;
    }

    location /health {
        proxy_pass http://app:3000/health;
        access_log off;
    }
}
```

ההגדרה הזו נותנת לאפליקציה שכבת הגנה נוספת, ומניחה את התשתית לדברים כמו Load Balancing בין כמה קונטיינרים של האפליקציה בעתיד, אם יהיה עומס תעבורה.

---

## 🔑 משתני סביבה

תצטרכו שני קבצים: `.env` לפיתוח ו-`.env.production` לפרודקשן. שניהם משתמשים באותם משתנים:

| משתנה | למה הוא משמש |
|---|---|
| `PORT` | הפורט שהאפליקציה מאזינה עליו בתוך הקונטיינר (ברירת מחדל `3000`) |
| `DB_NAME` | שם מסד הנתונים ב-MongoDB Atlas |
| `MONGO_URL` | מחרוזת חיבור מלאה ל-MongoDB Atlas, לדוגמה: `mongodb+srv://<user>:<password>@<cluster-url>/<db_name>?appName=<app-name>` |
| `DB_USER` | שם משתמש ב-MongoDB Atlas |
| `DB_PASSWORD` | סיסמה ב-MongoDB Atlas |
| `JWT_SECRET` | סוד לחתימת JWT — **חובה**, אחרת האפליקציה לא תעלה |

> 🔒 שמרו סודות אמיתיים מחוץ ל-git — `.env` ו-`.env.production` צריכים להישאר ב-`.gitignore`. זה חשוב במיוחד עכשיו, כשהפרטי ההתחברות מצביעים על מסד נתונים אמיתי בענן, ולא על קונטיינר מקומי חד-פעמי.

---

## ▶️ הרצת הפרויקט

### אפשרות א' — `ComposeFile.bat` (Windows, מומלץ)

פשוט לחצו לחיצה כפולה על `ComposeFile.bat` ובחרו מספר:

```
1. Compose up development environment
2. Compose up production environment
3. Compose down production environment
4. Compose down development environment
5. See which images are running and their size
```

| בחירה | מה זה מריץ |
|---|---|
| **1** | `docker compose up` |
| **2** | `docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up` |
| **3** | `docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml down` |
| **4** | `docker compose down` |
| **5** | `docker ps` |

### אפשרות ב' — פקודות ידניות (Mac/Linux/בכל מקום)

**התחלת פיתוח:**
```bash
docker compose up
```
**עצירה:**
```bash
docker compose down
```

**מעבר לפרודקשן:**
```bash
docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up
```
**עצירת פרודקשן:**
```bash
docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml down
```

**בדיקה מה רץ כרגע:**
```bash
docker ps
```

---

## 🌐 גישה לאפליקציה

| סביבה | כתובת |
|---|---|
| פיתוח | [http://localhost:3000](http://localhost:3000) |
| בדיקת תקינות בפיתוח | [http://localhost:3000/health](http://localhost:3000/health) |
| פרודקשן | [http://localhost](http://localhost) (פורט `80`, דרך Nginx ← מועבר לאפליקציה על פורט `3000`) |
| MongoDB | לא מקומי — מתארח ב-MongoDB Atlas, נגיש רק דרך `MONGO_URL` |

בפרודקשן, רק **Nginx** חשוף לעולם החיצון; קונטיינר ה-`app` נגיש רק דרכו, מעל הרשת הפנימית של Docker.

---

## 🧪 בדיקת ה-API

- פתחו את `requests.http` בכלי HTTP (כמו תוסף VS Code REST Client) והריצו בקשות מוכנות מראש.
- או פשוט בקרו ב-[http://localhost:3000](http://localhost:3000) (פיתוח) / [http://localhost](http://localhost) (פרודקשן) והשתמשו בפרונט-אנד.

---

## 💡 דברים שכדאי לדעת

- Docker Desktop צריך לרוץ לפני שמשתמשים באחת מהפקודות למעלה.
- בפיתוח, שינויי קוד נטענים מחדש (hot reload) אוטומטית — אין צורך בבנייה מחדש בשינויים שוטפים.
- אין `JWT_SECRET`? האפליקציה תיסגר מיד. הגדירו אותו קודם.
- אין יותר קונטיינר מסד נתונים מקומי לחכות לו — האפליקציה מתחברת ישירות ל-MongoDB Atlas דרך `MONGO_URL`, אז ודאו שמחרוזת החיבור נכונה לפני ההרצה.
- בפרודקשן, ל-Nginx לא יהיה למה להעביר תעבורה עד שקונטיינר ה-`app` עולה — בדקו `docker compose logs app` אם `http://localhost` לא מגיב.
- שיניתם קובץ `.env`? הפעילו מחדש את הקונטיינרים כדי שהשינוי ייכנס לתוקף.
- אף פעם לא צריך להריץ `npm install` באופן מקומי — התלויות מותקנות אוטומטית בתוך האימג'.
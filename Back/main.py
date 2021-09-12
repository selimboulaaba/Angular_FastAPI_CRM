from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
import mysql.connector
import json

mydb = mysql.connector.connect(host= "localhost", port= "3306", user= "root", password= "Skouza123", database= "crm")
mycursor = mydb.cursor()

app = FastAPI()

class Settings (BaseModel):
    authjwt_secret_key: str = "my_jwt_secret"

class User (BaseModel):
    email: str
    password: str

class CreateUser (BaseModel):
    nom: str
    prenom: str
    adresse: str
    email: str
    numero: int
    password: str
    position: str

class CreateChef (BaseModel):
    nom: str
    prenom: str
    adresse: str
    email: str
    numero: int
    password: str
    position: str

class CreateDev (BaseModel):
    nom: str
    prenom: str
    adresse: str
    email: str
    numero: int
    password: str
    position: str
    specialite: str
    annee: str

class CreateClient (BaseModel):
    nom: str
    prenom: str
    adresse: str
    email: str
    numero: int
    password: str
    position: str
    entreprise: str

class CreateProjet (BaseModel):
    nom: str
    description: str
    chef: str
    developper: str
    client: str
    date: str

class CreateTache (BaseModel):
    nom: str
    description: str
    date: str
    id_projet: int

class ModifierUSer (BaseModel):
    position: str
    adresse: str
    email_old: str
    email_new: str
    numero: str
    password: str
    specialite: str
    entreprise: str

class ModifyProjet (BaseModel):
    id: str
    nom: str
    description: str
    developper: str
    client: str
    date: str

class ModifyTache (BaseModel):
    id: str
    nom: str
    description: str
    date: str

class Status(BaseModel):
    id_projet: str
    id: str
    status: str

class Review(BaseModel):
    id: str
    review: str

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware (
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@AuthJWT.load_config
def get_config():
    return Settings()
@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse (
        status_code = exc.status_code,
        content = {"detail": exc.message}
    )


@app.post('/signin')
def signin (user: User, Authorize: AuthJWT = Depends()):
    sql = "select email from chef where email='"+user.email+"' and password='"+user.password+"'"
    mycursor.execute(sql)
    row_headers=[x[0] for x in mycursor.description] 
    result = mycursor.fetchall()
    position = 'chef'
    if (not result):
        sql = "select email from developper where email='"+user.email+"' and password='"+user.password+"'"
        mycursor.execute(sql)
        row_headers=[x[0] for x in mycursor.description] 
        result = mycursor.fetchall()
        position = 'developper'
        if (not result):
            sql = "select email from client where email='"+user.email+"' and password='"+user.password+"'"
            mycursor.execute(sql)
            row_headers=[x[0] for x in mycursor.description] 
            result = mycursor.fetchall()
            position = 'client'
            if (not result):
                sql = "select email from admin where email='"+user.email+"' and password='"+user.password+"'"
                mycursor.execute(sql)
                row_headers=[x[0] for x in mycursor.description] 
                result = mycursor.fetchall()
                position = 'admin'
    if (result):
        access_token = Authorize.create_access_token(subject = user.email)
    else:
        raise HTTPException(status_code=401, detail='wrong email or password')
    return {"access_token": access_token, "position": position}

@app.post('/signupchef')
def signup (u: CreateChef):
    sql = "insert into chef values ('"+u.email+"', '"+u.nom+"', '"+u.prenom+"', '"+u.adresse+"', '"+str(u.numero)+"', '"+u.password+"', 0)"
    mycursor.execute(sql)
    mydb.commit()
    return('Done.')

@app.post('/signupdev')
def signup (u: CreateDev):
    sql = "insert into developper values ('"+u.email+"', '"+u.nom+"', '"+u.prenom+"', '"+u.adresse+"', '"+str(u.numero)+"', '"+u.password+"', '"+u.specialite+"', '"+u.annee+"')"
    mycursor.execute(sql)
    mydb.commit()
    return('Done.')

@app.post('/signupclient')
def signup (u: CreateClient):
    sql = "insert into client values ('"+u.email+"', '"+u.nom+"', '"+u.prenom+"', '"+u.adresse+"', '"+str(u.numero)+"', '"+u.password+"', '"+u.entreprise+"')"
    mycursor.execute(sql)
    mydb.commit()
    return('Done.')

@app.post('/createprojet')
def createp (p: CreateProjet):
    dev = p.developper.strip()
    dev = dev.split(' ')
    list1 = []
    for i in dev:
        if len(i)!=0:
            list1.append(i)
    for d in list1:
        sql = "select * from developper where email ='"+d+"'"
        mycursor.execute(sql)
        row_headers=[x[0] for x in mycursor.description] 
        result = mycursor.fetchall()
        if (not result):
            raise HTTPException(status_code=401, detail='wrong developper')
    list1 = ' '.join(list1)
    client = p.client.strip()
    client = client.split(' ')
    list2 = []
    for i in client:
        if len(i)!=0:
            list2.append(i)
    for c in list2:
        sql = "select * from client where email ='"+c+"'"
        mycursor.execute(sql)
        row_headers=[x[0] for x in mycursor.description] 
        result = mycursor.fetchall()
        if (not result):
            raise HTTPException(status_code=401, detail='wrong client')
    list2 = ' '.join(list2)
    sql = "insert into projet (nom, description, chef, developper, client, date, status) values ('"+p.nom+"', '"+p.description+"', '"+p.chef+"', '"+list1+"', '"+list2+"', STR_TO_DATE('"+p.date+"', '%Y-%m-%d'), 0)"
    mycursor.execute(sql)
    mydb.commit()
    sql = "update chef set nb_projets = nb_projets + 1 where email='"+p.chef+"'"
    mycursor.execute(sql)
    mydb.commit()
    return {"Done."}

@app.post('/modprojet')
def modprojet (p: ModifyProjet):
    dev = p.developper.strip()
    dev = dev.split(' ')
    list1 = []
    for i in dev:
        if len(i)!=0:
            list1.append(i)
    for d in list1:
        sql = "select * from developper where email ='"+d+"'"
        mycursor.execute(sql)
        row_headers=[x[0] for x in mycursor.description] 
        result = mycursor.fetchall()
        if (not result):
            raise HTTPException(status_code=401, detail='wrong developper')
    list1 = ' '.join(list1)
    client = p.client.strip()
    client = client.split(' ')
    list2 = []
    for i in client:
        if len(i)!=0:
            list2.append(i)
    for c in list2:
        sql = "select * from client where email ='"+c+"'"
        mycursor.execute(sql)
        row_headers=[x[0] for x in mycursor.description] 
        result = mycursor.fetchall()
        if (not result):
            raise HTTPException(status_code=401, detail='wrong client')
    list2 = ' '.join(list2)
    sql = "update projet set nom='"+p.nom+"', description='"+p.description+"', date='"+p.date+"', developper='"+list1+"', client='"+list2+"' where id='"+p.id+"'"
    mycursor.execute(sql)
    mydb.commit()
    return {"Done."}

@app.post('/createtache')
def createt (t: CreateTache):
    sql = "insert into tache (nom, description, date, status, id_projet) values ('"+t.nom+"', '"+t.description+"', STR_TO_DATE('"+t.date+"', '%Y-%m-%d'), 0, '"+str(t.id_projet)+"')"
    mycursor.execute(sql)
    mydb.commit()
    return {"Done."}

@app.post('/modtache')
def modtache (t: ModifyTache):
    sql = "update tache set nom='"+t.nom+"', description='"+t.description+"', date='"+t.date+"' where id='"+t.id+"'"
    mycursor.execute(sql)
    mydb.commit()
    return {"Done."}

@app.get('/home')
def tableprojet (email: str):
    if (email == 'admin'):
        sql = "select * from projet"
    else:
        sql = "select * from projet where chef='"+email+"' or developper like '%"+email+"%' or client like '%"+email+"%'"
    mycursor.execute(sql)
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.get('/tache')
def gettache (id: int):
    sql = "select * from tache where id_projet='"+str(id)+"'"
    mycursor.execute(sql)
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.get('/account')
def getcompte (email: str, position: str):
    sql = "select * from "+position+" where email='"+email+"'"
    mycursor.execute(sql)
    row_headers=[x[0] for x in mycursor.description] 
    my_result = mycursor.fetchall()
    json_data=[]
    for result in my_result:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.post('/account')
def modifiercompte (u: ModifierUSer):
    sql = "update "+u.position+" set adresse='"+u.adresse+"', email='"+u.email_new+"', numero='"+u.numero+"', password='"+u.password+"'"
    if (u.position == 'chef'):
        sql += ""
    elif (u.position == 'developper'):
        sql += ", specialite='"+u.specialite+"'"
    elif (u.position == 'client'):
        sql += ", entreprise='"+u.entreprise+"'"
    sql += " where email='"+u.email_old+"'"
    print(sql)
    mycursor.execute(sql)
    mydb.commit()
    if (u.email_old != u.email_new):
        p = ['chef', 'developper', 'client']
        for c in range(3):
            sql = "select "+p[c]+" from projet where "+p[c]+" like '%"+u.email_old+"%'"
            mycursor.execute(sql)
            row_headers=[x[0] for x in mycursor.description] 
            rv = mycursor.fetchall()
            json_data=[]
            for result in rv:
                json_data.append(dict(zip(row_headers,result)))
            for i in range(0, len(json_data)):
                x = json_data[i][p[c]].split()
                z = []
                for j in range(0, len(x)):
                    if (x[j] == u.email_old):
                        z.append(u.email_new)
                    else:
                        z.append(x[j])
                z = (' '.join(z))
                x = (' '.join(x))
                sql = "update projet set "+p[c]+"='"+z+"' where "+p[c]+"='"+x+"'"
                mycursor.execute(sql)
                mydb.commit()
    return {u.email_new}
    
@app.post('/status')
def modifierstatus (s: Status):
    sql = "update tache set status='"+s.status+"' where id='"+s.id+"'"
    mycursor.execute(sql)
    mydb.commit()
    sql = "select count(*), sum(status) from tache where id_projet ="+s.id_projet
    mycursor.execute(sql)
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    if json_data[0]["count(*)"] == json_data[0]["sum(status)"]:
        sql = "update projet set status=1 where id="+s.id_projet
        mycursor.execute(sql)
        mydb.commit()
    else:
        sql = "update projet set status=0 where id="+s.id_projet
        mycursor.execute(sql)
        mydb.commit()
    return {"Done."}

@app.post('/review')
def modifierreview (r: Review):
    sql = "update tache set review ='"+r.review+"' where id='"+r.id+"'"
    mycursor.execute(sql)
    mydb.commit()
    return {'Done.'}

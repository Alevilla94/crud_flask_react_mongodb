from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from flask_cors import CORS,cross_origin

import json

from bson import ObjectId, json_util



app= Flask(__name__)

##############################
####    INICIALIZAR DB    ####
##############################

app.config ['MONGO_URI']='mongodb://localhost/PyreactCRUDdb'
mongo=PyMongo(app)

CORS(app) #Permite interacciones con REACT


db=mongo.db.users

### conversion de datos BSON a JSON al generar usuario###
def parse_json(data):
    return json.loads(json_util.dumps(data))


##############################
#### CREACION DE USUARIOS ####
##############################

@app.route('/users', methods=['POST'])
def createUser():
    
    name= request.json['name'],
    profession=request.json['profession'],
    rol=request.json['rol'],
    tecnology= request.json['tecnology']
    
    if name and profession and rol and tecnology:             #Validacion del ingreso de datos
        id=db.insert_one({                                  #Capturo dato generado en 'id' por la DB
        'name': name,                           
        'profession':profession,
        'rol':rol,
        'tecnology':tecnology
        }).inserted_id
          
        response={'_id':ObjectId(id),
        'name': name,
        'profession':profession,
        'rol':rol,
        'tecnology':tecnology                  
                  }
        data=parse_json(response)       #Los datos almacenados en response se conviernte de BSON a JSON con la funcion parse_json
        return jsonify(data)
    else:return not_found()
    
    
##############################
# Lista a todos los usuarios #
##############################

@app.route('/users', methods=['GET'])
def getUsers():
    users=db.find() #Busca en la base de datos el BSON
    response=json_util.dumps(users) #Obtine datos en Bson
    return Response(response, mimetype='application/json') #Convierte datos BSON en JSON


##############################
# Busqueda de usuarios por ID#
##############################

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)}) #Busca en la base de datos el BSON
    response=json_util.dumps(user)          #Obtine datos en Bson
    return Response(response, mimetype='application/json') #Convierte datos BSON en JSON


##############################
# Eliminar de usuarios por ID#
##############################

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    print(type(id))
    db.delete_one({'_id': ObjectId(id)})    #Elimina dato que conside con id
    response=jsonify({'msg':'User ' + id + ' was Deleted successfully'})
    return (response)



##############################
#Actualizar de usuarios por ID#
##############################

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    name= request.json['name'],
    profession=request.json['profession'],
    rol=request.json['rol'],
    tecnology= request.json['tecnology']
    if (name and profession and rol and tecnology):             #Validacion del ingreso de datos
        
        db.update_one({'_id': ObjectId(id)}, {'$set':{          #Actualiza el dato que coincide con ID
        'name': request.json['name'],
        'profession':request.json['profession'],
        'rol':request.json['rol'],
        'tecnology': request.json['tecnology']        
        }}
        )
        response=jsonify({'msg':'User ' + id + ' was updated successfully'})
        return (response)
    else:return not_found()

@app.errorhandler(404)
def not_found(error=None):  #Mensaje de error
    message={
        'messege':'Resource Not Found'+ request.url,
        'status':404
    }
    return message

if __name__=="__main__":
    app.run(debug=True)


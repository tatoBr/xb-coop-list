

# PROFESSIONAL CATALOG API
_This API allows you to catalog, view and manage collaborators_

## ENDPOINTS

### Login User ###
_>>PATCH /users/login_
>Login user and creates its access token

The request body needs to be in JSON format and include the following properties:
- `email` - **String** - Required;
- `password` - **String** - Required;

_Exemple:_
```
PATCH /users/login

{
	"email": "paulo@company.com",
	"password": "aHuidy238OPJHhgd"
} 
```
_The response body will contain a message and the access token._<br><br>  
### Logout user
_>>PATCH /users/logout
>Logout user and destroy its access token. Authorization is Required;

The request body needs to be empty:


_Example:_
```
PATCH /users/logout
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message._<br><br>
### Submit an Administrator
_>> POST  /admins
>Allows to submit a new administrator data. Authorization is Required\
>_Only administrators and owners can add a new administrator._

The request body needs to be in JSON format and include the following properties:
- `username` - **String** - Required;
- `email` - **String** - Required;
- `picture` - **Base64 String** - Optional;
- `firstname` - **String** - Required;
- `lastname` - **String** - Required;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Required;
- `cpf` - **String** - Required;
- `password` - **String** - Required;  


*Example:*
```
POST /admins
Authorization: Bearer <YOUR TOKEN>

{ 
  "username": "paulo_admin",
  "email": "paulo@company.com",
  "picture": "Zm90byBkbyBQYXVsw6NvIGFkbWluaXN0cmFkb3IgZGEgcG9ycmEgdG9kYSEhISEh",
  "firstname`": "Paulo",
  "lastname": "Silva",  
  "birthdate": "1982-12-25T03:00:00.000Z",
  "cpf": "543987321-21",
  "password": "aHuidy238OPJHhgd"	
}
```
_The response body will contain a message and the newly created Admin's id, username and email._<br><br>  
### Get an administrator by id
_>> GET /admins_
>Allows an administrator to get its own data. Authorization is Required. 	

The request body needs to be empty:   
*Example:*
```
GET /admin
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and Admin's username, email, picture, firstname, lastname and birthdate._<br><br>  
### Edit an administrator
_>> PATCH /admins_
>Allows an administrator to edit its cadastral informations. Requires authentication. _The administrator can only edit its own data through this route._ 	

The request body needs to be in JSON format and include some of the following properties:
- `picture` - **Base64 String** - Optional;
- `firstname` - **String** - Optional;
- `lastname` - **String** - Optional;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Optional;

*Example:*
```
PATCH /admin
Authorization: Bearer <YOUR TOKEN>

{
  "picture": "Zm90byBkbyBQYXVsw6NvIGFkbWluaXN0cmFkb3IgZGEgcG9ycmEgdG9kYSEhISEh",
  "firstname`": "João Paulo",
  "lastname": "Silva de Lima",  
  "birthdate": "1982-12-23T03:00:00.000Z",  	
}
```
_The response body will contain a message and Admin's id, username, email, picture, firstname, lastname and birthdate._<br><br>  
### Delete an administrator
_>> DELETE /admins
>Allows an administrator to delete its account. Requires authentication: _The administrator can only delete its own record through this route._

The request body needs to be in JSON format and include the following properties:
- `email` - **String** - Required;
- `password` - **String** - Required;
  
_Example:_
```
DELETE /admin
Authorization: Bearer <YOUR TOKEN>

{
	"email": "paulo@company.com",
	"password": "aHuidy238OPJHhgd"
} 
```
_The response body will contain a message and no content._<br><br>     
### Create a professional as an administrator
_>> POST /admins/manage/professionals_
>Allows an administrator to submit a new professional. Requires Authentication;

The request body needs to be in JSON format and include the following properties:
- `username` - **String** - Required;
- `email` - **String** - Required;
- `picture` - **Base64 String** - Required;
- `firstname` - **String** - Required;
- `lastname` - **String** - Required;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Required;
- `cpf` - **String** - Required;
- `password` - **String** - Required;
- `cep` - **String** - Required;
- `street` - **String** - Required;
- `number` - **Integer** - Required;
- `complement` - **String** - Optional;
- `district` - **String** - Required;
- `county` - **String** - Required;
- `state` - **String** - Required;
- `country` - **String** - Required;
- `homephone` - **String** - Optional;
- `workphone` - **String** - Optional;
- `whatsapp` - **String** - Required;
- `otherphones` - **Array[String]** - Optional;
- `instagram` - **String** - Optional;
- `youtube` - **String** - Optional;
- `linkedin` - **String** - Optional;
- `twitter` - **String** - Optional;
- `clubhouse` - **String** - Optional;
- `tiktok` - **String** - Optional;
- `actuationFields` - **Array[String]** - Required;
- `skills` - **Array[String]** - Required;
- `experienceLevel` - **String** - Required;
- `portifolioUrl` - **String** - Required;
- `about` - **String** - Required;
 
_Example:_
```
POST /admins/manage/professionals
Authorization: Bearer <YOUR TOKEN>

{
	"username": "phill675",
	"email": "philip@email.com",
	"picture": "Zm90byBkbyBQYXVsw6NvIGFkbWluaXN0cmFkb3IgZGEgcG9ycmEgdG9kYSEhISEh",
	"firstname`": "Phillip",
	"lastname": "Banks",  
	"birthdate": "1974-08-23T03:00:00.000Z",
	"cpf": "39875425-21",
	"password": "aHuidy238OPJHhgd",
	"cep": "03901010",
	"street": "Avenida dos Nacionalistas",
	"number": 820,
	"complement": "",
	"district": "Jardim Tango",
	"county": "São Paulo",
	"state": "São Paulo",
	"country": "Brasil",   
	"homephone":"1127549865",
	"workphone":"1125874126",
	"whatsapp":"11975412365",
	"otherphones": [],
	"instagram": "insta.com",
	"youtube":"yt.com",
	"linkedin":"lk.com",
	"twitter":"tt.com",
	"clubhouse":"cb",
	"tiktok":"tktk",
	"actuationFields":["field1", "field2", "field3"],
	"skills":["skill1", "skill2", "skill3"],
	"experienceLevel": "expert",
	"portifolioUrl": "my.portifolio.com",
	"about": "I'm a mistery"	
}
```
_The response body will contain a message and the newly created Professional's id, username, email, picture,\
firstname, lastname, birthdate, actuationFields, skills and status._<br><br>  
### Get all professionals as an administrator
_>> GET admins/manage/professionals?field=boolean&field2=boolean_
>Allows an administrator to get a list of professionals. Requires authentication. _Any Administrator can get the professional list._ 	

This route accepts page and limit parameters plus some optional parameters\
containing the name of the columns to be queried.\
The request body needs to be empty:<br>  
*Example:*
```
GET admins/manage/professionals?page=1&limit=10&username=true&experienceLevel=true
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and the queried columns from all professionals.\
If no query parameter were passed, returns the professional's id, username,\
email, firstname, lastname, actuationFields, skills, status and whatsapp._<br><br>   

### Get a professional by id as an administrator
_>> GET admins/manage/professionals/:id?field=boolean&field2=boolean_
>Allows an administrator to get a professional's information data. Requires authentication. _Administrators can get any professional's data._ 	

This route accepts optional query parameters containing the properties to be queried.\
The request body needs to be empty:   
*Example:*
```
GET admins/manage/professionals/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e?username=true&experienceLevel=true
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and the queried columns from a givem professional.\
If no query parameter were passed, returns the professional's id, username,\
email, firstname, lastname, actuationFields, skills, status and whatsapp._<br><br>   
### Edit a Professional as an administrator
_>>PATCH admins/manage/professionals/:id_
>Allows an administrator to edit an existing professional. Requires Authentication.

The request body needs to be in JSON format and include some of the following properties:
- `picture` - **Base64 String** - Optional;
- `firstname` - **String** - Optional;
- `lastname` - **String** - Optional;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Optional;
- `cep` - **String** - Optional;
- `street` - **String** - Optional;
- `number` - **Integer** - Optional;
- `complement` - **String** - Optional;
- `district` - **String** - Optional;
- `county` - **String** - Optional;
- `state` - **String** - Optional;
- `country` - **String** - Optional;
- `homephone` - **String** - Optional;
- `workphone` - **String** - Optional;
- `whatsapp` - **String** - Optional;
- `otherphones` - **Array[String]** - Optional;
- `instagram` - **String** - Optional;
- `youtube` - **String** - Optional;
- `linkedin` - **String** - Optional;
- `twitter` - **String** - Optional;
- `clubhouse` - **String** - Optional;
- `tiktok` - **String** - Optional;
- `actuationFields` - **Array[String]** - Optional;
- `skills` - **Array[String]** - Optional;
- `experienceLevel` - **String** - Optional;
- `portifolioUrl` - **String** - Optional;
- `about` - **String** - Optional;
- `status` - **String** - Optional;
 
_Example:_
```
PATCH /admins/manage/professional/1ee0f8a0-7ce4-11eb-bc22-c16f14c54f85
Authorization: Bearer <YOUR TOKEN>

{	
	"picture": "Zm90byBkbyBQYXVsw6NvIGFkbWluaXN0cmFkb3IgZGEgcG9ycmEgdG9kYSEhISEh",
	"firstname`": "Phillip",
	"lastname": "Banks",  
	"birthdate": "1974-08-23T03:00:00.000Z",	
	"cep": "03901010",
	"street": "Avenida dos Nacionalistas",
	"number": 820,
	"complement": "",
	"district": "Jardim Tango",
	"county": "São Paulo",
	"state": "São Paulo",
	"country": "Brasil",   
	"homephone":"1127549865",
	"workphone":"1125874126",
	"whatsapp":"11975412365",
	"otherphones": [],
	"instagram": "insta.com",
	"youtube":"yt.com",
	"linkedin":"lk.com",
	"twitter":"tt.com",
	"clubhouse":"cb",
	"tiktok":"tktk",
	"actuationFields":["field1", "field2", "field3"],
	"skills":["skill1", "skill2", "skill3"],
	"experienceLevel": "expert",
	"portifolioUrl": "my.portifolio.com",
	"about": "I'm a mistery"
	"status":"ACTIVE"	
}
```
_The response body will contain a message and the Professional's id, username, email and status._<br><br>  
### Delete a professional as an administrator
_>> DELETE admins/:id/manage/professionals/:profId_
>Allows an administrator to delete a professional. Requires Authorization._

The request body must be empty.
_Example:_
```
DELETE /admins/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e/manage/professional/1ee0f8a0-7ce4-11eb-bc22-c16f14c54f85
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and no content._<br><br>  
### Subscribe as a Professional
_>>POST /professionals_
>Allows an user to subscribe as a professional.
The request body needs to be in JSON format and include the following properties:
- `username` - **String** - Required;
- `email` - **String** - Required;
- `picture` - **Base64 String** - Required;
- `firstname` - **String** - Required;
- `lastname` - **String** - Required;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Required;
- `cpf` - **String** - Required;
- `password` - **String** - Required;
- `cep` - **String** - Required;
- `street` - **String** - Required;
- `number` - **Integer** - Required;
- `complement` - **String** - Optional;
- `district` - **String** - Required;
- `county` - **String** - Required;
- `state` - **String** - Required;
- `country` - **String** - Required;
- `homephone` - **String** - Optional;
- `workphone` - **String** - Optional;
- `whatsapp` - **String** - Required;
- `otherphones` - **Array[String]** - Optional;
- `instagram` - **String** - Optional;
- `youtube` - **String** - Optional;
- `linkedin` - **String** - Optional;
- `twitter` - **String** - Optional;
- `clubhouse` - **String** - Optional;
- `tiktok` - **String** - Optional;
- `actuationFields` - **Array[String]** - Required;
- `skills` - **Array[String]** - Required;
- `experienceLevel` - **String** - Required;
- `portifolioUrl` - **String** - Required;
- `about` - **String** - Required;
 
_Example:_
```
POST /professionals

{
	"username": "phill675",
	"email": "philip@email.com",
	"picture": "Zm90byBkbyBQYXVsw6NvIGFkbWluaXN0cmFkb3IgZGEgcG9ycmEgdG9kYSEhISEh",
	"firstname`": "Phillip",
	"lastname": "Banks",  
	"birthdate": "1974-08-23T03:00:00.000Z",
	"cpf": "39875425-21",
	"password": "aHuidy238OPJHhgd",
	"cep": "03901010",
	"street": "Avenida dos Nacionalistas",
	"number": 820,
	"complement": "",
	"district": "Jardim Tango",
	"county": "São Paulo",
	"state": "São Paulo",
	"country": "Brasil",   
	"homephone":"1127549865",
	"workphone":"1125874126",
	"whatsapp":"11975412365",
	"otherphones": [],
	"instagram": "insta.com",
	"youtube":"yt.com",
	"linkedin":"lk.com",
	"twitter":"tt.com",
	"clubhouse":"cb",
	"tiktok":"tktk",
	"actuationFields":["field1", "field2", "field3"],
	"skills":["skill1", "skill2", "skill3"],
	"experienceLevel": "expert",
	"portifolioUrl": "my.portifolio.com",
	"about": "I'm a mistery"	
}
```
_The response body will contain a message and the newly created Professional's id, username and email._<br><br>  
### Get all professionals
_>>GET /professionals_
>Allows any user to get a list of subscribed professinals.

This route accepts optional query parameters, page and limit.\
The request body needs to be empty:
_Example:_
```
GET /professionals
```
_The response body will contain a message and a list of subscribed Professionals._<br><br>  
### Get Professional by id
_>> GET /professinals/:id_
>Allows an professional to get its own cadastral informations.

The request body needs to be empty:   
*Example:*
```
GET /professinals/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e
```
_The response body will contain a message and the Professional's username, email, picture, firstname, lastname and birthdate._<br><br>  
### Edit Professional's properties
_>>PATCH /professionals
>Allows an professional to update its own cadastral informations. Requires Authentication.

The request body needs to be in JSON format and include some of the following properties:
- `picture` - **Base64 String** - Optional;
- `firstname` - **String** - Optional;
- `lastname` - **String** - Optional;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Optional;
- `cep` - **String** - Optional;
- `street` - **String** - Optional;
- `number` - **Integer** - Optional;
- `complement` - **String** - Optional;
- `district` - **String** - Optional;
- `county` - **String** - Optional;
- `state` - **String** - Optional;
- `country` - **String** - Optional;
- `homephone` - **String** - Optional;
- `workphone` - **String** - Optional;
- `whatsapp` - **String** - Optional;
- `otherphones` - **Array[String]** - Optional;
- `instagram` - **String** - Optional;
- `youtube` - **String** - Optional;
- `linkedin` - **String** - Optional;
- `twitter` - **String** - Optional;
- `clubhouse` - **String** - Optional;
- `tiktok` - **String** - Optional;
- `actuationFields` - **Array[String]** - Optional;
- `skills` - **Array[String]** - Optional;
- `experienceLevel` - **String** - Optional;
- `portifolioUrl` - **String** - Optional;
- `about` - **String** - Optional;
 
_Example:_
```
PATCH /professionals
Authorization: Bearer <YOUR TOKEN>

{	
	"picture": "Zm90byBkbyBQYXVsw6NvIGFkbWluaXN0cmFkb3IgZGEgcG9ycmEgdG9kYSEhISEh",
	"firstname`": "Phillip",
	"lastname": "Banks",  
	"birthdate": "1974-08-23T03:00:00.000Z",	
	"cep": "03901010",
	"street": "Avenida dos Nacionalistas",
	"number": 820,
	"complement": "",
	"district": "Jardim Tango",
	"county": "São Paulo",
	"state": "São Paulo",
	"country": "Brasil",   
	"homephone":"1127549865",
	"workphone":"1125874126",
	"whatsapp":"11975412365",
	"otherphones": [],
	"instagram": "insta.com",
	"youtube":"yt.com",
	"linkedin":"lk.com",
	"twitter":"tt.com",
	"clubhouse":"cb",
	"tiktok":"tktk",
	"actuationFields":["field1", "field2", "field3"],
	"skills":["skill1", "skill2", "skill3"],
	"experienceLevel": "expert",
	"portifolioUrl": "my.portifolio.com",
	"about": "I'm a mistery"		
}
```
_The response body will contain a message and the updated Professional's data._<br><br>  
### Delete a professional
_>> DELETE /professionals/:id_
>Allows an professional to delete its own Data. Requires Authorization._

The request body must be empty.
_Example:_
```
DELETE /professional/1ee0f8a0-7ce4-11eb-bc22-c16f14c54f85
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and no content._<br><br>  
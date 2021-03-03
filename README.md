# PROFESSIONAL CATALOG API
_This API allows you to catalog, view and manage collaborators_

## ENDPOINTS

### Submit an Administrator
_>> POST  /admins/:id_
>Allows you to submit a new administrator account. Requires authentication: _only administrators and owners can add new admins_

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
_>> GET /admins/:id_
>Allows an administrator to get its cadastral informations. Requires authentication. _The administrator can only get its own data through this route._ 	

The request body needs to be empty:   
*Example:*
```
GET /admin/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and Admin's username, email, picture, firstname, lastname and birthdate._<br><br>  
### Edit an administrator
_>> PATCH /admins/:id_
>Allows an administrator to edit its cadastral informations. Requires authentication. _The administrator can only edit its own data through this route._ 	

The request body needs to be in JSON format and include some of the following properties:
- `picture` - **Base64 String** - Optional;
- `firstname` - **String** - Optional;
- `lastname` - **String** - Optional;
- `birthdate` - **A String that represents a date. Must be in a ISO 8601 format.** - Optional;

*Example:*
```
PATCH /admin/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e
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
_>> DELETE /admins/:id_
>Allows an administrator to delete its account. Requires authentication: _The administrator can only delete its own record through this route._

The request body needs to be in JSON format and include the following properties:
- `email` - **String** - Required;
- `password` - **String** - Required;
  
_Example:_
```
DELETE /admin/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e
Authorization: Bearer <YOUR TOKEN>

{
	"email": "paulo@company.com",
	"password": "aHuidy238OPJHhgd"
} 
```
_The response body will contain a message and no content._<br><br>  
### Login as an administrator ###
_>>PATCH /admins/login_
>Allows you to log in with administrator credentials

The request body needs to be in JSON format and include the following properties:
- `email` - String - Required;
- `password` - String - Required;

_Exemple:_
```
GET /admins/login

{
	"email": "paulo@company.com",
	"password": "aHuidy238OPJHhgd"
} 
```
_The response body will contain a message and the access token._<br><br>  
### Logout administrator
_>>PATCH /admins/logout/:id_
>Allows you to logout as administrator. Require authentication.
The request body must be empty.
_Example:_
```
PATCH /admins/logout/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message._<br><br>  
### Create a professional
_>> POST /admins/manage/professional_
>Allows an administrator to submit a new professional. Requires Authentication;

The request body needs to be in JSON format and include the following properties:
- `username` - String - Required;
- `email` - String - Required;
- `picture` - Base64 String - Required;
- `firstname` - String - Required;
- `lastname` - String - Required;
- `birthdate` - A String that represents a date. Must be in a format recognized by the `Date.parse ()` method - Required;
- `cpf` - String - Required;
- `password` - String - Required;
- `cep` - String - Required;
- `street` - String - Required;
- `number` - Integer - Required;
- `complement` - String - Optional;
- `district` - String - Required;
- `county` - String - Required;
- `state` - String - Required;
- `country` - String - Required;
- `homephone` - String - Optional;
- `workphone` - String - Optional;
- `whatsapp` - String - Required;
- `otherphones` - Array[String] - Optional;
- `instagram` - String - Optional;
- `youtube` - String - Optional;
- `linkedin` - String - Optional;
- `twitter` - String - Optional;
- `clubhouse` - String - Optional;
- `tiktok` - String - Optional;
- `actuationFields` - Array[String] - Required;
- `skills` - Array[String] - Required;
- `experienceLevel` - String - Required;
- `portifolioUrl` - String - Required;
- `about` - String - Required;
 
_Example:_
```
POST /admins/manage/professional
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
_The response body will contain a message and the newly created Professional's id, username and email._<br><br>  
### Get all professionals
_>> GET admins/manage/professional?field=boolean&field2=boolean_
>Allows an administrator to get a list of professionals. Requires authentication. _Any Administrator can get the professional list._ 	

This route accepts optional query parameters containing the properties to be queried.\
The request body needs to be empty:   
*Example:*
```
GET admins/manage/professional?username=true&experienceLevel=true
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and the queried properties from all professionals.\
If no query parameter were passed, returns the professional's id, username, email and status._<br><br>   

### Get a professional by id
_>> GET admins/manage/professional/:id?field=boolean&field2=boolean_
>Allows an administrator to get a professional's information data. Requires authentication. _Administrators can get any professional's data._ 	

This route accepts optional query parameters containing the properties to be queried.\
The request body needs to be empty:   
*Example:*
```
GET admins/manage/professional/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e?username=true&experienceLevel=true
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and the queried properties from a givem professional.\
If no parameter were passed, return the professional's full data information._<br><br>   
### Edit a Professional
_>>PATCH /admins/manage/professional/:id_
>Allows an administrator to edit an existing professional. Requires Authentication.

The request body needs to be in JSON format and include some of the following properties:
- `picture` - Base64 String - Optional;
- `firstname` - String - Optional;
- `lastname` - String - Optional;
- `birthdate` - String - Optional;
- `cep` - String - Optional;
- `street` - String - Optional;
- `number` - Integer - Optional;
- `complement` - String - Optional;
- `district` - String - Optional;
- `county` - String - Optional;
- `state` - String - Optional;
- `country` - String - Optional;
- `homephone` - String - Optional;
- `workphone` - String - Optional;
- `whatsapp` - String - Optional;
- `otherphones` - Array[String] - Optional;
- `instagram` - String - Optional;
- `youtube` - String - Optional;
- `linkedin` - String - Optional;
- `twitter` - String - Optional;
- `clubhouse` - String - Optional;
- `tiktok` - String - Optional;
- `actuationFields` - Array[String] - Optional;
- `skills` - Array[String] - Optional;
- `experienceLevel` - String - Optional;
- `portifolioUrl` - String - Optional;
- `about` - String - Optional;
- `status` - String - Optional;
 
_Example:_
```
PATCH /admins/manage/professional
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
_The response body will contain a message and Professional's id, username and email._<br><br>  
### Delete a professional
DELETE /admins/manage/professional:id
>Allows an administrator to delete a professional. Requires Authorization._

_The request body must be empty._
_Example:_
```
DELETE /admins/manage/professional/c45aecf0-7b77-11eb-a237-8b4f7a7ff39e
Authorization: Bearer <YOUR TOKEN>
```
_The response body will contain a message and no content._<br><br>  

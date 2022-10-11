# Caso de éxito

- Recibe una solicitud tipo POST en la ruta /api/signup
- Valida los datos obligatorios name, emai, password y passwordConfirmation
- Valida que el password y el passwordConfirmation sean iguales
- Valida que el campo email sea un correo electrónico válido
- Valida si existe un usuario con el correo electrónico provisto
- Genera una contraseña encriptada (Esta contraseña no se puede desencriptar)
- Crea una cuenta para el usuario con los datos informados, reemplazando la contraseña por la contraseña encriptada
- Genera un token de acceso a partir del ID del usuario
- Actualiza los datos del usuario con el token de acceso generado
- Devuelve 200 con el token de acceso o el nombre de usuario

# Excepciones

- Devuelve un eror 404 si la api no existe
- Retorna un error 400 si el nombre, email, password o passwordConfirmation no fueron provistos por el cliente
- Retorna un error 400 si el password o el passwordConfirmation no son iguales
- Retorna eun rror 400 si el campo email no es un correo electrónico válido
- Retorna un error 403 si el correo electrónico provisto ya se encuentra en uso
- Retorna un error 500 si se produce un error al intentar generar una contraseña encriptada
- Retorna un error 500 si se produce un error al intentar crear una cuenta de usuario
- Retorna un error 500 si se produce un error al intentar generar un token de acceso
- Retorna un error 500 si se produce un error al intentar actualizar el usuario con el token de acesso generado.

### Authentication ### 
POST /auth/register   register a new user
REQUEST BODY
{
  firstName*        string    user first name
  lastName*         string    user last name
  emailOrMobile*    string    email address or mobile number
  password*         string    password must contain only alphabet
  confirmPassword*  string    confirm password must match a password
}
RESPONSE
201
  {
    accessToken     string    user token
  }
400
  {
    message         string    client error message
  }
500
  {
    message         string    server error message
  }
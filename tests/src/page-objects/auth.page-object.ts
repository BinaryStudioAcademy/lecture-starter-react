class Auth {
  get FullName_Field(): ReturnType<typeof $> {
    return $('input[name="full-name"]');
  }

  get Email_Field(): ReturnType<typeof $> {
    return $('input[name="email"]');
  }

  get Password_Field(): ReturnType<typeof $> {
    return $('input[name="password"]');
  }

  get Sign_Button(): ReturnType<typeof $> {
    return $('button[type="submit"]');
  }

  get SignUp_Link(): ReturnType<typeof $> {
    return $('a[href="/sign-up"]');
  }

  get SignIn_Link(): ReturnType<typeof $> {
    return $('a[href="/sign-in"]');
  }
}

export { Auth };

enum ApiPath {
  AUTH = '/auth/**',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  AUTHENTICATED_USER = '/auth/authenticated-user',
  TRIPS = '/trips',
  TRIPS_$ID = '/trips/**',
  BOOKINGS = '/bookings',
}

export { ApiPath };

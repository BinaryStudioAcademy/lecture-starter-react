class Header {
  get Navigation_Container(): ReturnType<typeof $> {
    return $('.header__nav');
  }

  get Logo_Link(): ReturnType<typeof $> {
    return $('.header__logo');
  }

  get Bookings_Link(): ReturnType<typeof $> {
    return $('.header__nav a[href="/bookings"]');
  }

  get ProfileNavigation_Container(): ReturnType<typeof $> {
    return $('.profile-nav');
  }

  get ProfileMenu_Container(): ReturnType<typeof $> {
    return $('.profile-nav__list');
  }

  get ProfileUsername_MenuItem(): ReturnType<typeof $> {
    return $('.profile-nav__username');
  }

  get ProfileSignOut_Button(): ReturnType<typeof $> {
    return $('.profile-nav__sign-out');
  }
}

export { Header };

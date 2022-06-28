class Main {
  get SearchBar_Field(): ReturnType<typeof $> {
    return $('input[type="search"]');
  }

  get Duration_Dropdown(): ReturnType<typeof $> {
    return $('select[name="duration"]');
  }

  get Level_Dropdown(): ReturnType<typeof $> {
    return $('select[name="level"]');
  }

  get TripCards(): ReturnType<typeof $$> {
    return $$('.trip-card');
  }
}

export { Main };

class BookTripModal {
  get Element_Container(): ReturnType<typeof $> {
    return $('.trip-popup');
  }

  get Title_Content(): ReturnType<typeof $> {
    return $('.trip-popup .trip-info__title');
  }

  get Duration_Content(): ReturnType<typeof $> {
    return $('.trip-popup .trip-info__duration');
  }

  get Level_Content(): ReturnType<typeof $> {
    return $('.trip-popup .trip-info__level');
  }

  get Date_Field(): ReturnType<typeof $> {
    return $('input[name="date"]');
  }

  get Guests_Field(): ReturnType<typeof $> {
    return $('.trip-popup input[name="guests"]');
  }

  get Price_Content(): ReturnType<typeof $> {
    return $('.trip-popup__total-value');
  }

  get Close_Button(): ReturnType<typeof $> {
    return $('.trip-popup__close');
  }

  get BookTrip_Button(): ReturnType<typeof $> {
    return $('.trip-popup button[type="submit"]');
  }
}

export { BookTripModal };

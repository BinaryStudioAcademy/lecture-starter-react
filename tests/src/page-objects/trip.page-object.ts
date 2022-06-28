class Trip {
  get Image_Content(): ReturnType<typeof $> {
    return $('.trip img');
  }

  get Title_Content(): ReturnType<typeof $> {
    return $('.trip .trip-info__title');
  }

  get Duration_Content(): ReturnType<typeof $> {
    return $('.trip .trip-info__duration');
  }

  get Level_Content(): ReturnType<typeof $> {
    return $('.trip .trip-info__level');
  }

  get Price_Content(): ReturnType<typeof $> {
    return $('.trip .trip-price__value');
  }

  get Description_Content(): ReturnType<typeof $> {
    return $('.trip__description');
  }

  get BookTrip_Button(): ReturnType<typeof $> {
    return $('.trip__button');
  }
}

export { Trip };

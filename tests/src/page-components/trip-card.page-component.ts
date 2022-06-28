class TripCard {
  get Element_Container(): ReturnType<typeof $> {
    return $('.trip-card');
  }

  get Image_Content(): ReturnType<typeof $> {
    return $('.trip-card img');
  }

  get Title_Content(): ReturnType<typeof $> {
    return $('.trip-card .trip-info__title');
  }

  get Duration_Content(): ReturnType<typeof $> {
    return $('.trip-card .trip-info__duration');
  }

  get Level_Content(): ReturnType<typeof $> {
    return $('.trip-card .trip-info__level');
  }

  get Price_Content(): ReturnType<typeof $> {
    return $('.trip-card .trip-price__value');
  }

  get DiscoverTrip_Link(): ReturnType<typeof $> {
    return $('.trip-card a[href^="/trip/"]');
  }
}

export { TripCard };

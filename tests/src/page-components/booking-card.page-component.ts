class BookingCard {
  get Element_Container(): ReturnType<typeof $> {
    return $('.booking');
  }

  get Title_Content(): ReturnType<typeof $> {
    return $('.booking__title');
  }

  get Guests_Content(): ReturnType<typeof $> {
    return $('.booking__guests');
  }

  get Date_Content(): ReturnType<typeof $> {
    return $('.booking__date');
  }

  get Total_Content(): ReturnType<typeof $> {
    return $('.booking__total');
  }

  get Cancel_Button(): ReturnType<typeof $> {
    return $('.booking__cancel');
  }
}

export { BookingCard };

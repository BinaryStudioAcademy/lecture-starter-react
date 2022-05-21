import { CollectionName } from '~/common/enums/enums';

const BOOKING_PIPELINES = [
  {
    $lookup: {
      from: CollectionName.TRIPS,
      let: {
        tripObjId: { $toObjectId: '$tripId' },
      },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$tripObjId'] } } },
        {
          $project: {
            _id: 0,
            id: '$_id',
            title: 1,
            duration: 1,
            price: 1,
          },
        },
      ],
      as: 'trip',
    },
  },
  {
    $project: {
      userId: 1,
      guests: 1,
      date: 1,
      trip: { $first: '$trip' },
    },
  },
  {
    $addFields: {
      totalPrice: {
        $multiply: ['$guests', '$trip.price'],
      },
    },
  },
];

export { BOOKING_PIPELINES };

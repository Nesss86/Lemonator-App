const mockUserData = {
  id: 1,
  first_name: 'Michael',
  last_name: 'Williams',
  email: 'michael.williams@example.com',
  phone_number: '(555) 123-4567',
  location: 'Toronto, Canada',
  profile_picture: '/images/profile-placeholder.jpg', // Path to a placeholder image
  reviews: {
    stars: 4.5,
    count: 23,
    mockComments: [
      { reviewer: 'John Doe', comment: 'Great experience working with Michael!' },
      { reviewer: 'Jane Smith', comment: 'Fast response and very friendly.' },
    ],
  },
  listings: [
    {
      id: 101,
      car_name: '2019 Honda Civic',
      car_image: '/images/honda-civic.jpg',
      status: 'Available',
    },
    {
      id: 102,
      car_name: '2020 Tesla Model 3',
      car_image: '/images/tesla-model3.jpg',
      status: 'Sold',
    },
    {
      id: 103,
      car_name: '2018 BMW X5',
      car_image: '/images/bmw-x5.jpg',
      status: 'Available',
    },
  ],
};

export default mockUserData;

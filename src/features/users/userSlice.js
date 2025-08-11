/* function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
*/

import { createSlice } from '@reduxjs/toolkit';

// initial object of use slice.
const initialState = {
  userName: '',
};

// user slice that manages user state.
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions; // export all reducers.

export default userSlice.reducer; // export the reducer to be used in the store.

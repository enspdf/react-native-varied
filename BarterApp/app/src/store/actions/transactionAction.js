import axios from 'axios';
import IO from 'socket.io-client';
import {API_URI, UPDATE_AMOUNT, UPDATE_BALANCE} from './types';

//** Socket Config */
export const socket = IO(`${API_URI}`, {
  forceNew: true,
});

export const roomID = 'k328wfiuqwhefjashufasfhaysdfu';

socket.on('connection', () => console.log('Connection'));

export const send = ({amount, account, purpose}) => async (
  dispatch,
  getState,
) => {
  const {user} = getState().auth;

  if (user.account_balance < amount)
    return alert("Sorry you don't have enough balance");

  const data = {
    amount,
    account_number: account,
    purpose,
    sender: user.email,
    roomID,
  };

  socket.emit('send', data, err => {
    console.log(err);
  });

  const currentUserAmount = user.account_balance - amount;

  dispatch({type: UPDATE_AMOUNT, payload: currentUserAmount});
};

export const receiver = () => async (dispatch, getState) => {
  const {payload} = getState().auth;

  socket.on('moneySent', data => {
    if (payload.user.email === data.receiver) {
      dispatch({
        type: UPDATE_BALANCE,
        payload: payload.user.account_balance + data.amount,
      });

      alert('You have received money');
    }
  });
};

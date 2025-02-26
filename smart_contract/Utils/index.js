export const convertTime = () => {
  const date = new Date(time);
  const formattedDate = date.toLocaleString() + ' ' + date.toLocaleTimeString();
    return formattedDate;
};

export const shortendAddress = (address) => {
  return address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length);
}


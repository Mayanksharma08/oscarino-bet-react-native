const reducerString = (string, len) => {
  return (string.length > len) ? string.substring(0, len) + '...' : string;
}

export default reducerString;
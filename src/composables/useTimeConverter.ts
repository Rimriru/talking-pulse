const useTimeConverter = (timestamp: number) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
};

export default useTimeConverter;

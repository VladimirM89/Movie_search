const formatTime = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  const normalizedMinutes = String(minutes).padStart(2, "0");

  return `${hours}h ${normalizedMinutes}min`;
};

export default formatTime;

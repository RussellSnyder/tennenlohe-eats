export const getTime = (dateString: string) => {
    var myDate = new Date(dateString);
  
    var minutes = myDate.getMinutes().toString().padStart(2, "0");
    var hours = myDate.getHours();
  
    return `${hours}:${minutes}`;
  }

export const dayOfTheWeekToInt = (dayOfWeek: string): number => {
  switch (dayOfWeek.toLocaleLowerCase()) {
    case 'monday':
      return 1
    case 'tuesday':
      return 2
    case 'wednesday':
      return 3
    case 'thursday':
      return 4
    case 'friday':
      return 5
    default:
      return 0
  }
}
  
  
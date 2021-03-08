export const getTime = (dateString: string) => {
    var myDate = new Date(dateString);
  
    var minutes = myDate.getMinutes().toString().padStart(2, "0");
    var hours = myDate.getHours();
  
    return `${hours}:${minutes}`;
  }
  
  
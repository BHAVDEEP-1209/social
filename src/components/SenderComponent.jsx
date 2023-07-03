export const  getDate=(timestamp)=> {
    const date = new Date(timestamp*1000);
    const currentdate = new Date();
    let day = date.getDay();
    let currentDay = currentdate.getDay();
    const diff=currentDay-day;
   if(diff===0)
   {
    return 'Today';
   }
   else if(day===1)
   {
    return 'Tomorrow';
   }
   else
   {
    return ''+day+'-'+date.getMonth()+'-'+date.getFullYear();
   }
  }
  

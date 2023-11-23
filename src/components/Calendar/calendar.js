import dayjs from "dayjs";
export const generateDate=
(month=dayjs().month(),
year=dayjs().year()
)=>{
    const firstDateOfMonth=dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth=dayjs().year(year).month(month).endOf("month");

    const arrayOfDate=[];

   
    for(let i=0;i<firstDateOfMonth.day();i++)
    {
        arrayOfDate.push({date: firstDateOfMonth.day(i),
        currentMont:false});
    }

  
    for(let i=firstDateOfMonth.date();i<=lastDateOfMonth.date();i++)
    {
        arrayOfDate.push({date:firstDateOfMonth.date(i),currentMonth:true,today:firstDateOfMonth.date(i).toDate().toDateString()===dayjs().toDate().toDateString()});
    }


   

    const remaing=42-arrayOfDate.length;
    for(let i=lastDateOfMonth.date()+1;i<=lastDateOfMonth.date()+remaing;i++)
    {
        arrayOfDate.push({date:lastDateOfMonth.date(i),currentMonth:false});

    }

    return arrayOfDate;

}



export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
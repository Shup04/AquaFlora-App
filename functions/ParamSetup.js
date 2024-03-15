

export const fetchParameterData = (allParams) => {
    const nitrateArray = []
    const ammoniaArray = []
    const nitriteArray = []
    const phArray = []

    allParams.forEach((item) => {
      const paramName = item.parameterName
      switch(paramName) {
        case 'nitrate':
          nitrateArray.push(item)
          break;
        case 'ammonia':
          ammoniaArray.push(item)
          break;
        case 'nitrite':
          nitriteArray.push(item)
          break;
        case 'ph':
          phArray.push(item)
          break;
        default:
          break;
      }
    });

    //console.log(nitrateArray)

    return { 
      nitrateArray: nitrateArray, 
      ammoniaArray: ammoniaArray, 
      nitriteArray: nitriteArray, 
      phArray: phArray 
    };
}

export const setLabels = (data) => {
    // For each entry, check if it is the first day of the month, if it is, set the label to the month name.
    data.forEach((item) => {
      if (item.date.getDate() === 1) {
        item.label = getMonthName(item.date);
        item.labelTextStyle = {color: 'white', width: 50};
      }
    });
    return data;
}

export const getMonthName = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
}

export const fillMissingDates = (data) => {
    // Sort data by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    let filledData = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        filledData.push(data[i]);
      } else {
        let prevDate = new Date(filledData[filledData.length - 1].date);
        let currDate = new Date(data[i].date);
        let diffDays = Math.ceil((currDate - prevDate) / (1000 * 60 * 60 * 24));
  
        if (diffDays > 1) {
          for (let j = 1; j < diffDays; j++) {
              let newDate = new Date(prevDate);

              newDate.setDate(newDate.getDate() + j);
              filledData.push({ value: filledData[filledData.length - 1].value, date: new Date(newDate) });
          }
      }
        filledData.push(data[i]);
      }
    }

    const newFilledData = incrementDates(filledData);

    return newFilledData;
}

export const incrementDates = (data) => {
    return data.map(item => {
      let newDate = new Date(item.date);
      newDate.setDate(newDate.getDate() + 1);
      return { ...item, date: newDate };
    });
}

export const alignArrays = (array1, array2, array3, array4) => {
    // Find the earliest and latest dates in both arrays
    let dates = [...array1, ...array2, ...array3, ...array4].map(item => item.date);
    let earliestDate = new Date(Math.min.apply(null, dates));
    let latestDate = new Date(Math.max.apply(null, dates));
  
    // Fill in the missing dates for both arrays
    let alignedArray1 = syncDates2(array1, earliestDate, latestDate);
    let alignedArray2 = syncDates2(array2, earliestDate, latestDate);
    let alignedArray3 = syncDates2(array3, earliestDate, latestDate);
    let alignedArray4 = syncDates2(array4, earliestDate, latestDate);
    //console.log(array1)
    return { 
      alignedArray1: alignedArray1, 
      alignedArray2: alignedArray2,
      alignedArray3: alignedArray3,
      alignedArray4: alignedArray4 
    };
}

export const syncDates = (array, startDate, endDate) => {
    let result = [];
    for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
      let item = array.find(i => i.date.getTime() === dt.getTime());
      result.push(item ? item : { date: new Date(dt), value: 0 });
    }
    //console.log(result)
    return result;
}

export const syncDates2 = (array, startDate, endDate) => {
  let result = [];
  let lastValue = array.length > 0 ? array[0].value : 0; // Start with the first value or 0 if array is empty
  for (let dt = new Date(startDate); dt <= endDate; dt = new Date(dt.setDate(dt.getDate() + 1))) {
    // Find an item for the current date
    let item = array.find(i => {
      const iDate = new Date(i.date);
      return iDate.getFullYear() === dt.getFullYear() &&
            iDate.getMonth() === dt.getMonth() &&
            iDate.getDate() === dt.getDate();
    });

    if (item) {
      // If an item exists for this date, use its value and update lastValue
      result.push({ date: new Date(dt), value: item.value });
      lastValue = item.value;
    } else {
      // If no item exists for this date, use lastValue
      result.push({ date: new Date(dt), value: lastValue });
    }
  }
  //console.log(result)
  return result;
}

export const setupData = (allParams) => {
    const data1 = fetchParameterData(allParams).nitrateArray;
    const data2 = fetchParameterData(allParams).ammoniaArray;
    const data3 = fetchParameterData(allParams).nitriteArray;
    const data4 = fetchParameterData(allParams).phArray;

    //console.log(allParams)
    //console.log(data1)
    //JSON.parse(JSON.stringify(data1))
    const organizedData1 = data1.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })
    const organizedData2 = data2.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })
    const organizedData3 = data3.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })
    const organizedData4 = data4.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })

    //console.log(organizedData1)

    try{
      //fill dates between logs
      const filledData1 = fillMissingDates(organizedData1);
      const filledData2 = fillMissingDates(organizedData2);
      const filledData3 = fillMissingDates(organizedData3);
      const filledData4 = fillMissingDates(organizedData4);
      //console.log(filledData1)
      //align dates between params
      const syncedData1 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray1
      const syncedData2 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray2
      const syncedData3 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray3
      const syncedData4 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray4
      //console.log(syncedData1)
      //set month labels
      const finalData1 = setLabels(syncedData1);
      const finalData2 = setLabels(syncedData2);
      const finalData3 = setLabels(syncedData3);
      const finalData4 = setLabels(syncedData4);

      return { 
        finalData1: finalData1, 
        finalData2: finalData2,
        finalData3: finalData3,
        finalData4: finalData4 
      };

    }catch(error){
      console.error(error)
    }
}
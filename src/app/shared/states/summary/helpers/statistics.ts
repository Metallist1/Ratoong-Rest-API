export class StatisticsFilter {
  today = new Date();
  calculateData(params: object): any {
    // @ts-ignore
    const userData = this.getUserData(params.data.processedData);
    // @ts-ignore
    const ratingData = this.getRatingData(params.data.processedData);
    return {
      userData,
      ratingData,
      // @ts-ignore
      name: params.data.cityName
    };
  }

  getUserData(arr): any{
    return {
      country: this.mapData(arr, 'Country'),
      gender: this.mapData(arr, 'Gender'),
      type: this.mapData(arr, 'Holiday Type'),
      skier: this.mapData(arr, 'Skier'),
      skill: this.mapData(arr, 'Skill Level'),
      snowboarder: this.mapData(arr, 'Snowboarder'),
      travelCount: this.mapData(arr, 'Trip Count'),
      age: this.mapData(arr, 'Age')
    };
  }

  getRatingData(arr): any{
    const map = new Map();
    arr.forEach((obj) => {
      obj.questionRatings.forEach((rating) => {
        if (map.has(rating.questionId)){
          const currentRating = map.get(rating.questionId);
          const data = {
            totalScore: currentRating.totalScore + rating.rating,
            totalCount: currentRating.totalCount + 1
          };
          map.set(rating.questionId, data);
        }else{
          const data = {
            totalScore: rating.rating,
            totalCount: 1
          };
          map.set(rating.questionId, data);
        }
      });
    });

    return Array.from(map.entries());
  }

  mapData(arr, type): any{
    const map = new Map();
    arr.forEach((obj) => {
      let currentVariable;
      switch (type) {
        case 'Country': {
          currentVariable = obj.userDataSet.country;
          break;
        }
        case 'Gender': {
          currentVariable = obj.userDataSet.gender;
          break;
        }
        case 'Holiday Type': {
          currentVariable = obj.userDataSet.holidayType;
          break;
        }
        case 'Skier': {
          currentVariable = obj.userDataSet.skier;
          break;
        }
        case 'Skill Level': {
          currentVariable = obj.userDataSet.skillLevel;
          break;
        }
        case 'Snowboarder': {
          currentVariable = obj.userDataSet.snowboarder;
          break;
        }
        case 'Trip Count': {
          currentVariable = obj.userDataSet.tripCount;
          break;
        }
        case 'Age': {
          currentVariable = obj.userDataSet.tripCount;
          if (obj.userDataSet.birth !== '') {
            const date = new Date(obj.userDataSet.birth);
            currentVariable = this.today.getFullYear() - date.getFullYear();
          }
          break;
        }
      }

      if (map.has(currentVariable)){
        const currentCount = map.get(currentVariable);
        map.set(currentVariable, currentCount + 1);
      }else if ((currentVariable === '' || currentVariable === 'default')){
        if (map.has('None')){
          const currentCount = map.get('None');
          map.set('None', currentCount + 1);
        }else{
          map.set('None', 1);
        }
      }else{
        map.set(currentVariable, 1);
      }
    });
    return Array.from(map.entries());
  }

}

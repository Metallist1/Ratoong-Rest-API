import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.scss']
})
export class ApiDocumentationComponent implements OnInit {
  isLoading = false;

  getLocation =
    {
      data: [
      {
        id: 1,
        name: 'Ski Arlberg',
        countryName: 'Austria',
        cityName: 'St. Anton',
        locationScores: [
          {
            questionID: 1,
            name: 'OFFPISTE POSSIBILITIES',
            overallScore: '4.64'
          },
          {
            questionID: 2,
            name: 'ACCESS TO OFF PISTE',
            overallScore: '4.41'
          }
        ]
      },
      {
        id: 2000,
        name: 'Menorah hotel',
        countryName: 'Ukraine',
        cityName: 'Dnipro',
        locationScores: [
          {
            questionID: 1,
            name: 'OFFPISTE POSSIBILITIES',
            overallScore: '3.64'
          },
          {
            questionID: 2,
            name: 'ACCESS TO OFF PISTE',
            overallScore: '2.41'
          }
        ]
      }
    ]
  };

  getSingleLocation = {
    data: {
      id: 1,
      name: 'Ski Arlberg',
      countryName: 'Austria',
      cityName: 'St. Anton',
      locationScores: [
        {
          questionID: 1,
          name: 'OFFPISTE POSSIBILITIES',
          overallScore: '4.64'
        },
        {
          questionID: 2,
          name: 'ACCESS TO OFF PISTE',
          overallScore: '4.41'
        }
      ],
      website: 'http://www.stantonamarlberg.com/',
      airports: [
        {
          city: 'Innsbruck',
          distance: 92,
          name: 'Innsbruck Airport'
        },
        {
          city: 'St. Gallen',
          distance: 101,
          name: 'St. Gallen-Altenrhein Airport'
        }
      ],
      pistes: [
        {
          km: 50,
          title: 'difficult'
        },
        {
          km: 132,
          title: 'easy'
        },
        {
          km: 123,
          title: 'intermediate'
        },
        {
          km: 200,
          title: 'Ski routes'
        }
      ],
      ElevationInfo: {
        max: 2811,
        min: 1270
      }
    }
  };

  getFilteredLocation = {
    data: {
      id: 1,
      name: 'Ski Arlberg',
      cityName: 'St. Anton',
      processedData: [
        {
          userDataSet: {
            type: 'user',
            country: 'Denmark',
            gender: 'male',
            birth: 'Sun Feb 23 1992 00:00:00 GMT+0100 (CET)',
            snowboarder: '',
            skier: '',
            tripCount: '',
            skillLevel: '',
            holidayType: ''
          },
          questionRatings: [
            {
              questionId: 1,
              rating: 5
            },
            {
              questionId: 2,
              rating: 5
            }
          ]
        },
        {
          userDataSet: {
            type: 'user',
            country: 'Denmark',
            gender: 'male',
            birth: 'Sun Jan 28 1968 00:00:00 GMT+0100 (Centraleuropæisk normaltid)',
            snowboarder: '',
            skier: '',
            tripCount: '',
            skillLevel: '',
            holidayType: ''
          },
          questionRatings: [
            {
              questionId: 7,
              rating: 5
            },
            {
              questionId: 11,
              rating: 4
            }
          ]
        },
      ]
    }
  }
    ;
  constructor() {
  }

  ngOnInit(): void {

  }

}

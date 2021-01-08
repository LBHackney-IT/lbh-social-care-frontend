export const teams = [
  {
    name: 'Information and Assessment',
    workers: [
      {
        name: 'Abi Smith',
        role: 'Social Worker',
        assigned: [45465],
      },
    ],
  },
  {
    name: 'Long Term',
    workers: [
      {
        name: 'Karen Wills',
        role: 'Senior Social Worker',
        assigned: [75451],
      },
    ],
  },
  {
    name: 'Long Term - case type: complex',
    workers: [
      {
        name: 'Tom King',
        role: 'Social Worker',
        assigned: [78978, 45125],
      },
    ],
  },
  {
    name: 'Long Term - case type: reviews',
    workers: [
      {
        name: 'Kelly Rows',
        role: 'Social Worker',
        assigned: [88978, 14251],
      },
    ],
  },
  {
    name: 'Adult Safeguarding',
    workers: [
      {
        name: 'Amy Watt',
        role: 'Social Worker',
        assigned: [],
      },
    ],
  },
  {
    name: 'Client Financial Affairs',
    workers: [
      {
        name: 'Lucy Bill',
        role: 'Social Worker',
        assigned: [10475],
      },
    ],
  },
  {
    name: 'Occupational Therapy',
    workers: [
      {
        name: 'Ryan Swiss',
        role: 'Social Worker',
        assigned: [14556],
      },
    ],
  },
  {
    name: 'Sensory Services',
    workers: [
      {
        name: 'Naomi Lewis',
        role: 'Social Worker',
        assigned: [84645, 80254],
      },
    ],
  },
];
export const cases = [
  {
    team: 'Information and Assessment',
    person: [
      {
        id: 45465,
        name: 'James Smith',
        address: 'Flat 11, Test road, E2 8TF',
        dob: '19/12/98',
        assessment_type: 'Care Act Assessment',
        priority: 'Amber',
        assigned: true,
        referred: '10/08/20',
      },
      {
        id: 12545,
        name: 'Aaron King',
        address: 'Flat 58, Test road, E2 8TF',
        dob: '19/12/80',
        assessment_type: 'Care Act Assessment',
        priority: 'Amber',
        assigned: false,
        referred: '10/11/20',
      },
    ],
  },
  {
    team: 'Long Term',
    person: [
      {
        id: 65455,
        name: 'John Wills',
        address: 'Flat 9, Test road, E2 8TF',
        dob: '14/12/98',
        assessment_type: 'Care Act Assessment',
        priority: 'Amber',
        assigned: false,
        referred: '04/01/21',
      },
      {
        id: 75451,
        name: 'Maggie Clear',
        address: 'Flat 74, Test road, E2 8TF',
        dob: '14/12/94',
        assessment_type: 'Care Act Assessment',
        priority: 'Amber',
        assigned: true,
        referred: '26/11/20',
      },
    ],
  },
  {
    team: 'Long Term - case type: complex',
    person: [
      {
        id: 78978,
        name: 'Lily King',
        address: 'Flat 15, Test road, E2 8TF',
        dob: '11/12/98',
        assessment_type: 'Care Act Assessment',
        priority: 'Red',
        assigned: true,
        referred: '01/12/20',
      },
      {
        id: 45125,
        name: 'Laura Abby',
        address: 'Flat 174, Test road, E2 8TF',
        dob: '11/12/14',
        assessment_type: 'Care Act Assessment',
        priority: 'Red',
        assigned: true,
        referred: '14/11/20',
      },
    ],
  },
  {
    team: 'Long Term - case type: reviews',
    person: [
      {
        id: 87987,
        name: 'Ken Rows',
        address: 'Flat 16, Test road, E2 8TF',
        dob: '14/12/98',
        assessment_type: 'Safeguarding',
        priority: 'Amber',
        assigned: true,
        referred: '14/10/20',
      },
      {
        id: 14251,
        name: 'Luca Matters',
        address: 'Flat 20, Test road, E2 8TF',
        dob: '14/12/74',
        assessment_type: 'Safeguarding',
        priority: 'Amber',
        assigned: true,
        referred: '25/09/20',
      },
    ],
  },
  {
    team: 'Adult Safeguarding',
    person: [
      {
        id: 12514,
        name: 'Ryu Watt',
        address: 'Flat 13, Test road, E2 8TF',
        dob: '16/12/98',
        assessment_type: 'Care Act Assessment',
        priority: 'Red',
        assigned: false,
        referred: '04/06/20',
      },
      {
        id: 10254,
        name: 'Miles Halbutt',
        address: 'Flat 112, Test road, E2 8TF',
        dob: '11/12/80',
        assessment_type: 'Care Act Assessment',
        priority: 'Red',
        assigned: false,
        referred: '08/11/20',
      },
    ],
  },
  {
    team: 'Client Financial Affairs',
    person: [
      {
        id: 46467,
        name: 'Chun Li',
        address: 'Flat 25, Test road, E2 8TF',
        dob: '24/12/98',
        assessment_type: 'Safeguarding',
        priority: 'Red',
        assigned: false,
        referred: '23/12/20',
      },
      {
        id: 10475,
        name: 'Peter Lee',
        address: 'Flat 41, Test road, E2 8TF',
        dob: '24/12/88',
        assessment_type: 'Safeguarding',
        priority: 'Red',
        assigned: true,
        referred: '26/11/20',
      },
    ],
  },
  {
    team: 'Occupational Therapy',
    person: [
      {
        id: 14556,
        name: 'Akuma Swiss',
        address: 'Flat 23, Test road, E2 8TF',
        dob: '03/12/98',
        assessment_type: 'Safeguarding',
        priority: 'Amber',
        assigned: true,
        referred: '15/09/20',
      },
      {
        id: 30251,
        name: 'Kevin Dance',
        address: 'Flat 45, Test road, E2 8TF',
        dob: '03/12/98',
        assessment_type: 'Safeguarding',
        priority: 'Amber',
        assigned: false,
        referred: '06/01/21',
      },
    ],
  },
  {
    team: 'Sensory Services',
    person: [
      {
        id: 84645,
        name: 'Leo Lewis',
        role: 'Social Worker',
        address: 'Flat 24, Test road, E2 8TF',
        dob: '04/12/98',
        assessment_type: 'Care Act Assessment',
        priority: 'Green',
        assigned: true,
        referred: '14/10/20',
      },
      {
        id: 80254,
        name: 'Lee Smith',
        role: 'Social Worker',
        address: 'Flat 25, Test road, E2 8TF',
        dob: '11/12/97',
        assessment_type: 'Care Act Assessment',
        priority: 'Green',
        assigned: true,
        referred: '26/10/20',
      },
    ],
  },
];

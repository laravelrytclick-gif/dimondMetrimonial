// Shared dummy data for the Diamond Matrimonial application

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Hashed password
  role: 'Admin' | 'RM';
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  user_code: string;
  full_name: string;
  gender: string;
  dob: string;
  birth_time: string;
  birth_place: string;
  religion: string;
  caste: string;
  sub_caste: string;
  gotra: string;
  height: string;
  weight: string;
  complexion: string;
  blood_group: string;
  eating_habit: string;
  smoking_habit: string;
  drinking_habit: string;
  phone: string;
  alternate_phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  highest_education: string;
  occupation: string;
  income: string;
  work_location: string;
  status: string;
  registration_date: string;
  rm_id: number;
  rm_name?: string;
}

export interface FamilyMember {
  id: number;
  profile_id: number;
  member_type: string;
  name: string;
  age: number;
  occupation: string;
  marital_status: string;
  living_with_candidate: boolean;
  notes: string;
}

export interface MatchPreference {
  id: number;
  profile_id: number;
  preferences: object;
  comments: string;
}

export interface CallHistory {
  id: number;
  profile_id: number;
  call_type: string;
  call_status: string;
  remarks: string;
  followup_date: string;
  performed_by: number;
  created_at: string;
}

export interface Meeting {
  id: number;
  profile_id: number;
  matched_profile_id?: number;
  meeting_type: string;
  meeting_date: string;
  meeting_time: string;
  venue: string;
  attendees: string[];
  status: string;
  outcome?: string;
  next_action_date?: string;
  scheduled_by: number;
  created_at: string;
}

export interface FollowUp {
  id: number;
  profile_id: number;
  profile_name: string;
  initials: string;
  time: string;
  task: string;
  priority: 'Pending' | 'Urgent' | 'Completed' | 'Scheduled';
}

// Enhanced dummy profiles data
export const dummyProfiles: Profile[] = [
  {
    id: 1,
    user_code: 'CAND1704678400',
    full_name: 'Rahul Kumar Sharma',
    gender: 'Male',
    dob: '1992-05-15',
    birth_time: '06:30 AM',
    birth_place: 'Delhi',
    religion: 'Hindu',
    caste: 'Brahmin',
    sub_caste: 'Kanyakubja',
    gotra: 'Bharadwaj',
    height: "5'10\"",
    weight: '72 kg',
    complexion: 'Fair',
    blood_group: 'B+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9812345678',
    alternate_phone: '+91 8812345678',
    email: 'rahul.sharma@email.com',
    address: '123, Rajendra Nagar, Block A',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    highest_education: 'B.Tech Computer Science',
    occupation: 'Software Engineer',
    income: '12-15 LPA',
    work_location: 'Gurgaon',
    status: 'Active',
    registration_date: '2024-01-15T10:30:00Z',
    rm_id: 1,
    rm_name: 'John Smith',
  },
  {
    id: 2,
    user_code: 'CAND1704678401',
    full_name: 'Priya Patel',
    gender: 'Female',
    dob: '1994-08-22',
    birth_time: '11:45 AM',
    birth_place: 'Mumbai',
    religion: 'Hindu',
    caste: 'Patel',
    sub_caste: 'Leva Patel',
    gotra: 'Vashisth',
    height: "5'5\"",
    weight: '58 kg',
    complexion: 'Wheatish',
    blood_group: 'O+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9823456789',
    alternate_phone: '+91 8823456789',
    email: 'priya.patel@email.com',
    address: '456, Andheri West, Society B',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    highest_education: 'MBA Finance',
    occupation: 'Financial Analyst',
    income: '8-10 LPA',
    work_location: 'Mumbai',
    status: 'Lead',
    registration_date: '2024-01-14T14:20:00Z',
    rm_id: 2,
    rm_name: 'Sarah Johnson',
  },
  {
    id: 3,
    user_code: 'CAND1704678402',
    full_name: 'Amit Mehra',
    gender: 'Male',
    dob: '1990-12-10',
    birth_time: '03:20 PM',
    birth_place: 'Bangalore',
    religion: 'Hindu',
    caste: 'Khatri',
    sub_caste: 'Khatri',
    gotra: 'Kashyap',
    height: "5'11\"",
    weight: '78 kg',
    complexion: 'Fair',
    blood_group: 'A+',
    eating_habit: 'Non-Vegetarian',
    smoking_habit: 'Occasionally',
    drinking_habit: 'Socially',
    phone: '+91 9834567890',
    alternate_phone: '+91 8834567890',
    email: 'amit.mehra@email.com',
    address: '789, Koramangala, 4th Block',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    highest_education: 'MCA',
    occupation: 'Product Manager',
    income: '18-22 LPA',
    work_location: 'Bangalore',
    status: 'Hold',
    registration_date: '2024-01-13T09:15:00Z',
    rm_id: 1,
    rm_name: 'John Smith',
  },
  {
    id: 4,
    user_code: 'CAND1704678403',
    full_name: 'Neha Kapoor',
    gender: 'Female',
    dob: '1993-03-18',
    birth_time: '09:15 AM',
    birth_place: 'Pune',
    religion: 'Hindu',
    caste: 'Kapoor',
    sub_caste: 'Khatri',
    gotra: 'Bharadwaj',
    height: "5'6\"",
    weight: '60 kg',
    complexion: 'Fair',
    blood_group: 'AB+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9845678901',
    alternate_phone: '+91 8845678901',
    email: 'neha.kapoor@email.com',
    address: '321, Kalyani Nagar, Phase 2',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    highest_education: 'M.Sc Biotechnology',
    occupation: 'Research Scientist',
    income: '10-12 LPA',
    work_location: 'Pune',
    status: 'Active',
    registration_date: '2024-01-12T16:45:00Z',
    rm_id: 2,
    rm_name: 'Sarah Johnson',
  },
  {
    id: 5,
    user_code: 'CAND1704678404',
    full_name: 'Suresh Kumar',
    gender: 'Male',
    dob: '1988-07-25',
    birth_time: '07:45 AM',
    birth_place: 'Hyderabad',
    religion: 'Hindu',
    caste: 'Reddy',
    sub_caste: 'Kapu Reddy',
    gotra: 'Vasistha',
    height: "5'9\"",
    weight: '75 kg',
    complexion: 'Wheatish',
    blood_group: 'B+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9856789012',
    alternate_phone: '+91 8856789012',
    email: 'suresh.kumar@email.com',
    address: '654, Jubilee Hills, Road No. 12',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    highest_education: 'B.Com',
    occupation: 'Business Owner',
    income: '25+ LPA',
    work_location: 'Hyderabad',
    status: 'Closed',
    registration_date: '2024-01-11T11:30:00Z',
    rm_id: 3,
    rm_name: 'Mike Wilson',
  },
  {
    id: 6,
    user_code: 'CAND1704678405',
    full_name: 'Anjali Desai',
    gender: 'Female',
    dob: '1995-11-30',
    birth_time: '02:30 PM',
    birth_place: 'Ahmedabad',
    religion: 'Hindu',
    caste: 'Patel',
    sub_caste: 'Patidar',
    gotra: 'Shandilya',
    height: "5'4\"",
    weight: '55 kg',
    complexion: 'Fair',
    blood_group: 'O+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9867890123',
    alternate_phone: '+91 8867890123',
    email: 'anjali.desai@email.com',
    address: '987, Satellite, SG Highway',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    highest_education: 'BDS',
    occupation: 'Dentist',
    income: '6-8 LPA',
    work_location: 'Ahmedabad',
    status: 'Active',
    registration_date: '2024-01-10T13:20:00Z',
    rm_id: 3,
    rm_name: 'Mike Wilson',
  },
  {
    id: 7,
    user_code: 'CAND1704678406',
    full_name: 'Vikram Singh',
    gender: 'Male',
    dob: '1991-09-08',
    birth_time: '10:00 AM',
    birth_place: 'Jaipur',
    religion: 'Hindu',
    caste: 'Rajput',
    sub_caste: 'Sisodia',
    gotra: 'Rana',
    height: "6'0\"",
    weight: '80 kg',
    complexion: 'Wheatish',
    blood_group: 'A+',
    eating_habit: 'Non-Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'Socially',
    phone: '+91 9878901234',
    alternate_phone: '+91 8878901234',
    email: 'vikram.singh@email.com',
    address: '147, Malviya Nagar, Sector 5',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    highest_education: 'B.Tech Mechanical',
    occupation: 'Civil Services',
    income: '15-18 LPA',
    work_location: 'Jaipur',
    status: 'Lead',
    registration_date: '2024-01-09T10:00:00Z',
    rm_id: 1,
    rm_name: 'John Smith',
  },
  {
    id: 8,
    user_code: 'CAND1704678407',
    full_name: 'Kavita Reddy',
    gender: 'Female',
    dob: '1992-04-12',
    birth_time: '08:45 AM',
    birth_place: 'Chennai',
    religion: 'Hindu',
    caste: 'Reddy',
    sub_caste: 'Kapu Reddy',
    gotra: 'Atreya',
    height: "5'7\"",
    weight: '62 kg',
    complexion: 'Wheatish',
    blood_group: 'B+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9889012345',
    alternate_phone: '+91 8889012345',
    email: 'kavita.reddy@email.com',
    address: '258, Adyar, 1st Main Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    highest_education: 'M.Tech IT',
    occupation: 'Data Scientist',
    income: '14-16 LPA',
    work_location: 'Chennai',
    status: 'Active',
    registration_date: '2024-01-08T15:30:00Z',
    rm_id: 2,
    rm_name: 'Sarah Johnson',
  },
  {
    id: 9,
    user_code: 'CAND1704678408',
    full_name: 'Rohit Verma',
    gender: 'Male',
    dob: '1989-06-20',
    birth_time: '04:15 PM',
    birth_place: 'Kolkata',
    religion: 'Hindu',
    caste: 'Brahmin',
    sub_caste: 'Kulin Brahmin',
    gotra: 'Shandilya',
    height: "5'8\"",
    weight: '70 kg',
    complexion: 'Fair',
    blood_group: 'O+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9890123456',
    alternate_phone: '+91 8890123456',
    email: 'rohit.verma@email.com',
    address: '369, Salt Lake, Sector 3',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    highest_education: 'CA',
    occupation: 'Chartered Accountant',
    income: '12-14 LPA',
    work_location: 'Kolkata',
    status: 'Hold',
    registration_date: '2024-01-07T12:15:00Z',
    rm_id: 3,
    rm_name: 'Mike Wilson',
  },
  {
    id: 10,
    user_code: 'CAND1704678409',
    full_name: 'Pooja Sharma',
    gender: 'Female',
    dob: '1994-10-05',
    birth_time: '12:30 PM',
    birth_place: 'Lucknow',
    religion: 'Hindu',
    caste: 'Brahmin',
    sub_caste: 'Kanyakubja',
    gotra: 'Vatsa',
    height: "5'5\"",
    weight: '56 kg',
    complexion: 'Fair',
    blood_group: 'A+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9901234567',
    alternate_phone: '+91 8901234567',
    email: 'pooja.sharma@email.com',
    address: '741, Gomti Nagar, Extension',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    highest_education: 'M.A English',
    occupation: 'Teacher',
    income: '4-6 LPA',
    work_location: 'Lucknow',
    status: 'Active',
    registration_date: '2024-01-06T14:45:00Z',
    rm_id: 1,
    rm_name: 'John Smith',
  },
  {
    id: 11,
    user_code: 'CAND1704678410',
    full_name: 'Arjun Nair',
    gender: 'Male',
    dob: '1990-02-14',
    birth_time: '05:45 AM',
    birth_place: 'Kochi',
    religion: 'Hindu',
    caste: 'Nair',
    sub_caste: 'Menon Nair',
    gotra: 'Vishwamitra',
    height: "5'9\"",
    weight: '68 kg',
    complexion: 'Wheatish',
    blood_group: 'B+',
    eating_habit: 'Non-Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'Socially',
    phone: '+91 9912345678',
    alternate_phone: '+91 8912345678',
    email: 'arjun.nair@email.com',
    address: '852, Edappally, Near Metro Station',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    highest_education: 'B.Tech IT',
    occupation: 'Software Developer',
    income: '8-10 LPA',
    work_location: 'Kochi',
    status: 'Lead',
    registration_date: '2024-01-05T09:30:00Z',
    rm_id: 2,
    rm_name: 'Sarah Johnson',
  },
  {
    id: 12,
    user_code: 'CAND1704678411',
    full_name: 'Divya Gupta',
    gender: 'Female',
    dob: '1993-07-28',
    birth_time: '01:15 PM',
    birth_place: 'Indore',
    religion: 'Hindu',
    caste: 'Baniya',
    sub_caste: 'Agarwal',
    gotra: 'Gautam',
    height: "5'6\"",
    weight: '59 kg',
    complexion: 'Fair',
    blood_group: 'O+',
    eating_habit: 'Vegetarian',
    smoking_habit: 'No',
    drinking_habit: 'No',
    phone: '+91 9923456789',
    alternate_phone: '+91 8923456789',
    email: 'divya.gupta@email.com',
    address: '963, Vijay Nagar, Scheme 54',
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    highest_education: 'MBA Marketing',
    occupation: 'Marketing Manager',
    income: '10-12 LPA',
    work_location: 'Indore',
    status: 'Active',
    registration_date: '2024-01-04T16:20:00Z',
    rm_id: 3,
    rm_name: 'Mike Wilson',
  },
];

// Family members dummy data
export const dummyFamilyMembers: FamilyMember[] = [
  {
    id: 1,
    profile_id: 1,
    member_type: 'Father',
    name: 'Ramesh Sharma',
    age: 58,
    occupation: 'Government Officer',
    marital_status: 'Married',
    living_with_candidate: true,
    notes: 'Retiring next year, looking for a suitable daughter-in-law from traditional family'
  },
  {
    id: 2,
    profile_id: 1,
    member_type: 'Mother',
    name: 'Sunita Sharma',
    age: 54,
    occupation: 'Homemaker',
    marital_status: 'Married',
    living_with_candidate: true,
    notes: 'Very caring and family-oriented'
  },
  {
    id: 3,
    profile_id: 1,
    member_type: 'Sister',
    name: 'Pooja Sharma',
    age: 26,
    occupation: 'Software Engineer',
    marital_status: 'Unmarried',
    living_with_candidate: false,
    notes: 'Working in Bangalore, visits family occasionally'
  },
  {
    id: 4,
    profile_id: 2,
    member_type: 'Father',
    name: 'Ramesh Patel',
    age: 60,
    occupation: 'Businessman',
    marital_status: 'Married',
    living_with_candidate: true,
    notes: 'Owns a textile business in Mumbai'
  },
  {
    id: 5,
    profile_id: 2,
    member_type: 'Mother',
    name: 'Geeta Patel',
    age: 55,
    occupation: 'Homemaker',
    marital_status: 'Married',
    living_with_candidate: true,
    notes: 'Traditional values with modern outlook'
  },
  {
    id: 6,
    profile_id: 2,
    member_type: 'Brother',
    name: 'Karan Patel',
    age: 28,
    occupation: 'Doctor',
    marital_status: 'Married',
    living_with_candidate: false,
    notes: 'Settled in USA with wife'
  }
];

// Match preferences dummy data
export const dummyMatchPreferences: MatchPreference[] = [
  {
    id: 1,
    profile_id: 1,
    preferences: {
      age_range: '24-28',
      height_range: "5'2\" - 5'8\"",
      religion: 'Hindu',
      caste: 'Brahmin',
      education: 'Graduate',
      occupation: 'Any respectable profession',
      location: 'Delhi NCR',
      marital_status: 'Unmarried',
      diet: 'Vegetarian'
    },
    comments: 'Looking for a well-educated, family-oriented girl with traditional values and modern outlook'
  },
  {
    id: 2,
    profile_id: 2,
    preferences: {
      age_range: '28-32',
      height_range: "5'8\" - 6'2\"",
      religion: 'Hindu',
      caste: 'Patel',
      education: 'Post Graduate',
      occupation: 'Business/Professional',
      location: 'Mumbai/Pune',
      marital_status: 'Unmarried',
      diet: 'Vegetarian'
    },
    comments: 'Prefers someone from business family with good financial stability'
  }
];

// Call history dummy data
export const dummyCallHistory: CallHistory[] = [
  {
    id: 1,
    profile_id: 1,
    call_type: 'call',
    call_status: 'Connected',
    remarks: 'Initial introduction call. Candidate is interested in proceeding. Discussed basic requirements and family background.',
    followup_date: '2024-01-20T10:00:00Z',
    performed_by: 1,
    created_at: '2024-01-18T14:30:00Z'
  },
  {
    id: 2,
    profile_id: 1,
    call_type: 'whatsapp',
    call_status: 'Message Sent',
    remarks: 'Shared some profile matches via WhatsApp. Candidate will review and revert.',
    followup_date: '2024-01-22T16:00:00Z',
    performed_by: 1,
    created_at: '2024-01-19T11:20:00Z'
  },
  {
    id: 3,
    profile_id: 2,
    call_type: 'video',
    call_status: 'Completed',
    remarks: 'Video call for detailed discussion. Candidate is very particular about partner\'s education and family values.',
    followup_date: '2024-01-21T15:00:00Z',
    performed_by: 2,
    created_at: '2024-01-17T18:45:00Z'
  }
];

// Meetings dummy data
export const dummyMeetings: Meeting[] = [
  {
    id: 1,
    profile_id: 1,
    matched_profile_id: 2,
    meeting_type: 'office',
    meeting_date: '2024-01-25T00:00:00Z',
    meeting_time: '03:00 PM',
    venue: 'Diamond Office, Connaught Place',
    attendees: ['Rahul Kumar Sharma', 'Priya Patel', 'Parents from both sides'],
    status: 'scheduled',
    outcome: '',
    next_action_date: '2024-01-26T00:00:00Z',
    scheduled_by: 1,
    created_at: '2024-01-18T09:30:00Z'
  },
  {
    id: 2,
    profile_id: 3,
    meeting_type: 'coffee',
    meeting_date: '2024-01-20T00:00:00Z',
    meeting_time: '04:30 PM',
    venue: 'Cafe Coffee Day, Koramangala',
    attendees: ['Amit Mehra', 'Neha Kapoor'],
    status: 'completed',
    outcome: 'Both parties liked each other. Parents meeting scheduled for next week.',
    next_action_date: '2024-01-27T00:00:00Z',
    scheduled_by: 1,
    created_at: '2024-01-15T12:00:00Z'
  }
];

// Follow-ups for RM dashboard
export const dummyFollowUps: FollowUp[] = [
  {
    id: 1,
    profile_id: 1,
    profile_name: 'Rahul Kumar',
    initials: 'RK',
    time: '10:00 AM',
    task: 'Profile Update',
    priority: 'Pending'
  },
  {
    id: 2,
    profile_id: 2,
    profile_name: 'Sita Patel',
    initials: 'SP',
    time: '2:00 PM',
    task: 'Document Collection',
    priority: 'Urgent'
  },
  {
    id: 3,
    profile_id: 3,
    profile_name: 'Amit Mehra',
    initials: 'AM',
    time: '3:00 PM',
    task: 'Office Visit',
    priority: 'Completed'
  },
  {
    id: 4,
    profile_id: 4,
    profile_name: 'Neha Kapoor',
    initials: 'NK',
    time: '5:00 PM',
    task: 'Video Call',
    priority: 'Scheduled'
  }
];

// Helper function to get profile by ID
export const getProfileById = (id: number): Profile | undefined => {
  return dummyProfiles.find(profile => profile.id === id);
};

// Helper function to get family members by profile ID
export const getFamilyMembersByProfileId = (profileId: number): FamilyMember[] => {
  return dummyFamilyMembers.filter(member => member.profile_id === profileId);
};

// Helper function to get match preferences by profile ID
export const getMatchPreferencesByProfileId = (profileId: number): MatchPreference | undefined => {
  return dummyMatchPreferences.find(pref => pref.profile_id === profileId);
};

// Helper function to get call history by profile ID
export const getCallHistoryByProfileId = (profileId: number): CallHistory[] => {
  return dummyCallHistory.filter(call => call.profile_id === profileId);
};

// Helper function to get meetings by profile ID
export const getMeetingsByProfileId = (profileId: number): Meeting[] => {
  return dummyMeetings.filter(meeting => meeting.profile_id === profileId);
};

// Dummy RM Users data
export const dummyUsers: User[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@diamondmatrimonial.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'Admin',
    is_active: true,
    last_login_at: '2024-01-15T10:30:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@diamondmatrimonial.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'RM',
    is_active: true,
    last_login_at: '2024-01-14T09:15:00Z',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-14T09:15:00Z'
  },
  {
    id: 3,
    name: 'Michael Davis',
    email: 'michael.davis@diamondmatrimonial.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'RM',
    is_active: true,
    last_login_at: '2024-01-13T14:20:00Z',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-13T14:20:00Z'
  },
  {
    id: 4,
    name: 'Emily Wilson',
    email: 'emily.wilson@diamondmatrimonial.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'RM',
    is_active: false,
    last_login_at: null,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-10T11:45:00Z'
  },
  {
    id: 5,
    name: 'Robert Brown',
    email: 'robert.brown@diamondmatrimonial.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'RM',
    is_active: true,
    last_login_at: '2024-01-12T16:30:00Z',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-12T16:30:00Z'
  },
  {
    id: 6,
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@diamondmatrimonial.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'Admin',
    is_active: true,
    last_login_at: '2024-01-11T08:45:00Z',
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-11T08:45:00Z'
  }
];

// Helper function to get all users
export const getAllUsers = (): User[] => {
  return dummyUsers;
};

// Helper function to get user by ID
export const getUserById = (id: number): User | undefined => {
  return dummyUsers.find(user => user.id === id);
};

// Helper function to get users by role
export const getUsersByRole = (role: 'Admin' | 'RM'): User[] => {
  return dummyUsers.filter(user => user.role === role);
};

// Helper function to create a new user
export const createUser = (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): User => {
  const newUser: User = {
    ...userData,
    id: Math.max(...dummyUsers.map(u => u.id)) + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  dummyUsers.push(newUser);
  return newUser;
};

// Helper function to update a user
export const updateUser = (id: number, userData: Partial<User>): User | null => {
  const userIndex = dummyUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  dummyUsers[userIndex] = {
    ...dummyUsers[userIndex],
    ...userData,
    updated_at: new Date().toISOString()
  };
  return dummyUsers[userIndex];
};

// Helper function to delete a user
export const deleteUser = (id: number): boolean => {
  const userIndex = dummyUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return false;
  
  dummyUsers.splice(userIndex, 1);
  return true;
};

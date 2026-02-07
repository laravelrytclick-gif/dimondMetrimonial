import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
  User, 
  Users, 
  Heart, 
  Phone, 
  Calendar, 
  Mail, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Camera,
  FileText,
  MessageSquare,
  Video,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard-layout';
import LogCallModal from '@/components/log-call-modal';
import EditProfile from '@/components/edit-profile';
import {
  Profile,
  FamilyMember,
  MatchPreference,
  CallHistory,
  Meeting,
  getProfileById,
  getFamilyMembersByProfileId,
  getMatchPreferencesByProfileId,
  getCallHistoryByProfileId,
  getMeetingsByProfileId
} from '@/data/dummy-data';
import { Tabs, TabsList, TabsTrigger , TabsContent } from './ui/tabs';

const ProfileDetail: React.FC = () => {
  // Get profile ID from URL - for Inertia.js we'll use window.location
  const urlParts = window.location.pathname.split('/');
  const id = urlParts[urlParts.length - 1];
  
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [matchPreferences, setMatchPreferences] = useState<MatchPreference | null>(null);
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch profile data using dummy data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Use dummy data instead of API calls
        const profileData = getProfileById(parseInt(id));
        if (profileData) {
          setProfile(profileData);
          setFamily(getFamilyMembersByProfileId(profileData.id));
          setMatchPreferences(getMatchPreferencesByProfileId(profileData.id) || null);
          setCallHistory(getCallHistoryByProfileId(profileData.id));
          setMeetings(getMeetingsByProfileId(profileData.id));
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'log-call':
        setIsLogCallModalOpen(true);
        break;
      case 'schedule-meeting':
        // Open meeting scheduling modal/form
        console.log('Schedule meeting for profile:', id);
        break;
      case 'send-proposal':
        // Open proposal sending modal/form
        console.log('Send proposal for profile:', id);
        break;
    }
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditMode(false);
  };

  const handleCallSuccess = () => {
    // Refresh call history
    const fetchCallHistory = async () => {
      try {
        const response = await fetch(`/api/profiles/${id}/call-history`);
        if (response.ok) {
          const callsData = await response.json();
          setCallHistory(callsData);
        }
      } catch (error) {
        console.error('Error refreshing call history:', error);
      }
    };
    fetchCallHistory();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Loading Profile...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout title="Profile Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <Button onClick={() => router.visit('/profiles')}>Back to Profiles</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`${profile.full_name} - Profile Details`}>
      {isEditMode ? (
        <EditProfile
          profileId={parseInt(id)}
          onClose={handleCloseEdit}
          onSave={handleSaveProfile}
        />
      ) : (
        <div className="flex gap-6 bg-white min-h-screen">
          {/* Main Content */}
          <div className="flex-1">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                    <p className="text-gray-600">User Code: {profile.user_code}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getStatusColor(profile.status)}>
                        {profile.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Registered: {new Date(profile.registration_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleEditProfile}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Photos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="preferences">Match Preferences</TabsTrigger>
              <TabsTrigger value="calls">Call History</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Gender</label>
                        <p className="text-gray-900">{profile.gender}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                        <p className="text-gray-900">{new Date(profile.dob).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Birth Time</label>
                        <p className="text-gray-900">{profile.birth_time}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Birth Place</label>
                        <p className="text-gray-900">{profile.birth_place}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Height</label>
                        <p className="text-gray-900">{profile.height}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Weight</label>
                        <p className="text-gray-900">{profile.weight}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Complexion</label>
                        <p className="text-gray-900">{profile.complexion}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Blood Group</label>
                        <p className="text-gray-900">{profile.blood_group}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Religious & Cultural */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      Religious & Cultural
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Religion</label>
                        <p className="text-gray-900">{profile.religion}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Caste</label>
                        <p className="text-gray-900">{profile.caste}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Sub Caste</label>
                        <p className="text-gray-900">{profile.sub_caste}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Gotra</label>
                        <p className="text-gray-900">{profile.gotra}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900">{profile.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Alternate Phone</label>
                        <p className="text-gray-900">{profile.alternate_phone || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{profile.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-gray-900">{profile.address}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">City</label>
                          <p className="text-gray-900">{profile.city}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">State</label>
                          <p className="text-gray-900">{profile.state}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Country</label>
                          <p className="text-gray-900">{profile.country}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Highest Education</label>
                        <p className="text-gray-900">{profile.highest_education}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Occupation</label>
                        <p className="text-gray-900">{profile.occupation}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Income</label>
                        <p className="text-gray-900">{profile.income}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Work Location</label>
                        <p className="text-gray-900">{profile.work_location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Habits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCheck className="h-5 w-5 mr-2" />
                      Habits & Lifestyle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Eating Habit</label>
                        <p className="text-gray-900">{profile.eating_habit}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Smoking Habit</label>
                        <p className="text-gray-900">{profile.smoking_habit}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Drinking Habit</label>
                        <p className="text-gray-900">{profile.drinking_habit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Family Tab */}
            <TabsContent value="family">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Family Members
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Family Member
                  </Button>
                </CardHeader>
                <CardContent>
                  {family.length > 0 ? (
                    <div className="space-y-4">
                      {family.map((member) => (
                        <div key={member.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{member.name}</h4>
                              <p className="text-sm text-gray-600">{member.member_type} • {member.age} years</p>
                              <p className="text-sm text-gray-600">{member.occupation} • {member.marital_status}</p>
                              {member.living_with_candidate && (
                                <Badge variant="secondary" className="mt-2">Living with candidate</Badge>
                              )}
                            </div>
                          </div>
                          {member.notes && (
                            <p className="mt-3 text-sm text-gray-600">{member.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No family members added yet</p>
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Family Member
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Match Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Match Preferences
                  </CardTitle>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Preferences
                  </Button>
                </CardHeader>
                <CardContent>
                  {matchPreferences ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Preferences</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(matchPreferences.preferences).map(([key, value]) => (
                            <div key={key}>
                              <label className="text-sm font-medium text-gray-500 capitalize">
                                {key.replace(/_/g, ' ')}
                              </label>
                              <p className="text-gray-900">
                                {Array.isArray(value) ? value.join(', ') : value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {matchPreferences.comments && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Additional Comments</h4>
                          <p className="text-gray-600">{matchPreferences.comments}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No match preferences set yet</p>
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Set Preferences
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Call History Tab */}
            <TabsContent value="calls">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Call History
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Call
                  </Button>
                </CardHeader>
                <CardContent>
                  {callHistory.length > 0 ? (
                    <div className="space-y-4">
                      {callHistory.map((call) => (
                        <div key={call.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${
                                call.call_type === 'call' ? 'bg-blue-100' :
                                call.call_type === 'whatsapp' ? 'bg-green-100' : 'bg-purple-100'
                              }`}>
                                {call.call_type === 'call' ? <Phone className="h-4 w-4 text-blue-600" /> :
                                 call.call_type === 'whatsapp' ? <MessageSquare className="h-4 w-4 text-green-600" /> :
                                 <Video className="h-4 w-4 text-purple-600" />}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 capitalize">{call.call_type}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(call.created_at).toLocaleDateString()} • {call.call_status}
                                </p>
                              </div>
                            </div>
                          </div>
                          {call.remarks && (
                            <p className="mt-3 text-sm text-gray-600">{call.remarks}</p>
                          )}
                          {call.followup_date && (
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              Follow-up: {new Date(call.followup_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No call history yet</p>
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Log First Call
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meetings Tab */}
            <TabsContent value="meetings">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Meetings
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </CardHeader>
                <CardContent>
                  {meetings.length > 0 ? (
                    <div className="space-y-4">
                      {meetings.map((meeting) => (
                        <div key={meeting.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">{meeting.meeting_type} Meeting</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(meeting.meeting_date).toLocaleDateString()} • {meeting.meeting_time}
                              </p>
                              {meeting.venue && (
                                <p className="text-sm text-gray-600 flex items-center mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {meeting.venue}
                                </p>
                              )}
                            </div>
                            <Badge className={
                              meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                              meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {meeting.status}
                            </Badge>
                          </div>
                          {meeting.outcome && (
                            <p className="mt-3 text-sm text-gray-600">
                              <strong>Outcome:</strong> {meeting.outcome}
                            </p>
                          )}
                          {meeting.next_action_date && (
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              Next Action: {new Date(meeting.next_action_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No meetings scheduled yet</p>
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule First Meeting
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                onClick={() => handleQuickAction('log-call')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Log Call
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleQuickAction('schedule-meeting')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleQuickAction('send-proposal')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Calls</span>
                <span className="font-medium">{callHistory.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Meetings</span>
                <span className="font-medium">{meetings.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Family Members</span>
                <span className="font-medium">{family.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profile Status</span>
                <Badge className={getStatusColor(profile.status)}>
                  {profile.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      )}

      {/* Log Call Modal */}
      <LogCallModal
        isOpen={isLogCallModalOpen}
        onClose={() => setIsLogCallModalOpen(false)}
        profileId={parseInt(id)}
        onSuccess={handleCallSuccess}
      />
    </DashboardLayout>
  );
};

export default ProfileDetail;

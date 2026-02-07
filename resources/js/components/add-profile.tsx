import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Phone, Mail, MapPin, User, Briefcase, DollarSign } from 'lucide-react';

interface ProfileFormData {
    // Basic Information
    full_name: string;
    gender: string;
    dob: string;
    birth_time: string;
    birth_place: string;
    
    // Personal Details
    religion: string;
    caste: string;
    sub_caste: string;
    gotra: string;
    height: string;
    weight: string;
    complexion: string;
    blood_group: string;
    
    // Habits
    eating_habit: string;
    smoking_habit: string;
    drinking_habit: string;
    
    // Contact Information
    phone: string;
    alternate_phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    
    // Professional Details
    highest_education: string;
    occupation: string;
    income: string;
    work_location: string;
}

const AddProfile: React.FC = () => {
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<ProfileFormData>({
        full_name: '',
        gender: '',
        dob: '',
        birth_time: '',
        birth_place: '',
        religion: '',
        caste: '',
        sub_caste: '',
        gotra: '',
        height: '',
        weight: '',
        complexion: '',
        blood_group: '',
        eating_habit: '',
        smoking_habit: '',
        drinking_habit: '',
        phone: '',
        alternate_phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        highest_education: '',
        occupation: '',
        income: '',
        work_location: '',
    });

    const createProfileMutation = useMutation({
        mutationFn: async (data: ProfileFormData) => {
            const response = await fetch('/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    throw new Error(JSON.stringify(errorData.errors));
                }
                throw new Error(errorData.message || 'Failed to create profile');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
            router.visit('/profiles');
        },
        onError: (error) => {
            if (error instanceof Error) {
                try {
                    const errorData = JSON.parse(error.message);
                    setErrors(typeof errorData === 'object' ? errorData : { general: error.message });
                } catch {
                    setErrors({ general: error.message });
                }
            }
        },
    });

    const handleInputChange = (field: keyof ProfileFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        createProfileMutation.mutate(formData);
    };

    const isLoading = createProfileMutation.isPending;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Profile</h1>
                <p className="text-gray-600 mt-1">Create a new candidate profile</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="h-5 w-5 mr-2" />
                            Basic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="full_name">Full Name *</Label>
                                <Input
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                                    placeholder="Enter full name"
                                    required
                                />
                                <InputError message={errors.full_name} />
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender *</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gender} />
                            </div>

                            <div>
                                <Label htmlFor="dob">Date of Birth *</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => handleInputChange('dob', e.target.value)}
                                    required
                                />
                                <InputError message={errors.dob} />
                            </div>

                            <div>
                                <Label htmlFor="birth_time">Birth Time</Label>
                                <Input
                                    id="birth_time"
                                    type="time"
                                    value={formData.birth_time}
                                    onChange={(e) => handleInputChange('birth_time', e.target.value)}
                                />
                                <InputError message={errors.birth_time} />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="birth_place">Birth Place</Label>
                                <Input
                                    id="birth_place"
                                    value={formData.birth_place}
                                    onChange={(e) => handleInputChange('birth_place', e.target.value)}
                                    placeholder="Enter birth place"
                                />
                                <InputError message={errors.birth_place} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="religion">Religion</Label>
                                <Input
                                    id="religion"
                                    value={formData.religion}
                                    onChange={(e) => handleInputChange('religion', e.target.value)}
                                    placeholder="Enter religion"
                                />
                                <InputError message={errors.religion} />
                            </div>

                            <div>
                                <Label htmlFor="caste">Caste</Label>
                                <Input
                                    id="caste"
                                    value={formData.caste}
                                    onChange={(e) => handleInputChange('caste', e.target.value)}
                                    placeholder="Enter caste"
                                />
                                <InputError message={errors.caste} />
                            </div>

                            <div>
                                <Label htmlFor="sub_caste">Sub Caste</Label>
                                <Input
                                    id="sub_caste"
                                    value={formData.sub_caste}
                                    onChange={(e) => handleInputChange('sub_caste', e.target.value)}
                                    placeholder="Enter sub caste"
                                />
                                <InputError message={errors.sub_caste} />
                            </div>

                            <div>
                                <Label htmlFor="gotra">Gotra</Label>
                                <Input
                                    id="gotra"
                                    value={formData.gotra}
                                    onChange={(e) => handleInputChange('gotra', e.target.value)}
                                    placeholder="Enter gotra"
                                />
                                <InputError message={errors.gotra} />
                            </div>

                            <div>
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    value={formData.height}
                                    onChange={(e) => handleInputChange('height', e.target.value)}
                                    placeholder="e.g., 5'10"
                                />
                                <InputError message={errors.height} />
                            </div>

                            <div>
                                <Label htmlFor="weight">Weight</Label>
                                <Input
                                    id="weight"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    placeholder="e.g., 70 kg"
                                />
                                <InputError message={errors.weight} />
                            </div>

                            <div>
                                <Label htmlFor="complexion">Complexion</Label>
                                <Select value={formData.complexion} onValueChange={(value) => handleInputChange('complexion', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select complexion" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fair">Fair</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Dark">Dark</SelectItem>
                                        <SelectItem value="Wheatish">Wheatish</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.complexion} />
                            </div>

                            <div>
                                <Label htmlFor="blood_group">Blood Group</Label>
                                <Select value={formData.blood_group} onValueChange={(value) => handleInputChange('blood_group', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="O-">O-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.blood_group} />
                            </div>
                        </div>

                        {/* Habits */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div>
                                <Label htmlFor="eating_habit">Eating Habit</Label>
                                <Select value={formData.eating_habit} onValueChange={(value) => handleInputChange('eating_habit', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select eating habit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                                        <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                                        <SelectItem value="Eggetarian">Eggetarian</SelectItem>
                                        <SelectItem value="Vegan">Vegan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.eating_habit} />
                            </div>

                            <div>
                                <Label htmlFor="smoking_habit">Smoking Habit</Label>
                                <Select value={formData.smoking_habit} onValueChange={(value) => handleInputChange('smoking_habit', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select smoking habit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Never">Never</SelectItem>
                                        <SelectItem value="Occasionally">Occasionally</SelectItem>
                                        <SelectItem value="Regularly">Regularly</SelectItem>
                                        <SelectItem value="Trying to Quit">Trying to Quit</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.smoking_habit} />
                            </div>

                            <div>
                                <Label htmlFor="drinking_habit">Drinking Habit</Label>
                                <Select value={formData.drinking_habit} onValueChange={(value) => handleInputChange('drinking_habit', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select drinking habit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Never">Never</SelectItem>
                                        <SelectItem value="Occasionally">Occasionally</SelectItem>
                                        <SelectItem value="Socially">Socially</SelectItem>
                                        <SelectItem value="Regularly">Regularly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.drinking_habit} />
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
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phone">Phone *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="Enter phone number"
                                    required
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div>
                                <Label htmlFor="alternate_phone">Alternate Phone</Label>
                                <Input
                                    id="alternate_phone"
                                    type="tel"
                                    value={formData.alternate_phone}
                                    onChange={(e) => handleInputChange('alternate_phone', e.target.value)}
                                    placeholder="Enter alternate phone"
                                />
                                <InputError message={errors.alternate_phone} />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter email address"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="city">City *</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    placeholder="Enter city"
                                    required
                                />
                                <InputError message={errors.city} />
                            </div>

                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    placeholder="Enter state"
                                />
                                <InputError message={errors.state} />
                            </div>

                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    placeholder="Enter country"
                                />
                                <InputError message={errors.country} />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <textarea
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Enter complete address"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <InputError message={errors.address} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Professional Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-2" />
                            Professional Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="highest_education">Highest Education</Label>
                                <Input
                                    id="highest_education"
                                    value={formData.highest_education}
                                    onChange={(e) => handleInputChange('highest_education', e.target.value)}
                                    placeholder="e.g., B.Tech, MBA, etc."
                                />
                                <InputError message={errors.highest_education} />
                            </div>

                            <div>
                                <Label htmlFor="occupation">Occupation</Label>
                                <Input
                                    id="occupation"
                                    value={formData.occupation}
                                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                                    placeholder="Enter occupation"
                                />
                                <InputError message={errors.occupation} />
                            </div>

                            <div>
                                <Label htmlFor="income">Annual Income</Label>
                                <Input
                                    id="income"
                                    value={formData.income}
                                    onChange={(e) => handleInputChange('income', e.target.value)}
                                    placeholder="e.g., 6-8 LPA"
                                />
                                <InputError message={errors.income} />
                            </div>

                            <div>
                                <Label htmlFor="work_location">Work Location</Label>
                                <Input
                                    id="work_location"
                                    value={formData.work_location}
                                    onChange={(e) => handleInputChange('work_location', e.target.value)}
                                    placeholder="Enter work location"
                                />
                                <InputError message={errors.work_location} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Error Display */}
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <p className="mt-1 text-sm text-red-700">{errors.general}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.visit('/profiles')}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-30"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </>
                        ) : (
                            'Create Profile'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProfile;

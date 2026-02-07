import React, { useState } from 'react';
import { Phone, MessageSquare, Video } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface LogCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: number;
  onSuccess: () => void;
}

const LogCallModal: React.FC<LogCallModalProps> = ({ 
  isOpen, 
  onClose, 
  profileId, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    call_type: '',
    call_status: '',
    remarks: '',
    followup_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const callTypes = [
    { value: 'call', label: 'Phone Call', icon: Phone },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { value: 'visit', label: 'In-Person Visit', icon: Video }
  ];

  const callStatuses = [
    { value: 'connected', label: 'Connected' },
    { value: 'not_connected', label: 'Not Connected' },
    { value: 'callback_requested', label: 'Callback Requested' },
    { value: 'left_message', label: 'Left Message' },
    { value: 'wrong_number', label: 'Wrong Number' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/profiles/${profileId}/calls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          call_type: '',
          call_status: '',
          remarks: '',
          followup_date: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to log call');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Call">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Call Type */}
        <div>
          <Label htmlFor="call_type" className="block text-sm font-medium text-gray-700 mb-2">
            Call Type <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.call_type} onValueChange={(value) => handleInputChange('call_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select call type" />
            </SelectTrigger>
            <SelectContent>
              {callTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {type.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Call Status */}
        <div>
          <Label htmlFor="call_status" className="block text-sm font-medium text-gray-700 mb-2">
            Call Status
          </Label>
          <Select value={formData.call_status} onValueChange={(value) => handleInputChange('call_status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select call status" />
            </SelectTrigger>
            <SelectContent>
              {callStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Remarks */}
        <div>
          <Label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-2">
            Remarks
          </Label>
          <textarea
            id="remarks"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Enter call details, conversation summary, or notes..."
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
          />
        </div>

        {/* Follow-up Date */}
        <div>
          <Label htmlFor="followup_date" className="block text-sm font-medium text-gray-700 mb-2">
            Follow-up Date
          </Label>
          <Input
            id="followup_date"
            type="datetime-local"
            value={formData.followup_date}
            onChange={(e) => handleInputChange('followup_date', e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
          />
          <p className="mt-1 text-xs text-gray-500">
            Set a follow-up date if you need to contact this candidate again
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !formData.call_type}
          >
            {isSubmitting ? 'Logging...' : 'Log Call'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LogCallModal;

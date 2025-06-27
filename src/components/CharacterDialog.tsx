import React, { useState, useMemo } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import { characterService } from '@/services/characterService';
import { useAuthStore } from '@/store/authStore';
import { VoiceSelect } from './VoiceSelect';
import { useTaskStore } from '@/store/task';
import { Modal } from './ui/Modal';
import { koho } from '@/theme';

interface CharacterDialogProps {
  voices: any[];
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CharacterDialog: React.FC<CharacterDialogProps> = ({voices, open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    oneliner: '',
    backstory: '',
    personality: '',
    appearance: '',
    voice_description: '',
    voice_id: '',
  });

  // Check if form has any data (unsaved changes)
  const hasUnsavedChanges = useMemo(() => {
    return Object.values(formData).some(value => value.trim() !== '');
  }, [formData]);

  // Check if form is valid for saving
  const isFormValid = useMemo(() => {
    const requiredFields = ['name', 'gender', 'age', 'oneliner', 'backstory', 'personality', 'appearance', 'voice_description', 'voice_id'];
    return requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  }, [formData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User not found');

      await characterService.createCharacter({
        ...formData,
        age: parseInt(formData.age),
        creator_user_id: user.id,
        visual_style: useTaskStore.getState().movie_style
      });
      setShowSuccess(true);
      onSuccess();
      onClose();
      // Reset form after successful save
      setFormData({
        name: '',
        gender: '',
        age: '',
        oneliner: '',
        backstory: '',
        personality: '',
        appearance: '',
        voice_description: '',
        voice_id: '',
      });
    } catch (error) {
      console.error('Error creating character:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModalClose = () => {
    // Reset form when modal is closed
    setFormData({
      name: '',
      gender: '',
      age: '',
      oneliner: '',
      backstory: '',
      personality: '',
      appearance: '',
      voice_description: '',
      voice_id: '',
    });
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        onSave={handleSave}
        title="Create New Character"
        maxWidth="lg"
        fullWidth
        saveButtonText="Create Character"
        loading={loading}
        hasUnsavedChanges={hasUnsavedChanges}
        disableSave={!isFormValid}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} className={koho.className}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Character Name"
                placeholder="Enter a full name that reflects the character&apos;s background and culture"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                helperText="Choose a name that fits the character&apos;s background and setting"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Character Gender</InputLabel>
                <Select
                  value={formData.gender}
                  label="Character Gender"
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="non-binary">Non-binary</MenuItem>
                </Select>
                <FormHelperText>Select the character&apos;s gender identity</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Character Age"
                placeholder="Enter age between 18-90"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                inputProps={{ min: 18, max: 90 }}
                required
                helperText="Age should be realistic for the character&apos;s role"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Voice Type</InputLabel>
                <Select
                  value={formData.voice_description}
                  label="Voice Type"
                  onChange={(e) => handleChange('voice_description', e.target.value)}
                >
                  <MenuItem value="US female child">US female child</MenuItem>
                  <MenuItem value="US female adult">US female adult</MenuItem>
                  <MenuItem value="US female elderly">US female elderly</MenuItem>
                  <MenuItem value="US male child">US male child</MenuItem>
                  <MenuItem value="US male adult">US male adult</MenuItem>
                  <MenuItem value="US male elderly">US male elderly</MenuItem>
                </Select>
                <FormHelperText>Choose a voice that matches the character&apos;s age and gender</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <VoiceSelect
                value={formData.voice_id}
                onChange={(value) => handleChange('voice_id', value)}
                voices={voices}
                required
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Character Tagline"
            placeholder="Write a compelling one-liner that captures the character&apos;s essence"
            value={formData.oneliner}
            onChange={(e) => handleChange('oneliner', e.target.value)}
            required
            helperText="A memorable phrase that defines the character&apos;s role or personality"
          />

          <TextField
            fullWidth
            label="Character Backstory"
            placeholder="Describe the character&apos;s past, key life events, and what shaped them into who they are today"
            value={formData.backstory}
            onChange={(e) => handleChange('backstory', e.target.value)}
            multiline
            rows={3}
            required
            helperText="Include their background, motivations, and significant life events"
          />

          <TextField
            fullWidth
            label="Personality Traits"
            placeholder="Describe how the character thinks, feels, and behaves in different situations"
            value={formData.personality}
            onChange={(e) => handleChange('personality', e.target.value)}
            multiline
            rows={3}
            required
            helperText="Include their temperament, values, and behavioral patterns"
          />

          <TextField
            fullWidth
            label="Physical Appearance"
            placeholder="Describe the character&apos;s physical features, style, and distinctive characteristics"
            value={formData.appearance}
            onChange={(e) => handleChange('appearance', e.target.value)}
            multiline
            rows={3}
            required
            helperText="Include their physical features, style, and distinctive characteristics"
          />
        </Box>
      </Modal>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }} className={koho.className}>
          Character created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(0);
  const [latestAppointments, setLatestAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User is not authenticated.');
        return;
      }

      try {
        const userResponse = await axios.get('http://localhost:8080/api/users/me', {
          headers: { 'userId': userId },
        });
        setUsername(userResponse.data.username || 'Guest');

        const countResponse = await axios.get(
          'http://localhost:8080/api/upcoming-appointments-count',
          { headers: { 'userId': userId } }
        );
        setUpcomingAppointmentsCount(countResponse.data.count);

        const appointmentsResponse = await axios.get(
          'http://localhost:8080/api/latest-appointments',
          { headers: { 'userId': userId } }
        );
        setLatestAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome, {username}
        </Typography>
        <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 50 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
      </Box>

      {/* Feeling Unwell Section */}
      <Card sx={{ mb: 4, p: 3, textAlign: 'center' }}>
        <LocalHospitalIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Feeling Unwell?
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Don&apos;t wait! Book an appointment with a specialist now and take
          the first step toward recovery.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/department-list"
        >
          Book Appointment
        </Button>
      </Card>

      {/* Latest Appointments Section */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Upcoming Appointments ({upcomingAppointmentsCount})
      </Typography>
      {latestAppointments.length > 0 ? (
        <Grid container spacing={2}>
          {latestAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <Card>
                <CardContent>
                  <CalendarTodayIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="body1" mt={2}>
                    {new Date(appointment.date).toLocaleDateString()}
                  </Typography>
                  <Typography color="text.secondary">
                    {appointment.details || 'No details provided'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary">
          No upcoming appointments.
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;

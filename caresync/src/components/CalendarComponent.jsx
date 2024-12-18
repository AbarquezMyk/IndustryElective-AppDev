import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AppointmentCalendar = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false); // New state for delete confirmation
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    startTime: '',
    endTime: '',
    doctorId: doctorId || null,
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/calendar/appointments/${doctorId}`);
        const formattedAppointments = response.data.map((appt) => ({
          title: appt.title,
          start: new Date(appt.startTime),
          end: new Date(appt.endTime),
          id: appt.id,
        }));
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setNewAppointment({
      title: '',
      startTime: moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'),
      endTime: moment(slotInfo.start).add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
      doctorId: doctorId || null,
    });
    setIsAddModalOpen(true);
  };

  const handleAppointmentClick = (event) => {
    setSelectedAppointment(event);
    setIsDetailModalOpen(true);
  };

  const handleAddAppointment = async () => {
    try {
      const appointmentData = {
        title: newAppointment.title,
        startTime: newAppointment.startTime,
        endTime: newAppointment.endTime,
        dayOfWeek: moment(selectedDate).format('dddd').toUpperCase(),
        doctorId: newAppointment.doctorId || doctorId,
      };

      let response;
      if (newAppointment.id) {
        // Update existing appointment
        response = await axios.put(`/api/calendar/schedule/${newAppointment.id}`, appointmentData);

        setAppointments((prev) =>
          prev.map((appt) =>
            appt.id === newAppointment.id
              ? { ...appt, title: newAppointment.title, start: new Date(newAppointment.startTime), end: new Date(newAppointment.endTime) }
              : appt
          )
        );
      } else {
        // Add new appointment
        response = await axios.post('/api/calendar/schedule', appointmentData);

        const newEvent = {
          title: newAppointment.title,
          start: new Date(newAppointment.startTime),
          end: new Date(newAppointment.endTime),
          id: response.data.id,
        };

        setAppointments((prev) => [...prev, newEvent]);
      }

      setIsAddModalOpen(false);
      setNewAppointment({
        title: '',
        startTime: '',
        endTime: '',
        doctorId: doctorId || null,
        id: '', // Reset the id field
      });
    } catch (error) {
      console.error('Error adding/updating appointment:', error);
      alert('Failed to add/update appointment: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    }
  };

  const handleEditAppointment = (appointment) => {
    setNewAppointment({
      id: appointment.id, // This identifies the appointment being edited
      title: appointment.title,
      startTime: moment(appointment.start).format('YYYY-MM-DDTHH:mm'),
      endTime: moment(appointment.end).format('YYYY-MM-DDTHH:mm'),
      doctorId: appointment.doctorId || doctorId,
    });
    setIsAddModalOpen(true); // Open the modal for editing
    setIsDetailModalOpen(false); // Close the details modal if it was open
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = async () => {
    try {
      await axios.delete(`/api/calendar/schedule/${selectedAppointment.id}`);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== selectedAppointment.id)
      );
      setIsDetailModalOpen(false);
      setIsDeleteConfirmModalOpen(false); // Close the confirmation modal
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert(
        'Failed to delete appointment: ' +
          (error.response?.data?.message || error.message || 'Unknown error')
      );
    }
  };

  const openDeleteConfirmModal = () => {
    setIsDetailModalOpen(false); 
    setIsDeleteConfirmModalOpen(true); 
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          marginBottom: '30px',
          fontWeight: 'bold',
        }}
      >
        Calendar
      </h1>

      <div style={{ width: '100%', height: '700px' }}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleAppointmentClick}
        />
      </div>

      {/* Add Appointment Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '350px',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            {newAppointment.id ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={newAppointment.title}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
              }}
              placeholder="Enter appointment title"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
            >
              Start Time:
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={newAppointment.startTime}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
            >
              End Time:
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={newAppointment.endTime}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <button
              onClick={handleAddAppointment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              {newAppointment.id ? 'Save Changes' : 'Add Appointment'}
            </button>

            <button
              onClick={() => setIsAddModalOpen(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {isDetailModalOpen && selectedAppointment && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '350px',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            Appointment Details
          </h2>

          <div style={{ marginBottom: '15px' }}>
            <strong>Title: </strong>
            {selectedAppointment.title}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Start Time: </strong>
            {moment(selectedAppointment.start).format('YYYY-MM-DD HH:mm')}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>End Time: </strong>
            {moment(selectedAppointment.end).format('YYYY-MM-DD HH:mm')}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <button
              onClick={handleEditAppointment.bind(null, selectedAppointment)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Edit
            </button>

            <button
            onClick={openDeleteConfirmModal}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Delete
          </button>
          <button
        onClick={() => setIsDetailModalOpen(false)} // Close the modal
        style={{
          padding: '10px 20px',
          backgroundColor: '#ccc',
          color: 'black',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Cancel
      </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '350px',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            Are you sure you want to delete this appointment?
          </h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <button
              onClick={handleDeleteAppointment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Yes, Delete
            </button>

            <button
              onClick={closeDeleteConfirmModal}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ccc',
                color: 'black',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;

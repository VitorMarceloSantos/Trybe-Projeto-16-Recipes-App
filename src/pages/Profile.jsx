import React from 'react';
import Header from '../components/Header';
import ProfilePage from '../components/ProfilePage';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" />
      <ProfilePage />
      <Footer />
    </div>
  );
}

export default Profile;

import React from 'react';
import ResumeDoc from '../../assets/joshua-mukisa-resume.pdf';

function Resume() {
  return <iframe src={ResumeDoc} style={{ width: '100%', height: '100vh' }} />;
}

export default Resume;

import React from 'react';
import style from './style';

const About = () => (
  <section className="about">
    <h3 style={ style.about } >This app was used to explore the features and organization of the full MERN stack. Uses the Express router and Mongoose for database management, uses React features where possible for quicker view updates without needing the back end, and uses careful execution of asynchronous code to ensure no inconsistencies between front and back end data.</h3>
    <h4 style={ style.footer } >Find out more about the author <a href="http://milesheise.com">here</a></h4>
  </section>);

export default About;

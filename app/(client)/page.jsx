"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

export default function Home() {
  const joinRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.section');
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    animatedElements.forEach(element => revealOnScroll.observe(element));

    return () => {
      revealOnScroll.disconnect();
    };
  }, []);

  const scrollToJoin = () => {
    if (joinRef.current) {
      joinRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      registration_date: formData.get('registration_date') || null,
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    const { error } = await supabase.from('registrations').insert([data]);

    setIsSubmitting(false);
    if (error) {
      alert('Error submitting registration: ' + error.message);
    } else {
      alert('Registration successful! We will be in touch soon.');
      e.target.reset();
    }
  };

  return (
    <>
      <section className="hero">
          <div className="hero-content">
              <div>
                  <h1>AT <span className="red"></span><span style={{ color: 'black' }}>KAIROS</span><br/>LANGUAGE<br/>INSTITUTE</h1>
                  <p>Learn English the smart way with – where digital learning meets real results.</p>
              </div>
              <img src="/img/Student.png" alt="Student" />
          </div>

          <div className="cta">
              <h2>WE OPEN DOORS<br/>THROUGH ENGLISH</h2>
              <small>ENROL YOUR CHILD TODAY</small>
              <button className="red-btn" onClick={scrollToJoin}>REGISTER</button>
          </div>
      </section>

      <section className="why section" style={{ textAlign: 'center', padding: '80px 5%' }}>
          <h2 style={{ fontSize : '35px' , fontFamily : 'Montserrat' }}>WHY CHOOSE <span className="red">K</span><span className="blue">AIROS</span> ?</h2>

          <div className="cards" style={{ marginTop: '40px' }}>
              <div className="card">
                  <img src="/img/img1.png" alt="Interactive Lessons" />
                  <p>Engaging, Interactive<br/>Lessons</p>
              </div>
              <div className="card">
                  <img src="/img/img2.png" alt="Expert Guidance" />
                  <p>Expert Guidance</p>
              </div>
              <div className="card">
                  <img src="/img/img3.png" alt="Real Life Confidence" />
                  <p>Real Life Confidence</p>
              </div>
          </div>
      </section>

      <section className="welcome section">
          <div className="welcome-inner">
              <img src="/img/boy.png" className="welcome-img" alt="Boy" />

              <div className="welcome-text">
                  <h3>Welcome to</h3>
                  <h1>
                      <span className="red">K</span><span className="blue">airos</span>{' '}
                      <span className="red">L</span><span className="blue">anguage</span> Institute
                  </h1>
                  <p>Are you searching for a dynamic and encouraging online English learning experience for yourself or your child?</p>
                  <p>At Kairos Language Institute, we are passionate about helping learners grow in confidence and ability. Our skilled and caring educators provide structured, interactive lessons designed to meet individual needs and support every learner’s journey toward English success.</p>

                  <div className="apply-area">
                      <b>looking to join our team?</b>
                      <button className="red-btn" onClick={() => router.push('/careers')}>APPLY NOW</button>
                  </div>
              </div>
          </div>
      </section>

      <div className="provide-wrapper">
        <section className="provide section">
            <div className="provide-left">
                <h2>WHAT WE <span className="blue">PROVIDE</span></h2>
                <p><span className="check"></span>Customized English Lessons – Tailored to each student’s learning style and needs.</p>
                <p><span className="check"></span>Conversation Practice – Build confidence and fluency in real-life English situations.</p>
                <p><span className="check"></span>Reading & Writing Enhancement – Strengthen critical thinking and self-expression.</p>
                <p><span className="check"></span>Flexible Timetable – Learn at your own pace with schedules that suit you.</p>
                <p><span className="check"></span>Grammar & Vocabulary Building – Master the fundamentals of English effectively.</p>
            </div>
            <div className="provide-right">
                <img src="/img/Child_learn.jpeg" alt="Child learning" />
            </div>
        </section>
      </div>

      <section className="join section" ref={joinRef}>
          <h2>JOIN <span className="blue">US</span> TODAY!</h2>
          <p>
              Start building your English skills today. Get in touch to find out more<br/>
              about our courses and book a trial class with one of our passionate<br/>
              instructors.
          </p>

          <div className="join-inner">
              <img src="/img/books.png" className="books" alt="Books" />

              <form className="form-box" onSubmit={handleRegistration}>
                  <input type="text" name="first_name" placeholder="First Name" required />
                  <input type="text" name="last_name" placeholder="Last Name" required />
                  <input type="date" name="registration_date" required />
                  <input type="tel" name="phone" placeholder="+27     Phone Number" required />
                  <input type="email" name="email" placeholder="email@gmail" required />
                  <textarea name="message" placeholder="Your Message"></textarea>
                  <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
              </form>
          </div>
      </section>
    </>
  );
}

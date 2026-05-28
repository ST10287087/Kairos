"use client";

import { useEffect } from 'react';
import styles from './about.module.css';

export default function About() {
  useEffect(() => {
    const items = document.querySelectorAll(`.${styles.animate}`);
    const animate = () => {
      items.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 120 && rect.bottom > 120) {
              el.classList.add(styles.show);
          } else {
              el.classList.remove(styles.show);
          }
      });
    };

    window.addEventListener('scroll', animate);
    animate();

    return () => window.removeEventListener('scroll', animate);
  }, []);

  return (
    <>
      <section className={`${styles.hero} ${styles.animate}`}>
          <h1>What is <span>KAIROS</span> LANGUAGE INSTITUTE?</h1>
          <h2>Master English, Unlock Possibilities</h2>
          <p>We help learners master English with confidence.</p>
      </section>

      <section className={`${styles.features} ${styles.animate}`}>
         <h2 className={styles.atKairos}>
          <span className={styles.at}>AT </span>
          <span className={styles.k}>K</span><span className={styles.airos}>AIROS </span>
          <span className={styles.text}>WE BRING YOU:</span>
        </h2>

          <div className={styles.cards}>
              <div className={`${styles.card} ${styles.animate}`}>
                  <img src="/img/picard_one.png" alt="Community" />
                  <div className={`${styles.label} ${styles.blue}`}>Community & Connection</div>
              </div>

              <div className={`${styles.card} ${styles.animate}`}>
                  <img src="/img/picard_two.png" alt="Accessibility" />
                  <div className={`${styles.label} ${styles.red}`}>Accessibility & Flexibility</div>
              </div>

              <div className={`${styles.card} ${styles.animate}`}>
                  <img src="/img/picard_three.png" alt="Problem Solving" />
                  <div className={`${styles.label} ${styles.blue}`}>Problem Solving</div>
              </div>

              <div className={`${styles.card} ${styles.animate}`}>
                  <img src="/img/picard_four.png" alt="Growth" />
                  <div className={`${styles.label} ${styles.red}`}>Growth & Impact</div>
              </div>
          </div>
      </section>

      <section className={`${styles.lessons} ${styles.animate}`}>
         <h2>
          What <span className={styles.wRed}>w</span><span className={styles.eBlue}>e</span> include in each lesson
        </h2>

          <div className={styles.lessonList}>
              <div>Vocabulary</div>
              <div className={styles.outline}>Pronunciation</div>
              <div>Reading</div>
              <div className={styles.outline}>Conversational Skills</div>
              <div>Writing Skills</div>
              <div className={styles.outline}>Listening Skills</div>
          </div>
      </section>

      <section className={`${styles.instructor} ${styles.animate}`}>
          <h2>MEET THE <span className={styles.iRed}>I</span><span className={styles.nBlue}>N</span>STRUCTOR</h2>
          <h3>SEBASTIAN JURAN RANJITH</h3>

          <div className={styles.instructorContent}>
              <img src="/img/SEBASTIAN.png" className={styles.slideRight} alt="Instructor" />

              <p>
                 My name is Sebastein Juran Ranjith, and I am 26 years old. I come from the beautiful country of the United States of America, where I developed a strong passion for education, communication, and working with people from diverse backgrounds.

                  <br/><br/>
                 I am a qualified TEFL teacher with four years of teaching experience, and I am highly skilled in teaching students of all age groups, ranging from young learners as young as four years old to adults. I am passionate about creating engaging, supportive, and interactive learning environments that help students grow in confidence and language ability.

                  <br/><br/>
                 Throughout my teaching journey, I have become proficient in using world-class courseware such as Oxford Discover, Oxford Reading Tree, National Geographic Reader Explorers, National Geographic Kids, and National Geographic Great Writing, among many others. My experience with these resources allows me to deliver structured, high-quality lessons tailored to different learning levels and needs.
                  <br/><br/>
                  I am dedicated, patient, and adaptable, and I strive to make learning enjoyable and meaningful for every student I teach. My goal as an educator is to inspire learners, build their communication skills, and support their academic and personal development through effective and engaging English instruction.
              </p>
          </div>
      </section>
    </>
  );
}

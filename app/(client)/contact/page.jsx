"use client";

import { useEffect } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  useEffect(() => {
    const items = document.querySelectorAll(`.${styles.animate}`);
    const animateOnScroll = () => {
      items.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
              el.classList.add(styles.show);
          } else {
              el.classList.remove(styles.show);
          }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <>
      <div className={`${styles.hero} ${styles.animate}`}>
          <h1>
              GET IN TOUCH WITH <br/>
              <span>KAIROS</span> TODAY!
          </h1>
      </div>

      <div className={`${styles.contactSection} ${styles.animate}`}>
          <h2><span>C</span>ontact Us</h2>
          <p>Your journey to confident communication starts here.</p>

          <div className={styles.infoRow}>
              <div className={styles.infoBox}>
                  <div className={styles.phoneTitle}>Phone</div>
                  <p>Call us and we'll get back to you quickly.</p>
                  <h3>
                      <a href="https://wa.me/16156007756" target="_blank" rel="noreferrer" className={styles.contactLink}>
                          +1(615)-600-7756
                      </a>
                  </h3>
              </div>

              <div className={styles.infoBox}>
                  <div className={styles.emailTitle}>Email</div>
                  <p>Email us for direct support and guidance.</p>
                  <h3>
                      <a href="mailto:kairoslanguageinstitute7@gmail.com" className={styles.contactLink}>
                          kairoslanguageinstitute7@gmail.com
                      </a>
                  </h3>
              </div>
          </div>
      </div>
    </>
  );
}

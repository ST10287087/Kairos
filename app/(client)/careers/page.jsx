"use client";

import { useEffect, useState } from 'react';
import styles from './careers.module.css';
import { supabase } from '../../../utils/supabase';

export default function Careers() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadFile = async (file, folder) => {
    if (!file || file.size === 0) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const formData = new FormData(e.target);
        
        // Upload files
        const intro_video_url = await uploadFile(formData.get('intro_video'), 'videos');
        const cv_url = await uploadFile(formData.get('cv'), 'cvs');
        const certificates_url = await uploadFile(formData.get('certificates'), 'certs');
        const headshot_url = await uploadFile(formData.get('headshot'), 'headshots');

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            street_address: formData.get('street_address'),
            apartment: formData.get('apartment'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
            country: formData.get('country'),
            intro_video_url,
            cv_url,
            certificates_url,
            headshot_url
        };

        const { error } = await supabase.from('applications').insert([data]);
        if (error) throw error;

        alert('Application submitted successfully!');
        e.target.reset();
    } catch (error) {
        alert('Error submitting application: ' + error.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`${styles.hero} ${styles.animate}`}>
          <h1>
              INTERESTED IN<br/>
              JOINING <span>KAIROS?</span>
          </h1>
          <p>
              We offer you a chance to get the experience and opportunity to pursue your career in language teaching
          </p>
      </div>

      <section className={`${styles.form} ${styles.animate}`}>
        <div className={styles.formSection}>
          <h2 className={styles.atKairos}>
            <span className={styles.at}>START YOUR </span>
            <span className={styles.k}>K</span><span className={styles.airos}>AIROS </span>
            <span className={styles.text}>TRAINING TODAY!</span>
          </h2>

          <div className={`${styles.formBox} ${styles.animate}`}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
               <div className={styles.uploadGrid}>
                <label className={styles.uploadBox}>
                    Intro Video *
                    <input type="file" name="intro_video" required />
                </label>

                <label className={styles.uploadBox}>
                    CV / Resume *
                    <input type="file" name="cv" required />
                </label>

                <label className={styles.uploadBox}>
                    Degree / Certificates *
                    <input type="file" name="certificates" required />
                </label>

                <label className={styles.uploadBox}>
                    Headshot Photos *
                    <input type="file" name="headshot" required />
                </label>
              </div>

                <input type="text" name="name" placeholder="Name *" required />

                <div className={styles.row}>
                    <input type="email" name="email" placeholder="Email Address *" required />
                    <input type="text" name="phone" placeholder="Phone Number *" required />
                </div>

                <input type="text" name="street_address" placeholder="Street Address *" />
                <input type="text" name="apartment" placeholder="Apartment, Suite, etc *" />

                <div className={styles.row}>
                    <input type="text" name="city" placeholder="City *" />
                    <input type="text" name="state" placeholder="State / Province *" />
                </div>

                <div className={styles.row}>
                    <input type="text" name="zip" placeholder="ZIP / Postal Code *" />

                    <select name="country" required defaultValue="Select Country">
                        <option disabled>Select Country</option>
                        <option>United States</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>Canada</option>
                        <option>Other</option>
                    </select>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

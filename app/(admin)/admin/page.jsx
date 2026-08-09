"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import { supabase } from "../../../utils/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [section, setSection] = useState("applications");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/login");
        return;
      }

      setAuthChecked(true);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (authChecked) fetchData();
  }, [authChecked]);

  const fetchData = async () => {
    const { data: apps } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (apps) setApplications(apps);

    const { data: regs } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (regs) setRegistrations(regs);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const deleteSelected = async () => {
    if (!confirm("Are you sure you want to permanently delete selected items?"))
      return;

    if (section === "applications") {
      await supabase.from("applications").delete().in("id", selectedIds);
    } else if (section === "registrations") {
      await supabase.from("registrations").delete().in("id", selectedIds);
    }

    fetchData();
    setSelectedIds([]);
  };

  const renderContent = () => {
    if (selectedProfile) {
      const u = selectedProfile.item;
      const type = selectedProfile.type;
      return (
        <div className={styles.profile}>
          <div
            className={styles.backBtn}
            onClick={() => setSelectedProfile(null)}
          >
            ← Back
          </div>
          <h2>
            {type === "application" ? u.name : `${u.first_name} ${u.last_name}`}
          </h2>
          <p>{u.email}</p>
          {type === "application" ? (
            <>
              <p>
                <strong>Phone:</strong> {u.phone}
              </p>
              <p>
                <strong>Address:</strong> {u.street_address}, {u.city},{" "}
                {u.state}, {u.zip}, {u.country}
              </p>
              <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
                {u.cv_url && (
                  <a
                    href={u.cv_url}
                    target="_blank"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    View CV
                  </a>
                )}
                {u.intro_video_url && (
                  <a
                    href={u.intro_video_url}
                    target="_blank"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    View Video
                  </a>
                )}
                {u.certificates_url && (
                  <a
                    href={u.certificates_url}
                    target="_blank"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    View Certificates
                  </a>
                )}
                {u.headshot_url && (
                  <a
                    href={u.headshot_url}
                    target="_blank"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    View Headshot
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Phone:</strong> {u.phone}
              </p>
              <p>
                <strong>Date:</strong> {u.registration_date}
              </p>
              <p>
                <strong>Message:</strong> {u.message}
              </p>
            </>
          )}
        </div>
      );
    }

    if (section === "applications") {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No applications found.
                </td>
              </tr>
            )}
            {applications.map((u) => (
              <tr
                key={u.id}
                onClick={() =>
                  setSelectedProfile({ item: u, type: "application" })
                }
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(u.id)}
                    onChange={() => handleCheckboxChange(u.id)}
                  />
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (section === "registrations") {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No registrations found.
                </td>
              </tr>
            )}
            {registrations.map((u) => (
              <tr
                key={u.id}
                onClick={() =>
                  setSelectedProfile({ item: u, type: "registration" })
                }
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(u.id)}
                    onChange={() => handleCheckboxChange(u.id)}
                  />
                </td>
                <td>
                  {u.first_name} {u.last_name}
                </td>
                <td>{u.email}</td>
                <td>
                  {u.registration_date ||
                    new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  if (!authChecked) return null;

  return (
    <div className={styles.container}>
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <h2>KAIROS PORTAL</h2>

        <a
          className={
            section === "applications" && !selectedProfile ? styles.active : ""
          }
          onClick={() => {
            setSection("applications");
            setSelectedProfile(null);
            setSelectedIds([]);
          }}
        >
          Applications
        </a>
        <a
          className={
            section === "registrations" && !selectedProfile ? styles.active : ""
          }
          onClick={() => {
            setSection("registrations");
            setSelectedProfile(null);
            setSelectedIds([]);
          }}
        >
          Registrations
        </a>
        <a
          style={{ marginTop: "auto", cursor: "pointer" }}
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/login");
          }}
        >
          Logout
        </a>
      </div>

      {/* MAIN */}
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Welcome Sebby boiiiiiiiiiii</h1>
        </div>

        {selectedIds.length > 0 && !selectedProfile && (
          <div
            className={styles.menu}
            onClick={deleteSelected}
            style={{ cursor: "pointer", color: "red" }}
          >
            ⋮ Delete Selected
          </div>
        )}

        <div id="content">{renderContent()}</div>
      </div>
    </div>
  );
}

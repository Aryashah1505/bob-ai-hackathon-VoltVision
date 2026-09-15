import React, { useState } from "react";
import { User, Mail, Lock, Building2, MapPin, ArrowRight, AlertCircle, CheckCircle2, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SignupPage({ onNavigate, onSignupSuccess }) {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [authorizedConsent, setAuthorizedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password || !companyName.trim() || !region.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!authorizedConsent) {
      setError("Please confirm you are authorized to create this utility workspace.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signup({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        companyName: companyName.trim(),
        region: region.trim(),
      });

      if (onSignupSuccess) {
        onSignupSuccess(res);
      } else {
        onNavigate("onboarding");
      }
    } catch (err) {
      console.error("Signup error:", err);
      let msg = err.message || "Failed to create account. Please try again.";
      if (msg.toLowerCase().includes("user already registered")) {
        msg = "An account with this email already exists. Please sign in instead.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at top, #111c2e 0%, #0b0f19 100%)",
      padding: "2.5rem 1rem",
    }}>
      <div className="glass-panel" style={{
        maxWidth: "520px",
        width: "100%",
        padding: "2.5rem 2.25rem",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
        border: "1px solid var(--border-default)",
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(34, 167, 240, 0.12)",
            border: "1px solid rgba(34, 167, 240, 0.3)",
            color: "var(--cyan)",
            marginBottom: "0.85rem"
          }}>
            <Building2 size={26} />
          </div>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
            Create Your Industry Workspace
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.35rem" }}>
            Register your electric utility or industrial company profile
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: "rgba(251, 113, 133, 0.12)",
            border: "1px solid rgba(251, 113, 133, 0.35)",
            borderRadius: "var(--radius-sm)",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "1.25rem",
            color: "var(--status-danger)",
            fontSize: "0.85rem"
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* User Full Name & Work Email */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Full Name *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Vikram Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{ paddingLeft: "2.2rem" }}
                />
                <User size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Work Email *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  className="input-field"
                  placeholder="operator@utility.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: "2.2rem" }}
                />
                <Mail size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>

          {/* Company Name & Operating Region */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Company / Utility Name *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Gujarat State Grid Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  style={{ paddingLeft: "2.2rem" }}
                />
                <Building2 size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Operating Region *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Western Zone (Vadodara)"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                  style={{ paddingLeft: "2.2rem" }}
                />
                <MapPin size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Password (min 8 chars) *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: "2.2rem" }}
                />
                <Lock size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Confirm Password *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingLeft: "2.2rem" }}
                />
                <Lock size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>

          {/* Authorization Consent Checkbox */}
          <div style={{ background: "rgba(0,0,0,0.2)", padding: "0.85rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", marginTop: "0.25rem" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.8rem", color: "var(--text-secondary)", cursor: "pointer", lineHeight: 1.4 }}>
              <input
                type="checkbox"
                checked={authorizedConsent}
                onChange={(e) => setAuthorizedConsent(e.target.checked)}
                style={{ marginTop: "0.2rem" }}
              />
              <span>
                I confirm that I am authorized to create this company workspace and manage grid asset telemetry.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "0.85rem",
              marginTop: "0.5rem",
              fontSize: "0.925rem"
            }}
          >
            {loading ? (
              <span>Provisioning Workspace...</span>
            ) : (
              <>
                <span>Create Industry Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: "1.75rem", textAlign: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
          <span style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={() => onNavigate("login")}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--cyan)",
              fontSize: "0.825rem",
              fontWeight: 700,
              cursor: "pointer",
              padding: 0
            }}
          >
            Sign in to your workspace
          </button>
        </div>
      </div>
    </div>
  );
}

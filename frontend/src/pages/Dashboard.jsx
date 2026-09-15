import React, { useState } from "react";
import { 
  AlertTriangle, 
  Cpu, 
  CloudLightning, 
  Activity, 
  ArrowUpRight, 
  ShieldAlert, 
  Wrench, 
  Users, 
  TrendingUp,
  XCircle,
  Filter,
  Building2,
  MapPin,
  Plus,
  Play
} from "lucide-react";
import { SummaryCard } from "../components/SummaryCard";
import { RiskBadge } from "../components/RiskBadge";

export function Dashboard({ 
  companyDashboard, 
  selectedCompany, 
  loading, 
  onNavigate, 
  onSelectAsset,
  onOpenAddCompany,
  onRunAnalysis
}) {
  const [criticalOnlyFilter, setCriticalOnlyFilter] = useState(false);

  // If no company exists in database
  if (!selectedCompany) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div className="glass-panel" style={{ maxWidth: "560px", margin: "0 auto", padding: "3rem 2rem" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(56,189,248,0.1)", color: "var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Building2 size={32} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
            No Company Profile Selected
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.75rem auto 1.75rem" }}>
            Please set up your electric utility or industrial grid profile to start tracking substations, equipment, and real-time failure risks.
          </p>
          <button className="btn-primary" onClick={onOpenAddCompany}>
            <Plus size={16} />
            <span>Add Company Onboarding</span>
          </button>
        </div>
      </div>
    );
  }

  // Loading skeleton placeholder
  if (loading && !companyDashboard) {
    return (
      <div className="page-container">
        <div className="glass-panel" style={{ padding: "3rem", textAlign: "center" }}>
          <div className="status-dot pulse" style={{ background: "var(--cyan)", width: "16px", height: "16px", margin: "0 auto 1rem" }}></div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Loading {selectedCompany.name} Data...
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.35rem" }}>
            Fetching isolated assets, weather conditions, and risk evaluations from Supabase.
          </p>
        </div>
      </div>
    );
  }

  // Extract company-scoped metrics
  const substationsCount = companyDashboard?.substations_count || 0;
  const assetsCount = companyDashboard?.assets_count || 0;
  const transformersCount = companyDashboard?.transformers_count || 0;
  const otherCount = companyDashboard?.other_equipment_count || 0;
  const gridStatus = companyDashboard?.grid_status || "Monitoring Active";
  const threats = companyDashboard?.threats || [];
  const threatsSummary = companyDashboard?.threats_summary || { total_threats: 0, critical_count: 0, medium_count: 0, low_count: 0 };
  const substations = companyDashboard?.substations || [];
  const assets = companyDashboard?.assets || [];
  const weather = companyDashboard?.weather || { temperature: 28.0, wind_speed: 15.0, rainfall: 0.0, lightning_risk: 0.1 };

  const isCritical = gridStatus === "Critical Now" || threatsSummary.critical_count > 0;
  const isElevated = !isCritical && (gridStatus === "Elevated Risk" || threatsSummary.medium_count > 0);

  // Derive summary phrase
  const generateSummary = () => {
    if (assetsCount === 0) {
      return `No grid assets configured yet for ${selectedCompany.name}. Add substations and transformers to begin monitoring.`;
    }
    if (threatsSummary.critical_count > 0) {
      return `${threatsSummary.critical_count} asset${threatsSummary.critical_count > 1 ? "s" : ""} exhibiting elevated risk in ${selectedCompany.region}; inspection recommended.`;
    }
    if (threatsSummary.medium_count > 0) {
      return `${threatsSummary.medium_count} moderate risk alert${threatsSummary.medium_count > 1 ? "s" : ""} detected in ${selectedCompany.region}.`;
    }
    return `Grid operations for ${selectedCompany.name} are nominal across all ${substationsCount} substations and ${assetsCount} assets.`;
  };

  const displayedThreats = criticalOnlyFilter 
    ? threats.filter((t) => t.risk_level.toUpperCase() === "HIGH" || t.risk_level.toUpperCase() === "CRITICAL" || (t.risk_score || 0) >= 70)
    : threats;

  return (
    <div className="page-container">
      {/* 🌟 1. Company Operations Banner */}
      <section className={`hero-status-banner ${isCritical ? "is-critical" : ""}`}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <Building2 size={16} style={{ color: "var(--cyan)" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {selectedCompany.name}
            </span>
            <span style={{ color: "var(--text-dim)" }}>•</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <MapPin size={13} />
              {selectedCompany.region}
            </span>
          </div>

          <h2 className="hero-title">Grid Operations Overview</h2>
          <p className="hero-subtitle" style={{ color: "#e2e8f0", fontWeight: 500 }}>
            {generateSummary()}
          </p>
        </div>

        <div className="hero-badge-container">
          <button
            className="hero-status-pill clickable-pill"
            onClick={() => isCritical && setCriticalOnlyFilter(!criticalOnlyFilter)}
            style={{
              background: isCritical ? "rgba(239, 68, 68, 0.25)" : isElevated ? "rgba(245, 158, 11, 0.25)" : "rgba(16, 185, 129, 0.2)",
              color: isCritical ? "#f87171" : isElevated ? "#fbbf24" : "#34d399",
              border: `1px solid ${isCritical ? "rgba(239, 68, 68, 0.55)" : isElevated ? "rgba(245, 158, 11, 0.5)" : "rgba(16, 185, 129, 0.4)"}`,
              cursor: isCritical ? "pointer" : "default"
            }}
          >
            <span className="status-dot pulse"></span>
            <span>{gridStatus.toUpperCase()}</span>
          </button>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {(selectedCompany.customer_count || 0).toLocaleString()} Customers Served
          </span>
        </div>
      </section>

      {/* Filter Active Indicator */}
      {criticalOnlyFilter && (
        <div style={{
          background: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.35)",
          color: "#f87171",
          padding: "0.6rem 1.25rem",
          borderRadius: "var(--radius-sm)",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.85rem",
          fontWeight: 600
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={15} />
            <span>Showing critical threats only ({displayedThreats.length} items)</span>
          </div>
          <button 
            onClick={() => setCriticalOnlyFilter(false)}
            style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", fontWeight: 700 }}
          >
            <XCircle size={14} />
            <span>Clear filter</span>
          </button>
        </div>
      )}

      {/* 🌟 2. Four Company Scoped Summary Cards */}
      <div className="kpi-grid">
        <SummaryCard
          label="Total Substations"
          value={substationsCount}
          supportingText={`${selectedCompany.region} territory`}
          icon={Building2}
          accentColor="56, 189, 248"
        />

        <SummaryCard
          label="Monitored Assets"
          value={assetsCount}
          supportingText={`${transformersCount} Transformers • ${otherCount} Other`}
          icon={Cpu}
          accentColor="129, 140, 248"
          clickable={true}
          onClick={() => onNavigate("assets")}
        />

        <SummaryCard
          label="High-Risk Assets"
          value={
            <span style={{ color: threatsSummary.critical_count > 0 ? "var(--red)" : "var(--green)" }}>
              {threatsSummary.critical_count}
            </span>
          }
          supportingText={`${threatsSummary.medium_count} Moderate Warnings`}
          icon={ShieldAlert}
          accentColor={threatsSummary.critical_count > 0 ? "239, 68, 68" : "16, 185, 129"}
          clickable={true}
          onClick={() => onNavigate("alerts")}
        />

        <SummaryCard
          label="Regional Weather"
          value={`${weather.temperature}°C`}
          supportingText={`Wind: ${weather.wind_speed} mph • Rain: ${weather.rainfall} mm`}
          icon={CloudLightning}
          accentColor="245, 158, 11"
        />
      </div>

      {/* 🌟 3. Substations & Threats Breakdown */}
      <div className="dashboard-grid-main">
        {/* Left: Substations in this Company */}
        <div className="glass-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <Building2 size={18} className="panel-title-icon" />
              <span>Substations Network</span>
            </h3>
            <span className="panel-subtitle">{substations.length} registered nodes</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {substations.length > 0 ? (
              substations.map((sub) => (
                <div key={sub.id} style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.9rem" }}>
                    <span>{sub.name}</span>
                    <span style={{ color: "var(--cyan)", fontSize: "0.8rem" }}>{sub.assets_count} Assets</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    Location: {sub.location}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <span className="empty-icon">📍</span>
                <span className="empty-title">No Substations Registered</span>
                <span className="empty-desc">No substations have been added for {selectedCompany.name}.</span>
                <button className="btn-primary" onClick={onOpenAddCompany} style={{ marginTop: "1rem" }}>
                  <Plus size={14} />
                  <span>Add Grid Assets</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Threats & Failure Risks */}
        <div className="glass-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <ShieldAlert size={18} className="panel-title-icon" style={{ color: "var(--red)" }} />
              <span>Asset Threat Summary</span>
            </h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {onRunAnalysis && (
                <button className="btn-icon" onClick={onRunAnalysis} title="Run fresh risk analysis">
                  <Play size={12} />
                  <span>Run Analysis</span>
                </button>
              )}
              <button className="btn-icon" onClick={() => onNavigate("alerts")}>
                <span>All Alerts</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Threat Assessment</th>
                  <th>Risk Score</th>
                  <th>Risk Level</th>
                  <th>Advisory Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedThreats.length > 0 ? (
                  displayedThreats.slice(0, 5).map((t, idx) => (
                    <tr key={t.id || idx}>
                      <td className="asset-name-cell">{t.asset_name || "Asset"}</td>
                      <td>{t.threat_type}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: (t.risk_score || 0) >= 70 ? "var(--red)" : (t.risk_score || 0) >= 35 ? "var(--amber)" : "var(--green)" }}>
                          {t.risk_score}%
                        </span>
                      </td>
                      <td><RiskBadge level={t.risk_level} /></td>
                      <td style={{ fontSize: "0.8rem", color: "var(--cyan)" }}>
                        {t.recommended_action || "Routine observation"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}>
                      <div className="empty-state">
                        <span className="empty-title">No Active Risk Alerts</span>
                        <span className="empty-desc">All assets for {selectedCompany.name} are operating within nominal limits.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

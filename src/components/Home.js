import React, { useEffect, useState } from 'react';

export default function Home() {
  
  return (
    <div className="container mt-4">

      {/* Features Grid */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="text-center mb-4">Application Features</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-shield-check fs-1"></i>
                  </div>
                  <h5>Slice Validation</h5>
                  <p className="text-muted">
                    Validates user data against Redux store on every component mount
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="text-success mb-3">
                    <i className="bi bi-hdd fs-1"></i>
                  </div>
                  <h5>LocalStorage Persistence</h5>
                  <p className="text-muted">
                    Maintains user session across browser refreshes and tabs
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="text-warning mb-3">
                    <i className="bi bi-arrow-repeat fs-1"></i>
                  </div>
                  <h5>Anti-Reload Protection</h5>
                  <p className="text-muted">
                    Preserves application state and handles page refresh gracefully
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" />
    </div>
  );
}
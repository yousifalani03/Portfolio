'use client';

import React from 'react';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <div className="portfolio-container">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .portfolio-container {
          font-family: 'Inter', sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          overflow-x: hidden;
          --primary: #00d4ff;
          --secondary: #ff6b6b;
          --accent: #4ecdc4;
          --dark: #0a0a0a;
          --light: #ffffff;
          --gray: #888;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(-45deg, #0a0a0a, #1a1a1a, #0d1421, #0a0a0a);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .bg-animation::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .header {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2rem 0;
        }

        .profile-container {
          text-align: center;
          position: relative;
          padding-top: 2rem;
        }

        .profile-image {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          position: relative;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          padding: 3px;
          animation: profilePulse 3s ease-in-out infinite;
        }

        .profile-image::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary), var(--accent), var(--secondary));
          z-index: -1;
          animation: rotate 10s linear infinite;
          opacity: 0.7;
        }

        .profile-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          position: relative;
          overflow: hidden;
        }

        .profile-pic {
          width: 100% !important;
          height: 100% !important;
          border-radius: 50%;
          object-fit: cover;
        }

        @keyframes profilePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .name-title {
          font-size: 2.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.8rem;
          animation: textGlow 2s ease-in-out infinite alternate;
        }
        .student-tagline {
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--white);
          margin-bottom: 1.2rem;
        }
        @keyframes textGlow {
          from { filter: brightness(1); }
          to { filter: brightness(1.2); }
        }

        .subtitle {
          font-size: 1.3rem;
          color: var(--white);
          font-weight: 300;
          max-width: 500px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .about-me-section {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto 2.5rem;
          position: relative;
          overflow: hidden;
          animation: aboutFadeIn 1s ease-out 0.5s both;
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .about-me-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
          animation: shimmer 4s ease infinite;
          z-index: 1;
        }

        .about-me-section::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 22px;
          background: linear-gradient(45deg, var(--primary), var(--accent), var(--secondary), var(--primary));
          background-size: 400% 400%;
          z-index: -1;
          animation: gradientBorder 8s ease infinite;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .about-me-section:hover {
          transform: translateY(-8px) rotateX(2deg);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.15);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .about-me-section:hover::after {
          opacity: 0.6;
        }

        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes aboutFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          50% { left: 0%; }
          100% { left: 100%; }
        }

        .about-title {
          font-size: 1.6rem;
          font-weight: 600;
          background: linear-gradient(135deg, var(--accent), var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.2rem;
          text-align: center;
          position: relative;
          z-index: 2;
          animation: titlePulse 3s ease-in-out infinite;
        }

        @keyframes titlePulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.02);
            filter: brightness(1.2);
          }
        }

        .about-content {
          color: #ccc;
          line-height: 1.7;
          font-size: 1rem;
          text-align: left;
          margin-bottom: 1.8rem;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .about-me-section:hover .about-content {
          color: #e0e0e0;
          transform: translateZ(10px);
        }

        .highlight-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 1.2rem;
          margin-top: 1.8rem;
          position: relative;
          z-index: 2;
        }

        .stat-item {
          text-align: center;
          padding: 0.8rem;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 14px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(78, 205, 196, 0.1));
          opacity: 0;
          transition: all 0.4s ease;
          transform: scale(0.8);
        }

        .stat-item:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .stat-item:hover {
          transform: translateY(-8px) translateZ(20px) rotateX(5deg);
          border-color: rgba(0, 212, 255, 0.6);
          box-shadow: 0 15px 30px rgba(0, 212, 255, 0.2);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          position: relative;
          z-index: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--gray);
          margin-top: 0.4rem;
          position: relative;
          z-index: 1;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 1.8rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
          font-size: 1.8rem;
          color: var(--primary);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        .projects-section {
          padding: 5rem 0;
          position: relative;
        }

        .certifications-section {
          padding: 5rem 0;
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
          margin-bottom: 3.5rem;
        }

        .cert-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.8rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }

        .cert-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .cert-card:hover::before {
          left: 100%;
        }

        .cert-card:hover {
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.2);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .cert-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--secondary), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin-bottom: 1rem;
          position: relative;
          animation: iconFloat 4s ease-in-out infinite;
        }

        .cert-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.7rem;
          color: var(--light);
        }

        .cert-card p {
          color: var(--gray);
          line-height: 1.6;
          margin-bottom: 1.3rem;
          font-size: 0.9rem;
        }

        .cert-status {
          display: flex;
          justify-content: center;
          margin-top: 0.8rem;
        }

        .status-badge {
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .status-badge.earned {
          background: rgba(46, 204, 113, 0.1);
          border: 2px solid rgba(46, 204, 113, 0.3);
          color: #2ecc71;
        }

        .status-badge.earned::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(46, 204, 113, 0.2), transparent);
          animation: earnedShimmer 2s ease infinite;
        }

        .status-badge.pursuing {
          background: rgba(255, 193, 7, 0.1);
          border: 2px solid rgba(255, 193, 7, 0.3);
          color: #ffc107;
        }

        .status-badge.pursuing::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.2), transparent);
          animation: pursuingPulse 3s ease infinite;
        }

        @keyframes earnedShimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes pursuingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 3.5rem;
          background: linear-gradient(135deg, var(--light), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .project-card:hover::before {
          left: 100%;
        }

        .project-card:hover {
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.2);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .project-icon {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 1.2rem;
          position: relative;
          animation: iconFloat 4s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .project-card h3 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--light);
        }

        .project-card p {
          color: var(--gray);
          line-height: 1.7;
          margin-bottom: 1.8rem;
          font-size: 1rem;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-bottom: 1.8rem;
        }

        .tech-tag {
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: var(--primary);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(0, 212, 255, 0.2);
          transform: translateY(-2px);
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .project-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transition: width 0.3s ease;
        }

        .project-link:hover::after {
          width: 100%;
        }

        .project-link:hover {
          transform: translateX(5px);
        }

        .contact-section {
          text-align: center;
          padding: 5rem 0;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-title {
          font-size: 3rem;
          font-weight: 600;
          margin-bottom: 2.5rem;
          background: linear-gradient(135deg, var(--secondary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: 1.8rem;
          flex-wrap: wrap;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.8rem 1.8rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          color: var(--light);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transition: left 0.4s ease;
          z-index: -1;
        }

        .contact-link:hover::before {
          left: 0;
        }

        .contact-link:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .name-title {
            font-size: 2.2rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .about-me-section {
            padding: 1.5rem;
            margin: 0 0.5rem 2rem;
          }

          .highlight-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .project-card {
            padding: 1.8rem;
          }

          .certifications-section {
            padding: 4rem 0;
          }

          .certifications-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .cert-card {
            padding: 1.5rem;
          }

          .contact-links {
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-size: 2.2rem;
          }
        }
      `}</style>

      <div className="bg-animation"></div>
      
      {/* Header Section */}
      <section className="header">
        <div className="container">
          <div className="profile-container">
            <div className="profile-image">
              <div className="profile-inner">
                <Image
                  src="/pfp2.jpg"
                  alt="Yousif Alani"
                  className="profile-pic"
                  width={240}
                  height={240}
                  priority
                />
              </div>
            </div>
            <h1 className="name-title">Yousif Alani</h1>
            <p className="student-tagline">
              Computer Engineering student at UC San Diego
            </p>
            <p className="subtitle">
              AWS Cloud Engineer
            </p>
            
            {/* About Me Section */}
            <div className="about-me-section">
              <h3 className="about-title">About Me</h3>
              <div className="about-content">
                I'm passionate about cloud architecture and DevOps practices, with hands-on experience in AWS services, 
                Infrastructure as Code, and security best practices. Currently pursuing my degree while building real-world 
                projects that demonstrate scalable, secure cloud solutions. I love diving deep into emerging technologies 
                and solving complex infrastructure challenges. I'm also deeply interested in IT and networking, especially how infrastructure, automation, and connectivity come together to support reliable, high-performing systems.
              </div>
              <div className="highlight-stats">
                <div className="stat-item">
                  <span className="stat-number">Bay Area Native</span>
                  <span className="stat-label"></span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">UC San Diego</span>
                  <span className="stat-label"></span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Problem Solver</span>
                  <span className="stat-label"></span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Cloud Focused</span>
                  <span className="stat-label"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">↓</div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2 className="section-title">Personal Projects</h2>
          
          <div className="projects-grid">


            <div className="project-card">
              <div className="project-icon">🚀</div>
              <h3>Cloud-Native Portfolio with CI/CD</h3>
              <p>Built and deployed this portfolio using Next.js and TypeScript to showcase cloud projects and technical skills.
                 Automated CI/CD pipeline powered by AWS CodeBuild, S3, and CloudFront, with infrastructure provisioned using AWS CDK.
                 Demonstrates scalable cloud-native architecture, global content delivery, and DevOps best practices.</p>
              <div className="tech-stack">
                <span className="tech-tag">AWS CDK</span>
                <span className="tech-tag">CI/CD</span>
                <span className="tech-tag">CloudFront</span>
                <span className="tech-tag">S3</span>
                <span className="tech-tag">CodeBuild</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">CSS</span>
              </div>
              <a href="https://github.com/yousifalani03/Portfolio" className="project-link" target='_blank'>
                View Project →
              </a>
            </div>

            <div className="project-card">
              <div className="project-icon">🔐</div>
              <h3>AWS IAM Security Redesign</h3>
              <p>Redesigned a vulnerable AWS environment into a secure, role-based IAM system using Terraform.
                  Enforced strong password policies, created four distinct IAM groups with scoped permissions, and eliminated shared credentials by implementing individual users.
                  Infrastructure is fully managed as code, following AWS Well-Architected and SOC 2 best practices.</p>
              <div className="tech-stack">
                <span className="tech-tag">Terraform</span>
                <span className="tech-tag">IAM</span>
                <span className="tech-tag">MFA</span>
                <span className="tech-tag">RBAC</span>
                <span className="tech-tag">Audit Logging</span>
              </div>
              <a href="https://github.com/yousifalani03/terraform-iam-security-project" className="project-link" target="_blank">
                View Project →
              </a>
            </div>

            <div className="project-card">
              <div className="project-icon">🏗️</div>
              <h3>AWS CDK Deployment</h3>
              <p>Designed and deployed a fault-tolerant AWS architecture using the Cloud Development Kit (CDK).
                  Provisioned a VPC across two Availability Zones with public and private subnets, an EC2 instance, and a MySQL RDS database.
                  Resources are tagged, isolated, and deployed using scalable Infrastructure as Code.</p>
              <div className="tech-stack">
                <span className="tech-tag">AWS CDK</span>
                <span className="tech-tag">EC2</span>
                <span className="tech-tag">RDS</span>
                <span className="tech-tag">VPC</span>
                <span className="tech-tag">TypeScript</span>
              </div>
              <a href="https://github.com/yousifalani03/CDK-Project" className="project-link" target='_blank'>
                View Project →
              </a>
            </div>

            <div className="project-card">
              <div className="project-icon">⚙️</div>
              <h3>Next.js Website Deployment on AWS</h3>
              <p>Deployed a static website using AWS S3 and CloudFront, fully provisioned with Terraform.
                Configured a global CDN with public access policies, Terraform state locking via DynamoDB, and scalable infrastructure for static site hosting.</p>
              <div className="tech-stack">
                <span className="tech-tag">Terraform</span>
                <span className="tech-tag">S3</span>
                <span className="tech-tag">CloudFront</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">DynamoDB</span>
              </div>
              <a href="https://github.com/yousifalani03/Website-Terraform-Deployment" className="project-link" target='_blank'>
                View Project →
              </a>
            </div>

            <div className="project-card">
              <div className="project-icon">🌍</div>
              <h3>Multi-AZ VPC with Bastion Host (CloudFormation)</h3>
              <p>Deployed a secure multi-AZ VPC architecture using CloudFormation.
                  Configured a Bastion Host in a public subnet for SSH access, enabling secure tunneling into private EC2 instances across two Availability Zones.
                  Demonstrated cross-AZ communication and secure access within isolated subnets.</p>
              <div className="tech-stack">
                <span className="tech-tag">CloudFormation</span>
                <span className="tech-tag">VPC</span>
                <span className="tech-tag">Bastion Host</span>
                <span className="tech-tag">SSH</span>
                <span className="tech-tag">EC2</span>
              </div>
              <a href="https://github.com/yousifalani03/CloudFormation" className="project-link" target='_blank'>
                View Project →
              </a>
            </div>
          </div>
          <div className="scroll-indicator">↓</div>
        </div>
      </section>

      

      {/* Certifications Section */}
      <section className="certifications-section">
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          
          <div className="certifications-grid">
            <div className="cert-card">
              <div className="cert-icon">🏆</div>
              <h3>AWS Cloud Practitioner</h3>
              <p>Entry-level certification showing basic knowledge of AWS services, security, pricing, and how the cloud works. Great for anyone working with AWS, even without a technical role.</p>
              <div className="tech-stack">
                <span className="tech-tag">Cloud Security</span>
                <span className="tech-tag">Architecture</span>
                <span className="tech-tag">AWS Fundamentals</span>
              </div>
              <div className="cert-status">
                <span className="status-badge pursuing">Pursuing</span>
              </div>
            </div>

            <div className="cert-card">
              <div className="cert-icon">🔧</div>
              <h3>AWS Solutions Architect</h3>
              <p>Mid-level certification proving the ability to design and deploy reliable, secure, and cost-effective solutions on AWS using core services like compute, storage, networking, and databases.</p>
              <div className="tech-stack">
                <span className="tech-tag">Solution Design</span>
                <span className="tech-tag">Well-Architected</span>
                <span className="tech-tag">VPC</span>
              </div>
              <div className="cert-status">
                <span className="status-badge pursuing">Pursuing</span>
              </div>
            </div>

            <div className="cert-card">
              <div className="cert-icon">🌐</div>
              <h3>CompTIA Network+</h3>
              <p>Vendor-neutral certification validating the skills to design, configure, manage, and troubleshoot wired and wireless networks, covering networking fundamentals, operations, security, and troubleshooting.</p>
              <div className="tech-stack">
                <span className="tech-tag">Networking</span>
                <span className="tech-tag">TCP/IP</span>
                <span className="tech-tag">Network Security</span>
              </div>
              <div className="cert-status">
                <span className="status-badge pursuing">Pursuing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="contact-title">Reach Me Here</h2>
          <div className="contact-links">
            <a href="mailto:yousifalani11@gmail.com" className="contact-link">
              <span>📧</span> Email
            </a>
            <a href="https://www.linkedin.com/in/yousif-alani/" className="contact-link">
              <span>💼</span> LinkedIn
            </a>
            <a href="https://github.com/yousifalani03" className="contact-link">
              <span>🐙</span> GitHub
            </a>
            <a href="/Resume.pdf" className="contact-link">
              <span>📄</span> Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
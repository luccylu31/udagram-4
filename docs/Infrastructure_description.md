# Infrastructure Description

## Overview

This document describes the infrastructure components used in the Udagram project, including AWS services and how they interact.

## Components

### AWS S3

- **Purpose:** Hosts the frontend static files.
- **Interaction:** Users access the frontend via the S3 bucket URL.

### AWS Elastic Beanstalk

- **Purpose:** Hosts the backend API.
- **Interaction:** Handles incoming API requests from the frontend, processes them, and interacts with the database.

### AWS RDS

- **Purpose:** Stores relational data for the application.
- **Interaction:** The backend API connects to RDS to read and write data.

## Communication Flows

1. **User Request Flow:**

   - Users access the frontend hosted on AWS S3.
   - The frontend sends API requests to the backend hosted on AWS Elastic Beanstalk.

2. **Backend to Database Communication:**
   - The backend API communicates with the database hosted on AWS RDS.

## Summary

The infrastructure for the Udagram project utilizes AWS services to ensure scalability, security, and high availability. The architecture is designed to separate concerns, with the frontend, backend, and database each hosted on appropriate services.

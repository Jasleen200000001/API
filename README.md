# School Management API

## Overview

A Node.js API for managing school data, including adding schools and listing schools by proximity.

## Features

- Add schools to a MySQL database.
- Retrieve schools sorted by distance from a user's location.

## Endpoints

### 1. Add School

**POST** `/addSchool`

- **Payload**:
  ```json
  {
    "name": "Maple Leaf High School",
    "address": "45 Elm Street",
    "latitude": 40.712776,
    "longitude": -74.005974
  }
  ```
